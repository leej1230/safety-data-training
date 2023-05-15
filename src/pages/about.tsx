import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/about.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>About Page</title>
      </Head>
      <nav className={styles.navbar}>
        <Link href="/">
          <span className={styles.webtitle}>Big Safety Training Database</span>
        </Link>
        <div className={styles.buttonsContainer}>
          <button className={styles.button1}>Sign In</button>
          <button className={styles.button2}>About</button>
          <button className={styles.button3}>Help</button>
        </div>
      </nav>
      <main className={styles.main}>
        <div className={styles.main}>
          <h1 className={styles.title}>About</h1>
          <p className={styles.description1}>
            This database was created by the 2023 LIFT Safety Training Database
            Group: Cheryl, Jaewoo, and Neerja.
          </p>
          <p className={styles.description2}>
            We wanted to digitize and consolidate the BIG member list along with
            each member&apos;s certifications into an easy-to-use database.
          </p>
        </div>
      </main>
    </>
  );
}
