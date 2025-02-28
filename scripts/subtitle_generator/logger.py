import logging
import os
from datetime import datetime

def setup_logger(session_id):
    """
    Configure and return a logger instance with both file and console handlers.
    
    Args:
        session_id (str): The session ID to be included in log messages
        
    Returns:
        logging.Logger: Configured logger instance
    """
    # Create logs directory if it doesn't exist
    log_dir = os.path.join("public", "tmp", session_id, "logs")
    os.makedirs(log_dir, exist_ok=True)
    
    # Create logger
    logger = logging.getLogger(f'subtitle_generator_{session_id}')
    logger.setLevel(logging.DEBUG)
    
    # Prevent adding handlers multiple times
    if not logger.handlers:
        # Create file handler
        log_file = os.path.join(log_dir, f'subtitle_generation_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log')
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.DEBUG)
        
        # Create console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # Create formatters and add them to the handlers
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_formatter = logging.Formatter(
            '%(levelname)s: %(message)s'
        )
        
        file_handler.setFormatter(file_formatter)
        console_handler.setFormatter(console_formatter)
        
        # Add handlers to logger
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
    
    return logger
