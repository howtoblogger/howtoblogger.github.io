// pages/index.js

import Layout from './components/Layout';
import Link from 'next/link'
import DownloaderList from './components/DownloaderList';

export default function Index() {
  const title = 'IG Downloader';
  const description = 'Welcome to IG Downloader, your ultimate destination for seamlessly downloading reels, photos, videos, and stories from your favorite social media platforms! Elevate your online presence and captivate your audience with engaging content downloaded effortlessly through our user-friendly platform.'
  return (
    <Layout>
      
      <div class="hero min-h-10 bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-screen">
      <p class="py-6 text-lg">
      {description}
      </p>    </div>
  </div>
</div>
     
<DownloaderList/>

    </Layout>
  );
}
