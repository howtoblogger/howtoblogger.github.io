import { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Create a new storage instance with the service account key file
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Define a function to handle file upload
async function handleFileUpload(req, res) {
  try {
    // Extract the postid parameter from the request
    const { postid, ptype } = req.query;
    if (!postid || !ptype) {
      throw new Error('Postid and ptype are required.');
    }

    // Validate currentDomain or ensure it comes from a trusted source
    const currentDomain = req.headers.host;
    if (!currentDomain) {
      throw new Error('Host header is missing.');
    }

    // Define the API URL from which to download the file
    const downloadUrl = `http://${currentDomain}/api/${ptype}/download/${postid}`; // Replace with your actual API endpoint

    // Fetch the file data from the API URL
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file. Status: ${response.status}`);
    }

    // Extract the original filename and extension from the Content-Disposition header
    const contentDisposition = response.headers.get('content-disposition');
    const originalFilename = contentDisposition ? contentDisposition.match(/filename="(.+)"/)[1] : `file_${postid}`;
    const extension = path.extname(originalFilename);

    // Read the file data as a buffer
    const fileBuffer = await response.buffer();

    // Reference the bucket
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    // Define the filename for the uploaded file
    const fileName = `file_${postid}${extension}`;

    // Upload the file to the bucket
    const file = bucket.file(fileName);
    await file.save(fileBuffer);

    // Generate a public URL for the uploaded file
    const publicUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${fileName}`;

    res.status(200).json({ publicUrl });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

// Define your Next.js API route handler
export default handleFileUpload;
