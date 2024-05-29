"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./images.module.css";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";

const images = [
  "templates/template1.png",
  "templates/template2.png",
  "templates/template3.png",
  "templates/template4.png",
  "templates/template5.png",
  "templates/template6.png",
  "templates/template7.png",
  "templates/template8.png",
  "templates/template9.png",
  "templates/template10.png",
  "templates/template11.png",
  "templates/template12.png",
  "templates/template13.png",
  "templates/template14.png",
  "templates/template15.png",
];

export default function Home({}) {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallery}>
        <Column
          images={[images[0], images[1], images[2], images[3], images[3]]}
          y={y}
        />
        <Column
          images={[images[4], images[5], images[6], images[8], images[3]]}
          y={y2}
        />
        <Column
          images={[images[8], images[9], images[10], images[11], images[3]]}
          y={y3}
        />
      </div>
      <div className={styles.spacer}></div>
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <img
              className="rounded-[16px]"
              src={`/images/${src}`}
              alt="image"
              style={{
                boxShadow: "0px 2px 15px 0px #00000033",
              }}
            />
          </div>
        );
      })}
    </motion.div>
  );
};
