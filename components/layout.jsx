import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/router";
import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import { useRef, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Breadcrumb from "./common/BreadCrumb";

import CandidateMobileHeader from "./partials/header/candidateMobileHeader";
import EmployerHeader from "./partials/header/EmployerHeader";
import EmployerSidebar from "./partials/header/EmployerSidebar";

function Layout({ children }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const Temp = () => (
    <>
    
      <div className="mobile">
        <div>
          <CandidateMobileHeader />
        </div>
        <div className="pt-[3.5rem]  ">{children}</div>
        <Footer />
      </div>
 
      <div className="web">
        <div>
          <Header />
        </div>
        <div className="pt-[5rem] ">{children}</div>

        <Footer />
      </div>
     
    </>
  );
  const Temp2 = () => (
    <div className="">

      <div>
        <EmployerHeader />
      </div>

      <div className="flex bg-[#f3f3f3]  ">
        <div className="web">
          <EmployerSidebar />
        </div>
        <div className="  pt-[100px] w-[100%] ml:px-5 px-2 overflow-hidden">
        <Breadcrumb/>
          {children}</div>
      </div>
    </div>
  );
  return (
    <>
      {     selectedPage.startsWith('/employer/afterLogin') ? <Temp2 /> : <Temp />}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Layout;
