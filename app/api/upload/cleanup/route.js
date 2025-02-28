import { NextResponse } from 'next/server';
import { FileHandler, ProgressTracker } from '@/app/utils/fileHandler';
import fs from 'fs/promises';
import path from 'path';

/**
 * Clean up old sessions and temporary files
 * @param {number} maxAgeHours Maximum age of files to keep (in hours)
 * @returns {Promise<{deletedSessions: number}>}
 */
async function cleanupOldSessions(maxAgeHours = 24) {
  const tmpDir = path.join(process.cwd(), 'public', 'tmp');
  let deletedSessions = 0;

  try {
    // Get all session directories
    const sessions = await fs.readdir(tmpDir);
    const now = Date.now();
    const maxAge = maxAgeHours * 60 * 60 * 1000; // Convert hours to milliseconds

    // Process each session directory
    for (const sessionId of sessions) {
      try {
        const sessionPath = path.join(tmpDir, sessionId);
        const stats = await fs.stat(sessionPath);

        // Check if directory is older than maxAge
        if (now - stats.mtime.getTime() > maxAge) {
          await FileHandler.cleanup(sessionId);
          ProgressTracker.progressMap.delete(sessionId);
          deletedSessions++;
        }
      } catch (error) {
        console.error(`Error processing session ${sessionId}:`, error);
      }
    }

    return { deletedSessions };
  } catch (error) {
    console.error('Error during cleanup:', error);
    throw error;
  }
}

export async function POST(req) {
  try {
    // Optional: Accept custom maxAge from request
    const { maxAgeHours } = await req.json().catch(() => ({}));
    
    const result = await cleanupOldSessions(maxAgeHours || 24);

    return NextResponse.json({
      message: 'Cleanup completed successfully',
      ...result
    });
  } catch (error) {
    console.error('Error in cleanup route:', error);
    return NextResponse.json(
      { error: 'Failed to clean up old sessions' },
      { status: 500 }
    );
  }
}

// GET endpoint to check storage status
export async function GET() {
  try {
    const tmpDir = path.join(process.cwd(), 'public', 'tmp');
    let totalSize = 0;
    let sessionCount = 0;
    let oldestSession = Date.now();

    try {
      const sessions = await fs.readdir(tmpDir);
      
      for (const sessionId of sessions) {
        const sessionPath = path.join(tmpDir, sessionId);
        const stats = await fs.stat(sessionPath);
        
        if (stats.isDirectory()) {
          sessionCount++;
          totalSize += await calculateDirectorySize(sessionPath);
          oldestSession = Math.min(oldestSession, stats.mtime.getTime());
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      // If tmp directory doesn't exist, return zeros
    }

    return NextResponse.json({
      status: 'success',
      data: {
        totalSessions: sessionCount,
        totalSizeBytes: totalSize,
        totalSizeMB: Math.round(totalSize / (1024 * 1024) * 100) / 100,
        oldestSession: oldestSession === Date.now() ? null : new Date(oldestSession).toISOString()
      }
    });
  } catch (error) {
    console.error('Error checking storage status:', error);
    return NextResponse.json(
      { error: 'Failed to check storage status' },
      { status: 500 }
    );
  }
}

/**
 * Calculate the total size of a directory recursively
 * @param {string} dirPath Directory path
 * @returns {Promise<number>} Total size in bytes
 */
async function calculateDirectorySize(dirPath) {
  let totalSize = 0;

  try {
    const files = await fs.readdir(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isDirectory()) {
        totalSize += await calculateDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    }
  } catch (error) {
    console.error(`Error calculating size for ${dirPath}:`, error);
  }

  return totalSize;
}
