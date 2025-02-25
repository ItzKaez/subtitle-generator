import { promises as fs } from 'fs';
import path from 'path';

export function processUpload(file) {
  const uploadDir = path.join(process.cwd(), 'uploads');
  const filePath = path.join(uploadDir, file.name);

  // Ensure the upload directory exists
  fs.mkdir(uploadDir, { recursive: true })
    .then(() => {
      // Convert the file to a Buffer and save it to the upload directory
      return file.arrayBuffer().then((buffer) => {
        return fs.writeFile(filePath, Buffer.from(buffer));
      });
    })
    .then(() => {
      console.log(`File saved: ${filePath}`);
    })
    .catch((error) => {
      console.error('Error saving file:', error);
    });
}
