import { Inter } from 'next/font/google'
// import 'bootstrap'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="position-relative">
      <p className="position-absolute top-0 start-0 translate-middle">
        Home Page
      </p>
    </div>
    </>
  )
}
