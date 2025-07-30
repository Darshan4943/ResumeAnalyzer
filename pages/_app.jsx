"use client";
import "/public/scss/style.scss";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Helmet } from "react-helmet";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";

import "../utils/pdfFont.js";
import Layout from "../components/layout.jsx";

import Head from "next/head.js";
import EarthLoader from "../components/common/EarthLoader.jsx";
import store from "../Redux/Store.js";
import { Api } from "../Redux/Api.jsx";
import { useRouter } from "next/router.js";
import Script from "next/script.js";
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
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const x = useMotionValue(90);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });

  // Scale logo when glass is near center (x ~ 0)
  const scale = useTransform(springX, [-90, 0, 90], [1, 1.2, 1]);

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
       <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17407922744"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17407922744');
        `}
      </Script>
      <Provider store={store}>
        <Api />
        {/* {loading && (
          <>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-white "></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
              <div className="absolute earth_loader flex flex-col items-center justify-center ">
                <div className="w-[165px] h-[124px] flex items-center justify-center">
                  <motion.img
                    src="/images/resumeBuilder/bot.png"
                    alt=""
                    className="h-[68px] w-[68px]"
                    animate={{ y: [-30, 0, -30] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center relative z-100">
                  <span
                    className=" min-w-[170px] text-[#333333] text-[16px] loading_dots text-left"
                    style={{ marginLeft: "4px" }}
                  >
                    Setting Things Up{" "}
                  </span>
                </div>
              </div>
            </div>
          </>
        )} */}
        {loading && (
          <>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-white "></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
              <div className="absolute earth_loader flex flex-col items-center justify-center">
                <div className="flex items-center justify-center relative">
                  <motion.img
                    src="/images/logo1.png"
                    alt=""
                    className="h-[60px] w-[auto]" 
                    // style={{ scale }}
                  />
                  <motion.img
                    src="/images/glass.png"
                    alt=""
                    className="h-[70px] w-[73px] absolute object-contain top-[5px] -left-[20px]  " 
                    animate={{ x: [160, 0, 160] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ x: springX }}
                  />

                </div>
              </div>
            </div>
          </>
        )}
        {!loading && (
          <ParallaxProvider>
            {/* <ReactLenis root> */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* </ReactLenis> */}
          </ParallaxProvider>
        )}
      </Provider>
    </>
  );
};

export default WrappedApp;
