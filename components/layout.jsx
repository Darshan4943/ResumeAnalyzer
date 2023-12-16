import { connect } from "react-redux";

import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/router";
import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import Lenis from "@studio-freight/lenis";
import { actions } from "../store/demo";
import { useRef, useEffect, useState } from "react";
import Header2 from "./partials/header/header2";
import Sidebar from "./partials/header/sidebar";

function Layout({ children }) {
  const router = useRouter();
 const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);
  

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
  const Temp = () => (
    <div>
      <div >
        <Header />
      </div>
      <div className="mt-[5rem] ">
        {children}
      </div>

      <Footer />

    </div>
  )
  const Temp2 = () => (
    <div>
      <div >
        <Header2 />
      </div>

      <div className="flex">
        <Sidebar />
        <div className=" bg-[#F3F3F3] pt-[135px]">
        {children}
        </div>
      </div>
    </div>
  )
  return (
    <>
      {/* <div ref={mainRef}> */}
      {
        selectedPage==="/employer/afterLogin/EmployerHome" ? <Temp2 /> : <Temp />
      }
    </>
  );
}

export default connect(null, { ...actions })(Layout);
