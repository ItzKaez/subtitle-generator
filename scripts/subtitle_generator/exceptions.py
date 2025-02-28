class SubtitleGeneratorError(Exception):
    """Base exception class for subtitle generator errors."""
    pass

class FontNotFoundError(SubtitleGeneratorError):
    """Raised when the required font file is not found."""
    def __init__(self, font_path):
        self.font_path = font_path
        self.message = f"Font file not found: {font_path}. Please ensure the font file exists in the specified location."
        super().__init__(self.message)

class VideoProcessingError(SubtitleGeneratorError):
    """Raised when there's an error processing the video."""
    def __init__(self, message, details=None):
        self.details = details
        self.message = f"Error processing video: {message}"
        if details:
            self.message += f"\nDetails: {details}"
        super().__init__(self.message)

class AudioExtractionError(SubtitleGeneratorError):
    """Raised when there's an error extracting audio from the video."""
    def __init__(self, message, details=None):
        self.details = details
        self.message = f"Error extracting audio: {message}"
        if details:
            self.message += f"\nDetails: {details}"
        super().__init__(self.message)

class TranscriptionError(SubtitleGeneratorError):
    """Raised when there's an error during transcription."""
    def __init__(self, message, details=None):
        self.details = details
        self.message = f"Error during transcription: {message}"
        if details:
            self.message += f"\nDetails: {details}"
        super().__init__(self.message)

class FrameExtractionError(SubtitleGeneratorError):
    """Raised when there's an error extracting frames from the video."""
    def __init__(self, message, details=None):
        self.details = details
        self.message = f"Error extracting frames: {message}"
        if details:
            self.message += f"\nDetails: {details}"
        super().__init__(self.message)

class VideoCreationError(SubtitleGeneratorError):
    """Raised when there's an error creating the final video."""
    def __init__(self, message, details=None):
        self.details = details
        self.message = f"Error creating video: {message}"
        if details:
            self.message += f"\nDetails: {details}"
        super().__init__(self.message)

class SessionError(SubtitleGeneratorError):
    """Raised when there's an error with session management."""
    def __init__(self, message, session_id=None):
        self.session_id = session_id
        self.message = f"Session error: {message}"
        if session_id:
            self.message += f" (Session ID: {session_id})"
        super().__init__(self.message)

class DirectoryError(SubtitleGeneratorError):
    """Raised when there's an error with directory operations."""
    def __init__(self, message, path=None):
        self.path = path
        self.message = f"Directory error: {message}"
        if path:
            self.message += f" (Path: {path})"
        super().__init__(self.message)

class ValidationError(SubtitleGeneratorError):
    """Raised when input validation fails."""
    def __init__(self, message, field=None):
        self.field = field
        self.message = f"Validation error: {message}"
        if field:
            self.message += f" (Field: {field})"
        super().__init__(self.message)
