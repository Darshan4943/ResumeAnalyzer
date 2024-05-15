"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./images.module.css";
import ImgCarousel from "./ImgCarousel";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";
import SkillAssessment from "./SkillAssessment";
import JdResume from "./JdResume";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { popupVisible } from "../../../Redux/actions/user";
import SubscriptionPlans from "./SubscriptionPlans";
import GenerateAi from "./GenerateAi";
import Footer from "../../partials/footer/footer";

const images = [
  "templates/template1.png",
  "templates/template2.png",
  "templates/template3.png",
  "templates/template4.png",
  "templates/template5.png",
  "templates/template6.png",
  "templates/template7.png",
  "templates/template8.png",
  "templates/template9.png",
  "templates/template10.png",
  "templates/template11.png",
  "templates/template12.png",
  "templates/template13.png",
  "templates/template14.png",
  "templates/template15.png",
];

function ImageParallex({}) {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallerysm}>
        <Column
          images={[
            images[0],
            images[1],
            images[2],
            images[3],
            images[12],
            images[10],
            images[11],
            images[14],
          ]}
          y={y}
        />
        <Column
          images={[images[4], images[5], images[6], images[8], images[3]]}
          y={y2}
        />
      </div>
      <div className={styles.spacer}></div>
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={styles.columnsm} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={styles.imageContainersm}>
            <img
              className="rounded-[16px]"
              src={`/images/${src}`}
              alt="image"
              fill="true"
              style={{
                boxShadow: "0px 2px 15px 0px #00000033",
              }}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

const MobileView = ({ clickHandler, isLogin ,isSubscribe,setIsSubcrib}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <div className="block lg:hidden mt-4 mobile-view">
        {" "}
        <div className=" flex flex-col gap-6 w-[100%] text-[#333333] ">
          <div className="flex flex-col items-center  px-[8px] py-[36px] gap-4">
            <div className="font-semibold text-[34px] leading-tight text-center ">
              The Ultimate AI Resume Builder
            </div>
            <div className="font-medium text-[14px] text-center ">
              Craft compelling, recruiter-vetted resumes effortlessly with our
              cutting-edge resume builder powered by Generative AI . Tailor
              resumes for each role swiftly, leveraging a myriad of remarkable
              features. Enhance your prospects of securing an interview and
              distinguish yourself from competitors in just few minutes.
            </div>
            <button
              onClick={clickHandler}
              className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[14px] font-semibold"
              style={{ width: "fit-content" }}
            >
              Build My Resume
            </button>
          </div>
          <ImageParallex />
        </div>{" "}
        <div className="flex items-end justify-center overflow-hidden ">
          <GenerateAi />
        </div>
        <div className="flex flex-col gap-9 items-center  pb-[72px] bg-carousel_bg bg-cover bg-no-repeat ">
          <div className="w-[100%]">
            <ImgCarousel />
          </div>

          <div className=" flex flex-col gap-6 w-[100%] text-[#333333] items-center ml:px-8 px-2">
            <div className="font-semibold  text-[34px] leading-tight text-center ">
            Resume Templates for All <span className="text-[#06A9EF]">Careers and Levels.</span>
            </div>
            <div className="font-medium text-[14px] ml:text-[20px] w-[95%] break-words text-center ">
            <p>  Select one of our <span className="text-[#06A9EF]">expert-designed resume templates </span>and create a resume that fits your needs
                and style.No Experienced needed!</p>
              <p><span className="text-[#06A9EF]">Stand out from the crowd</span>  with a resume built on one of the best recruiter approved templates.</p>
            </div>
            <button
              onClick={clickHandler}
              className="px-6 py-3 bg-[#06A9EF] text-[14px] text-white w-[auto] font-semibold rounded-[12px]"
            >
              Get Started
            </button>
          </div>
        </div>
        <SkillAssessment isLogin={isLogin} />
        <JdResume isLogin={isLogin} />
        <div className="flex flex-col gap-2 items-center  pb-[42px] bg-inventory bg-cover bg-no-repeat ">
          <div className="w-[100%]  flex justify-center  items-center ">
            <img
              src="/images/resumeBuilder/resumeInventory.png"
              alt=""
              fill="true"
              className={`w-[304px] h-[304px] object-contain`}
            />
          </div>
          <div className=" flex flex-col gap-6 w-[100%] text-[#000000] pl-[24px] items-center ml:px-8 px-6">
            <div className="flex flex-col gap-[24px] items-center">
              <div className="font-semibold text-[30px] leading-tight text-center">
              <span className="text-[#06A9EF]">My Collection</span> is Your
            Personal Resume Inventory
              </div>
              <div className="font-medium text-[14px] text-[#333333] text-center ">
              My Collection is your one-stop destination for organizing and
            managing your <span className="text-[#06A9EF]">personalized resume collections.</span> 
              </div>
              
            <div className="font-medium text-[14px] text-[#333333] text-center ">
            <span className="text-[#06A9EF]">Seamlessly store, update, and tailor</span> your differently crafted resumes for various job opportunities with
            ease.
              </div>
              <button
                onClick={() =>
                  isLogin
                    ? router.push("/home/BuildResume")
                    : router.push("/auth?signin=true")
                }
                className="px-6 py-3 bg-[#06A9EF] text-white  rounded-[12px] text-[14px] font-semibold"
                style={{ width: "fit-content" }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12  bg-subscriptionPlan justify-center items-left bg-cover bg-no-repeat  py-[24px]">
          <div className="text-center px-[8px]">
            <p className="text-[32px] text-[#333333] font-[700]">
              Try our <span className="text-[#06A9EF]">Subscription</span> plans
            </p>
            <p className="text-[14px] text-[#646464] font-[400]">
              Affordable plans for all the aspiring professionals.
            </p>
          </div>

          <SubscriptionPlans isLogin={isLogin} />
        </div>
        <Footer isSubscribe={isSubscribe} setIsSubcrib={setIsSubcrib}/>

      </div>
    </>
  );
};

export default MobileView;
