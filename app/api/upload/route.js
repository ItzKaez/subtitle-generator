import { NextResponse } from 'next/server';
import { processUpload } from './worker';
import { FileHandler, ProgressTracker } from '@/app/utils/fileHandler';

// POST handler for file uploads
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const sessionId = formData.get('sessionId');
    const subtitleOptions = {
      font: formData.get('subtitleFont') || 'Arial',
      color: formData.get('subtitleColor') || 'white',
      size: formData.get('subtitleSize') || 'medium'
    };

    // Validate request
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    try {
      FileHandler.validateFile(file);
    } catch (validationError) {
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    // Initialize progress tracking
    ProgressTracker.updateProgress(sessionId, 0, 'Starting upload');

    // Process the file in the background
    processUpload(file, sessionId, subtitleOptions).catch(error => {
      console.error('Background processing error:', error);
      ProgressTracker.updateProgress(sessionId, 100, `Error: ${error.message}`);
    });

    return NextResponse.json({
      message: 'File upload started',
      sessionId
    }, { status: 200 });

  } catch (error) {
    console.error('Error in upload route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET handler for progress updates
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get progress directly from ProgressTracker
    const progress = ProgressTracker.getProgress(sessionId);
    
    if (!progress) {
      return NextResponse.json({
        progress: 0,
        status: 'Initializing'
      });
    }

    // If processing is complete, check for the video file
    if (progress.progress === 100 && progress.status === 'Complete') {
      const videoExists = await FileHandler.checkProcessedVideo(sessionId);
      if (!videoExists) {
        return NextResponse.json({
          progress: 100,
          status: 'Error: Video file not found'
        });
      }

      const fileSize = await FileHandler.getProcessedVideoSize(sessionId);
      return NextResponse.json({
        ...progress,
        fileSize,
        downloadUrl: `/tmp/${sessionId}/video_with_subtitles.mp4`
      });
    }

    return NextResponse.json(progress);

  } catch (error) {
    console.error('Error checking progress:', error);
    return NextResponse.json(
      { error: 'Failed to check progress' },
      { status: 500 }
    );
  }
}

// DELETE handler for cleanup
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    await FileHandler.cleanup(sessionId);
    ProgressTracker.progressMap.delete(sessionId);

    return NextResponse.json({
      message: 'Session cleaned up successfully'
    });

  } catch (error) {
    console.error('Error cleaning up session:', error);
    return NextResponse.json(
      { error: 'Failed to clean up session' },
      { status: 500 }
    );
  }
}
