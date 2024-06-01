import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import HeaderSidebar from "./headerSidebar";

function CandidateMobileHeader() {
  const [selectedPage, setSelectedPage] = useState("");
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);

  return (
    <>
      <div
        className="flex p-2 justify-between fixed w-[100%] bg-white z-[100]  "
        style={{ boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex gap-2 items-center">
          <>
          
              <div onClick={() => {setIsSidebar(true);window.scrollTo(0, 0)}}>
                <img
                  src="/images/home/menu.png"
                  alt=""
                  className="w-[30px] h-[30px] object-contain"
                />
              </div>
          
            <div onClick={() => router.push("/")}>
              <img
                src="/images/logo_skilotech.png"
                alt=""
                className="w-[123px] h-[40px] object-contain"
              />
            </div>
          </>
        </div>

        {!isLogin && (
          <button
            onClick={() => {
              router.push("/auth?signin=true");
            }}
            className="px-4 py-2 border border-[#06A9EF] rounded-[8px] font-[500]"
          >
            Sign In
          </button>
        )}
      </div>

      <AnimatePresence>
        {isSidebar && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed z-[2000] w-full mt-[-4rem] h-[113vh] overflow-y-auto "
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                ...(navigator.userAgent.includes("Safari") &&
                  !navigator.userAgent.includes("Chrome") && {
                    WebkitBackdropFilter: "blur(10px)",
                  }),
                willChange: "transform",
                // opacity: isSidebar ? 1 : 0,
                // transform: (isSidebar ? "translateX(0)" : "translateX(-100%)"), transition: "transform 0.4s ease-in-out",
              }}
            >
              <HeaderSidebar
                selectedPage={selectedPage}
                setIsSidebar={setIsSidebar}
                isSidebar={isSidebar}
                setIsLogin={setIsLogin}
                isLogin={isLogin}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
export default CandidateMobileHeader;
