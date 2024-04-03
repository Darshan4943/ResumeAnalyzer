"use client";
import "/public/scss/style.scss";

import { Helmet } from "react-helmet";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";

import "../utils/pdfFont.js";
import Layout from "../components/layout.jsx";
import Store from "../Redux/Store.js";
import { Api } from "../Redux/Api.jsx";
import Head from "next/head.js";
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
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDza9g3mPKYY6cwOmpHFKT8-VjYLSl1EdU&libraries=places"></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
        <script
          src="https://unpkg.com/react@16/umd/react.development.js"
          crossorigin
        ></script>
        <script
          src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
          crossorigin
        ></script>
        <script src="https://unpkg.com/react-quill@1.3.3/dist/react-quill.js"></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        <script type="text/babel" src="/my-scripts.js"></script>
      </Head>
      <Helmet>
        <title>Skilotech</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="images/logo_header.png"
        />

        <script
          async
          defer
          src="https://checkout.razorpay.com/v1/checkout.js"
        ></script>
      </Helmet>
      <Provider store={Store}>
        <Api />
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
