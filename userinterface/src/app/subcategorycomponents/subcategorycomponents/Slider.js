"use client"
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import styles from "./Slider.module.css"
import { serverURL } from "@/app/fetchserver/FetchServer";
export default function Slider({ data }) {

  // const images = ['first.png', 'second.png', 'thrid.png'];

  const [current, setCurrent] = useState(0);


  const nextSlide = () => {
    setCurrent((prev) =>
      prev === data.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? data.length - 1 : prev - 1
    );
  };

  const fillImage = () => {
    return data.map((item, i) => {
      return (<img
        key={i}
        src={`${serverURL}/images/${item}`}
        style={{
          display: current == i ? "" : "none"
        }}
        className={styles.image}
      />)
    })
  }

  const progressLine = () => {
    return data.map((item, index) => {
      return (<div key={index} className={styles.progressLine}>
        <div style={{ width: index < current ? "100%" : current === index ? "100%" : "0%", height: "100%", backgroundColor: "white", transition: current === index ? "width 3s linear" : "none", }} />
      </div>
      )
    })
  }

  return (
    <div className={styles.box} >
      {fillImage()}
      <div onClick={prevSlide} className={styles.prev}>
        <ChevronLeftIcon />
      </div>

      <div onClick={nextSlide} className={styles.next}>
        <ChevronRightIcon />
      </div>

      <div className={styles.progressBox} >
        {progressLine()}
      </div>

    </div>
  );
}