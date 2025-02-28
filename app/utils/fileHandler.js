import fs from 'fs/promises';
import path from 'path';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

export class FileHandler {
  /**
   * Validates the uploaded file
   * @param {File} file - The uploaded file
   * @throws {Error} If validation fails
   */
  static validateFile(file) {
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds limit (500MB)');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Only MP4, MOV, and AVI files are allowed');
    }
  }

  /**
   * Creates necessary directories for file processing
   * @param {string} sessionId - The session ID
   * @returns {Promise<string>} The path to the session directory
   */
  static async createDirectories(sessionId) {
    const sessionDir = path.join(process.cwd(), 'public', 'tmp', sessionId);
    await fs.mkdir(sessionDir, { recursive: true });
    return sessionDir;
  }

  /**
   * Saves the uploaded file to disk
   * @param {File} file - The file to save
   * @param {string} sessionId - The session ID
   * @returns {Promise<string>} The path to the saved file
   */
  static async saveFile(file, sessionId) {
    const sessionDir = await this.createDirectories(sessionId);
    const filePath = path.join(sessionDir, 'video_without_subtitles.mp4');
    
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    
    return filePath;
  }

  /**
   * Gets the progress for a session
   * @param {string} sessionId - The session ID
   * @returns {Promise<Object|null>} Progress information
   */
  static async getProgress(sessionId) {
    return ProgressTracker.getProgress(sessionId);
  }

  /**
   * Cleans up session files
   * @param {string} sessionId - The session ID
   * @returns {Promise<void>}
   */
  static async cleanup(sessionId) {
    try {
      const sessionDir = path.join(process.cwd(), 'public', 'tmp', sessionId);
      await fs.rm(sessionDir, { recursive: true, force: true });
    } catch (error) {
      console.error(`Error cleaning up session ${sessionId}:`, error);
    }
  }

  /**
   * Checks if the processed video exists
   * @param {string} sessionId - The session ID
   * @returns {Promise<boolean>}
   */
  static async checkProcessedVideo(sessionId) {
    try {
      const videoPath = path.join(process.cwd(), 'public', 'tmp', sessionId, 'video_with_subtitles.mp4');
      await fs.access(videoPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the size of the processed video
   * @param {string} sessionId - The session ID
   * @returns {Promise<number>} File size in bytes
   */
  static async getProcessedVideoSize(sessionId) {
    try {
      const videoPath = path.join(process.cwd(), 'public', 'tmp', sessionId, 'video_with_subtitles.mp4');
      const stats = await fs.stat(videoPath);
      return stats.size;
    } catch {
      return 0;
    }
  }
}

export class ProgressTracker {
  static progressMap = new Map();

  /**
   * Updates the progress for a session
   * @param {string} sessionId - The session ID
   * @param {number} progress - Progress percentage (0-100)
   * @param {string} status - Current status message
   */
  static updateProgress(sessionId, progress, status) {
    this.progressMap.set(sessionId, { progress, status, timestamp: Date.now() });
  }

  /**
   * Gets the progress for a session
   * @param {string} sessionId - The session ID
   * @returns {Object|null} Progress information
   */
  static getProgress(sessionId) {
    return this.progressMap.get(sessionId) || null;
  }

  /**
   * Cleans up old progress entries
   * Removes entries older than 1 hour
   */
  static cleanup() {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    for (const [sessionId, data] of this.progressMap.entries()) {
      if (data.timestamp < oneHourAgo) {
        this.progressMap.delete(sessionId);
      }
    }
  }
}

// Run progress cleanup every hour
setInterval(() => ProgressTracker.cleanup(), 60 * 60 * 1000);
