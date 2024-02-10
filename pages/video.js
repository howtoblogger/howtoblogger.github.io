// pages/index.js

import Layout from './components/Layout';
import DownloaderList from './components/DownloaderList';

export default function Video() {

const title = 'Instagram Video Download';
const description = 'Save Instagram Videos quickly and easily with our efficient downloader tool.'
 
return (
    
    <Layout title={title} description={description}>



<div className="hero  bg-base-200">
  <div className="hero-content text-center">
    <div className="w-full">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="py-6">{description}</p>
      <form className=''> 
<input type="url" required autoFocus placeholder="Type here" class="input input-lg lg:w-150 input-bordered w-full" />
<button type='submit' className='mt-2 btn btn-lg btn-wide btn-primary'>Download</button>
</form>
    </div>
  </div>
</div>


<DownloaderList/>

    </Layout>
  );
}
