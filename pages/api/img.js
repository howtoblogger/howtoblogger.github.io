import axios from 'axios';

export default async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    if (response.status !== 200) {
      return res.status(response.status).json({ error: 'Failed to fetch image' });
    }

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const dataUrl = `data:${response.headers['content-type']};base64,${base64Image}`;

    // Here you can save `dataUrl` to your database or use it however you need
    // For demonstration, we'll just return it in the response
    return res.status(200).json({ dataUrl });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
