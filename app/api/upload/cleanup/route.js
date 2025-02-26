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

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
    } catch (error) {
      if (error.code === 'ENOENT') {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }
      console.error('File deletion error:', error);
      return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error during cleanup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
