import Link from 'next/link'

export default function DownloaderList() {
    return (
      <>
      
<div className='containter md:m-5'>
<div className='my-0  md:grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2 justify-center'>
  
<div class="card md:w-md bg-base-100 border shadow-xl">
  <div class="card-body">
    <h3 class="card-title">Reels</h3>
    <p>Save Instagram Reels videos quickly and easily with our efficient downloader tool.</p>
    <div class="card-actions justify-center">
    <Link className='btn btn-block btn-primary' href="/reels">
            <svg aria-label="Reels" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
       Download Reels 
       </Link>
    </div>
  </div>
</div>
<div class="card md:w-md bg-base-100 border shadow-xl">
  <div class="card-body">
    
    <h3 class="card-title">Photo</h3>
    <p>Save Instagram Photos quickly and easily with our efficient downloader tool.</p>
    <div class="card-actions justify-center">
    <Link className='btn btn-block btn-primary' href="/photo">
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
       Download Photos  </Link>
    </div>
  </div>
</div>
<div class="card md:w-md bg-base-100 border shadow-xl">
  <div class="card-body">
    
    <h3 class="card-title">Video</h3>
    <p>Save Instagram Videos quickly and easily with our efficient downloader tool.</p>
    <div class="card-actions justify-center">
    <Link className='btn btn-block btn-primary' href="/video">
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
       Download Photos  </Link>
    </div>
  </div>
</div>

</div>
</div>

</>
  )
}