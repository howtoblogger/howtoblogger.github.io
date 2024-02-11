import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import DownloaderList from './components/DownloaderList';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');
  const [pastedText, setPastedText] = useState('');

  const ClipboardBtn = () => {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      setError('Longpress and paste URL');
      return;
    }
    navigator.clipboard.readText().then((text) => {
      setPastedText(text);
      const matches = url.match(/(?:\/(?:p|reel|[\w-]+)\/)([A-Za-z0-9-_]+)/);
      if (matches && matches.length > 1) {
        setShortcode(matches[1]);
        setError('');
      } else {
        setError('');
      }
    }).catch((error) => {
      console.error('Failed to read clipboard contents: ', error);
    });
  };
  
  const title = 'Instagram Photo Download';
  const description = 'Save Instagram Photos quickly and easily with our efficient downloader tool.';

  useEffect(() => {
    if (shortcode) {
      fetchData();
    }
  }, [shortcode]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/${shortcode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from server');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(''); // Reset error if fetch is successful
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const regex = /(?:\/(?:p|reel|[\w-]+)\/)([A-Za-z0-9-_]+)/;
    const match = pastedText.match(regex);
    if (match) {
      setShortcode(match[1]);
    } else {
      setShortcode('');
      setError('Shortcode not found');
    }
  };

  return (
    <Layout title={title} description={description}>
      {error && 
      <p className="error-message">
        <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>{error}</span>
</div>
        
      </p>}
      <Hero title={title} description={description} >
      <div className="relative">
      <form onSubmit={handleSubmit}>
         <input
  className=" input input-lg w-full input-bordered"
  type="text"
  value={pastedText}
  onFocus={ClipboardBtn}
  onChange={(e) => {
    setUrl(e.target.value);
  }}
  placeholder="Enter Instagram URL"
/>

          <button className='mt-4 btn btn-primary btn-lg btn-wide' type="submit">Download</button>
        </form>
        </div>
        </Hero>
        

      {data ? (
       
        
        
       <div > 
         {data.photo_url}
         <a href={`${data.photo_url}&dl=1`}>Download File Server 1</a>
         <img src={`/api/img?save=${encodeURIComponent(data.author.profile_pic_url)}`} width={500} height={500} />

         <a href={`/api/img?save=${encodeURIComponent(data.photo_url)}&filename=${data.author.username}`}>Download File</a>
         <img src={`/api/img?save=${encodeURIComponent(data.photo_url)}`} width={500} height={500} />
         {data.multiple ? (
           
           <ul>
 {data.media.map((item, index) => (
<div key={index}>
<p>ID: {item.node.id}</p> 
{item.node.__typename === "XDTGraphVideo" ? (
<div>
 <video width="320" height="240" controls>
<source src={item.node.video_url} type="video/mp4"/>
</video>
<a href={`${item.node.video_url}&dl=1`}>Download Video</a>
 {item.node.accessibility_caption}
</div>
) : (
<div>


 <a href={item.node.display_url} >Download Image</a>
 {item.node.accessibility_caption}
</div>
)}
<p>Shortcode: {item.node.shortcode}</p>
</div>
))}

         </ul>




         ) : (
           null
         )}

         <a className='text-white bg-gradient-to-r from-pink-500 to-purple-500 btn  btn-block' href={`instagram://media?id=${data.shortid}`}>
           Go back to Instagram Post
         </a>
       </div>
     ) : null}
      <DownloaderList />
      <div>
        <h1>Extract Shortcode from Instagram URL</h1>
        
        <progress className="progress w-56" value="50" max="100"></progress>

        {shortcode && (
          <div>
            <h2>Shortcode:</h2>
            <p>{shortcode}</p>
          </div>
        )}

        

        {/* Remaining JSX code */}
      </div>
    </Layout>
  );
}
