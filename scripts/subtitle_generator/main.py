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
import argparse
from logger import setup_logger
from session_manager import SessionManager
from exceptions import (
    SubtitleGeneratorError, FontNotFoundError, VideoProcessingError, 
    AudioExtractionError, TranscriptionError, FrameExtractionError, 
    VideoCreationError, ValidationError, SessionError
)

# Define subtitle styling options
SUBTITLE_STYLES = {
    "default": {
        "font_path": "src/chantilly.TTF",
        "font_size": 80,
        "text_color": (255, 255, 255),     # White
        "outline_color": (0, 0, 0),        # Black
        "outline_thickness": 3,
        "position_offset": 20,             # Offset from center
        "background_color": (0, 0, 0, 128), # Semi-transparent black
        "background_padding": (20, 10),     # Horizontal and vertical padding
    },
    "modern": {
        "font_path": "src/chantilly.TTF",
        "font_size": 90,
        "text_color": (255, 255, 255),     # White
        "outline_color": (0, 0, 128),      # Navy Blue
        "outline_thickness": 4,
        "position_offset": 25,
        "background_color": (0, 0, 128, 100),
        "background_padding": (25, 12),
    },
    "fancy": {
        "font_path": "src/chantilly.TTF",
        "font_size": 85,
        "text_color": (255, 215, 0),       # Gold
        "outline_color": (139, 69, 19),    # Brown
        "outline_thickness": 5,
        "position_offset": 22,
        "background_color": (139, 69, 19, 90),
        "background_padding": (22, 11),
    },
    "retro": {
        "font_path": "src/chantilly.TTF",
        "font_size": 75,
        "text_color": (255, 160, 122),     # Light Coral
        "outline_color": (47, 79, 79),     # Dark Slate Gray
        "outline_thickness": 4,
        "position_offset": 18,
        "background_color": (47, 79, 79, 110),
        "background_padding": (18, 9),
    }
}

def validate_style_preset(preset_name):
    """Validate and return the style preset configuration."""
    if preset_name not in SUBTITLE_STYLES:
        valid_presets = ", ".join(SUBTITLE_STYLES.keys())
        raise ValidationError(f"Invalid style preset. Available presets: {valid_presets}")
    return SUBTITLE_STYLES[preset_name]

