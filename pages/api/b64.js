// pages/api/image.js

import axios from 'axios';

export default async function handler(req, res) {
  const { imageUrl } = req.query;

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data, 'binary').toString('base64');
    const base64Image = `data:${response.headers['content-type']};base64,${imageData}`;
    res.status(200).json({ base64Image });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Error fetching image' });
  }
}
