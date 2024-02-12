import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import DownloaderList from './components/DownloaderList';
import NumberFormatter from './components/Numb';
import { useRouter } from 'next/router';

export default function Home (req, res) {
  const router = useRouter();
  const [igurl, setIgurl] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  
  const title = 'Instagram Photo Download';
  const description = 'Save Instagram Photos quickly and easily with our efficient downloader tool.';

 

  useEffect(() => {
    const { igurl } = router.query;
    if (igurl) {
      setIgurl(igurl);
      const regex = /(?:\/(?:p|reel|[\w-]+)\/)([A-Za-z0-9-_]+)/;
      const match = igurl.match(regex);
      if (match) {
        setShortcode(match[1]);
      } else {
        setShortcode('');
        setIgurl('');
        setError('Post Not Found or Enter URL correctly');
      }
    }
    if (shortcode) {
      fetchData();
    }
   
  }, [shortcode,router.query]);

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
    const match = url.match(regex);
    if (match) {
      setShortcode(match[1]);
    } else {
      setShortcode('');
      setError('Shortcode not found');
    }
  };
  const handlePasteFromClipboard = () => {
    navigator.clipboard.readText().then((text) => {
      setUrl(text);
    }).catch((error) => {
      console.error('Failed to read clipboard contents: ', error);
    });
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


      {data ? (
<div>
  {igurl & (
    <div>
<Hero title={title} description={description} >
      <div className="relative">
      <form onSubmit={handleSubmit}>
      <div class="join">
  <input
  className=" input input-lg w-full join-item input-bordered"
  type="text"
  value={url}
  onChange={(e) => {
    setUrl(e.target.value);
  }}
  placeholder="Enter Instagram URL"
/>
  <button onClick={handlePasteFromClipboard} class="btn bg-none btn-lg join-item">
    <svg stroke="currentColor" className='w-7' fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></svg>
  </button>
  <button type="submit" class="bg-primary btn btn-lg join-item">
  <svg stroke="currentColor" className='text-white w-7' fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z"></path></svg>  </button>
</div>
      
        </form>

        </div>
        </Hero>
    </div>
  )}

<div class="card w-full bg-base-100 ">
  <div class="card-body  justify-center">
   <div class="avatar justify-center">
  <div class="w-24 rounded-full">
    <img src={`/api/img?save=${encodeURIComponent(data.author.profile_pic_url)}`} />
  </div>
</div>
  <div class="flex justify-center">
    <span class="pr-2 text-center">@{data.author.username}</span>
<svg aria-label="Verified" class="w-4" fill="rgb(0, 149, 246)"  role="img" viewBox="0 0 40 40" ><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>


</div>
<ul class="menu flex justify-center menu-horizontal">
  <li><a>Followers: <NumberFormatter number={data.author.edge_followed_by.count}/></a> </li>
  <li><a>Comments: <NumberFormatter number={data.comments}/></a></li>
  <li><a>Likes: <NumberFormatter number={data.responseData.data.xdt_shortcode_media.edge_media_preview_like.count} />  </a></li>
</ul>
  </div>
</div>
  </div>

):(
  <Hero title={title} description={description} >
  
      <div class="join w-full">
  <input
  className="input input-lg w-full join-item input-bordered"
  type="text"
  value={url}
  onChange={(e) => {
    setUrl(e.target.value);
  }}
  placeholder="Enter Instagram URL"
/>
  <button onClick={handlePasteFromClipboard} class="btn bg-none btn-lg join-item">
    <svg stroke="currentColor" className='w-7' fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></svg>
  </button>
  <button onClick={handleSubmit} class="bg-primary btn btn-lg join-item">
  <svg stroke="currentColor" className='text-white w-7' fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z"></path></svg>  </button>
</div>
      
        </Hero>
)}









      

{data && (
<div className='flex flex-wrap overflow-hidden justify-center'>




{data.multiple ? (


<>
{data.media.map((item, index) => (
 <div className="w-1/2 px-1 my-1 sm:w-1/2 sm:px-1 sm:my-1 md:w-1/3 md:px-1 md:my-1 lg:w-1/4 lg:px-1 lg:my-1 xl:w-1/4 xl:px-1 xl:my-1">

<div key={index} class="card card-compact w-full bg-base-100 shadow-xl">
  
{item.node.__typename === "XDTGraphVideo" ? (
<div>
<figure>
  
    <img className='object-contain  w-72 h-40' src={`/api/img?save=${encodeURIComponent(item.node.display_url)}`} alt={item.node.accessibility_caption} />
    </figure>
    <div class="card-body">
<div class="card-actions justify-center">
<div class="badge badge-secondary">Video</div>

      <a href={`${item.node.video_url}&dl=1`} target="_blank" class="btn btn-block btn-primary">Download Video</a>
    </div>
    </div>
</div>
) : (
<div>
<figure>
    <img className='object-contain  w-72 h-40' src={`/api/img?save=${encodeURIComponent(item.node.display_url)}`} alt={item.node.accessibility_caption} />
    </figure>
    <div class="card-body">
<div class="card-actions justify-center">
<div class="badge badge-accent">Photo</div>

      <a href={`${item.node.display_url}&dl=1`} target="_blank" class="btn btn-block btn-primary">Download Photo</a>
    </div>
    </div>
</div>

)}
</div>
</div>
))}

        </>
        ): data.is_video === false ? (


          
<div className='flex flex-wrap overflow-hidden justify-center'>
 <div className="">
<div class="card card-compact w-lg bg-base-100 shadow-xl">
  <figure><img className='object-contain  w-full h-40' src={`/api/img?save=${encodeURIComponent(data.photo_url)}`} alt={data.caption} /></figure>
  <div class="card-body">
    <div class="card-actions justify-center">
    <div class="badge badge-secondary">Photo</div>

    <a href={`${data.photo_url}&dl=1`} target="_blank" class="btn btn-block btn-primary">Download Photo</a>
    </div>
  </div>
</div>
 </div>
 </div>
        ) : 
        <div className='flex flex-wrap overflow-hidden justify-center'>
 <div className="">
<div class="card card-compact w-lg bg-base-100 shadow-xl">
  
  <figure><img className='object-contain  w-full h-40' src={`/api/img?save=${encodeURIComponent(data.photo_url)}`} alt={data.caption} /></figure>
  
  <div class="card-body">
    <div class="card-actions justify-center">
    <div class="badge badge-secondary">Video</div>

    <a href={`${data.video_url}&dl=1`} target="_blank" class="btn btn-block btn-primary">Download Video</a>
    </div>
  </div>
</div>
 </div>
 </div>

        }
</div>
)}

        


        


    
      
    
    </Layout>
  );
}
