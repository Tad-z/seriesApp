import Head from "next/head";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../styles/Home.module.css";
import { CaretDown, CaretUp } from "phosphor-react";

// ==============================
// Retry fetch util
// ==============================
async function fetchWithRetry(url, retries = 8, delay = 4000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(url);
      if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
      return res.data;
    } catch (err) {
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }
}

export async function getServerSideProps({ query }) {
  const page = Number(query.page) || 1;
  const defaultEndpoint = `https://seriesapi-kcln.onrender.com/series/page?page=${page}`;

  let data = { result: {} };

  try {
    data = await fetchWithRetry(defaultEndpoint);
  } catch (error) {
    console.error("Backend not ready:", error.message);
    // Fallback to empty data so frontend can show loader
  }

  return { props: { page, data } };
}


export default function Home({ data, page }) {
  const { result = [] } = data || {};
  const series = result.series || [];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedd, setIsExpandedd] = useState(false);
  const [option, setOption] = useState(undefined);
  const [searchSeries, setSearchSeries] = useState([]);
  console.log({ searchSeries });
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
  let movieSeries = series;
  if (input) movieSeries = searchSeries.filter((series) => series.name.toLowerCase().includes(input.toLowerCase()));






  useEffect(() => {
    async function getSeries() {
      const endpoint = `https://seriesapi-kcln.onrender.com/series/`;
      let res = await fetch(endpoint);
      if (!res.ok) {
        console.error("Failed to fetch series:", res.status);
        setSearchSeries([]);
      } else {
        const data = await res.json();
        console.log({ data })
        setSearchSeries(data.series || []);
      }
    }
    getSeries();

    const sortSeriesByGenre = async () => {
      const endpoint = `https://seriesapi-kcln.onrender.com/sortedSeries?genre=${option}`;
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
      const endpoint = `https://seriesapi-kcln.onrender.com/sortedSeries/status?status=${option}`;
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

    // ==============================
  // Loader if API hasn't returned yet
  // ==============================
  if ((!series || series.length === 0) && !genreSeries.length && !statusSeries.length) {
    return (
      <div className="loader-container">
        <DotLoader color='white' size={80} />
        <p className={styles.loader-text}>
          Waking up server... please wait ☕
        </p>
      </div>
    );
  }

  return (
    <>
      <header>
        <div className={styles.navbar}>
          <div>
            <p href="/">Best Series App</p>
          </div>
          <a>
            <Link href="/addSeries">Add Your Favourite Series</Link>
          </a>
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
                  onMouseOver={() => setIsExpanded(true)}
                  onMouseOut={() => setIsExpanded(false)}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={styles.DropdownButton}
                >
                  <span>Genre</span> &nbsp; {isExpanded && <CaretDown size={16} />}
                  {!isExpanded && <CaretUp size={16} />}

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
                </button>
              </div>
              <div className={styles.dropdown}>
                <button
                  onMouseOver={() => setIsExpandedd(true)}
                  onMouseOut={() => setIsExpandedd(false)}
                  onClick={() => setIsExpandedd(!isExpandedd)}
                  className={styles.DropdownButton}
                >
                  <span>Status</span> &nbsp;  {isExpandedd && <CaretDown size={16} />}
                  {!isExpandedd && <CaretUp size={16} />}

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
                </button>
              </div>
            </div>
            {/* <DropDrown name={"Status"} options={["Ongoing", "Finished"]} /> */}
          </div>

          <ul className={styles.grid}>
            {genreSeries !== undefined &&
              genreSeries !== null &&
              Object.keys(genreSeries).length > 0
              ? genreSeries.map((seriess) => {
                const { _id, image, name, genre, FavCast, status, link } = series;

                // Capitalize the first letter of each word in the name
                const arr = name.split(" ");
                for (let i = 0; i < arr.length; i++) {
                  arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                }
                const name1 = arr.join(" ");

                // Function to extract the filename for local images (from Multer)
                function extractFilename(path) {
                  // Handle both Windows and Unix-style paths
                  const pathSegments = path.split(/[/\\]/);

                  // Check if any part of the path includes 'uploads'
                  if (pathSegments.some(segment => segment.includes('uploads'))) {
                    // Return the last segment prefixed by 'uploads/'
                    return 'uploads/' + pathSegments[pathSegments.length - 1];
                  }
                }

                // Determine whether the image is a Cloudinary URL or a local file path
                let imageUrl = image; // Assume it's a Cloudinary URL by default

                // If the image doesn't start with 'http', assume it's a local file
                if (!image.startsWith('http')) {
                  const filename = extractFilename(image);
                  imageUrl = `https://seriesapi-kcln.onrender.com/${filename}`;
                }

                return (
                  <li key={_id} className={styles.card}>
                    <a href={link}>
                      <img
                        className={styles.image}
                        src={imageUrl}
                        loading="lazy"
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
                  const { _id, image, name, genre, FavCast, status, link } = seriess;
                  // splits the name string into an array of strings
                  // whenever a blank space is encountered
                  // loops through each string in the array and capitalize the first letter
                  // joins the array of strings into a single string
                  const arr = name.split(" ");
                  for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                  }
                  const name1 = arr.join(" ");

                   // Function to extract the filename for local images (from Multer)
                function extractFilename(path) {
                  // Handle both Windows and Unix-style paths
                  const pathSegments = path.split(/[/\\]/);

                  // Check if any part of the path includes 'uploads'
                  if (pathSegments.some(segment => segment.includes('uploads'))) {
                    // Return the last segment prefixed by 'uploads/'
                    return 'uploads/' + pathSegments[pathSegments.length - 1];
                  }
                }

                // Determine whether the image is a Cloudinary URL or a local file path
                let imageUrl = image; // Assume it's a Cloudinary URL by default

                // If the image doesn't start with 'http', assume it's a local file
                if (!image.startsWith('http')) {
                  const filename = extractFilename(image);
                  imageUrl = `https://seriesapi-kcln.onrender.com/${filename}`;
                }

                return (
                  <li key={_id} className={styles.card}>
                    <a href={link}>
                      <img
                        className={styles.image}
                        src={imageUrl}
                        loading="lazy"
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
                  const { _id, image, name, genre, FavCast, status, link } = series;
                  // splits the name string into an array of strings
                  // whenever a blank space is encountered
                  // loops through each string in the array and capitalize the first letter
                  // joins the array of strings into a single string
                  const arr = name.split(" ");
                  for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                  }
                  const name1 = arr.join(" ");

                   // Function to extract the filename for local images (from Multer)
                function extractFilename(path) {
                  // Handle both Windows and Unix-style paths
                  const pathSegments = path.split(/[/\\]/);

                  // Check if any part of the path includes 'uploads'
                  if (pathSegments.some(segment => segment.includes('uploads'))) {
                    // Return the last segment prefixed by 'uploads/'
                    return 'uploads/' + pathSegments[pathSegments.length - 1];
                  }
                }

                // Determine whether the image is a Cloudinary URL or a local file path
                let imageUrl = image; // Assume it's a Cloudinary URL by default

                // If the image doesn't start with 'http', assume it's a local file
                if (!image.startsWith('http')) {
                  const filename = extractFilename(image);
                  imageUrl = `https://seriesapi-kcln.onrender.com/${filename}`;
                }

                return (
                  <li key={_id} className={styles.card}>
                    <a href={link}>
                      <img
                        className={styles.image}
                        src={imageUrl}
                        loading="lazy"
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
          <p>Developed By Tade @2022</p>
        </footer>
      </div>
    </>
  );
}
