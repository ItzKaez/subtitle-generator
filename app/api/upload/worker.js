import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { FileHandler, ProgressTracker } from '@/app/utils/fileHandler';

// Get the project root directory
const getProjectRoot = () => {
  return process.cwd();
};

// Check if a file exists using async fs
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Verify required files exist
async function verifyRequiredFiles(projectRoot) {
  const fontPath = path.join(projectRoot, 'src', 'chantilly.TTF');
  const scriptPath = path.join(projectRoot, 'scripts', 'subtitle_generator', 'main.py');

  const errors = [];

  if (!await fileExists(fontPath)) {
    errors.push(`Font file not found at: ${fontPath}`);
  }

  if (!await fileExists(scriptPath)) {
    errors.push(`Script not found at: ${scriptPath}`);
  }

  return errors;
}

export async function processUpload(file, sessionId, subtitleOptions) {
  try {
    // Initialize progress tracking
    ProgressTracker.updateProgress(sessionId, 0, 'Starting upload');

    // Verify required files
    const projectRoot = getProjectRoot();
    const verificationErrors = await verifyRequiredFiles(projectRoot);
    
    if (verificationErrors.length > 0) {
      throw new Error(`Setup verification failed:\n${verificationErrors.join('\n')}`);
    }

    // Save file
    const filePath = await FileHandler.saveFile(file, sessionId);
    ProgressTracker.updateProgress(sessionId, 20, 'File saved');

    // Process subtitles
    await processSubtitles(filePath, sessionId, {
      ...subtitleOptions,
      font: 'Chantilly' // Always use Chantilly font
    });

    // Verify the processed video exists
    const videoExists = await FileHandler.checkProcessedVideo(sessionId);
    if (!videoExists) {
      throw new Error('Failed to generate video with subtitles');
    }

    ProgressTracker.updateProgress(sessionId, 100, 'Complete');

    return {
      success: true,
      outputPath: path.join('public', 'tmp', sessionId, 'video_with_subtitles.mp4')
    };

  } catch (error) {
    console.error('Error in processUpload:', error);
    ProgressTracker.updateProgress(sessionId, 100, `Error: ${error.message}`);
    throw error;
  }
}

/**
 * Process the video with subtitles using the Python script
 */
async function processSubtitles(videoPath, sessionId, options) {
  return new Promise(async (resolve, reject) => {
    try {
      // Get the absolute path to the script using project root
      const projectRoot = getProjectRoot();
      const scriptPath = path.join(projectRoot, 'scripts', 'subtitle_generator', 'main.py');

      console.log('Project root:', projectRoot);
      console.log('Script path:', scriptPath);

      // Construct the command with proper argument handling
      const outputPath = path.join(process.cwd(), 'public', 'tmp', sessionId, 'video_with_subtitles.mp4');
      const fontPath = path.join(projectRoot, 'src', 'chantilly.TTF');
      
      // Convert text size to pixel values
      const fontSizeMap = {
        'small': 60,
        'medium': 80,
        'large': 100
      };
      
      // Convert color names to RGB values
      const colorMap = {
        'white': '255,255,255',
        'yellow': '255,255,0',
        'red': '255,0,0',
        'blue': '0,0,255',
        'green': '0,255,0'
      };

      const fontSize = fontSizeMap[options.size] || 80;  // default to medium (80) if invalid
      const textColor = colorMap[options.color] || '255,255,255';  // default to white if invalid
      
      const commandArgs = [
        'python',
        `"${scriptPath}"`,
        '--model_path', 'base',
        '--video_path', `"${videoPath}"`,
        '--output_path', `"${outputPath}"`,
        '--session_id', `"${sessionId}"`,
        '--font_path', `"${fontPath}"`,
        '--font_size', `${fontSize}`,
        '--text_color', `"${textColor}"`
      ];

      // Join arguments with proper spacing and quoting
      const command = commandArgs.join(' ');

      console.log('Executing command:', command);
      ProgressTracker.updateProgress(sessionId, 25, 'Starting subtitle generation');

      // Execute the Python script with proper environment
      const subprocess = exec(command, {
        env: {
          ...process.env,
          PYTHONIOENCODING: 'utf-8',
          SESSION_ID: sessionId,
          PYTHONPATH: path.join(projectRoot, 'scripts', 'subtitle_generator')
        }
      });

      let errorOutput = '';

      // Handle process output
      subprocess.stdout?.on('data', (data) => {
        const output = data.toString();
        console.log('Process output:', output);

        // Parse progress information
        if (output.includes('Progress:')) {
          const match = output.match(/Progress: (\d+)%/);
          if (match) {
            const progress = parseInt(match[1]);
            ProgressTracker.updateProgress(
              sessionId,
              25 + (progress * 0.7), // Scale progress between 25% and 95%
              'Processing video and generating subtitles'
            );
          }
        }
      });

      // Handle process errors
      subprocess.stderr?.on('data', (data) => {
        const error = data.toString();
        console.error('Process error output:', error);
        errorOutput += error;
      });

      // Handle process completion
      subprocess.on('close', (code) => {
        if (code === 0) {
          ProgressTracker.updateProgress(sessionId, 95, 'Finalizing video');
          resolve();
        } else {
          // Extract error message from Python output if available
          const errorMatch = errorOutput.match(/Error: (.*?)(\n|$)/);
          const errorMessage = errorMatch 
            ? errorMatch[1] 
            : `Process exited with code ${code}`;

          const error = new Error(errorMessage);
          ProgressTracker.updateProgress(sessionId, 100, `Error: ${errorMessage}`);
          reject(error);
        }
      });

      // Handle process errors
      subprocess.on('error', (error) => {
        console.error('Process error:', error);
        ProgressTracker.updateProgress(sessionId, 100, `Error: ${error.message}`);
        reject(error);
      });

    } catch (error) {
      console.error('Error in processSubtitles:', error);
      ProgressTracker.updateProgress(sessionId, 100, `Error: ${error.message}`);
      reject(error);
    }
  });
}

/**
 * Clean up resources for a session
 */
export async function cleanupSession(sessionId) {
  try {
    await FileHandler.cleanup(sessionId);
    ProgressTracker.progressMap.delete(sessionId);
  } catch (error) {
    console.error(`Error cleaning up session ${sessionId}:`, error);
  }
}
