"use client";
import "/public/scss/style.scss";

import Layout from "@/components/layout";
import { Helmet } from "react-helmet";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";
import Store from "@/Redux/Store";
import { Api } from "@/Redux/Api";
import '../utils/pdfFont.js'; 
const WrappedApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // const { latitude, longitude } = position.coords;
          const latitude = -25.7461;
          const longitude = 28.1881;
          const southAfricaBoundingBox = {
            minLatitude: -35.9,
            maxLatitude: -22,
            minLongitude: 16.45,
            maxLongitude: 32.89,
          };
          const isInSouthAfrica =
            latitude >= southAfricaBoundingBox.minLatitude &&
            latitude <= southAfricaBoundingBox.maxLatitude &&
            longitude >= southAfricaBoundingBox.minLongitude &&
            longitude <= southAfricaBoundingBox.maxLongitude;

          localStorage.setItem("isInSouthAfrica", isInSouthAfrica);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    };

    getLocation();
  }, []);
  return (
    <>
      <Helmet>
        <title>Skilotech</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="images/logo_header.png"
        />
      </Helmet>
      <Provider store={Store}>
        <Api/>
      <ParallaxProvider>
        {/* <ReactLenis root> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        {/* </ReactLenis> */}
      </ParallaxProvider>
      </Provider>


    </>
  );
};

export default WrappedApp;
