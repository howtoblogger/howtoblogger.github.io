import React from 'react';

const DownloadButton = ({ photoUrl }) => {
  const handleDownload = () => {
    window.open(photoUrl, '_blank');
  };

  return (
    <button className='btn btn-outline btn-wide' onClick={handleDownload}>
      Download Original Image
    </button>
  );
};

export default DownloadButton;
