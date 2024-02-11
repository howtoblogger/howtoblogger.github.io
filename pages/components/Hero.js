import Link from 'next/link'

export default function Hero({children,title,description}) {
  return (
    <>
<div className="hero bg-base-300">
  <div className="hero-content text-center">
    <div className="w-lg">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="my-2">{description}</p>
      {children}
    </div>
    
  </div>
  
</div>

  </>
  )
}