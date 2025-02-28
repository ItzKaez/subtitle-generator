import os
import shutil
from datetime import datetime, timedelta
import logging

class SessionManager:
    """
    Manages session-related operations including directory creation, cleanup, and status tracking.
    """
    
    def __init__(self, session_id):
        """
        Initialize SessionManager with a session ID.
        
        Args:
            session_id (str): Unique identifier for the session
        """
        self.session_id = session_id
        self.base_dir = os.path.join("public", "tmp")
        self.session_dir = os.path.join(self.base_dir, session_id)
        self.frames_dir = os.path.join(self.session_dir, "frames")
        self.logger = logging.getLogger(f'subtitle_generator_{session_id}')

    def setup_session(self):
        """
        Create necessary directories for the session.
        
        Returns:
            bool: True if setup was successful, False otherwise
        """
        try:
            # Create base directory if it doesn't exist
            if not os.path.exists(self.base_dir):
                os.makedirs(self.base_dir, exist_ok=True)
                self.logger.info(f"Created base directory: {self.base_dir}")

            # Create session directory
            os.makedirs(self.session_dir, exist_ok=True)
            self.logger.info(f"Session directories created successfully at {self.session_dir}")

            # Create frames directory
            os.makedirs(self.frames_dir, exist_ok=True)
            self.logger.info(f"Created frames directory: {self.frames_dir}")

            return True
        except Exception as e:
            self.logger.error(f"Failed to create session directories: {str(e)}")
            return False

    def cleanup_session(self):
        """
        Remove temporary files and directories created during the session.
        
        Returns:
            bool: True if cleanup was successful, False otherwise
        """
        try:
            # Remove frames directory if it exists
            if os.path.exists(self.frames_dir):
                shutil.rmtree(self.frames_dir)
                self.logger.info(f"Removed frames directory: {self.frames_dir}")

            # Remove audio file if it exists
            audio_file = os.path.join(self.session_dir, "audio.mp3")
            if os.path.exists(audio_file):
                os.remove(audio_file)
                self.logger.info(f"Removed temporary audio file: {audio_file}")

            # Remove session directory if empty
            if os.path.exists(self.session_dir) and not os.listdir(self.session_dir):
                os.rmdir(self.session_dir)
                self.logger.info(f"Removed empty session directory: {self.session_dir}")

            return True
        except Exception as e:
            self.logger.error(f"Error during session cleanup: {str(e)}")
            return False

    @staticmethod
    def cleanup_old_sessions(max_age_hours=24):
        """
        Clean up session directories older than specified hours.
        
        Args:
            max_age_hours (int): Maximum age of sessions to keep in hours
            
        Returns:
            int: Number of sessions cleaned up
        """
        base_dir = os.path.join("public", "tmp")
        if not os.path.exists(base_dir):
            return 0

        cleanup_count = 0
        current_time = datetime.now()
        logger = logging.getLogger('subtitle_generator')
        
        try:
            for session_dir in os.listdir(base_dir):
                try:
                    session_path = os.path.join(base_dir, session_dir)
                    if not os.path.isdir(session_path):
                        continue

                    # Check directory modification time
                    dir_time = datetime.fromtimestamp(os.path.getmtime(session_path))
                    age = current_time - dir_time

                    if age > timedelta(hours=max_age_hours):
                        try:
                            shutil.rmtree(session_path)
                            cleanup_count += 1
                            logger.info(f"Cleaned up old session: {session_dir}")
                        except Exception as e:
                            logger.error(f"Failed to clean up session {session_dir}: {str(e)}")

                except Exception as e:
                    logger.error(f"Error processing session directory {session_dir}: {str(e)}")
                    continue

            return cleanup_count
        except Exception as e:
            logger.error(f"Error during old session cleanup: {str(e)}")
            return cleanup_count

    def get_session_path(self, filename):
        """
        Get the full path for a file in the session directory.
        
        Args:
            filename (str): Name of the file
            
        Returns:
            str: Full path to the file in the session directory
        """
        return os.path.join(self.session_dir, filename)

    def get_frames_path(self):
        """
        Get the path to the frames directory.
        
        Returns:
            str: Path to the frames directory
        """
        return self.frames_dir

    def ensure_directory_exists(self, directory):
        """
        Ensure a directory exists, create it if it doesn't.
        
        Args:
            directory (str): Path to the directory
            
        Returns:
            bool: True if directory exists or was created successfully
        """
        try:
            os.makedirs(directory, exist_ok=True)
            return True
        except Exception as e:
            self.logger.error(f"Failed to create directory {directory}: {str(e)}")
            return False
