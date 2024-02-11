// pages/index.js

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [shortcode, setShortcode] = useState('');

  useEffect(() => {
    if (shortcode) {
      fetchData();
    }
  }, [shortcode]);




  
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/p/${shortcode}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Regular expression to extract the shortcode from the Instagram URL
    const regex = /(?:\/p\/)([A-Za-z0-9-_]+)/;
    const match = url.match(regex);
    if (match) {
      setShortcode(match[1]);
    } else {
      setShortcode('Shortcode not found');
    }
  };

  return (
    <div>
      <h1>Extract Shortcode from Instagram URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Instagram URL"
        />
        <button type="submit">Submit</button>
      </form>
      {shortcode && (
        <div>
          <h2>Shortcode:</h2>
          <p>{shortcode}</p>
          
        </div>
      )}
      




      {data ? (
              <div > 
                
                {data.multiple ? (
                  
                  <ul>
        {data.media.map((item, index) => (
  <div key={index}>
    <p>ID: {item.node.id}</p> 
    {item.node.__typename === "XDTGraphVideo" ? (
      <div>
        <a href={item.node.video_url} >Download Video</a>
        {item.node.accessibility_caption}
      </div>
    ) : (
      <div>
                <img width={500} height={500} src={item.node.display_url} />
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














    </div>
  );
}
