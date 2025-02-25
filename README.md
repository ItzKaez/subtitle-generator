# Subtitle Generator Project

Subtitle Generator is a Next.js project designed to generate dynamic subtitles for videos, supporting various formats such as Instagram Reels, YouTube Shorts, and TikTok videos.

## Python Script

A Python script for processing video subtitles can be found in the `scripts/` directory. 

### How to Use the Python Script

1. Navigate to the `scripts/` directory.
2. Ensure you have the necessary Python environment set up.
3. Install the required dependencies using:
   ```
   pip install -r requirements.txt
   ```
4. Run the script using the command:
   ```
   python main.py put_subtitles <video_path> <transcription_text>
   ```

## Getting Started

To start the Next.js development server, run:
```
npm run dev
```

## Installation and Usage

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/zubu007/auto-subtitle-generator.git
   ```

2. Install [FFmpeg](https://ffmpeg.org):
   - **Windows:**
     - Install [Chocolatey](https://chocolatey.org/install) and run:
       ```bash
       choco install ffmpeg
       ```
   - **Linux:**
     ```bash
     sudo apt install ffmpeg
     ```
       
3. Install the necessary Python packages in your environment using pip:
   ```bash
   pip install -r requirements.txt
   ```
   
4. Run the Python script with the following command:
   - Windows:
     ```bash
     python main.py put_subtitles <video_path> <transcription_text>
     ```
   - Linux:
     ```bash
     python3 main.py put_subtitles <video_path> <transcription_text>
     ```

## TODO
- [ ] Control the number of words shown together with a variable.
- [ ] Add support for multiple languages.
- [ ] Add support for multiple video formats.
- [ ] Add support for multiple video resolutions.
- [ ] Add an option to select font color.
- [ ] Add an option for font size.

## Done
- [x] Create a GUI for the program.
- [x] Design UI for the program.
- [x] Create variables for text size and font.
- [x] Update this README to make it more professional.
- [x] Add comments to the code.
