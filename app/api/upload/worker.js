import { promises as fs } from 'fs';
import path from 'path';
import { io } from 'socket.io-client';

export async function processUpload(file, sessionId) {
  const uploadDir = path.join(process.cwd(), 'public/tmp', sessionId); // Modifié ici
  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, "video_without_subtitles.mp4");

  console.log("worker session_id", sessionId)
  
  // Create WebSocket connection
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_BASE_URL 
    : 'http://localhost:3000';
  const socket = io(baseUrl);

  try {
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Convert the file to a Buffer and save it to the upload directory
    const buffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));
    socket.emit('progress', { sessionId, progress: 25, message: 'File uploaded' });


    // Process subtitles
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800000); // 30 minute timeout

    socket.emit('progress', { sessionId, progress: 50, message: 'Starting subtitle processing' });

    const response = await fetch(`${baseUrl}/api/subtitles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Id': sessionId
      },

      body: JSON.stringify({ videoPath: filePath , sessionId: sessionId}),
      signal: controller.signal
    });
    console.log('Subtitle processing request completed');

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error('Failed to process subtitles');
    }

    const { outputPath } = await response.json();
    socket.emit('progress', { sessionId, progress: 100, message: 'Processing complete' });
    return { outputPath, sessionId };

  } catch (error) {
    console.error('Error processing file:', error);
    socket.emit('error', { sessionId, error: error.message });
    throw error;
  } finally {
    socket.close();
  }
}
