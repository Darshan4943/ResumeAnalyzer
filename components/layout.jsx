import { connect } from "react-redux";

import "react-toastify/dist/ReactToastify.min.css";

import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import Lenis from "@studio-freight/lenis";
import { actions } from "../store/demo";
import { useRef, useEffect } from "react";

function Layout({ children }) {
  // const mainRef = useRef();
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     target: mainRef.current,
  //   });

  //   lenis.on("scroll", (e) => {
  //     console.log(e);
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // });

  return (
    <>
      {/* <div ref={mainRef}> */}
        <div>
        <div className="customMargins">
          <Header />
        </div>
        {children}

        <Footer />
      </div>
    </>
  );
}

export default connect(null, { ...actions })(Layout);
