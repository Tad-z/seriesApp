import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import styles from "../styles/addSeries.module.css";
import { getError, postServerData } from "./api/helper";


export default function addSeries() {
  const {
    handleSubmit,
    register,
    reset
  } = useForm();

  // const form = document.getElementById("form");
  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("name", data.name);
      formData.append("genre", data.genre);
      formData.append("FavCast", data.FavCast);
      formData.append("status", data.status);
      const response = await postServerData(
        "http://localhost:5000/series",
        formData
      );
      if (response) {
        alert("Series added successfully");
      } else {
        alert("Error adding series");
      }
      reset();
      
    } catch (error) {
      console.log(error);
      alert(getError(error));
    }
  };

  return (
    <div className={styles.body}>
      <Head>
        <title>AddSeries</title>
        <meta name="Series" content="Showcasing series" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.series}>
        <Link href="/">
          <button className={styles.seriesButton}>Back to series</button>
        </Link>
      </div>

      <div className={styles.container}>
        <h1 className={styles.h1}>SHARE YOUR FAVOURITE SERIES</h1>
        <p className={styles.p}>Fill the form and make sure values entered are true</p>
        <form
          id="form"
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.row}>
            <div className={styles.column}>
              <label className={styles.label} htmlFor="image">
                Series Image
              </label>
              <input
                {...register("image", { required: true })}
                className={styles.input}
                type="file"
                id="image"
                placeholder="Insert image here"
              />
            </div>
            <div className={styles.column}>
              <label className={styles.label} htmlFor="name">
                Series Name
              </label>
              <input
                {...register("name", { required: true })}
                className={styles.input}
                type="text"
                id="name"
                placeholder="Your favourite series name here"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label className={styles.label} htmlFor="genre">
                Series Genre
              </label>
              <input
                {...register("genre", { required: true })}
                className={styles.input}
                type="text"
                id="genre"
                placeholder="Your favourite series genre here"
              />
            </div>
            <div className={styles.column}>
              <label className={styles.label} htmlFor="status">
                Status
              </label>
              <input
                {...register("status", { required: true })}
                className={styles.input}
                type="text"
                id="status"
                placeholder="Is it ongoing or finished"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label className={styles.label} htmlFor="FavCast">
                Favourite Character(s)
              </label>
              <input
                {...register("FavCast", { required: true })}
                className={styles.input}
                type="text"
                id="FavCast"
                placeholder="Your favourite series character(s) here"
              ></input>
            </div>
          </div>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
