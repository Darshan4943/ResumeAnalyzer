import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RecruiterHero() {
  const [isLogin, setIsLogin] = useState(false);
  const [visible, setvisible] = useState(false);

  const [details, setDetails] = useState();
  const userDataGlobal = useSelector((state) => state.userData);

  useEffect(() => {
    axios
      .get(
        `https://jamblix.com/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setvisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
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
  const router = useRouter();
  const clickHandler = () => {
    if (isLogin) {
      if (details?.length > 0) {
        router.push("/myClients");
      } else {
        router.push("/myClients/CreateNewClient");
      }
    } else {
      router.push("/auth?signin=true");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center bg-cover  bg-hero_backGround w-screen ml:pt-[68px] sm:pt-9 pt-4 ml:h-[100vh] ml:gap-[96px] sm:gap-12 gap-6 ">
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 2s ease-in-out",
        }}
        className="flex ml:w-[57%] w-[100%] flex-col sm:gap-6 gap-4  items-center justify-center "
      >
        <p className=" text-center ml:text-[3vw] text-[9vw] font-bold leading-tight">
          {" "}
          <span className="text-[#06A9EF]">Empowering</span> Recruiters to
          Create Job Winning Resumes
        </p>

        <div className=" text-center ml:text-[1.1vw] text-[4vw]  font-medium">
          Transform recruiters into resume experts! With our platform,
          effortlessly create customized resumes for clients, manage multiple
          CVs and many more.
        </div>
        <button
          onClick={clickHandler}
          className="bg-[#06A9EF] btn_hover_effect text-white px-4 ml:py-3 py-2 ml:w-[167px] ml:rounded-[12px] rounded-[8px] ml:text-[16px] text-[4vw] font-semibold"
        >
          Get Started
        </button>
      </div>
      <div className="relative w-full ml:h-screen h-[25vw]">
        <img
          style={{
            opacity: visible ? 1 : 0,
            transition: "transform 0.5s ease-in-out",
            transform: visible ? "translateY(0)" : "translateY(100%)",
          }}
          className="absolute top-[5%] left-[-5%] w-[32%]"
          src="/images/recruiter/hero1.png"
          alt=""
        />
        <img
          style={{
            opacity: visible ? 1 : 0,
            transition: "transform 0.8s ease-in-out",
            transform: visible ? "translateY(0)" : "translateY(100%)",
          }}
          className="absolute z-10 top-[-4%] left-[22%] w-[32%] "
          src="/images/recruiter/hero2.png"
          alt=""
        />
        <img
          style={{
            opacity: visible ? 1 : 0,
            transition: "transform 1.1s ease-in-out",
            transform: visible ? "translateY(0)" : "translateY(100%)",
          }}
          className="absolute  z-20 top-[-12%] left-[48%] w-[32%] "
          src="/images/recruiter/hero3.png"
          alt=""
        />
        <img
          style={{
            opacity: visible ? 1 : 0,
            transition: "transform 1.4s ease-in-out",
            transform: visible ? "translateY(0)" : "translateY(100%)",
          }}
          className="absolute z-10 top-[0%] left-[75%] w-[32%] "
          src="/images/recruiter/hero4.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default RecruiterHero;
