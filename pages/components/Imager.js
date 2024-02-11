import React, { useState } from 'react';

const ImageDownloader = ({ imageUrl }) => {
  const [localImageUrl, setLocalImageUrl] = useState(null);

  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const localUrl = URL.createObjectURL(blob);
      setLocalImageUrl(localUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div>
      <button onClick={downloadImage}>Download Image</button>
      {localImageUrl && <a href={localImageUrl} title="Downloaded Image">imAGE</a>}
    </div>
  );
};

export default ImageDownloader;
