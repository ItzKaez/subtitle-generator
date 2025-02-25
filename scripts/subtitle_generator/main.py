import os
import shutil
import cv2
from moviepy.editor import ImageSequenceClip, AudioFileClip, VideoFileClip
from tqdm import tqdm
import unicodedata
import whisper
import numpy as np
import re
from PIL import Image, ImageDraw, ImageFont
import sys


# Paramètres garantis visibles
FONT_PATH = './src/chantilly.TTF'
FONT_SIZE = 80
TEXT_COLOR = (255, 255, 255)  # Blanc pour visibilité
OUTLINE_COLOR = (0, 0, 0)  # Contour noir
OUTLINE_THICKNESS = 12  # Définir l'épaisseur du contour

if not os.path.exists(FONT_PATH):
    print(f"Police introuvable: {FONT_PATH}")


def align_sequences(seq1, seq2):
    # Initialisation de la matrice de score
    n = len(seq1)
    m = len(seq2)
    score = np.zeros((n + 1, m + 1))
    for i in range(1, n + 1):
        score[i][0] = i
    for j in range(1, m + 1):
        score[0][j] = j

    # Remplissage de la matrice de score
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            match = score[i - 1][j - 1] + (0 if seq1[i - 1] == seq2[j - 1] else 1)
            delete = score[i - 1][j] + 1
            insert = score[i][j - 1] + 1
            score[i][j] = min(match, delete, insert)

    # Backtracking pour trouver l'alignement
    align1 = []
    align2 = []
    i, j = n, m
    while i > 0 and j > 0:
        if score[i][j] == score[i - 1][j - 1] + (0 if seq1[i - 1] == seq2[j - 1] else 1):
            align1.append(seq1[i - 1])
            align2.append(seq2[j - 1])
            i -= 1
            j -= 1
        elif score[i][j] == score[i - 1][j] + 1:
            align1.append(seq1[i - 1])
            align2.append(None)
            i -= 1
        else:
            align1.append(None)
            align2.append(seq2[j - 1])
            j -= 1

    while i > 0:
        align1.append(seq1[i - 1])
        align2.append(None)
        i -= 1

    while j > 0:
        align1.append(None)
        align2.append(seq2[j - 1])
        j -= 1

    align1.reverse()
    align2.reverse()
    return align1, align2