class VideoTranscriber:
    def __init__(self, model_path, video_path, transcription_text=None, session_id=None, style_preset="default"):
        self.session_id = session_id or 'default_session'
        self.logger = setup_logger(self.session_id)
        self.session_manager = SessionManager(self.session_id)
        
        try:
            self.model = whisper.load_model(model_path)
            self.video_path = video_path
            self.audio_path = ''
            self.word_timings = []
            self.fps = 0
            self.transcription_words = self.load_transcription(transcription_text) if transcription_text else []
            
            # Initialize style options from preset
            self.style_options = validate_style_preset(style_preset)
            
            self.logger.info(f"VideoTranscriber initialized with video: {video_path} and style preset: {style_preset}")
            
            # Setup session directories
            if not self.session_manager.setup_session():
                raise SessionError("Failed to setup session directories", self.session_id)
                
        except Exception as e:
            raise VideoProcessingError(f"Error initializing VideoTranscriber: {str(e)}")

    def load_transcription(self, transcription_text):
        """Load and normalize transcription text."""
        if not transcription_text:
            return []
        words = re.findall(r'\b\w+\b', transcription_text)
        return [self.normalize_text(word) for word in words]

    def normalize_text(self, text):
        """Normalize text by removing accents and special characters."""
        if not text:
            return ""
        text = unicodedata.normalize('NFKD', text)
        text = text.encode('ascii', 'ignore')
        text = text.decode('ascii')
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
        return text.upper()

    def extract_audio(self):
        """Extract audio from video file."""
        self.logger.info("Extracting audio from video...")
        try:
            audio_path = os.path.join(self.session_manager.session_dir, "audio.mp3")
            video = VideoFileClip(self.video_path)
            audio = video.audio
            audio.write_audiofile(audio_path)
            self.audio_path = audio_path
            video.close()
            self.logger.info("Audio extraction completed successfully")
        except Exception as e:
            raise AudioExtractionError(f"Error extracting audio: {str(e)}")

    def transcribe_video(self):
        """Transcribe video audio and align with provided transcription."""
        self.logger.info("Starting video transcription...")
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
                            "text": self.normalize_text(word),
                            "start": int(word_item["start"] * self.fps),
                            "end": int(word_item["end"] * self.fps)
                        })

            if not self.transcription_words:
                self.transcription_words = [w["text"] for w in detected_words]

            aligned_transcription, aligned_detected = self.align_sequences(
                self.transcription_words,
                [w["text"] for w in detected_words]
            )

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

            self.logger.info(f"Transcription completed. Words synchronized: {len(self.word_timings)}")

        except Exception as e:
            raise TranscriptionError(f"Error during transcription: {str(e)}")

    def align_sequences(self, seq1, seq2):
        """Align two sequences using dynamic programming."""
        try:
            n, m = len(seq1), len(seq2)
            score = np.zeros((n + 1, m + 1))
            
            # Initialize score matrix
            for i in range(1, n + 1):
                score[i][0] = i
            for j in range(1, m + 1):
                score[0][j] = j

            # Fill score matrix
            for i in range(1, n + 1):
                for j in range(1, m + 1):
                    match = score[i - 1][j - 1] + (0 if seq1[i - 1] == seq2[j - 1] else 1)
                    delete = score[i - 1][j] + 1
                    insert = score[i][j - 1] + 1
                    score[i][j] = min(match, delete, insert)

            # Backtrack to find alignment
            align1, align2 = [], []
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

        except Exception as e:
            raise VideoProcessingError(f"Error aligning sequences: {str(e)}")

    def create_video(self, output_path):
        """Create final video with subtitles."""
        self.logger.info("Creating final video...")
        try:
            frames_dir = os.path.join(self.session_manager.session_dir, "frames")
            os.makedirs(frames_dir, exist_ok=True)

            # Extract frames with subtitles
            cap = cv2.VideoCapture(self.video_path)
            if not cap.isOpened():
                raise FrameExtractionError("Failed to open video file")

            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            
            with tqdm(total=total_frames, desc="Processing frames") as pbar:
                for frame_count in range(total_frames):
                    ret, frame = cap.read()
                    if not ret:
                        raise FrameExtractionError(f"Failed to read frame {frame_count}")

                    current_word = next(
                        (w for w in self.word_timings if w["start"] <= frame_count <= w["end"]),
                        None
                    )

                    if current_word:
                        frame = self.add_subtitle_to_frame(frame, current_word["text"], width, height)

                    frame_path = os.path.join(frames_dir, f"{frame_count:08d}.jpg")
                    cv2.imwrite(frame_path, frame)
                    pbar.update(1)

            cap.release()

            # Create video from frames
            images = sorted([f for f in os.listdir(frames_dir) if f.endswith('.jpg')])
            if not images:
                raise VideoCreationError("No frames found for video creation")
            
            frame_paths = [os.path.join(frames_dir, img) for img in images]
            clip = ImageSequenceClip(frame_paths, fps=self.fps)
            
            # Add audio if available
            if os.path.exists(self.audio_path):
                audio = AudioFileClip(self.audio_path)
                clip = clip.set_audio(audio)
            
            # Write final video
            clip.write_videofile(output_path)
            clip.close()

            # Cleanup temporary files
            shutil.rmtree(frames_dir)
            if os.path.exists(self.audio_path):
                os.remove(self.audio_path)
            
            self.logger.info(f"Video created successfully: {output_path}")
            
        except Exception as e:
            raise VideoCreationError(f"Error creating video: {str(e)}")

    def add_subtitle_to_frame(self, frame, text, width, height):
        """Add subtitle text to a video frame using style options."""
        try:
            # Validate font file existence
            if not os.path.exists(self.style_options['font_path']):
                raise FontNotFoundError(self.style_options['font_path'])
                
            image_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            draw = ImageDraw.Draw(image_pil)
            
            # Load font with preset size
            font = ImageFont.truetype(
                self.style_options['font_path'], 
                self.style_options['font_size']
            )
            
            # Calculate text position
            text_bbox = draw.textbbox((0, 0), text, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            x = (width - text_width) // 2
            y = ((height - text_height) // 2) + self.style_options['position_offset']
            
            # Draw background if specified
            if self.style_options['background_color']:
                bg_color = self.style_options['background_color']
                padding_x, padding_y = self.style_options['background_padding']
                bg_bbox = [
                    x - padding_x,
                    y - padding_y,
                    x + text_width + padding_x,
                    y + text_height + padding_y
                ]
                draw.rectangle(bg_bbox, fill=bg_color)
            
            # Draw outline using preset style
            outline_thickness = self.style_options['outline_thickness']
            outline_color = self.style_options['outline_color']
            
            for dx in range(-outline_thickness, outline_thickness + 1):
                for dy in range(-outline_thickness, outline_thickness + 1):
                    if dx != 0 or dy != 0:
                        draw.text(
                            (x + dx, y + dy), 
                            text, 
                            font=font, 
                            fill=outline_color
                        )
            
            # Draw main text with preset color
            draw.text(
                (x, y), 
                text, 
                font=font, 
                fill=self.style_options['text_color']
            )
            
            return cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
            
        except FontNotFoundError:
            raise
        except Exception as e:
            raise VideoProcessingError(f"Error adding subtitle to frame: {str(e)}")

def validate_model(model_name):
    """Validate whisper model name."""
    valid_models = ['tiny', 'base', 'small', 'medium', 'large']
    if model_name not in valid_models:
        raise ValidationError(f"Invalid model name. Choose from: {', '.join(valid_models)}")
    return model_name

def validate_files(video_path):
    """Validate existence of input files."""
    if not os.path.exists(video_path):
        raise ValidationError(f"Video file not found: {video_path}")

def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(description="Generate subtitled video using Whisper transcription")
    parser.add_argument("--model_path", required=True, help="Whisper model name (tiny, base, small, medium, large)")
    parser.add_argument("--video_path", required=True, help="Path to input video file")
    parser.add_argument("--output_path", required=True, help="Path for output video file")
    parser.add_argument("--transcription_text", help="Optional transcription text")
    parser.add_argument("--session_id", help="Session identifier")
    parser.add_argument("--style_preset", default="default", 
                      help=f"Preset style for subtitles. Options: {', '.join(SUBTITLE_STYLES.keys())}")

    args = parser.parse_args()

    try:
        # Validate inputs
        validate_model(args.model_path)
        validate_files(args.video_path)
        validate_style_preset(args.style_preset)

        # Initialize transcriber
        transcriber = VideoTranscriber(
            model_path=args.model_path,
            video_path=args.video_path,
            transcription_text=args.transcription_text,
            session_id=args.session_id,
            style_preset=args.style_preset
        )

        # Process video
        transcriber.extract_audio()
        transcriber.transcribe_video()
        transcriber.create_video(args.output_path)

        print(f"\nSuccess! Subtitled video saved to: {args.output_path}")

    except SubtitleGeneratorError as e:
        print(f"\nError: {str(e)}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected error: {str(e)}", file=sys.stderr)
        sys.exit(1)
    finally:
        # Cleanup any remaining temporary files
        if 'transcriber' in locals():
            transcriber.session_manager.cleanup_session()

if __name__ == "__main__":
    main()
