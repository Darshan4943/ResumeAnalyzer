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
import Breadcrumb from "./common/BreadCrumb";

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
    <div className="">
      <div >
        <Header2 />
      </div>

      <div className="flex bg-[#F3F3F3] ">
        <div>
        <Sidebar />
        </div>
        <div className="  pt-[135px] w-[100%] px-5">
          <Breadcrumb/>
        {children}
        </div>
      </div>
    </div>
  )
  return (
    <>
      {/* <div ref={mainRef}> */}
      {
      selectedPage.startsWith('/employer/afterLogin') ? <Temp2 /> : <Temp />

      }
    </>
  );
}

export default connect(null, { ...actions })(Layout);
