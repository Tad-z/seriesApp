import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'

const defaultEndpoint = "http://localhost:5000/series"

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return { props: { data } }
}


export default function Home({ data }) {
  const { series = [] } = data || {}
  const [input, setInput] = useState("")
  const movieSeries = series.filter( (series) => series.name.toLowerCase().includes(input))
  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>
          Welcome to my Website
        </h1>

        <p className={styles.description}>
          This website showcases some of the greatest series i've ever watched
        </p>
      </section>
      <Head>
        <title>SeriesApp</title>
        <meta name="Series" content="Showcasing series" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <form>
          <input value={input} onChange={(e) => setInput(e.target.value)} name='query' type='search' />
          <button>Search</button>
          </form>
          <ul className={styles.grid}>
            {movieSeries.map((series) => {
              const { _id, image, name, genre, FavCast, status } = series;

              return (
                <li key={_id} className={styles.card}>
                  <a href="#">
                    <img className={styles.image} src={`http://localhost:5000/${image}`} alt={name} />
                    <h2>{name} &rarr;</h2>
                    <p1>Genre:</p1>
                    <p>{genre}</p>
                    <p1>Favourite Cast:</p1>
                    <p>{FavCast}</p>
                    <p1>Status:</p1>
                    <p>{status}</p>
                  </a>
                </li>
              )
            })}

          </ul>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </>

  )
}
