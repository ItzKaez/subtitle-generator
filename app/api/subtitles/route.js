import { NextResponse } from 'next/server';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';
import { promises as fsp } from 'fs';

export async function POST(req) {
  try {
    const { videoPath, sessionId, subtitleOptions } = await req.json();

    console.log("subtitles session_id", sessionId);
    console.log("subtitle options", subtitleOptions);

    if (!videoPath) {
      return NextResponse.json({ error: 'Video path is required' }, { status: 400 });
    }

    // Build command with style options
    let command = `python ${path.join(process.cwd(), 'scripts/subtitle_generator/main.py')} `;
    
    // Add required arguments
    command += `--model_path base `; // Using base model as default
    command += `--video_path "${videoPath}" `;
    command += `--output_path "${path.join('public', 'tmp', sessionId, 'video_with_subtitles.mp4')}" `;
    
    // Add session ID if provided
    if (sessionId) {
      command += `--session_id "${sessionId}" `;
    }

    // Add style options if provided
    if (subtitleOptions) {
      // Add style preset
      if (subtitleOptions.stylePreset) {
        command += `--style_preset "${subtitleOptions.stylePreset}" `;
      }

      // Add custom overrides if provided
      // Map UI size options to actual font sizes
      const fontSizeMap = {
        'small': '60',
        'medium-small': '75',
        'medium': '80',
        'medium-large': '85',
        'large': '90',
        'x-large': '100'
      };

      // Map UI color names to RGB values
      const colorMap = {
        'white': '255,255,255',
        'gold': '255,215,0',
        'coral': '255,160,122',
        'yellow': '255,255,0',
        'green': '0,255,0',
        'cyan': '0,255,255',
        'pink': '255,192,203'
      };

      // Add font size if custom size is selected
      if (subtitleOptions.size && fontSizeMap[subtitleOptions.size]) {
        command += `--font_size ${fontSizeMap[subtitleOptions.size]} `;
      }

      // Add text color if custom color is selected
      if (subtitleOptions.color && colorMap[subtitleOptions.color]) {
        command += `--text_color "${colorMap[subtitleOptions.color]}" `;
      }

      // Add custom font if selected (assuming fonts are in the src directory)
      if (subtitleOptions.font) {
        const fontPath = path.join(process.cwd(), 'src', `${subtitleOptions.font.toLowerCase()}.ttf`);
        if (fs.existsSync(fontPath)) {
          command += `--font_path "${fontPath}" `;
        }
      }
    }

    return new Promise((resolve, reject) => {
      console.log('Executing command:', command);
      
      const process = exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Error processing subtitles:', stderr);
          console.error('Command output:', stdout);
          return reject(NextResponse.json(
            { error: 'Failed to process subtitles', details: stderr }, 
            { status: 500 }
          ));
        }

        console.log('Subtitle processing output:', stdout);
        
        const outputPath = path.join('public', 'tmp', sessionId, 'video_with_subtitles.mp4');

        if (!fs.existsSync(outputPath)) {
          console.error('Output file not found:', outputPath);
          return reject(NextResponse.json(
            { error: 'Processed video file not found' },
            { status: 500 }
          ));
        }

        resolve(NextResponse.json(
          { message: 'Subtitles processed successfully', outputPath },
          { status: 200 }
        ));
      });

      // Handle process exit
      process.on('exit', (code) => {
        if (code !== 0) {
          console.error('Subtitle processing failed with code:', code);
          console.error('Process stderr:', process.stderr);
          reject(NextResponse.json(
            { error: 'Subtitle processing failed', code },
            { status: 500 }
          ));
        }
      });
    });

  } catch (error) {
    console.error('Error in subtitle processing:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
