import Link from 'next/link'

export default function Hero({children,title,description}) {
  return (
    <>
<div className="py-5 hero bg-base-300">
  <div className="py-5 hero-content text-center">
    <div className="w-lg">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="py-5">{description}</p>
      {children}
    </div>
    
  </div>
  
</div>

  </>
  )
}