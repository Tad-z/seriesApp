import React from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import styles from "../styles/addSeries.module.css";
import { postServerData } from "./api/helper";

export default function addSeries() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ image, name, genre, FavCast, status }) => {
    console.log(image);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("genre", genre);
      formData.append("FavCast", FavCast);
      formData.append("status", status);
  
      const result = await postServerData("http://localhost:5000/series", formData);
      if (result) {
        console.log("success");
      } else {
        console.log("failed");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <>
      <Head>
        <title>AddSeries</title>
        <meta name="Series" content="Showcasing series" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.h1}>SHARE YOUR FAVOURITE SERIES</h1>
        <p className={styles.p}>Fill the form</p>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
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
                {...register("character", { required: true })}
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
    </>
  );
}
