import Link from 'next/link'

export default function Header() {
  return (
    <>
    <div class="navbar border-b bg-base-100">
  <div class="navbar-start">
  </div>
  <div class="navbar-center">
  <img className="animate-spin animate-once avatar w-10" src="logo.png" />
  <Link className='btn btn-ghost text-xl' href="/">
  IG Downloader
</Link>
  </div>
  <div class="navbar-end">
  </div>
</div>

    </>
  )
}