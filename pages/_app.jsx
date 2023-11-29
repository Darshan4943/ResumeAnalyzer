import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { wrapper } from "../store/index.js";
import Layout from "../components/layout";

import "~/public/scss/style.scss";


import { useRouter } from "next/router.js";
import { Api } from "~/Redux/Api.jsx";


const WrappedApp = ({ Component, pageProps }) => {

  


  const store = useStore();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.changeNumber);
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  const router = useRouter();

  const disableLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    disableLoading();
  }, []);

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Add event listeners to monitor online/offline status
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check the initial online status
    setIsOnline(navigator.onLine);

    // Cleanup by removing event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  return (
    <Provider store={store}>

      <>
        <PersistGate
          persistor={store.__persistor}
          loading={
            <div className="loading-overlay">
              <div className="bounce-loader">
                Layout
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          }
        >
          <Helmet>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="msapplication-TileColor" content="#cc9966" />
            <meta
              name="msapplication-config"
              content="images/headerLogo.png"
            />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" />

            <link
              rel="stylesheet"
              href="//cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css"
            />
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <meta name="theme-color" content="#ffffff" />
            <title>Skilotech</title>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="images/headerLogo.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="images/headerLogo.png"
            />
            <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDza9g3mPKYY6cwOmpHFKT8-VjYLSl1EdU&libraries=places"></script> */}
            <script
              type="text/javascript"
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDza9g3mPKYY6cwOmpHFKT8-VjYLSl1EdU&libraries=places"
            />
            {/* <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDza9g3mPKYY6cwOmpHFKT8-VjYLSl1EdU&libraries=places"
                async
                defer
              ></script> */}
            <script
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
              crossorigin="anonymous"
            ></script>
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="images/headerLogo.png"
            />
            <link rel="manifest" href="images/icons/site.webmanifest" />
            <link
              rel="mask-icon"
              href="images/icons/safari-pinned-tab.svg"
              color="#666666"
            />
            <link rel="shortcut icon" href="images/headerLogo.png" />
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
              rel="stylesheet"
            ></link>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css"
            ></link>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

            <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
            <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
          

          </Helmet>

          <Layout>
            <Api />

            {!isOnline && <NoInternetModel />}
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </>

      {/* <Loader/> */}
    </Provider>
  );
};

export default wrapper.withRedux(WrappedApp);
