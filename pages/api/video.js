// pages/api/videoInfo.js
import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { videoId } = req.query;

  try {
    // Get video info from YouTube
    const info = await ytdl.getInfo(videoId);
    // Return video info as JSON
    res.status(200).json(info.player_response.videoDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching video information.' });
  }
}
