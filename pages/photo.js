// pages/index.js

import Layout from './components/Layout';
import DownloaderList from './components/DownloaderList';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import DownloadButton from './download';
import Link from 'next/link'

export default function Photo() {
  const [data, setData] = useState(null);
  const [photoId, setPhotoId] = useState('');
  const [error, setError] = useState('');
  const [pastedText, setPastedText] = useState('');

  const imagei = data && data.photo_url;
  const videoi = data && data.video_url;

  const ClipboardBtn = () => {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      setError('Longpress and paste URL');
      return;
    }
    navigator.clipboard.readText().then((text) => {
      setPastedText(text);
      document.getElementById('instaurl').value = text; // Set the value of the input
      const clipurl = document.getElementById('instaurl').value;
      const matches = url.match(/instagram\.com\/(reel|p|[\w-]+)\/([^/]+)/);
      if (matches && matches.length > 1) {
        setPhotoId(matches[1]);
        setError('');
      } else {
        setError('Invalid Instagram URL.');
      }
    }).catch((error) => {
      console.error('Failed to read clipboard contents: ', error);
    });
  };

  useEffect(() => {
    if (photoId) {
      fetchData();
    }
  }, [photoId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/${photoId}`);
      const jsonData = await response.json();
      setData(jsonData);
      document.getElementById('my_modal_1').showModal();
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Extract photoId from the entered URL
    const url = document.getElementById('instaurl').value;

    const matches = url.match(/instagram\.com\/(reel|p|[\w-]+)\/([^/]+)/);
    if (matches && matches.length > 1) {
      setPhotoId(matches[1]);
      setError('');
    } else {
      setError('Invalid Instagram URL.');
    }
  };

  const title = 'Instagram Photo Download';
  const description = 'Save Instagram Photos quickly and easily with our efficient downloader tool.';

  return (
    <Layout title={title} description={description}>
      <Head>
        <meta name="description" content={description} />
      </Head>
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form className='text-center' method="dialog">
            <Link href="/" className="mb-4 btn text-lg btn-sm btn-circle btn-ghost right-2 top-2">✕</Link>
          </form>
          <div className='text-center'>
            {data ? (
              <div className='grid gap-2'> 
                <a className='btn btn-outline btn-block' href={imagei}>
                  Direct Photo URL
                </a>
                <a className='btn btn-outline btn-block' href={videoi}>
                  Direct Video URL
                </a>
                <a className='btn btn-outline btn-block' href={`/api/photo/download/${data.shortid}`}>
                  Download Photo to Gallery
                </a>
                {data.is_video ? (
                  <a className='btn btn-outline btn-block' href={`/api/video/download/${data.shortid}`}>
                    Download Video to Gallery
                  </a>
                ) : (
                  null
                )}

                <a className='text-white bg-gradient-to-r from-pink-500 to-purple-500 btn  btn-block' href={`instagram://media?id=${data.shortid}`}>
                  Go back to Instagram Post
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </dialog>
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="w-full">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="py-6">{description}</p>

            
              
              <div className="relative">
                <input onFocus={ClipboardBtn} type="text" id="instaurl" autoFocus placeholder="https://www.instagram.com/p/xxxxxx" name="url" className="input input-lg w-full input-bordered" />
              </div>
              <button onClick={handleFormSubmit} className="mt-2 btn btn-lg btn-wide btn-primary">Download</button>
            
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
      <DownloaderList />
    </Layout>
  );
}
