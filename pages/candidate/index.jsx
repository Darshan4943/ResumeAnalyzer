import React, { useEffect } from "react";
import ProfileSection from "../../components/featured/candidate/candidateHome/ProfileSection";
import MiddleSection from "../../components/featured/candidate/candidateHome/middleSection";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingFalse,
  setLoadingTrue,
} from "../../Redux/slices/loadingSlice";
function CandidateHome() {
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingTrue());
    const timer = setTimeout(() => {
      dispatch(setLoadingFalse());
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className=" gap-6 flex flex-col ml:flex-row pt-6  customMargins">
          <div className="flex gap-6 flex-col rounded-[12px] ml:max-w-[262px] items-center w-full">
            <div className="h-[254px]  ml:max-w-[262px] w-[262px]  bg-white rounded-[12px] px-4 py-[28px] flex flex-col gap-4 items-center">
              <div className="skeleton-subtitle h-[104px] w-[104px] rounded-full"></div>
              <div className="skeleton-subtitle h-[24px] w-[120px]"></div>
              <div className="skeleton-subtitle h-[20px] w-[160px]"></div>
            </div>

            <div className="h-[356px] w-[262px]  ml:max-w-[262px] bg-white rounded-[12px] px-4 py-[28px] flex flex-col gap-4 items-center">
              <div className="skeleton-subtitle h-[24px] w-[90%] "></div>
              <div className="skeleton-subtitle h-[60px] w-[90%]  "></div>

              <div className="skeleton-image h-[160px] w-[160px] "></div>
            </div>
          </div>

          <div className="flex gap-4 flex-col w-full ml:max-w-[548px]">
            <div className="flex gap-4 ">
              <div className="skeleton-subtitle h-[40px] w-[176px]"></div>
              <div className="skeleton-subtitle h-[40px] w-[170px]"></div>
            </div>

            <div className="h-[169px] w-full  bg-white rounded-[12px] p-4 flex  justify-between items-center gap-1">
              <div className="flex flex-col gap-1 w-full justify-between">
                <div className="skeleton-line h-[20px]  max-w-[80%]"></div>
                <div className="skeleton-line h-[40px] max-w-[70%]"></div>

                <div className="skeleton-image h-[40px] max-w-[140px] rounded-[30px]"></div>
              </div>
              <div className="skeleton-image h-[100px] w-[100px] mr-4 "></div>
            </div>
            <div className="  ml:flex hidden bg-white flex-col gap-4 p-6 rounded-[12px] mt-4 ">
              <div className="flex justify-between gap-4 w-full">
                <div className="skeleton-line h-[20px] max-w-[50%]"></div>
                <div className="skeleton-line h-[20px] max-w-[20%]"></div>
              </div>
              <div className="skeleton-line h-[20px] max-w-[60%] mt-[-12px]"></div>
              <div className="flex gap-2  w-full  mt-[-8px]">
                {[1, 2, 3].map((item, index) => (
                  <div key={index} className="flex gap-2  w-full">
                    <div className="h-[169px] w-full  bg-white rounded-[12px]  flex flex-col gap-1">
                      <div className="skeleton-image h-[152px] w-[152px]  "></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center w-full">
                {[1, 2].map((item, index) => (
                  <div key={index} className="flex gap-4  justify-center ">
                    <div className="skeleton-image h-[40px] w-[40px] rounded-full  "></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" hidden scr1200:flex gap-4 flex-col">
            <div className="skeleton-image h-[356px] w-[262px] bg-white rounded-[12px] px-4 py-[28px] flex flex-col gap-4 items-center">
              <div className="skeleton-subtitle h-[24px] w-[90%] "></div>
              <div className="skeleton-subtitle h-[60px] w-[90%]  "></div>

              <div className="skeleton-image h-[160px] w-[160px] "></div>
            </div>

            <div className="skeleton-image h-[356px] w-[262px] bg-white rounded-[12px] px-4 py-[28px] flex flex-col gap-4 items-center">
              <div className="skeleton-subtitle h-[24px] w-[90%] "></div>
              <div className="skeleton-subtitle h-[60px] w-[90%]  "></div>

              <div className="skeleton-image h-[160px] w-[160px] "></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col ml:flex-row gap-4 customMargins py-6 scr1200:justify-between relative ">
          <div className="flex flex-col gap-4 w-full ml:max-w-[262px] ml:sticky top-[84px]  h-fit">
            <ProfileSection />
            <div className="min-w-[262px] hidden ml:block rounded-[12px] bg-[#FFFFFF] ">
              <img
                src="/images/home/CandidatePoster3.png"
                className="w-full"
                alt="Generative AI"
              />
            </div>
          </div>

         
            <MiddleSection />
         

          <div className="w-[262px] hidden scr1200:flex flex-col gap-6 sticky top-[84px]  h-fit">
            <img
              src="/images/home/CandidatePoster1.png"
              className="w-full"
              alt="Event Flyer"
            />
            <img
              src="/images/home/CandidatePoster2.png"
              className="w-full"
              alt="Generative AI"
            />
          </div>
        </div>
      )}
    </>
  );
}
export default CandidateHome;
