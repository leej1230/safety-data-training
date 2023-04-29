import Head from 'next/head'
import Navbar from '@/components/Navbar'

const Home = () => {
  return (
    <>
      <Head>
        <title>Safety Database</title>
      </Head>

      <Navbar />

      <main className="d-flex flex-column justify-content-between align-items-center p-5 min-vh-100">
        <div className="d-flex flex-column justify-content-between align-items-center p-5 min-vh-100">
          <p className="d-flex justify-content-center align-items-center h-100 mt-5" style={{fontSize: '2.3rem'}}>
            Home
          </p>
        </div>
      </main>

    </>
  )
}

export default Home;