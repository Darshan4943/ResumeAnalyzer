import AppliedJobs from "@/components/featured/candidate/afterLogin/home/AppliedJobs";
import SavedJobs from "@/components/featured/candidate/afterLogin/home/SavedJobs";
import React, { useEffect, useReducer, useState } from "react";

import { inputData } from "@/utils/data";
import { useSelector } from "react-redux";
// import { btns } from "~/utils/data";

const btns = [
  "Linkedin (101)",

  "Naukri.com (109)",

  "Indeed (119)",

  "Glassdoor (82)",
];
const InputBox = ({ item }) => {
  const { title, child, img } = item;

  return (
    <>
      <div className="rounded-md bg-white shadow-md flex  justify-center items-center group relative  ">
        <div className="text-[#333] justify-center items-center text-[14px] flex font-medium w-auto px-4 py-3 gap-1">
          <div class="">
            <div class=" transition-transform transform  flex items-center justify-center gap-1">
              {title}
              <img src={img} className=" h-[20px] w-[20px]  object-cover" />
            </div>
            <div
              class="  hidden dropdown mt-1 bg-[#fff] p-4 group-hover:block  rounded-[6px] dropdown-hover:block absolute bottom-100 left-[1px] w-[340px] gap-[10px] top-[46px]"
              style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex flex-col gap-5 items-start">
                <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                  <div className="w-[24px] h-[24px]">
                    <img src="/images/jobs/ser.png" alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="search"
                    className="font-montserrat font-normal text-[14px] text-black "
                  />
                </div>

                <div className="flex  gap-2 self-stretch flex-col items-start ">
                  {child.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <p className="font-montserrat font-medium text-[12px] text-black flex flex-col">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-start w-full gap-2">
                  <button className="rounded-[8px] border border-blue w-[49%] text-black  py-[12px]">
                    <p className="text-[12px] font-[700px] text-black ">
                      clear
                    </p>
                  </button>
                  <button className="rounded-[8px] border border-blue bg-blue w-[49%]  text-black  py-[12px]">
                    <p className="text-[12px] font-[700px] text-white  ">
                      Apply
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Jobs() {
  const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
  const [filter, setFilter] = useState(false);
  const jobData = useSelector((state) => state.getAllJobs.data);
  const [selectedJob, setSelectedJob] = useState();
  const [toggleHeadings, setToggleHeadings] = useState(0);
  const [savedJobList, setSavedJobList] = useState([]);
  useEffect(() => {
    if (toggleHeadings >= 3) {
      setFilter(false);
    }
  }, [toggleHeadings]);

  const numberOfDivs = 5;

  const [status, setStatus] = React.useState(false);
  const Application_status = [
    {
      tittle: "Total Applied Jobs",
      img: (
        <img
          className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#06A9EF]"
          src="/images/jobs/work_white.png"
          alt=""
        />
      ),
      num: "60",
    },
    {
      tittle: "New Updates",
      img: (
        <img
          className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#FF9B52]"
          src="/images/jobs/work_history.png"
          alt=""
        />
      ),
      num: "09",
    },
    {
      tittle: "Search appearances",
      img: (
        <img
          className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#D197FF]"
          src="/images/jobs/Icon.png"
          alt=""
        />
      ),
      num: "60",
    },
    {
      tittle: "Shortlisted",
      img: (
        <img
          className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#47C945]"
          src="/images/jobs/check.png"
          alt=""
        />
      ),
      num: "04",
    },
  ];

  const headings = [
    {
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g mask="url(#mask0_5716_131089)">
            <path
              d="M3 22C2.45 22 1.97917 21.8042 1.5875 21.4125C1.19583 21.0208 1 20.55 1 20V9H3V20H20V22H3ZM7 18C6.45 18 5.97917 17.8042 5.5875 17.4125C5.19583 17.0208 5 16.55 5 16V5H10V3C10 2.45 10.1958 1.97917 10.5875 1.5875C10.9792 1.19583 11.45 1 12 1H16C16.55 1 17.0208 1.19583 17.4125 1.5875C17.8042 1.97917 18 2.45 18 3V5H23V16C23 16.55 22.8042 17.0208 22.4125 17.4125C22.0208 17.8042 21.55 18 21 18H7ZM12 5H16V3H12V5Z"
              fill={toggleHeadings === 0 ? "#FFF" : " #333"}
            />
          </g>
        </svg>
      ),
      title: "All Jobs",
    },
    // {
    //   img: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //     >
    //       <g clip-path="url(#clip0_5716_131095)">
    //         <path
    //           fill-rule="evenodd"
    //           clip-rule="evenodd"
    //           d="M1.02165 11.0703L6.64046 11.0702C6.96564 10.7395 7.32118 10.4389 7.70251 10.1726C7.18473 8.81671 5.87204 7.85362 4.33426 7.85362C2.57087 7.85362 1.10335 9.11999 0.791214 10.7929C0.764167 10.9379 0.874182 11.0703 1.02165 11.0703ZM12.0006 9.57281C15.7182 9.57281 18.7682 12.5827 18.7682 16.3404C18.7682 20.0781 15.7382 23.1081 12.0006 23.1081C8.26295 23.1081 5.23295 20.0781 5.23295 16.3404C5.2329 12.5827 8.28292 9.57281 12.0006 9.57281ZM11.3019 17.6445C10.0605 17.598 8.87729 17.426 8.11576 17.1274V19.1222C8.11576 19.4656 8.39668 19.7465 8.74004 19.7465H15.2611C15.6045 19.7465 15.8853 19.4656 15.8853 19.1222V17.127C15.1254 17.4242 13.9419 17.5969 12.6994 17.6441C12.5687 17.897 12.3048 18.0699 12.0006 18.0699C11.6964 18.0699 11.4327 17.8972 11.3019 17.6445ZM12.6839 16.895C14.0755 16.8444 15.3556 16.639 15.9225 16.2804C16.1251 16.1509 16.2655 15.8366 16.2655 15.5997V14.0779C16.2655 13.9017 16.1218 13.758 15.9457 13.758H13.8732V13.0242C13.8732 12.4868 13.4349 12.0484 12.8974 12.0484H11.1038C10.5664 12.0484 10.128 12.4868 10.128 13.0242V13.758H8.05548C7.87932 13.758 7.73565 13.9017 7.73565 14.0779V15.5997C7.73565 15.8368 7.87604 16.1507 8.07868 16.2804C8.64868 16.641 9.92776 16.8455 11.3171 16.8954C11.4521 16.6582 11.707 16.4977 12.0006 16.4977C12.294 16.4977 12.5488 16.6581 12.6839 16.895ZM13.1232 13.758V13.0242C13.1232 12.9007 13.0209 12.7984 12.8974 12.7984H11.1038C10.9804 12.7984 10.878 12.9007 10.878 13.0242V13.758H13.1232ZM4.33426 3.90173C5.34076 3.90173 6.15671 4.71768 6.15671 5.72418C6.15671 6.73068 5.34076 7.54663 4.33426 7.54663C3.32776 7.54663 2.51181 6.73068 2.51181 5.72418C2.51185 4.71763 3.32781 3.90173 4.33426 3.90173ZM12.0006 0.891602C13.0071 0.891602 13.823 1.70755 13.823 2.71405C13.823 3.72055 13.0071 4.53651 12.0006 4.53651C10.9941 4.53651 10.1781 3.72055 10.1781 2.71405C10.1781 1.70755 10.9941 0.891602 12.0006 0.891602ZM19.6669 3.90173C20.6734 3.90173 21.4893 4.71768 21.4893 5.72418C21.4893 6.73068 20.6734 7.54663 19.6669 7.54663C18.6604 7.54663 17.8444 6.73068 17.8444 5.72418C17.8445 4.71763 18.6604 3.90173 19.6669 3.90173ZM17.3607 11.0703L22.9795 11.0702C23.127 11.0702 23.237 10.9378 23.2099 10.7929C22.8978 9.11999 21.4303 7.85362 19.6669 7.85362C18.1291 7.85362 16.8164 8.81671 16.2986 10.1726C16.68 10.439 17.0355 10.7396 17.3607 11.0703ZM8.68796 8.06019L15.3132 8.06015C15.4606 8.06015 15.5707 7.92777 15.5436 7.78279C15.2315 6.10991 13.764 4.84354 12.0006 4.84354C10.2372 4.84354 8.76967 6.10991 8.45752 7.78279C8.43048 7.92777 8.54049 8.06019 8.68796 8.06019Z"
    //           fill={toggleHeadings === 1 ? "#FFF" : " #333"}
    //         />
    //       </g>
    //       <defs>
    //         <clipPath id="clip0_5716_131095">
    //           <rect width="24" height="24" fill="white" />
    //         </clipPath>
    //       </defs>
    //     </svg>
    //   ),
    //   title: "Internal Jobs",
    // },
    // {
    //   img: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //     >
    //       <g clip-path="url(#clip0_5716_131100)">
    //         <path
    //           d="M1.60078 19.1999H9.60078V14.7999H9.20078C8.77643 14.7999 8.36947 14.6314 8.06941 14.3313C7.76935 14.0313 7.60078 13.6243 7.60078 13.1999V11.1999H1.60078C1.31908 11.1983 1.04292 11.1215 0.800781 10.9775V18.3999C0.800781 18.6121 0.885067 18.8156 1.0351 18.9656C1.18512 19.1157 1.38861 19.1999 1.60078 19.1999Z"
    //           fill={toggleHeadings === 2 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M9.60039 14.0002V11.6002C9.60026 11.4659 9.61366 11.3318 9.64039 11.2002H8.40039V13.2002C8.40039 13.4124 8.48468 13.6159 8.63471 13.7659C8.78473 13.9159 8.98822 14.0002 9.20039 14.0002H9.60039Z"
    //           fill={toggleHeadings === 2 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M11.6008 9.5999H20.8008V5.1999C20.8008 4.98773 20.7165 4.78425 20.5665 4.63422C20.4164 4.48419 20.213 4.3999 20.0008 4.3999H1.60078C1.38861 4.3999 1.18512 4.48419 1.0351 4.63422C0.885067 4.78425 0.800781 4.98773 0.800781 5.1999V9.5999C0.800781 9.81208 0.885067 10.0156 1.0351 10.1656C1.18512 10.3156 1.38861 10.3999 1.60078 10.3999H10.0112C10.1959 10.1524 10.4357 9.95125 10.7116 9.8124C10.9875 9.67355 11.2919 9.6008 11.6008 9.5999Z"
    //           fill={toggleHeadings === 2 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M14.8008 3.5998V2.3998C14.8008 1.97546 14.6322 1.56849 14.3322 1.26843C14.0321 0.968376 13.6251 0.799805 13.2008 0.799805H8.40078C7.97643 0.799805 7.56947 0.968376 7.26941 1.26843C6.96935 1.56849 6.80078 1.97546 6.80078 2.3998V3.5998H7.60078V2.3998C7.60078 2.18763 7.68507 1.98415 7.8351 1.83412C7.98513 1.68409 8.18861 1.5998 8.40078 1.5998H13.2008C13.413 1.5998 13.6164 1.68409 13.7665 1.83412C13.9165 1.98415 14.0008 2.18763 14.0008 2.3998V3.5998H14.8008Z"
    //           fill={toggleHeadings === 2 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M19.1938 14.5202C19.1232 14.458 19.0358 14.4179 18.9426 14.405C18.8493 14.392 18.7544 14.4068 18.6694 14.4474C18.59 14.4816 18.5222 14.538 18.4742 14.6099C18.4262 14.6819 18.4001 14.7661 18.399 14.8526V15.6002C18.399 15.7063 18.3569 15.808 18.2819 15.883C18.2069 15.958 18.1051 16.0002 17.999 16.0002H16.799C15.8156 16.0044 14.8609 16.3322 14.0822 16.9328C13.3035 17.5335 12.7441 18.3737 12.4902 19.3238C12.6973 19.1579 12.9133 19.0037 13.1374 18.8618C14.6046 17.9865 16.2914 17.5488 17.999 17.6002C18.1051 17.6002 18.2069 17.6423 18.2819 17.7173C18.3569 17.7924 18.399 17.8941 18.399 18.0002V18.7482C18.3999 18.8346 18.4258 18.9189 18.4735 18.9909C18.5213 19.0629 18.589 19.1194 18.6682 19.1538C18.7532 19.1941 18.8482 19.2087 18.9414 19.196C19.0346 19.1832 19.122 19.1435 19.193 19.0818L21.4442 17.1346C21.4927 17.0933 21.5316 17.042 21.5582 16.9842C21.5849 16.9263 21.5987 16.8634 21.5987 16.7998C21.5987 16.7361 21.5849 16.6732 21.5582 16.6154C21.5316 16.5576 21.4927 16.5063 21.4442 16.465L19.1938 14.5202Z"
    //           fill={toggleHeadings === 2 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M23.2004 11.5999C23.2004 11.2816 23.074 10.9764 22.8489 10.7514C22.6239 10.5263 22.3187 10.3999 22.0004 10.3999H11.6004C11.2821 10.3999 10.9769 10.5263 10.7519 10.7514C10.5268 10.9764 10.4004 11.2816 10.4004 11.5999V21.9999C10.4004 22.3182 10.5268 22.6234 10.7519 22.8484C10.9769 23.0735 11.2821 23.1999 11.6004 23.1999H22.0004C22.3187 23.1999 22.6239 23.0735 22.8489 22.8484C23.074 22.6234 23.2004 22.3182 23.2004 21.9999V11.5999ZM21.9732 17.7367L21.9712 17.7387L19.7204 19.6863C19.534 19.8493 19.3042 19.9545 19.059 19.9891C18.8138 20.0237 18.5638 19.9862 18.3396 19.8811C18.1196 19.7845 17.9325 19.6258 17.8012 19.4246C17.67 19.2233 17.6002 18.9882 17.6004 18.7479V18.4071C16.1786 18.4178 14.7855 18.8082 13.5652 19.5379C13.2463 19.7384 12.947 19.9685 12.6712 20.2251C12.5555 20.3367 12.4012 20.3993 12.2404 20.3999C12.1483 20.3993 12.0574 20.379 11.9738 20.3403C11.8903 20.3016 11.816 20.2454 11.756 20.1755C11.696 20.1056 11.6517 20.0237 11.6261 19.9352C11.6005 19.8468 11.5942 19.7538 11.6076 19.6627C11.8008 18.4227 12.4298 17.2923 13.3816 16.4743C14.3333 15.6564 15.5455 15.2045 16.8004 15.1999H17.6004V14.8523C17.6003 14.6124 17.67 14.3776 17.801 14.1765C17.9319 13.9755 18.1185 13.8168 18.338 13.7199C18.5622 13.6149 18.8122 13.5774 19.0574 13.612C19.3026 13.6467 19.5324 13.752 19.7188 13.9151L21.9712 15.8623C22.1059 15.9786 22.214 16.1224 22.2881 16.2842C22.3623 16.4459 22.4008 16.6217 22.4009 16.7996C22.4011 16.9776 22.363 17.1535 22.2892 17.3153C22.2154 17.4772 22.1076 17.6214 21.9732 17.7379V17.7367Z"
    //           fill={toggleHeadings === 2 ? "#FFF" : " #333"}
    //         />
    //       </g>
    //       <defs>
    //         <clipPath id="clip0_5716_131100">
    //           <rect width="24" height="24" fill="white" />
    //         </clipPath>
    //       </defs>
    //     </svg>
    //   ),
    //   title: "External Jobs",
    // },
    // {
    //   img: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //     >
    //       <g clip-path="url(#clip0_5716_131110)">
    //         <path
    //           d="M19.3486 13.2906C20.3484 13.2906 21.293 13.5339 22.125 13.9651V10.3042L14.595 12.272C14.5481 12.4998 14.4764 12.7183 14.3827 12.9245C13.8909 14.0092 12.7973 14.7658 11.5312 14.7658C10.0238 14.7658 8.76188 13.6937 8.4675 12.272L0.9375 10.3042V17.7944C0.9375 19.1486 2.03906 20.2501 3.39328 20.2501H13.3575C13.3134 19.9562 13.2905 19.6548 13.2905 19.3487C13.2905 16.0084 16.0083 13.2906 19.3486 13.2906Z"
    //           fill={toggleHeadings === 3 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M8.40234 9.33984C8.40234 8.24813 9.29109 7.35938 10.3828 7.35938H12.6797C13.7714 7.35938 14.6602 8.24813 14.6602 9.33984V10.8014L22.537 8.74266C22.8464 8.66203 23.0625 8.38219 23.0625 8.0625V3.51562C23.0625 3.1275 22.7475 2.8125 22.3594 2.8125H16.2656V2.29781C16.2656 1.03078 15.2348 0 13.9678 0H9.09469C7.82766 0 6.79688 1.03078 6.79688 2.29781V2.8125H0.703125C0.315 2.8125 0 3.1275 0 3.51562V8.0625C0 8.38219 0.216094 8.66203 0.525469 8.74266L8.40234 10.8014V9.33984ZM8.20312 2.29781C8.20312 1.80609 8.60297 1.40625 9.09469 1.40625H13.9678C14.4595 1.40625 14.8594 1.80609 14.8594 2.29781V2.8125H8.20312V2.29781Z"
    //           fill={toggleHeadings === 3 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M10.3828 8.76562C10.0658 8.76562 9.80859 9.02288 9.80859 9.3398V11.6365C9.80859 12.5862 10.5814 13.359 11.5311 13.359C12.4808 13.359 13.2536 12.5862 13.2536 11.6365V9.3398C13.2536 9.02288 12.9964 8.76562 12.6795 8.76562H10.3828Z"
    //           fill={toggleHeadings === 3 ? "#FFF" : " #333"}
    //         />
    //         <path
    //           d="M19.3491 14.6968C16.7841 14.6968 14.6973 16.7837 14.6973 19.3487C14.6973 21.9137 16.7841 24.0001 19.3491 24.0001C21.9141 24.0001 24.0005 21.9137 24.0005 19.3487C24.0005 16.7837 21.9141 14.6968 19.3491 14.6968ZM21.3905 18.9324L19.5648 20.7582C19.2973 21.0298 18.8421 21.0346 18.5701 20.7582L17.3082 19.4958C17.0335 19.2216 17.0335 18.7763 17.3082 18.5016C17.5824 18.2269 18.0277 18.2269 18.3024 18.5016L19.0674 19.2666L20.3959 17.9382C20.6705 17.6635 21.1159 17.6635 21.3905 17.9382C21.6648 18.2129 21.6648 18.6582 21.3905 18.9324Z"
    //           fill={toggleHeadings === 3 ? "#FFF" : " #333"}
    //         />
    //       </g>
    //       <defs>
    //         <clipPath id="clip0_5716_131110">
    //           <rect width="24" height="24" fill="white" />
    //         </clipPath>
    //       </defs>
    //     </svg>
    //   ),
    //   title: "Applied Jobs",
    // },
    {
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="22"
          viewBox="0 0 16 22"
          fill="none"
        >
          <path
            d="M13.9322 0.714355H2.70242C1.60925 0.714355 0.714844 1.60877 0.714844 2.70193V20.0435C0.714844 20.5156 0.988136 20.9628 1.4105 21.1616C1.8577 21.3603 2.3546 21.3106 2.72727 21.0125L2.75211 20.9876L8.31733 16.292L13.8825 20.9876L13.9074 21.0125C14.131 21.1864 14.4043 21.2858 14.6776 21.2858C14.8515 21.2858 15.0502 21.2361 15.2242 21.1367C15.6465 20.938 15.9198 20.4908 15.9198 20.0187V2.70193C15.9198 1.60877 15.0254 0.714355 13.9322 0.714355Z"
            fill={toggleHeadings === 4 ? "#FFF" : " #333"}
          />
        </svg>
      ),
      title: "Saved Jobs",
    },
  ];
  useEffect(() => {
    if (jobData.length > 0) {
      setSelectedJob(jobData[0]);
    }
  }, [jobData]);

  useEffect(() => {
    const jobsFromLocal = JSON.parse(localStorage.getItem("savedJobs"));
    if (jobsFromLocal) {
      setSavedJobList(jobsFromLocal);
    }
  }, [recall]);

  const saveJobToLocal = (e, id) => {
    e.stopPropagation();
    localStorage.setItem("savedJobs", JSON.stringify([...savedJobList, id]));
    forceUpdate();
  };
  const removeJobToLocal = (e, id) => {
    e.stopPropagation();
    const filter = savedJobList.filter((item) => item !== id);
    localStorage.setItem("savedJobs", JSON.stringify(filter));
    forceUpdate();
  };

  return (
    <div className="relative   ">
      <div className="sticky top-[5.6rem] z-50">
        <div style={{ backgroundColor: "#BCECFF" }}>
          <div className=" customMargins  ">
            <div className={`flex items-start gap-4 py-3  `}>
              {headings.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-2 py-2 px-4 items-center ${
                    toggleHeadings === (item.title == "Saved Jobs" ? 4 : 0) &&
                    "bg-[#06A9EF] rounded-[6px]"
                  }`}
                >
                  {item.img}
                  <p
                    className={`text-[16px] text-black font-semibold cursor-pointer  ${
                      toggleHeadings === (item.title == "Saved Jobs" ? 4 : 0) &&
                      " text-white"
                    }`}
                    onClick={() => {
                      forceUpdate();
                      setToggleHeadings(item.title == "Saved Jobs" ? 4 : 0);
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* {toggleHeadings <= 2 &&
          <div style={{ backgroundColor: "#E0F6FF" }} className="">
            <div className="customMargins">
              <div className="flex items-center py-5  justify-between">
                {inputData.map((item, index) => (
                  <InputBox
                    item={item}
                    className="text-[14px] font-medium flex items-center w-auto "
                  />
                ))}
                <button
                  onClick={() => setFilter(!filter)}
                  className="px-4 py-3  rounded-[6px] bg-[#FFF] "
                >
                  <img
                    className="h-[24px] w-[24px]"
                    src="/images/jobs/fil.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        }
        {toggleHeadings === 2 &&
          <div style={{ backgroundColor: "#f9f9f9" }}>
            <div className=" customMargins  ">
              <div className="inline-flex pt-6 justify-center items-center gap-2">
                {btns.map((item) => (
                  <button className="rounded-full border border-blue bg-white">
                    <p className="font-medium text-[14px] text-black py-2 px-4">

                      {item}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        } */}
      </div>

      <div className="bg-[#F9F9F9]">
        <div className=" customMargins ">
          <div className="grid grid-cols-12 py-[12px] gap-[24px] ">
            {/* FIRST SECTION   */}
            {filter ? (
              <div className="flex flex-col col-span-3 rounded-md bg-white shadow-md mt-6">
                <div className="flex justify-between  p-4 bg-white shadow-md  items-start  ">
                  <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                    All Filters
                  </p>
                  <button className="text-primary font-montserrat text-sm font-medium text-blue">
                    Reset all
                  </button>
                </div>

                <div className="h-[996px] overflow-hidden overflow-y-scroll ">
                  <div className="flex flex-col items-start justify-center p-4 gap-2 ">
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Location
                      </p>
                    </div>
                    <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                      <div className="w-[24px] h-[24px]">
                        <img src="/images/jobs/ser.png" alt="" />
                      </div>
                      <input
                        type="text"
                        placeholder="search"
                        className="font-montserrat font-normal text-[14px] text-black "
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bengaluru / Banglore
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Chennai
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Chennai
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Chennai
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>

                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Industry
                      </p>
                    </div>
                    <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                      <div className="w-[24px] h-[24px]">
                        <img src="/images/jobs/ser.png" alt="" />
                      </div>
                      <input
                        type="text"
                        placeholder="search"
                        className="font-montserrat font-normal text-[14px] text-black "
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Others
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          IT/ Computers - Software
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Banking/ Accounting/Financial Services
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Internet/ E-commerce
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Education/ Training
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Salary
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          More than $ 8 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Not Specified
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black"></p>
                    </div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Experience
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          0-1 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          1-2 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          2-5 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          5-7 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          7-10 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          10-15 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          15-* Years
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>

                    {/* SCROLL  */}
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Education
                      </p>
                    </div>
                    <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                      <div className="w-[24px] h-[24px]">
                        <img src="/images/jobs/ser.png" alt="" />
                      </div>
                      <input
                        type="text"
                        placeholder="search"
                        className="font-montserrat font-normal text-[14px] text-black "
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bachelor Of Technology (B.Tech/B.E)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bachelor Of Computer Application (B.C.A)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bachelor of Design (B.Des.)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Master of Science (MS/M.Sc)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Masters in Technology (M.Tech/M.E)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bachelor of Arts (B.A)
                        </p>
                      </div>
                      <div className="border-b border-gray w-full h-[10px]"></div>
                    </div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Job type
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Full-time Jobs
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Contract Jobs
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Part-time Jobs
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md  h-[20px] w-[20px] border-[1px] border-[#06A9EF] bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Internships
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Job mode
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          On-site
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Remote
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Hybrid
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          International
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Work From Home
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Jobs for Women
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Date posted
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Anytime
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Past month
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Past week
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md  h-[20px] w-[20px] border-[1px] border-[#06A9EF] bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Past 24 hrs
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col col-span-2 rounded-md bg-white shadow-md py-6 px-4 mt-6 items-start gap-4 h-fit ">
                <div className="flex flex-col items-center gap-[8px]">
                  <p className="text-[22px] font-[500] text-[#333] ">
                    Application Status
                  </p>
                  <p className="text-[12px] leading-[18px] text-[#333]">
                    Track your job applications, get updates on views and
                    profile activity.
                  </p>
                </div>
                <div className="w-[100%] bg-[#06A9EF] h-[1px]"></div>

                {Application_status.map((item, index) => (
                  <>
                    <div className="flex justify-between w-[100%]">
                      <div className="flex flex-col justify-center gap-[8px] items-start">
                        <div className="flex justify-center">
                          <p className="text-[14px] font-[500] text-[#333]">
                            {item.tittle}
                          </p>
                        </div>
                        <p className="text-[36px] font-[500] text-[#333]">
                          {item.num}
                        </p>
                      </div>
                      {item.img}
                    </div>
                    <div
                      className={`w-[100%] h-[1px] ${
                        index === Application_status.length - 1
                          ? ""
                          : "bg-[#06A9EF] "
                      }`}
                    ></div>
                  </>
                ))}
              </div>
            )}

            {(toggleHeadings === 0 ||
              toggleHeadings === 1 ||
              toggleHeadings === 2) && (
              <>
                {/* SECOND SECTION   */}
                <div
                  className={`flex flex-col  mt-6  col-span-4
                     rounded-md border-primary bg-white shadow-md `}
                  style={{
                    boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="p-[8px]  leading-tight ">
                    {jobData?.map((item, index) => (
                      <>
                        <div
                          onClick={() => {
                            setSelectedJob(item);
                            window.scroll(0, 0);
                          }}
                          className={`p-[16px] flex flex-col gap-[8px] relative z-0 ${
                            selectedJob?._id == item._id && "selected_job_card"
                          } `}
                          style={{
                            borderBottom:
                              selectedJob?._id == item._id
                                ? "unset"
                                : "1px solid #646464",
                          }}
                          key={index}
                        >
                          <div className=" flex flex-col gap-[16px] ">
                            <div className="flex flex-row">
                              <div className="flex flex-col gap-[4px]">
                                <div className="text-[20px] font-medium">
                                  {item?.title}
                                </div>
                                <div className="text-[12px] font-medium">
                                  {item?.company}
                                </div>
                              </div>
                              {/* <div className="flex flex-row  items-end">
                                <div className="flex flex-row gap-[4px]">
                                  <div className="flex justify-center items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.73242 0.809018L6.84174 4.22315L6.89787 4.3959H7.07951H10.6693L7.7651 6.50595L7.61816 6.61271L7.67428 6.78546L8.7836 10.1996L5.87937 8.08954L5.73242 7.98278L5.58548 8.08954L2.68124 10.1996L3.79056 6.78546L3.84669 6.61271L3.69974 6.50595L0.795504 4.3959H4.38534H4.56697L4.6231 4.22315L5.73242 0.809018Z"
                                        fill="#FFDA1D"
                                        stroke="#FFCC7E"
                                        stroke-width="0.5"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-[#262626] text-[10px] font-[400]">
                                    3.7
                                  </div>
                                </div>
                              </div> */}
                            </div>
                            <div className="flex flex-row gap-[11px] items-center leading-tight ">
                              {item?.experiance && (
                                <>
                                  {" "}
                                  <div className="flex flex-row gap-[4px]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 14 15"
                                      fill="none"
                                    >
                                      <g mask="url(#mask0_4135_57914)">
                                        <path
                                          d="M2.33073 12.7503C2.0099 12.7503 1.73524 12.6361 1.50677 12.4076C1.2783 12.1792 1.16406 11.9045 1.16406 11.5837V5.16701C1.16406 4.84617 1.2783 4.57152 1.50677 4.34305C1.73524 4.11458 2.0099 4.00034 2.33073 4.00034H4.66406V2.83367C4.66406 2.51284 4.7783 2.23819 5.00677 2.00972C5.23524 1.78124 5.5099 1.66701 5.83073 1.66701H8.16406C8.48489 1.66701 8.75955 1.78124 8.98802 2.00972C9.21649 2.23819 9.33073 2.51284 9.33073 2.83367V4.00034H11.6641C11.9849 4.00034 12.2595 4.11458 12.488 4.34305C12.7165 4.57152 12.8307 4.84617 12.8307 5.16701V11.5837C12.8307 11.9045 12.7165 12.1792 12.488 12.4076C12.2595 12.6361 11.9849 12.7503 11.6641 12.7503H2.33073ZM2.33073 11.5837H11.6641V5.16701H2.33073V11.5837ZM5.83073 4.00034H8.16406V2.83367H5.83073V4.00034Z"
                                          fill="#646464"
                                        />
                                      </g>
                                    </svg>

                                    <div className="text-[#262626] text-[12px] font-[400] ">
                                      {item.experiance}
                                    </div>
                                  </div>
                                  <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                                </>
                              )}
                              {item?.jobType && (
                                <>
                                  <div className="flex flex-row gap-[4px]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 14 15"
                                      fill="none"
                                    >
                                      <g mask="url(#mask0_4135_57920)">
                                        <path
                                          d="M4.66732 12.167H9.33398V10.417C9.33398 9.77534 9.10551 9.22604 8.64857 8.76909C8.19162 8.31215 7.64232 8.08367 7.00065 8.08367C6.35898 8.08367 5.80968 8.31215 5.35273 8.76909C4.89579 9.22604 4.66732 9.77534 4.66732 10.417V12.167ZM7.00065 6.91701C7.64232 6.91701 8.19162 6.68854 8.64857 6.23159C9.10551 5.77465 9.33398 5.22534 9.33398 4.58367V2.83367H4.66732V4.58367C4.66732 5.22534 4.89579 5.77465 5.35273 6.23159C5.80968 6.68854 6.35898 6.91701 7.00065 6.91701ZM2.33398 13.3337V12.167H3.50065V10.417C3.50065 9.82395 3.63919 9.26735 3.91628 8.74722C4.19336 8.22708 4.57982 7.81145 5.07565 7.50034C4.57982 7.18923 4.19336 6.77361 3.91628 6.25347C3.63919 5.73333 3.50065 5.17673 3.50065 4.58367V2.83367H2.33398V1.66701H11.6673V2.83367H10.5007V4.58367C10.5007 5.17673 10.3621 5.73333 10.085 6.25347C9.80794 6.77361 9.42148 7.18923 8.92565 7.50034C9.42148 7.81145 9.80794 8.22708 10.085 8.74722C10.3621 9.26735 10.5007 9.82395 10.5007 10.417V12.167H11.6673V13.3337H2.33398Z"
                                          fill="#646464"
                                        />
                                      </g>
                                    </svg>
                                    <div className="text-[#262626] text-[12px] font-[400]">
                                      {item.jobType}
                                    </div>
                                  </div>
                                  <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                                </>
                              )}
                              {item?.location && (
                                <div className="flex flex-row gap-[4px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                  >
                                    <g mask="url(#mask0_4135_57926)">
                                      <path
                                        d="M7.00065 7.50034C7.32148 7.50034 7.59614 7.38611 7.82461 7.15763C8.05308 6.92916 8.16732 6.65451 8.16732 6.33367C8.16732 6.01284 8.05308 5.73819 7.82461 5.50972C7.59614 5.28124 7.32148 5.16701 7.00065 5.16701C6.67982 5.16701 6.40516 5.28124 6.17669 5.50972C5.94822 5.73819 5.83398 6.01284 5.83398 6.33367C5.83398 6.65451 5.94822 6.92916 6.17669 7.15763C6.40516 7.38611 6.67982 7.50034 7.00065 7.50034ZM7.00065 11.7878C8.18676 10.699 9.06662 9.70972 9.64023 8.82013C10.2138 7.93055 10.5007 7.14062 10.5007 6.45034C10.5007 5.39062 10.1628 4.52291 9.48711 3.84722C8.81141 3.17152 7.9826 2.83367 7.00065 2.83367C6.01871 2.83367 5.18989 3.17152 4.51419 3.84722C3.8385 4.52291 3.50065 5.39062 3.50065 6.45034C3.50065 7.14062 3.78746 7.93055 4.36107 8.82013C4.93468 9.70972 5.81454 10.699 7.00065 11.7878ZM7.00065 13.3337C5.43537 12.0017 4.26628 10.7646 3.49336 9.62222C2.72044 8.47986 2.33398 7.42256 2.33398 6.45034C2.33398 4.99201 2.80308 3.8302 3.74128 2.96492C4.67947 2.09965 5.76593 1.66701 7.00065 1.66701C8.23537 1.66701 9.32183 2.09965 10.26 2.96492C11.1982 3.8302 11.6673 4.99201 11.6673 6.45034C11.6673 7.42256 11.2809 8.47986 10.5079 9.62222C9.73503 10.7646 8.56593 12.0017 7.00065 13.3337Z"
                                        fill="#646464"
                                      />
                                    </g>
                                  </svg>
                                  <div className="text-[#262626] text-[12px] font-[400]">
                                    {item.location.slice(0, 6)}...
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-row gap-[4px]">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_4135_57931)">
                                    <path
                                      d="M4.375 10.675H9.625V9.45H4.375V10.675ZM4.375 8.225H9.625V7H4.375V8.225ZM3.0625 13.125C2.70156 13.125 2.39258 13.0051 2.13555 12.7652C1.87852 12.5253 1.75 12.2369 1.75 11.9V2.1C1.75 1.76313 1.87852 1.47474 2.13555 1.23484C2.39258 0.994948 2.70156 0.875 3.0625 0.875H8.3125L12.25 4.55V11.9C12.25 12.2369 12.1215 12.5253 11.8645 12.7652C11.6074 13.0051 11.2984 13.125 10.9375 13.125H3.0625ZM7.65625 5.1625V2.1H3.0625V11.9H10.9375V5.1625H7.65625Z"
                                      fill="#646464"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className="text-[#262626] font-[400] text-[12px]">
                                {item?.description?.slice(0, 90)}...
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="text-[12px]">{item.postedAt}</div>
                            <div>
                              {savedJobList.find((data) => data == item._id) ? (
                                <svg
                                  onClick={(e) => removeJobToLocal(e, item._id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="18"
                                  viewBox="0 0 14 18"
                                  fill="none"
                                >
                                  <path
                                    d="M0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V18L7 15L0 18Z"
                                    fill="#333333"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  onClick={(e) => saveJobToLocal(e, item._id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <g mask="url(#mask0_4135_57938)">
                                    <path
                                      d="M5 21V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V21L12 18L5 21ZM7 17.95L12 15.8L17 17.95V5H7V17.95Z"
                                      fill={"#646464"}
                                    />
                                  </g>
                                </svg>
                              )}
                            </div>
                          </div>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="101" height="34" viewBox="0 0 101 34" fill="none" className="  absolute right-10 top-0">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5H95.5405L99 8H3V5Z" fill="#C00000" />
                            <g filter="url(#filter0_d_5716_132589)">
                              <path d="M95.5405 5H3V25C3 28.3137 5.68629 31 9 31H89.5405C92.8542 31 95.5405 28.3137 95.5405 25V5Z" fill="#FF5973" />
                            </g>
                            <defs>
                              <filter id="filter0_d_5716_132589" x="0" y="0" width="100.541" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="1" dy="-1" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5716_132589" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5716_132589" result="shape" />
                              </filter>
                            </defs>
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">by Recruiter</text>
                          </svg> */}
                        </div>
                      </>
                    ))}
                  </div>
                </div>

                {/* LAST SECTION   */}
                {selectedJob && (
                  <>
                    <div
                      className={`flex mt-6  ${
                        filter ? "col-span-5" : "col-span-6"
                      } flex-col  `}
                    >
                      <div
                        className="p-[16px]   border-[1px] border-[#06A9EF] bg-[#fff] rounded-[8px] flex flex-col gap-[16px]  "
                        style={{
                          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid #646464",
                          }}
                        >
                          <div className="flex flex-col gap-[4px]">
                            <div className="text-[#333] text-[20px] font-[500]">
                              {selectedJob.title}
                            </div>
                            <div className="text-[#333] text-[10px] font-[400]">
                              {selectedJob.company}
                            </div>
                            <div className="flex flex-row gap-[4px] text-[#333] text-[12px] font-[400]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                              >
                                <g mask="url(#mask0_4475_58296)">
                                  <path
                                    d="M6.93699 7.50042C7.25707 7.50042 7.53108 7.38618 7.75902 7.15771C7.98695 6.92924 8.10092 6.65458 8.10092 6.33375C8.10092 6.01292 7.98695 5.73826 7.75902 5.50979C7.53108 5.28132 7.25707 5.16708 6.93699 5.16708C6.61691 5.16708 6.3429 5.28132 6.11496 5.50979C5.88702 5.73826 5.77305 6.01292 5.77305 6.33375C5.77305 6.65458 5.88702 6.92924 6.11496 7.15771C6.3429 7.38618 6.61691 7.50042 6.93699 7.50042ZM6.93699 11.7879C8.12032 10.699 8.99812 9.70979 9.57039 8.82021C10.1427 7.93063 10.4288 7.1407 10.4288 6.45042C10.4288 5.3907 10.0917 4.52299 9.41762 3.84729C8.74351 3.1716 7.91663 2.83375 6.93699 2.83375C5.95734 2.83375 5.13046 3.1716 4.45635 3.84729C3.78224 4.52299 3.44518 5.3907 3.44518 6.45042C3.44518 7.1407 3.73132 7.93063 4.30359 8.82021C4.87585 9.70979 5.75365 10.699 6.93699 11.7879ZM6.93699 13.3338C5.37538 12.0018 4.20902 10.7647 3.43791 9.62229C2.6668 8.47993 2.28125 7.42264 2.28125 6.45042C2.28125 4.99208 2.74925 3.83028 3.68525 2.965C4.62124 2.09972 5.70516 1.66708 6.93699 1.66708C8.16882 1.66708 9.25273 2.09972 10.1887 2.965C11.1247 3.83028 11.5927 4.99208 11.5927 6.45042C11.5927 7.42264 11.2072 8.47993 10.4361 9.62229C9.66496 10.7647 8.4986 12.0018 6.93699 13.3338Z"
                                    fill="#333333"
                                  />
                                </g>
                              </svg>
                              {selectedJob.location}
                            </div>
                          </div>
                          <div className="py-[16px] flex gap-2 leading-tight">
                            <a
                              href={selectedJob?.applyUrl}
                              target="_blank"
                              className="text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[8px] px-[16px] rounded-[30px]"
                            >
                              Apply Now
                            </a>
                            {/* <button className="text-[14px] font-[600] flex items-center border border-[#06A9EF] py-[8px] px-[16px] rounded-[30px]">
                            Save
                          </button> */}
                          </div>
                        </div>
                        <div
                          className="pb-[12px]"
                          style={{
                            borderBottom: "1px solid #646464",
                          }}
                        >
                          <div className="text-[20px] text-[500] text-[#333]">
                            Job Details
                          </div>
                          <div className="flex flex-row gap-[5px] text-[12px] text-[#333] font-[500]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="14"
                              viewBox="0 0 16 14"
                              fill="none"
                            >
                              <g mask="url(#mask0_4475_58307)">
                                <path
                                  d="M2.45709 12.2504C2.11279 12.2504 1.81804 12.1362 1.57286 11.9077C1.32767 11.6792 1.20508 11.4046 1.20508 11.0837V4.66705C1.20508 4.34622 1.32767 4.07157 1.57286 3.84309C1.81804 3.61462 2.11279 3.50039 2.45709 3.50039H4.96113V2.33372C4.96113 2.01289 5.08372 1.73823 5.32891 1.50976C5.57409 1.28129 5.86884 1.16705 6.21314 1.16705H8.71717C9.06148 1.16705 9.35622 1.28129 9.60141 1.50976C9.8466 1.73823 9.96919 2.01289 9.96919 2.33372V3.50039H12.4732C12.8175 3.50039 13.1123 3.61462 13.3575 3.84309C13.6026 4.07157 13.7252 4.34622 13.7252 4.66705V11.0837C13.7252 11.4046 13.6026 11.6792 13.3575 11.9077C13.1123 12.1362 12.8175 12.2504 12.4732 12.2504H2.45709ZM2.45709 11.0837H12.4732V4.66705H2.45709V11.0837ZM6.21314 3.50039H8.71717V2.33372H6.21314V3.50039Z"
                                  fill="#333333"
                                />
                              </g>
                            </svg>
                            {selectedJob.jobType}
                          </div>
                          {/* <div className="flex flex-row gap-[5px] text-[12px] text-[#333] font-[500]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                          >
                            <g mask="url(#mask0_4475_58313)">
                              <path
                                d="M4.96106 11.6671H9.96913V9.91705C9.96913 9.27539 9.72394 8.72608 9.23357 8.26914C8.74319 7.81219 8.1537 7.58372 7.4651 7.58372C6.77649 7.58372 6.187 7.81219 5.69662 8.26914C5.20625 8.72608 4.96106 9.27539 4.96106 9.91705V11.6671ZM7.4651 6.41705C8.1537 6.41705 8.74319 6.18858 9.23357 5.73164C9.72394 5.27469 9.96913 4.72539 9.96913 4.08372V2.33372H4.96106V4.08372C4.96106 4.72539 5.20625 5.27469 5.69662 5.73164C6.187 6.18858 6.77649 6.41705 7.4651 6.41705ZM2.45703 12.8337V11.6671H3.70905V9.91705C3.70905 9.324 3.85772 8.7674 4.15508 8.24726C4.45243 7.72712 4.86716 7.3115 5.39927 7.00039C4.86716 6.68928 4.45243 6.27365 4.15508 5.75351C3.85772 5.23337 3.70905 4.67678 3.70905 4.08372V2.33372H2.45703V1.16705H12.4732V2.33372H11.2211V4.08372C11.2211 4.67678 11.0725 5.23337 10.7751 5.75351C10.4778 6.27365 10.063 6.68928 9.53092 7.00039C10.063 7.3115 10.4778 7.72712 10.7751 8.24726C11.0725 8.7674 11.2211 9.324 11.2211 9.91705V11.6671H12.4732V12.8337H2.45703Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                          Permanent
                        </div> */}
                        </div>
                        {/* <div
                        className="flex flex-col gap-[10px] pb-[6px]"
                        style={{
                          borderBottom: "1px solid #646464",
                        }}
                      >
                        <div className="text-[20px] font-[500]">
                          Qualifications
                        </div>
                        <div className="text-[12px] font-[500]">
                          B.e (computer science) <br /> Total Work Experience 2
                          Years (Required)
                        </div>
                      </div> */}
                        {selectedJob?.description?.length > 0 && (
                          <div className="flex flex-col gap-[8px]">
                            <div className="text-[20px] font-[500]">
                              Full job Description
                            </div>
                            <div className="text-[12px] text-[400] gap-[8px] flex flex-col">
                              {selectedJob.description}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <a
                            href={selectedJob.applyUrl}
                            target="_blank"
                            className="text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[8px] px-[16px] rounded-[30px]"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {toggleHeadings === 3 && (
              <div className="col-span-10">
                <AppliedJobs />
              </div>
            )}

            {toggleHeadings === 4 && (
              <div className="col-span-10">
                <SavedJobs />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
