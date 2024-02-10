import { useState } from 'react';

const DownloadFile = () => {
  const [fileUrl, setFileUrl] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const disposition = response.headers.get('content-disposition');
      let fileName = 'downloaded_file';
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          fileName = matches[1].replace(/['"]/g, '');
        }
      }
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter file URL"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadFile;
