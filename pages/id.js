import { useState } from 'react';

const ImageDownloader = () => {
  const [imageData, setImageData] = useState(null);

  const downloadImage = async () => {
    try {
      const imageUrl = 'URL_OF_YOUR_IMAGE';
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      setImageData(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div>
      <button onClick={downloadImage}>Download Image</button>
      {imageData && <img src={imageData} alt="Downloaded Image" />}
    </div>
  );
};

export default ImageDownloader;
