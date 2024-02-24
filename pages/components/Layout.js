import Header from './Header'
import Footer from './Footer'
import Head from 'next/head';
import '../../styles/main.css'
import NextNProgress from 'nextjs-progressbar';
import DownloaderList from './DownloaderList';

export default function Layout({ children,title,description }) {
  return (
    
    <>
       <Head>
       <title>{title}</title>
       <meta name="description" content={description} />
        <link rel="icon" href="logo.png" />
      </Head>
      <div className='container lg:px-40  mx-auto' >
    <Header/>

    <NextNProgress color="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)" showOnShallow={true} height={5} />

   
      <main >{children}</main>
      <DownloaderList/>
      </div>

    </>
  )
}