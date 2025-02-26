import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Serve files from the tmp directory
  if (pathname.startsWith('/tmp/')) {
    const fileName = pathname.split('/tmp/')[1];
    const filePath = path.join(process.cwd(), 'tmp', fileName);
    
    if (fs.existsSync(filePath)) {
      return NextResponse.next();
    }
    return new NextResponse('File not found', { status: 404 });
  }

  return NextResponse.next();
}