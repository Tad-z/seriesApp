import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  const page = Number(query.page) || 1;
  const defaultEndpoint = `https://series-iwf5.onrender.com/series?page=${page}&limit=6`;
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return { props: { page, data } };
}

export default function Home({ data, page }) {
  const { result = [] } = data || {};
  const series = result.series;
  const [input, setInput] = useState("");
  const movieSeries = series.filter((series) =>
    series.name.toLowerCase().includes(input)
  );
  return (
    <>
      <header>
        <div className={styles.navbar}>
          <div>
            <p>Best Series App</p>
          </div>
          <div>
            <ul>
              <li>
                <a href="/addSeries">Add Your Favourite Series</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <section className={styles.section}>
        <h1 className={styles.title}>The Best Series API</h1>

        {/* <p className={styles.description}>
          This website showcases some of the greatest series ever watched by man
        </p> */}
      </section>
      <Head>
        <title>SeriesApp</title>
        <meta name="Series" content="Showcasing series" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name="query"
              type="search"
            />
            <button>Search</button>
          </form>
          <ul className={styles.grid}>
            {movieSeries.map((series) => {
              const { _id, image, name, genre, FavCast, status } = series;
              // splits the name string into an array of strings
              // whenever a blank space is encountered
              // loops through each string in the array and capitalize the first letter
              // joins the array of strings into a single string
              const arr = name.split(" ");
              for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
              }
              const name1 = arr.join(" ");
              
              return (
                <li key={_id} className={styles.card}>
                  <a href="#">
                    <img
                      className={styles.image}
                      src={`https://series-api-973j.onrender.com/${image}`}
                      alt={name}
                    />
                    <h2>{name1} &rarr;</h2>
                    <p1>Genre:</p1>
                    <p>{genre}</p>
                    <p1>Favourite Character(s):</p1>
                    <p>{FavCast}</p>
                    <p1>Status:</p1>
                    <p>{status}</p>
                  </a>
                </li>
              );
            })}
          </ul>
          <div>
            {result.previous && (
              <Link href={`/?page=${result.previous.page}`}>
                <button className={styles.button}>
                  {" "}
                  Previous Page -{result.previous.page}{" "}
                </button>
              </Link>
            )}
            {result.next && (
              <Link href={`/?page=${result.next.page}`}>
                <button className={styles.button}>
                  {" "}
                  Next Page -{result.next.page}{" "}
                </button>
              </Link>
            )}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}
