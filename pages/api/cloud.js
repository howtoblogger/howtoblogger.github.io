import { Storage } from '@google-cloud/storage';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new storage instance with the service account key file
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Define your Next.js API route handler
export default async function handler(req, res) {
  try {
    // Reference the bucket
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    // List files in the bucket
    const [files] = await bucket.getFiles();

    // Generate signed URLs for each file
    const fileUrls = await Promise.all(files.map(async file => {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
      });
      return { name: file.name, url };
    }));

    // Output the list of files with their public URLs
    res.status(200).json({ files: fileUrls });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
