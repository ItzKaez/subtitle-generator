import { NextResponse } from 'next/server';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';
import { promises as fsp } from 'fs';

export async function POST(req) {
  try {
    const { videoPath, sessionId } = await req.json();


    console.log("subtitles session_id", sessionId)

    
    if (!videoPath) {
      return NextResponse.json({ error: 'Video path is required' }, { status: 400 });
    }


    // Process video with subtitles
    const command = `python ${path.join(process.cwd(), 'scripts/subtitle_generator/main.py')} put_subtitles "${videoPath}" "${sessionId}"`;

    
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
        
        const outputPath = path.join('public',"tmp",sessionId, "video_with_subtitles.mp4"); // Ensure this path is correct

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