class VideoTranscriber:
    def __init__(self, model_path, video_path, transcription_text=None):
        self.model = whisper.load_model(model_path)
        self.video_path = video_path
        self.audio_path = ''
        self.word_timings = []
        self.fps = 0
        self.transcription_words = self.load_transcription(transcription_text) if transcription_text else []

    def load_transcription(self, transcription_text):
        words = re.findall(r'\b\w+\b', transcription_text)
        return [normalize_text(word) for word in words]

    def transcribe_video(self):
        print("Analyse audio...")
        try:
            result = self.model.transcribe(self.video_path, word_timestamps=True)
            cap = cv2.VideoCapture(self.video_path)
            self.fps = cap.get(cv2.CAP_PROP_FPS)
            cap.release()

            detected_words = []
            for segment in result["segments"]:
                for word_item in segment.get("words", []):
                    word = word_item.get("word", "").strip()
                    if word:
                        detected_words.append({
                            "text": normalize_text(word),
                            "start": int(word_item["start"] * self.fps),
                            "end": int(word_item["end"] * self.fps)
                        })

            if not self.transcription_words:
                # Si aucune transcription n'est fournie, utilisez les mots détectés
                self.transcription_words = [w["text"] for w in detected_words]

            aligned_transcription, aligned_detected = align_sequences(self.transcription_words, [w["text"] for w in detected_words])

            self.word_timings = []
            detected_index = 0
            for trans_word, det_word in zip(aligned_transcription, aligned_detected):
                if trans_word is not None and det_word is not None:
                    self.word_timings.append({
                        "text": trans_word,
                        "start": detected_words[detected_index]["start"],
                        "end": detected_words[detected_index]["end"]
                    })
                    detected_index += 1
                elif trans_word is not None:
                    self.word_timings.append({
                        "text": trans_word,
                        "start": self.word_timings[-1]["end"] if self.word_timings else 0,
                        "end": self.word_timings[-1]["end"] + 1 if self.word_timings else 1
                    })
                elif det_word is not None:
                    detected_index += 1

            print(f"Mots synchronisés: {len(self.word_timings)}")

        except Exception as e:
            print(f"Erreur transcription: {str(e)}")


    def extract_frames(self, output_folder):
        print("Application des sous-titres...")
        try:
            cap = cv2.VideoCapture(self.video_path)
            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            
            for frame_count in tqdm(range(int(cap.get(cv2.CAP_PROP_FRAME_COUNT))), desc="Traitement"):
                ret, frame = cap.read()
                if not ret:
                    break

                # Recherche du mot actuel
                current_word = next((w for w in self.word_timings 
                                   if w["start"] <= frame_count <= w["end"]), None)

                if current_word:
                    text = current_word["text"]
                    
                    # Convertir l'image OpenCV en image PIL
                    image_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
                    draw = ImageDraw.Draw(image_pil)
                    font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
                    
                    # Position centrale garantie
                    text_bbox = draw.textbbox((0, 0), text, font=font)
                    text_width = text_bbox[2] - text_bbox[0]
                    text_height = text_bbox[3] - text_bbox[1]
                    x = (width - text_width) // 2
                    y = (height + text_height) // 2 + 50  # Décalage vers le bas
                    
                    # Dessiner le texte avec contour
                    for dx in range(-OUTLINE_THICKNESS, OUTLINE_THICKNESS + 1):
                        for dy in range(-OUTLINE_THICKNESS, OUTLINE_THICKNESS + 1):
                            if dx != 0 or dy != 0:
                                draw.text((x + dx, y + dy), text, font=font, fill=OUTLINE_COLOR)
                    draw.text((x, y), text, font=font, fill=TEXT_COLOR)
                    
                    # Convertir l'image PIL en image OpenCV
                    frame = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)

                cv2.imwrite(os.path.join(output_folder, f"{frame_count}.jpg"), frame)

            cap.release()
            print("Sous-titres appliqués!")

        except Exception as e:
            print(f"Erreur traitement: {str(e)}")

    def create_video(self, output_video_path):
        print('Creating video')
        try:
            image_folder = os.path.join(os.path.dirname(self.video_path), "frames")
            if not os.path.exists(image_folder):
                os.makedirs(image_folder)
            
            self.extract_frames(image_folder)
            
            images = [img for img in os.listdir(image_folder) if img.endswith(".jpg")]
            images.sort(key=lambda x: int(x.split(".")[0]))
            
            clip = ImageSequenceClip([os.path.join(image_folder, image) 
                                     for image in images], fps=self.fps)
            audio = AudioFileClip(self.audio_path)
            clip = clip.set_audio(audio)
            clip.write_videofile(output_video_path)
            shutil.rmtree(image_folder)
            os.remove(os.path.join(os.path.dirname(self.video_path), "audio.mp3"))
        except Exception as e:
            print(f"Error creating video: {e}")
            
    def extract_audio(self):
        print('Extracting audio')
        try:
            audio_path = os.path.join(os.path.dirname(self.video_path), "audio.mp3")
            video = VideoFileClip(self.video_path)
            audio = video.audio 
            audio.write_audiofile(audio_path)
            self.audio_path = audio_path
            print('Audio extracted')
        except Exception as e:
            print(f"Error during audio extraction: {e}")

def normalize_text(text):
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore')
    text = text.decode('ascii')
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text.upper()

def put_subtitles(video_path, transcription_text=None):
    model_path = "base"
    output_video_path = "tmp/final_video.mp4"
    transcriber = VideoTranscriber(model_path, video_path, transcription_text)
    transcriber.extract_audio()
    transcriber.transcribe_video()
    transcriber.create_video(output_video_path)
    return print('Subtitles added!')

#put_subtitles('E:/Users/danie/Bureau/Perso/Projets/subtitles_webapp/subtitle-generator/tmp/video_without_subtitles.mp4', None)

if __name__ == "__main__":
    if len(sys.argv) != 4 or sys.argv[1] != 'put_subtitles':
        print("Usage: python main.py put_subtitles <video_path> <transcription_text>")
        sys.exit(1)

    video_path = sys.argv[2]
    if sys.argv[3]:
        transcription_text = sys.argv[3]

    put_subtitles(video_path, transcription_text)
