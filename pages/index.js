import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";
import { CaretDown, CaretUp } from "phosphor-react";

export async function getServerSideProps({ query }) {
  const page = Number(query.page) || 1;
  const defaultEndpoint = `https://series-api-nld9.onrender.com/series?page=${page}&limit=12`;
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return { props: { page, data } };
}

export default function Home({ data, page }) {
  const { result = [] } = data || {};
  const series = result.series;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedd, setIsExpandedd] = useState(false);
  const [option, setOption] = useState(undefined);
  // const [status, setStatus] = useState(undefined);
  const [genreSeries, setGenreSeries] = useState([]);
  const [statusSeries, setStatusSeries] = useState([]);
  const [isWholeSeries, setIsWholeSeries] = useState(true);

  const options = [
    "Anime",
    "Action",
    "Romance",
    "Comedy",
    "Horror",
    "Drama",
    "Fiction",
  ]
  const optionss = ["Ongoing", "Finished"];
  const [input, setInput] = useState("");
  const movieSeries = series.filter((series) =>
    series.name.toLowerCase().includes(input.toLowerCase())
  );


  useEffect(() => {
    const sortSeriesByGenre = async () => {
      const endpoint = `https://series-api-nld9.onrender.com/sortedSeries?genre=${option}`;
      let res = await fetch(endpoint);
      if (!res.ok) {
        console.error("Failed to fetch data for genre:", res.status);
        setGenreSeries([]);
      } else {
        const data = await res.json();
        setGenreSeries(data.seriesByGenre || []);
        setIsWholeSeries(false);
      }
    };

    const sortSeriesByStatus = async () => {
      const endpoint = `https://series-api-nld9.onrender.com/sortedSeries/status?status=${option}`;
      let res = await fetch(endpoint);
      if (!res.ok) {
        console.error("Failed to fetch data for status:", res.status);
        setStatusSeries([]);
      } else {
        const data = await res.json();
        setStatusSeries(data.seriesByStatus || []);
        setIsWholeSeries(false);
      }
    };

    if (option) {
      sortSeriesByStatus();
      sortSeriesByGenre();
    } else {
      // Reset genreSeries and statusSeries when option is undefined
      setGenreSeries([]);
      setStatusSeries([]);
    }

  }, [option]);
  // const genreSeries = data.seriesByGenre;

  return (
    <>
      <header>
        <div className={styles.navbar}>
          <div>
            <p href="/">Best Series App</p>
          </div>
          <div>
            <ul>
              <li>
                <Link href="/addSeries">Add Your Favourite Series</Link>
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
          <div className={styles.horizontal}>
            <form className={styles.form}>
              <input
                value={input}
                className={styles.input}
                onChange={(e) => setInput(e.target.value)}
                name="query"
                type="search"
                placeholder="search series"
              />

              {/* <button className={styles.buttonn}>Search</button> */}
            </form>
            <div className={styles.dropdownWrapper}>
              <div className={styles.dropdown}>
                <button
                  onMouseOver={() => setIsExpanded(!isExpanded)}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={styles.DropdownButton}
                >
                  <span>Genre</span> &nbsp; {isExpanded && <CaretDown size={16} />}
                  {!isExpanded && <CaretUp size={16} />}
                </button>
                {isExpanded && (
                  <div className={styles.Panel}>
                    <div className={styles.arrowUp}></div>

                    {options.map((option) => (
                      <div
                      onMouseOver={() => {
                        setOption(option);
                        // sortSeries();
                      }}
                        onClick={() => {
                          setOption(option);
                          // sortSeries();
                        }}
                        className={styles.List}
                        key={option}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.dropdown}>
                <button
                  onClick={() => setIsExpandedd(!isExpandedd)}
                  onMouseOver={() => setIsExpandedd(!isExpandedd)}
                  className={styles.DropdownButton}
                >
                  <span>Status</span> &nbsp;  {isExpandedd && <CaretDown size={16} />}
                  {!isExpandedd && <CaretUp size={16} />}
                </button>
                {isExpandedd && (
                  <div className={styles.Panel}>
                    <div className={styles.arrowUp}></div>

                    {optionss.map((option) => (
                      <div
                      onMouseOver={() => {
                        setOption(option);
                        // sortSeries();
                      }}
                        onClick={() => {
                          setOption(option);
                          // sortSeries();
                        }}
                        className={styles.List}
                        key={option}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* <DropDrown name={"Status"} options={["Ongoing", "Finished"]} /> */}
          </div>

          <ul className={styles.grid}>
            {genreSeries !== undefined &&
              genreSeries !== null &&
              Object.keys(genreSeries).length > 0
              ? genreSeries.map((seriess) => {
                const { _id, image, name, genre, FavCast, status } = seriess;
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
                        src={`https://series-api-nld9.onrender.com/${image}`}
                        alt={name}
                      />
                      <h2>{name1} &rarr;</h2>
                      <p className={styles.p1}>Genre:</p>
                      <p className={styles.p}>{genre}</p>
                      <p className={styles.p1}>Favourite Character(s):</p>
                      <p className={styles.p}>{FavCast}</p>
                      <p className={styles.p1}>Status:</p>
                      <p className={styles.p}>{status}</p>
                    </a>
                  </li>
                );
              })
              : statusSeries !== undefined &&
                statusSeries !== null &&
                Object.keys(statusSeries).length > 0
                ? statusSeries.map((seriess) => {
                  const { _id, image, name, genre, FavCast, status } = seriess;
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
                          src={`https://series-api-nld9.onrender.com/${image}`}
                          alt={name}
                        />
                        <h2>{name1} &rarr;</h2>
                        <p className={styles.p1}>Genre:</p>
                        <p className={styles.p}>{genre}</p>
                        <p className={styles.p1}>Favourite Character(s):</p>
                        <p className={styles.p}>{FavCast}</p>
                        <p className={styles.p1}>Status:</p>
                        <p className={styles.p}>{status}</p>
                      </a>
                    </li>
                  );
                })
                :
                movieSeries.map((series) => {
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
                          src={`https://series-api-nld9.onrender.com/${image}`}
                          alt={name}
                        />
                        <h2>{name1} &rarr;</h2>
                        <p className={styles.p1}>Genre:</p>
                      <p className={styles.p}>{genre}</p>
                      <p className={styles.p1}>Favourite Character(s):</p>
                      <p className={styles.p}>{FavCast}</p>
                      <p className={styles.p1}>Status:</p>
                      <p className={styles.p}>{status}</p>
                      </a>
                    </li>
                  );
                })}
          </ul>
          <div>
            {isWholeSeries && result.previous && (
              <Link href={`/?page=${result.previous.page}`}>
                <button className={styles.button}>
                  {" "}
                  Previous Page -{result.previous.page}{" "}
                </button>
              </Link>
            )}
            {isWholeSeries && result.next && (
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
