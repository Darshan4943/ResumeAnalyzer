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
        <div >
          <Header />
        </div>
        <div className="mt-[5rem] mb-[2rem]">
        {children}
        </div>
        

        <Footer />
      </div>
    </>
  );
}

export default connect(null, { ...actions })(Layout);
