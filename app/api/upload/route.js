import { NextResponse } from 'next/server';
import { processUpload } from './worker';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const sessionId = formData.get('sessionId'); // Extract session ID from form data or generate a new one

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Process the file in the background
    processUpload(file, sessionId);

    return NextResponse.json({ message: 'File upload started' }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
