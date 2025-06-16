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
import EmployerHeader from "./partials/header/EmployerHeader";
import EmployerSidebar from "./partials/header/EmployerSidebar";
import ShareJobHeader from "./partials/header/shareJobHeader";
import AdminHeader from "./partials/header/AdminHeader";

function Layout({ children }) {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const pageOpened = useSelector((state) => state?.website?.pageOpened);
  const shareJob = useSelector((state) => state?.shareJob?.shareJob);
 
  const [isSubscribe, setIsSubscrib] = useState(false);
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);
  // console.log("3233223",userDataGlobal)

  const Temp = () => (
    <>
      <div className="mobile">
        <div>
          <CandidateMobileHeader />
        </div>
        <div className="pt-[3.75rem] bg-[#F3F4F5] ">{children}</div>
        <Footer isSubscribe={isSubscribe} setIsSubscrib={setIsSubscrib} />
      </div>

      <div className="web min-h-[100vh]">
        {!pageOpened &&
          <div>
            <Header />
          </div>
        }
        <div className="pt-[60px] bg-[#F3F4F5] min-h-[calc(100vh-291.33px)] ">{children}</div>
        <Footer isSubscribe={isSubscribe} setIsSubscrib={setIsSubscrib} />
      </div>
    </>
  );
  const Temp3 = () => (
    <>
      <div className="mobile">
        <div>
          <CandidateMobileHeader />
        </div>
        <div className="pt-[3.75rem] bg-[#F3F4F5] ">{children}</div>
        <Footer isSubscribe={isSubscribe} setIsSubscrib={setIsSubscrib} />
      </div>

      <div className="web min-h-[100vh]">
        {!pageOpened &&
          <div>
            <AdminHeader />
          </div>
        }
        <div className="pt-[60px] bg-[#F3F4F5] min-h-[calc(100vh-291.33px)] ">{children}</div>
        <Footer isSubscribe={isSubscribe} setIsSubscrib={setIsSubscrib} />
      </div>
    </>
  );

  const Temp2 = () => (
    <div className="">
      {(!pageOpened && !shareJob) &&
        <div>
          <EmployerHeader />
        </div>
      }
      {shareJob &&
        <ShareJobHeader />
      }
      <div className="flex bg-[#f3f3f3] relative z-10 min-h-[100vh]">

        {(!pageOpened && !shareJob) &&
<div className="ml:max-h-[100vh] min-h-[100vh] ml:block hidden top-0 min-w-[120px] bg-white sticky z-30"
            style={{ scrollbarWidth: "none" }}>
            <EmployerSidebar />
          </div>
        }
        <div className="  overflow-y-auto pt-[60px] w-[100%]  overflow-hidden relative "
          style={{ scrollbarWidth: "none" }}
        >
          {/* {(selectedPage.startsWith('/employer') || selectedPage.startsWith('/recruiter')) && */}
          {(!pageOpened && !shareJob) &&
            <div className="sticky top-0 z-[1000] bg-[#F3F3F3] ml:px-6 px-2 ">
              <Breadcrumb />
            </div>
          }
          {/* } */}
          <div className="ml:px-6 px-2  pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {(userDataGlobal?.role === "employer" || userDataGlobal?.role === "recruiter" || userDataGlobal?.role === "bpo") ? <Temp2 /> :  userDataGlobal?.role === "admin" ? <Temp3/> : <Temp />}
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
