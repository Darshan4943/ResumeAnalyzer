"use client";
import "/public/scss/style.scss";


import { Helmet } from "react-helmet";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";

import '../utils/pdfFont.js'; 
import Layout from "../components/layout.jsx";
import Store from "../Redux/Store.js";
import { Api } from "../Redux/Api.jsx";
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
         <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
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
