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
import EarthLoader from "../components/common/EarthLoader.jsx";
const WrappedApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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

        <script
          async
          defer
          src="https://checkout.razorpay.com/v1/checkout.js"
        ></script>
      </Helmet>
      <Provider store={Store}>
        <Api />
        {loading && (
          <>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-white"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
              <div className="relative earth_loader flex flex-col items-center justify-center gap-[24px]">
                <div>
                  <img
                    src="/images/loader/earth.png"
                    alt=""
                    className="h-[100px] w-[100px]"
                  />
                  <img
                    src="/images/loader/glass.png"
                    alt=""
                    className="h-[126px] w-[117px] object-contain glass"
                  />
                </div>
                <div className="flex flex-col items-center justify-center relative z-100">
                  <span
                    className=" text-left text-[#333333] text-[16px] loading_dots"
                    style={{ marginLeft: "44px" }}
                  >
                    Loading{" "}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

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
