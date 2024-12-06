import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/router";
import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "./common/BreadCrumb";
import "react-toastify/dist/ReactToastify.css";

const customToastStyles = `
  .toast-success {
    background-color: green;
    color: white;
  }
`;
import CandidateMobileHeader from "./partials/header/candidateMobileHeader";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const pageOpened = useSelector((state) => state?.pageState?.pageOpened);
  const [isSubscribe, setIsSubscrib] = useState(false);
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

 
  const Temp = () => (
    <>
      <div className="mobile">
        <div>
          <CandidateMobileHeader />
        </div>
        <div className="pt-[3.75rem]  ">{children}</div>
        <Footer isSubscribe={isSubscribe} setIsSubscrib={setIsSubscrib} />
      </div>

      <div className="web min-h-[100vh]">
        {!pageOpened &&
        <div>
          <Header />
        </div>
}
        <div className="pt-[3.75rem] bg-[#F3F4F5] min-h-[calc(100vh-291.33px)] ">{children}</div>
        <Footer isSubscribe={isSubscribe} setIsSubscrib={setIsSubscrib} />
      </div>
    </>
  );

  return (
    <>
      <Temp />
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
