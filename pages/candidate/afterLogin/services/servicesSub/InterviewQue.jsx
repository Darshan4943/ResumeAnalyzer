import React, { useState } from "react";
import Profile1 from "@/components/featured/candidate/afterLogin/services/Profile1";
import InterviewQues from "@/components/featured/candidate/afterLogin/services/InterviewQues";
import CommanlyAsk from "@/components/featured/candidate/afterLogin/services/CommanlyAsk";
import { useMediaQuery } from "@react-hook/media-query";
import ProfileHeader from "@/components/featured/candidate/profile/profile_header";

function InterviewQue() {
  const isViewportBelow850 = useMediaQuery("(max-width:850)");

  const [visible, setVisible] = useState(false);

  return (
    <div className="pt-2">
      <ProfileHeader /> 
      <div className="w-full h-full flex justify-center gap-[24px] customMargins py-6 ">
        {!visible && (
          <div className="mobile ">
            <CommanlyAsk setVisible={setVisible} />
          </div>
        )}
        <div className="web  w-[40%]">
          <CommanlyAsk setVisible={setVisible} />
        </div>

        {visible && (
          <div className="mobile w-full max-w-[500px]">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-1 mb-4 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g mask="url(#mask0_5925_96419)">
                  <path
                    d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                    fill="#333333"
                  />
                </g>
              </svg>
              <p className="text-[20px] font-medium font-Montserrat">Back</p>
            </div>
            <InterviewQues />
          </div>
        )}

        <div className="web w-[60%]">
          <InterviewQues />
        </div>
      </div>
    </div>
  );
}

export default InterviewQue;
