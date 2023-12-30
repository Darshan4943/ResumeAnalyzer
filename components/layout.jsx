import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/router";
import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import { useRef, useEffect, useState } from "react";
import Header2 from "./partials/header/header2";
import Sidebar from "./partials/header/sidebar";
import { ToastContainer } from "react-toastify";

function Layout({ children }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const Temp = () => (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-[5rem] min-h-screen ">{children}</div>

      <Footer />
    </div>
  );
  const Temp2 = () => (
    <div className="">
      <div>
        <Header2 />
      </div>

      <div className="flex bg-[#F3F3F3] ">
        <div>
          <Sidebar />
        </div>
        <div className="  pt-[135px] w-[100%] px-5">{children}</div>
      </div>
    </div>
  );
  return (
    <>
      {selectedPage === "/employer/afterLogin/EmployerHome" ? (
        <Temp2 />
      ) : (
        <Temp />
      )}
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
