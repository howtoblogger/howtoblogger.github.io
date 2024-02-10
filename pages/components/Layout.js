import Header from './Header'
import Footer from './Footer'
import Head from 'next/head';
import '../../styles/main.css'
export default function Layout({ children,title,description }) {
  return (
    
    <>
       <Head>
       <title>{title}</title>
       <meta name="description" content={description} />

        <link rel="icon" href="logo.png" />
      </Head>
    <Header/>

   
      <main >{children}</main>
 

    </>
  )
}