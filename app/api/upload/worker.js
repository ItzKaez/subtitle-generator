import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { FileHandler, ProgressTracker } from '../../utils/fileHandler';

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

// Ensure cleanup of temporary files
async function ensureCleanup(sessionId) {
  try {
    // Wait a bit to ensure all file handles are released
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const tmpDir = path.join(process.cwd(), 'public', 'tmp', sessionId);
    const framesDir = path.join(tmpDir, 'frames');
    const audioFile = path.join(tmpDir, 'audio.mp3');
    
    // Remove frames directory if it exists
    try {
      await fs.rm(framesDir, { recursive: true, force: true });
    } catch (e) {
      console.warn(`Warning: Could not remove frames directory: ${e.message}`);
    }
    
    // Remove temporary audio file if it exists
    try {
      await fs.unlink(audioFile);
    } catch (e) {
      console.warn(`Warning: Could not remove audio file: ${e.message}`);
    }
    
    // Remove any other temporary files
    const tmpFiles = await fs.readdir(tmpDir);
    for (const file of tmpFiles) {
      if (file.includes('TEMP') || file.endsWith('.tmp')) {
        try {
          await fs.unlink(path.join(tmpDir, file));
        } catch (e) {
          console.warn(`Warning: Could not remove temporary file ${file}: ${e.message}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error during cleanup for session ${sessionId}:`, error);
  }
}

export async function processUpload(file, sessionId, subtitleOptions) {
  let filePath;
  try {
    // Initialize progress tracking
    ProgressTracker.updateProgress(sessionId, 0, 'Initializing');

    // Verify required files
    const projectRoot = getProjectRoot();
    ProgressTracker.updateProgress(sessionId, 5, 'Verifying setup');
    const verificationErrors = await verifyRequiredFiles(projectRoot);
    
    if (verificationErrors.length > 0) {
      throw new Error(`Setup verification failed:\n${verificationErrors.join('\n')}`);
    }

    // Parse subtitle options
    let parsedOptions;
    try {
      parsedOptions = typeof subtitleOptions === 'string' 
        ? JSON.parse(subtitleOptions) 
        : subtitleOptions;
    } catch (e) {
      console.error('Error parsing subtitle options:', e);
      parsedOptions = { stylePreset: 'default' };
    }

    // Update progress during file upload
    ProgressTracker.updateProgress(sessionId, 10, 'Starting file upload');
    
    let uploadProgress = 10;
    const uploadInterval = setInterval(() => {
      if (uploadProgress < 20) {
        uploadProgress += 1;
        ProgressTracker.updateProgress(sessionId, uploadProgress, 'Uploading file...');
      }
    }, 100);

    try {
      filePath = await FileHandler.saveFile(file, sessionId);
      clearInterval(uploadInterval);
      ProgressTracker.updateProgress(sessionId, 20, 'File saved successfully');
    } catch (error) {
      clearInterval(uploadInterval);
      throw error;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Process subtitles with style preset
    ProgressTracker.updateProgress(sessionId, 25, 'Preparing video processing');
    await processSubtitles(filePath, sessionId, parsedOptions);

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

async function processSubtitles(videoPath, sessionId, options) {
  return new Promise(async (resolve, reject) => {
    try {
      const projectRoot = getProjectRoot();
      const scriptPath = path.join(projectRoot, 'scripts', 'subtitle_generator', 'main.py');

      console.log('Project root:', projectRoot);
      console.log('Script path:', scriptPath);
      console.log('Subtitle options:', options);

      const outputPath = path.join(process.cwd(), 'public', 'tmp', sessionId, 'video_with_subtitles.mp4');
      
      // Ensure paths are properly escaped for Windows
      const escapePath = (p) => p.replace(/\\/g, '\\\\');
      
      const commandArgs = [
        'python',
        '-u',  // Add unbuffered mode flag
        escapePath(scriptPath),
        '--model_path', 'base',
        '--video_path', escapePath(videoPath),
        '--output_path', escapePath(outputPath),
        '--session_id', sessionId,
        '--style_preset', options.stylePreset || 'default'
      ];

      console.log('Executing command:', commandArgs.join(' '));
      ProgressTracker.updateProgress(sessionId, 25, 'Starting subtitle generation');

      const subprocess = exec(commandArgs.join(' '), {
        maxBuffer: 1024 * 1024 * 10,
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

        // Parse MoviePy progress for audio extraction
        if (output.includes('MoviePy - Writing audio')) {
          const chunkMatch = output.match(/chunk:\s+(\d+)%/);
          if (chunkMatch) {
            const rawProgress = parseInt(chunkMatch[1], 10);
            // Scale audio extraction progress from 25% to 35%
            const scaledProgress = Math.round(25 + (rawProgress * 0.1));
            console.log(`Audio extraction: ${rawProgress}%, Scaled: ${scaledProgress}%`);
            ProgressTracker.updateProgress(
              sessionId,
              scaledProgress,
              'Extracting audio from video'
            );
          }
        }

        // Parse frame processing progress (main processing phase)
        const frameProgressMatch = output.match(/Processing frames:\s+(\d+)%/);
        if (frameProgressMatch) {
          const rawProgress = parseInt(frameProgressMatch[1], 10);
          // Scale frame processing from 35% to 75%
          const scaledProgress = Math.round(35 + (rawProgress * 0.4));
          console.log(`Frame processing: ${rawProgress}%, Scaled: ${scaledProgress}%`);
          ProgressTracker.updateProgress(
            sessionId,
            scaledProgress,
            'Processing video frames'
          );
        }

        // Parse final video building progress
        const finalProgressMatch = output.match(/t:\s+(\d+)%/);
        if (finalProgressMatch) {
          const rawProgress = parseInt(finalProgressMatch[1], 10);
          // Scale final building from 75% to 95%
          const scaledProgress = Math.round(75 + (rawProgress * 0.2));
          console.log(`Final building: ${rawProgress}%, Scaled: ${scaledProgress}%`);
          ProgressTracker.updateProgress(
            sessionId,
            scaledProgress,
            'Building final video'
          );
        }

        // Parse chunk processing for final audio
        if (output.includes('MoviePy - Writing video')) {
          const chunkMatch = output.match(/chunk:\s+(\d+)%/);
          if (chunkMatch) {
            const rawProgress = parseInt(chunkMatch[1], 10);
            // Scale final audio processing from 95% to 98%
            const scaledProgress = Math.round(95 + (rawProgress * 0.03));
            console.log(`Final audio: ${rawProgress}%, Scaled: ${scaledProgress}%`);
            ProgressTracker.updateProgress(
              sessionId,
              scaledProgress,
              'Finalizing video audio'
            );
          }
        }
      });

      // Track transcription progress
      let transcriptionStartTime = 0;
      const estimatedTranscriptionTime = 15000; // Estimate 15 seconds for transcription
      let transcriptionInterval;

      let finalVideoInterval = null;
      const estimatedFinalProcessingTime = 30000; // Estimate 30 seconds for final processing
      let finalProcessingStartTime = 0;

      // Handle process stderr output
      subprocess.stderr?.on('data', (data) => {
        const output = data.toString();
        console.error('Process error output:', output);
        errorOutput += output;

        // Parse progress indicators from stderr
        if (output.includes('Audio extraction completed successfully')) {
          ProgressTracker.updateProgress(sessionId, 35, 'Audio extraction completed');
        } 
        else if (output.includes('Starting video transcription')) {
          transcriptionStartTime = Date.now();
          ProgressTracker.updateProgress(sessionId, 35, 'Starting transcription');
          
          transcriptionInterval = setInterval(() => {
            const elapsedTime = Date.now() - transcriptionStartTime;
            const transcriptionProgress = Math.min(100, (elapsedTime / estimatedTranscriptionTime) * 100);
            const scaledProgress = Math.round(35 + (transcriptionProgress * 0.2));
            ProgressTracker.updateProgress(
              sessionId,
              scaledProgress,
              'Transcribing audio'
            );
          }, 500);
        }
        else if (output.includes('Transcription completed')) {
          if (transcriptionInterval) {
            clearInterval(transcriptionInterval);
          }
          transcriptionStartTime = 0;
          ProgressTracker.updateProgress(sessionId, 55, 'Transcription completed');
        }
        else if (output.includes('Creating final video')) {
          finalProcessingStartTime = Date.now();
          ProgressTracker.updateProgress(sessionId, 60, 'Creating final video');
          
          if (!finalVideoInterval) {
            finalVideoInterval = setInterval(() => {
              const elapsedTime = Date.now() - finalProcessingStartTime;
              const finalProgress = Math.min(100, (elapsedTime / estimatedFinalProcessingTime) * 100);
              const scaledProgress = Math.round(60 + (finalProgress * 0.3));
              
              if (scaledProgress < 90) {
                ProgressTracker.updateProgress(
                  sessionId,
                  scaledProgress,
                  'Creating final video'
                );
              }
            }, 1000);
          }
        }
        else if (output.includes('Video created successfully')) {
          if (finalVideoInterval) {
            clearInterval(finalVideoInterval);
            finalVideoInterval = null;
          }
          ProgressTracker.updateProgress(sessionId, 98, 'Video creation completed');
        }
      });

      // Handle process completion
      subprocess.on('close', async (code) => {
        // Clear all intervals
        if (transcriptionInterval) {
          clearInterval(transcriptionInterval);
        }
        if (finalVideoInterval) {
          clearInterval(finalVideoInterval);
        }

        if (code === 0) {
          const currentProgress = ProgressTracker.getProgress(sessionId);
          if (currentProgress && currentProgress.progress >= 95) {
            ProgressTracker.updateProgress(sessionId, 100, 'Process completed successfully');
          }
          await ensureCleanup(sessionId);
          resolve();
        } else {
          const errorMatch = errorOutput.match(/Error: (.*?)(\n|$)/);
          const errorMessage = errorMatch 
            ? errorMatch[1] 
            : `Process exited with code ${code}`;

          await ensureCleanup(sessionId);
          const error = new Error(errorMessage);
          ProgressTracker.updateProgress(sessionId, 100, `Error: ${errorMessage}`);
          reject(error);
        }
      });

      // Handle process errors
      subprocess.on('error', async (error) => {
        if (transcriptionInterval) {
          clearInterval(transcriptionInterval);
        }
        if (finalVideoInterval) {
          clearInterval(finalVideoInterval);
        }

        console.error('Process error:', error);
        await ensureCleanup(sessionId);
        ProgressTracker.updateProgress(sessionId, 100, `Error: ${error.message}`);
        reject(error);
      });

    } catch (error) {
      console.error('Error in processSubtitles:', error);
      await ensureCleanup(sessionId);
      ProgressTracker.updateProgress(sessionId, 100, `Error: ${error.message}`);
      reject(error);
    }
  });
}

export async function cleanupSession(sessionId) {
  try {
    await ensureCleanup(sessionId);
    await FileHandler.cleanup(sessionId);
    ProgressTracker.progressMap.delete(sessionId);
  } catch (error) {
    console.error(`Error cleaning up session ${sessionId}:`, error);
  }
}
