# Subtitle Generator

A robust Python-based subtitle generator that uses AI to automatically generate and align subtitles for videos. This tool supports both automatic transcription and manual transcript alignment.

## Features

- AI-powered audio transcription using OpenAI's Whisper model
- Support for manual transcript alignment
- Dynamic subtitle positioning and styling
- Progress tracking and detailed logging
- Automatic session management and cleanup
- Error handling and recovery
- Modern web interface integration

## Requirements

- Python 3.8 or higher
- FFmpeg (for video processing)
- Required Python packages (see `requirements.txt`)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd subtitle-generator
```

2. Install the required dependencies:
```bash
pip install -r scripts/subtitle_generator/requirements.txt
```

3. Ensure FFmpeg is installed on your system:
- **Linux**: `sudo apt-get install ffmpeg`
- **macOS**: `brew install ffmpeg`
- **Windows**: Download from [FFmpeg website](https://ffmpeg.org/download.html)

## Usage

### Command Line Interface

Basic usage:
```bash
python main.py put_subtitles <video_path> <session_id>
```

With manual transcription:
```bash
python main.py put_subtitles <video_path> <transcription_text> <session_id>
```

### Web Interface

The subtitle generator can be integrated with a Next.js web application. The web interface provides:
- Drag-and-drop video upload
- Real-time progress tracking
- Subtitle customization options
- Preview and download capabilities

## Configuration

Key configuration parameters in `main.py`:
```python
FONT_PATH = './src/chantilly.TTF'  # Path to subtitle font
FONT_SIZE = 80                      # Font size
TEXT_COLOR = (255, 255, 255)        # White text
OUTLINE_COLOR = (0, 0, 0)           # Black outline
OUTLINE_THICKNESS = 12              # Outline thickness
```

## Directory Structure

```
subtitle-generator/
├── scripts/
│   └── subtitle_generator/
│       ├── main.py              # Main script
│       ├── logger.py            # Logging configuration
│       ├── session_manager.py   # Session management
│       ├── exceptions.py        # Custom exceptions
│       └── requirements.txt     # Dependencies
├── src/
│   └── chantilly.TTF           # Default font file
└── public/
    └── tmp/                     # Temporary processing directory
```

## Error Handling

The script includes comprehensive error handling for:
- Missing font files
- Video processing errors
- Audio extraction issues
- Transcription failures
- Frame extraction problems
- Directory access errors

All errors are logged with detailed information for debugging.

## Logging

Logs are stored in `public/tmp/<session_id>/logs/` with the following information:
- Timestamp
- Log level
- Operation details
- Error messages and stack traces (when applicable)

## Session Management

Each processing job is assigned a unique session ID, which:
- Creates isolated working directories
- Manages temporary files
- Handles cleanup after processing
- Prevents conflicts between multiple jobs

## Development

### Running Tests
```bash
pytest tests/
```

### Code Formatting
```bash
black scripts/subtitle_generator/
```

### Linting
```bash
flake8 scripts/subtitle_generator/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)

## Acknowledgments

- OpenAI's Whisper model for audio transcription
- MoviePy for video processing
- OpenCV for frame manipulation
- PIL for text rendering
