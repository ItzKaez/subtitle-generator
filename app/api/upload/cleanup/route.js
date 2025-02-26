import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionId = body.sessionId;
    const filePath = path.join('public','tmp', sessionId);

    
    if (!filePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    // Verify the file exists before attempting to delete
    if (typeof filePath !== 'string') {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Add retry logic for file deletion
    const maxRetries = 3;
    const retryDelay = 20000; // 10 seconds between attempts

    // Initial delay to ensure file handles are released
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Initial delay to ensure file handles are released
    await new Promise(resolve => setTimeout(resolve, 2000));

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await fs.access(filePath);
        await fs.rm(filePath, { recursive: true, force: true });
        return NextResponse.json({ message: 'Directory deleted successfully' }, { status: 200 });
      } catch (error) {
        if (error.code === 'ENOENT') {
          return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
        }
        
        console.error(`Directory deletion attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          return NextResponse.json({ 
            error: 'Failed to delete directory after multiple attempts',
            details: error.message
          }, { status: 500 });
        }
        
        // Increase delay for each retry
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }

  } catch (error) {
    console.error('Error during cleanup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
