
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ApplicantsDetails from "../../components/featured/employer/afterLogin/bulkUploads/ApplicantsDetails";

function BulkUploads() {
  const router = useRouter()
  const query = router.query;

  const [toggle, setToggle] = useState(0);


  useEffect(() => {

    if (query.content === "ApplicantDetails") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [router.query]);

  const toggleContent = () => {
    const ApplicantDetails = toggle ? "" : "ApplicantDetails";
    router.push(`BulkUploads/?content=${ApplicantDetails}`);
    setToggle((prevToggle) => !prevToggle);
  };


  const [isApplicantDetails, setIsApplicantDetails] = useState(false)

  const contact_info = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <g mask="url(#mask0_7804_70323)">
          <path d="M4.64071 19.5C4.13557 19.5 3.70801 19.325 3.35801 18.975C3.00801 18.625 2.83301 18.1974 2.83301 17.6923V6.3077C2.83301 5.80257 3.00801 5.375 3.35801 5.025C3.70801 4.675 4.13557 4.5 4.64071 4.5H20.0253C20.5304 4.5 20.958 4.675 21.308 5.025C21.658 5.375 21.833 5.80257 21.833 6.3077V17.6923C21.833 18.1974 21.658 18.625 21.308 18.975C20.958 19.325 20.5304 19.5 20.0253 19.5H4.64071ZM12.333 12.5576L4.33298 7.44225V17.6923C4.33298 17.782 4.36183 17.8557 4.41953 17.9134C4.47723 17.9711 4.55096 18 4.64071 18H20.0253C20.115 18 20.1887 17.9711 20.2464 17.9134C20.3041 17.8557 20.333 17.782 20.333 17.6923V7.44225L12.333 12.5576ZM12.333 11L20.1791 5.99998H4.48683L12.333 11ZM4.33298 7.44225V5.99998V17.6923C4.33298 17.782 4.36183 17.8557 4.41953 17.9134C4.47723 17.9711 4.55096 18 4.64071 18H4.33298V7.44225Z" fill="#333333" />
        </g>
      </svg>,
      text: 'kshitijwaghmare111@gmail.com'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <g mask="url(#mask0_7804_70328)">
          <path d="M19.7733 20.5C17.8887 20.5 15.9955 20.0618 14.0936 19.1855C12.1916 18.3092 10.4442 17.073 8.85128 15.4769C7.25833 13.8807 6.02372 12.1333 5.14743 10.2346C4.27115 8.33588 3.83301 6.44423 3.83301 4.55963C3.83301 4.25688 3.93301 4.00458 4.13301 3.80275C4.33301 3.60092 4.58301 3.5 4.88301 3.5H8.14451C8.39707 3.5 8.61983 3.58238 8.81278 3.74713C9.00573 3.91188 9.12848 4.1154 9.18103 4.3577L9.75411 7.29998C9.79386 7.57306 9.78552 7.80768 9.72911 8.00383C9.67271 8.19998 9.57142 8.36472 9.42526 8.49805L7.11566 10.7461C7.48746 11.4269 7.91214 12.0708 8.38971 12.6779C8.86728 13.2849 9.38426 13.8647 9.94066 14.4173C10.4894 14.966 11.0727 15.4756 11.6907 15.9462C12.3086 16.4167 12.9759 16.8545 13.6926 17.2596L15.9368 14.9962C16.0933 14.8333 16.2827 14.7192 16.5051 14.6539C16.7275 14.5885 16.9586 14.5724 17.1984 14.6058L19.9753 15.1712C20.2278 15.2378 20.4339 15.3667 20.5935 15.5577C20.7532 15.7487 20.833 15.9654 20.833 16.2077V19.45C20.833 19.75 20.732 20 20.5302 20.2C20.3284 20.4 20.0761 20.5 19.7733 20.5ZM6.40606 9.32693L8.19068 7.61923C8.22273 7.59358 8.24357 7.55832 8.25318 7.51345C8.2628 7.46857 8.2612 7.4269 8.24838 7.38845L7.81376 5.15383C7.80094 5.10254 7.77851 5.06408 7.74646 5.03845C7.71441 5.0128 7.67274 4.99998 7.62146 4.99998H5.48298C5.44453 4.99998 5.41248 5.0128 5.38683 5.03845C5.36118 5.06408 5.34836 5.09613 5.34836 5.1346C5.39964 5.81793 5.5115 6.51217 5.68393 7.2173C5.85638 7.92243 6.09709 8.62564 6.40606 9.32693ZM15.106 17.9692C15.7689 18.2782 16.4602 18.5144 17.1801 18.6779C17.9 18.8413 18.5727 18.9384 19.1984 18.9692C19.2368 18.9692 19.2689 18.9564 19.2945 18.9308C19.3202 18.9051 19.333 18.873 19.333 18.8346V16.7308C19.333 16.6795 19.3202 16.6378 19.2945 16.6057C19.2689 16.5737 19.2304 16.5512 19.1791 16.5384L17.0791 16.1115C17.0407 16.0987 17.007 16.0971 16.9782 16.1067C16.9493 16.1163 16.9189 16.1372 16.8868 16.1692L15.106 17.9692Z" fill="#333333" />
        </g>
      </svg>,
      text: '87661234567'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <g mask="url(#mask0_7804_70333)">
          <path d="M12.3349 11.8654C12.8325 11.8654 13.2579 11.6882 13.6111 11.3339C13.9643 10.9795 14.1409 10.5536 14.1409 10.056C14.1409 9.55839 13.9637 9.133 13.6094 8.7798C13.255 8.4266 12.8291 8.25 12.3315 8.25C11.8339 8.25 11.4085 8.42717 11.0553 8.7815C10.7021 9.13583 10.5255 9.56179 10.5255 10.0594C10.5255 10.557 10.7027 10.9824 11.057 11.3356C11.4114 11.6888 11.8373 11.8654 12.3349 11.8654ZM12.3332 19.5135C14.2896 17.7622 15.7867 16.0824 16.8246 14.474C17.8624 12.8657 18.3813 11.457 18.3813 10.2481C18.3813 8.42498 17.8021 6.92627 16.6438 5.7519C15.4854 4.57753 14.0486 3.99035 12.3332 3.99035C10.6178 3.99035 9.18096 4.57753 8.02263 5.7519C6.8643 6.92627 6.28513 8.42498 6.28513 10.2481C6.28513 11.457 6.80404 12.8657 7.84186 14.474C8.87969 16.0824 10.3768 17.7622 12.3332 19.5135ZM12.3332 21.5096C9.81656 19.3288 7.92938 17.2993 6.67168 15.4211C5.414 13.5429 4.78516 11.8186 4.78516 10.2481C4.78516 7.94038 5.53163 6.07213 7.02458 4.64328C8.51751 3.21443 10.2871 2.5 12.3332 2.5C14.3794 2.5 16.1489 3.21443 17.6418 4.64328C19.1348 6.07213 19.8813 7.94038 19.8813 10.2481C19.8813 11.8186 19.2524 13.5429 17.9947 15.4211C16.737 17.2993 14.8499 19.3288 12.3332 21.5096Z" fill="#333333" />
        </g>
      </svg>,
      text: 'Pune, Maharashtra, India'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <g mask="url(#mask0_7804_70338)">
          <path d="M11.1407 16.5378H7.37146C6.11582 16.5378 5.04551 16.0953 4.16051 15.2105C3.27551 14.3256 2.83301 13.2554 2.83301 11.9999C2.83301 10.7444 3.27551 9.67406 4.16051 8.78881C5.04551 7.90356 6.11582 7.46094 7.37146 7.46094H11.1407V8.96089H7.37146C6.53171 8.96089 5.81536 9.25736 5.22241 9.85031C4.62946 10.4433 4.33298 11.1596 4.33298 11.9994C4.33298 12.8391 4.62946 13.5555 5.22241 14.1484C5.81536 14.7414 6.53171 15.0378 7.37146 15.0378H11.1407V16.5378ZM8.58301 12.7493V11.2494H16.083V12.7493H8.58301ZM13.5253 16.5378V15.0378H17.2945C18.1343 15.0378 18.8506 14.7414 19.4436 14.1484C20.0365 13.5555 20.333 12.8391 20.333 11.9994C20.333 11.1596 20.0365 10.4433 19.4436 9.85031C18.8506 9.25736 18.1343 8.96089 17.2945 8.96089H13.5253V7.46094H17.2945C18.5501 7.46094 19.6205 7.90338 20.5055 8.78826C21.3905 9.67315 21.833 10.7433 21.833 11.9988C21.833 13.2543 21.3905 14.3247 20.5055 15.2099C19.6205 16.0952 18.5501 16.5378 17.2945 16.5378H13.5253Z" fill="#333333" />
        </g>
      </svg>,
      text: 'www.linkedin.com/in/kshitijw'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <g mask="url(#mask0_7804_70343)">
          <path d="M4.64071 20.4999C4.13557 20.4999 3.70801 20.3249 3.35801 19.9749C3.00801 19.6249 2.83301 19.1973 2.83301 18.6922V8.30765C2.83301 7.80252 3.00801 7.37495 3.35801 7.02495C3.70801 6.67495 4.13557 6.49995 4.64071 6.49995H8.83301V4.80768C8.83301 4.30256 9.00801 3.875 9.35801 3.525C9.70801 3.175 10.1356 3 10.6407 3H14.0253C14.5304 3 14.958 3.175 15.308 3.525C15.658 3.875 15.833 4.30256 15.833 4.80768V6.49995H20.0253C20.5304 6.49995 20.958 6.67495 21.308 7.02495C21.658 7.37495 21.833 7.80252 21.833 8.30765V18.6922C21.833 19.1973 21.658 19.6249 21.308 19.9749C20.958 20.3249 20.5304 20.4999 20.0253 20.4999H4.64071ZM10.333 6.49995H14.333V4.80768C14.333 4.73074 14.3009 4.66023 14.2368 4.59613C14.1727 4.53201 14.1022 4.49995 14.0253 4.49995H10.6407C10.5638 4.49995 10.4932 4.53201 10.4291 4.59613C10.365 4.66023 10.333 4.73074 10.333 4.80768V6.49995ZM20.333 14.7499H14.833V16.4999H9.83301V14.7499H4.33298V18.6922C4.33298 18.7691 4.36503 18.8397 4.42913 18.9038C4.49325 18.9679 4.56377 18.9999 4.64071 18.9999H20.0253C20.1022 18.9999 20.1727 18.9679 20.2368 18.9038C20.3009 18.8397 20.333 18.7691 20.333 18.6922V14.7499ZM11.333 14.9999H13.333V12.9999H11.333V14.9999ZM4.33298 13.25H9.83301V11.5H14.833V13.25H20.333V8.30765C20.333 8.23072 20.3009 8.16019 20.2368 8.09608C20.1727 8.03198 20.1022 7.99993 20.0253 7.99993H4.64071C4.56377 7.99993 4.49325 8.03198 4.42913 8.09608C4.36503 8.16019 4.33298 8.23072 4.33298 8.30765V13.25Z" fill="#333333" />
        </g>
      </svg>,
      text: '4 Years'
    },
  ]

  return (
    <>
      {toggle === 0 &&
        <div className="grid items-start gap-4 ml:h-[80vh] overflow-y-auto pb-2">

          <div
            className="flex w-[100%] p-[16px] flex-col items-start gap-4 rounded-[16px] bg-[#fff] "
            style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex flex-col">
              <p className="text-[18px] sm:text-[24px] text-[#333] font-[500] leading-normal">
                Bulk Upload
              </p>
              <p className="text-[12px] sm:text-[14px] text-[#646464] font-[500] leading-normal">
                upload bulk CV / Resumes & get quick filtered data
              </p>
            </div>
            <p className="text-[16px] sm:text-[20px] text-[#333] font-[500] leading-normal">
              Select Job role
            </p>

            <div className="flex flex-col sm:flex sm:flex-row gap-2 w-[100%] sm:w-auto">
              <select
                className="flex py-[12px] px-[16px] text-[14px] text-[#333] items-center gap-1 rounded-[6px] border solid bg-[#fff] sm:w-[183px] w-[100%] border-[#DEDEDE]"
                name=""
                id=""
              >
                <option value="">Department</option>
                <option value="">b</option>
              </select>

              <select
                className="flex py-[12px] px-[16px]  text-[14px] text-[#333] items-center gap-1 rounded-[6px] border solid bg-[#fff] sm:w-[183px] w-[100%] border-[#DEDEDE]"
                name=""
                id=""
              >
                <option value="">Job Role</option>
                <option value="">b</option>
              </select>
            </div>
          </div>

          <div className=" flex p-[24px] w-[100%]  flex-col justify-center items-center gap-4 rounded-[8px] border-[2px] border-dashed border-[#06A9EF] bg-[#EFFAFF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="55"
              viewBox="0 0 56 55"
              fill="none"
            >
              <g clip-path="url(#clip0_7804_70267)">
                <path
                  d="M40.455 23.809V13.4004C40.455 13.1025 40.3174 12.8272 40.1227 12.6095L28.4531 0.355415C28.2354 0.126304 27.9257 0 27.6164 0H9.11472C5.69905 0 2.9707 2.78541 2.9707 6.20151V41.187C2.9707 44.6031 5.69905 47.3428 9.11472 47.3428H23.719C26.4814 51.9279 31.5025 54.9999 37.2223 54.9999C45.9113 54.9999 53.007 47.9386 53.007 39.2383C53.0187 31.6382 47.562 25.2877 40.455 23.809ZM28.7628 4.0237L36.592 12.2654H31.5138C30.0007 12.2654 28.7628 11.0162 28.7628 9.50305V4.0237ZM9.11472 45.05C6.97132 45.05 5.26349 43.3304 5.26349 41.187V6.20151C5.26349 4.04636 6.97132 2.29278 9.11472 2.29278H26.47V9.50305C26.47 12.2885 28.7284 14.5582 31.5138 14.5582H38.1622V23.5107C37.8186 23.4993 37.5433 23.4649 37.2454 23.4649C33.2447 23.4649 29.5651 25.0011 26.791 27.4085H12.2329C11.6022 27.4085 11.0865 27.9242 11.0865 28.5545C11.0865 29.1851 11.6022 29.7008 12.2329 29.7008H24.659C23.8449 30.8472 23.1685 31.9936 22.6415 33.2546H12.2329C11.6022 33.2546 11.0865 33.7703 11.0865 34.401C11.0865 35.0312 11.6022 35.5474 12.2329 35.5474H21.8962C21.6096 36.6938 21.4607 37.966 21.4607 39.2383C21.4607 41.3016 21.8618 43.3421 22.584 45.0617H9.11472V45.05ZM37.234 52.7189C29.806 52.7189 23.7648 46.6777 23.7648 39.2496C23.7648 31.8216 29.7942 25.7804 37.234 25.7804C44.6734 25.7804 50.7029 31.8216 50.7029 39.2496C50.7029 46.6777 44.6621 52.7189 37.234 52.7189Z"
                  fill="#06A9EF"
                />
                <path
                  d="M12.2333 23.9588H23.8453C24.476 23.9588 24.9917 23.4427 24.9917 22.8124C24.9917 22.1817 24.476 21.666 23.8453 21.666H12.2333C11.6026 21.666 11.0869 22.1817 11.0869 22.8124C11.0869 23.4427 11.6026 23.9588 12.2333 23.9588Z"
                  fill="#06A9EF"
                />
                <path
                  d="M38.0481 30.7906C37.8304 30.5615 37.5324 30.4238 37.2114 30.4238C36.8904 30.4238 36.5925 30.5615 36.3747 30.7906L29.6571 38.0008C29.2215 38.4595 29.2559 39.193 29.7146 39.6172C30.1732 40.0528 30.918 40.0184 31.3536 39.5601L36.0994 34.4819V46.9995C36.0994 47.6302 36.6151 48.1459 37.2458 48.1459C37.8761 48.1459 38.3922 47.6302 38.3922 46.9995V34.4819L43.1033 39.5601C43.3328 39.8006 43.6307 39.9269 43.9404 39.9269C44.2152 39.9269 44.4905 39.8236 44.7196 39.6172C45.1783 39.1816 45.2127 38.4595 44.7771 38.0008L38.0481 30.7906Z"
                  fill="#06A9EF"
                />
              </g>
              <defs>
                <clipPath id="clip0_7804_70267">
                  <rect
                    width="55"
                    height="55"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="flex flex-col">
              <p className="text-[12px] sm:text-[14px] text-[#333] font-[400] leading-[160%] ">
                {" "}
                <span className="text-[#06A9EF] font-[400] ">Browse file</span> or
                drag and drop
              </p>
              <p className="text-[12px] sm:text-[14px] text-[#333] font-[400] leading-[160%] ">
                Allowed file formats: PDF, DOC, DOCX | up to 1.5 MB
              </p>
            </div>

            <button className="py-[8px] text-[12px] sm:text-[14px] text-[#333] font-[500]  px-[16px] flex flex-row justify-center items-center gap-1 rounded-[8px] border-[1px] bg-[#fff] border-[#06A9EF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g mask="url(#mask0_7804_70276)">
                  <path
                    d="M11.25 15.7884V7.3884L8.78462 9.85378L7.7308 8.7692L12 4.5L16.2692 8.7692L15.2153 9.85378L12.7499 7.3884V15.7884H11.25ZM6.3077 19.5C5.80257 19.5 5.375 19.325 5.025 18.975C4.675 18.625 4.5 18.1974 4.5 17.6923V14.9808H5.99997V17.6923C5.99997 17.7692 6.03202 17.8397 6.09612 17.9038C6.16024 17.9679 6.23077 18 6.3077 18H17.6922C17.7692 18 17.8397 17.9679 17.9038 17.9038C17.9679 17.8397 18 17.7692 18 17.6923V14.9808H19.5V17.6923C19.5 18.1974 19.325 18.625 18.975 18.975C18.625 19.325 18.1974 19.5 17.6922 19.5H6.3077Z"
                    fill="#333333"
                  />
                </g>
              </svg>
              Bulk Upload Files
            </button>
          </div>

          <div className="flex gap-6 items-center">
            <div className="flex gap-3 items-center">
              <p className="text-[11px] sm:text-[16px] text-[#333]">Set Filter Limit</p>
              <p className="text-[11px] sm:text-[16px] text-[#333] py-[12px] px-[16px] items-center border-[1px] border-[#DEDEDE] bg-[#fff] rounded-[6px] ">
                04
              </p>
            </div>

            <button className="py-[8px] sm:px-[16px] px-[8px] flex justify-center items-center gap-[6px] rounded-[6px] bg-[#06A9EF] border-[#06A9EF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g mask="url(#mask0_7804_70287)">
                  <path
                    d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                    fill="white"
                  />
                </g>
              </svg>
              <span className="text-[11px] sm:text-[16px] text-[#fff] font-[600]">
                Filter Data
              </span>
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-[24px] items-center">
              <div className="flex w-[100%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30%"
                  height="8"
                  viewBox="0 0 347 8"
                  fill="none"
                >
                  <path
                    d="M4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8V0ZM4 8H347V0H4V8Z"
                    fill="#06A9EF"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70%"
                  height="8"
                  viewBox="0 0 842 8"
                  fill="none"
                >
                  <path
                    d="M838 8C840.209 8 842 6.20914 842 4C842 1.79086 840.209 0 838 0V8ZM0 8H838V0H0L0 8Z"
                    fill="#C7C7C7"
                  />
                </svg>
              </div>
              <p className="text-[16px] sm:text-[20px] text-[#333] font-[500] leading-normal">
                13%
              </p>
            </div>
            <p className="font-[400] text-[10px] sm:text-[14px]">
              Please wait while we are{" "}
              <span className="text-[#06A9EF] text-[10px] sm:text-[14px] font-[500]">fetching data</span> for
              you ...... let,s shortlist best candidates for your preference....
            </p>
          </div>

      {
        [1, 2, 3, 4].map((index) => (
          <div
          key={index}
            className="flex w-[100%] gap-4 p-[16px] flex-col items-start rounded-[16px] border-[1px] border-[#06A9EF] bg-[#fff] "
            style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <p className="text-[16px] sm:text-[20px] text-[#333] leading-normal font-[500]">
              4 results found for Assistant Manager
            </p>

                <div
                  className="grid scr1200:grid-cols-3 scr800:grid-cols-2 grid-cols-1 p-[24px] w-[100%] items-start gap-[16px] rounded-[16px] border-[1px] border-[#DEDEDE] bg-[#fff] "
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className=" w-[100%]  flex flex-col justify-between items-start">
                    <div className="flex gap-[21px] ">
                      <img
                        src="/images/profile_icon.png"
                        className="w-[96px] h-[96px] rounded-[96px]"
                        alt=""
                      />
                      <div className="flex flex-col items-start justify-between">
                        <p className="text-[18px] sm:text-[24px] text-[#333] leading-[160%] font-[500]">
                          John Doe
                        </p>
                        <p className="text-[14px] sm:text-[16px] leading-[160%] text-[#646464] font-[400] ">
                          Product Designer
                        </p>
                        <div className="gap-2 flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M21.2841 8.27657L15.3333 7.41173L12.6731 2.01876C12.6005 1.8711 12.4809 1.75157 12.3333 1.67891C11.963 1.4961 11.513 1.64845 11.3278 2.01876L8.66766 7.41173L2.71688 8.27657C2.55282 8.30001 2.40281 8.37735 2.28797 8.49454C2.14913 8.63724 2.07262 8.82923 2.07526 9.02831C2.0779 9.22739 2.15946 9.41728 2.30203 9.55626L6.6075 13.7539L5.59031 19.6813C5.56646 19.8191 5.58172 19.961 5.63436 20.0906C5.687 20.2203 5.77491 20.3326 5.88813 20.4148C6.00135 20.497 6.13535 20.5459 6.27492 20.5558C6.4145 20.5658 6.55407 20.5364 6.67781 20.4711L12.0005 17.6727L17.3231 20.4711C17.4684 20.5484 17.6372 20.5742 17.7989 20.5461C18.2067 20.4758 18.4809 20.0891 18.4106 19.6813L17.3934 13.7539L21.6989 9.55626C21.8161 9.44142 21.8934 9.29142 21.9169 9.12735C21.9802 8.7172 21.6942 8.33751 21.2841 8.27657Z"
                              fill="#FFB836"
                            />
                          </svg>
                          <p className="text-[14px] sm:text-[16px] leading-[160%] text-[#333] font-[400] ">
                            4.0
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex py-[8px] mt-[10px] px-[16px] flex-col items-start gap-1 rounded-[12px] bg-[#EFFAFF] ">
                      <p className="text-[14px] sm:text-[16px] font-[500] text-[#333] leading-[160%] ">
                        Assistant Manager
                      </p>
                      <div className="h-[1px] bg-[#D6DDEB]"></div>
                      <p className="text-[14px] sm:text-[16px] text-[#333] leading-[160%] font-[400] mb-[2px]">
                        Product Development
                      </p>
                      <p className="text-[14px] sm:text-[16px] text-[#333] leading-[160%] font-[400] ">
                        Marketing
                      </p>
                    </div>
                  </div>

              <div className=" w-[100%]  flex flex-col items-start gap-4">
                <p className="text-[14px] sm:text-[16px] text-[#333] leading-[160%] font-[600]">
                  Contact
                </p>
                {
                  contact_info.map((e,index) => (
                  <div key={index} className="flex break-all gap-[8px]">
                    {e.icon}
                    <p className="text-[14px] sm:text-[16px] text-[#333] font-[400]">{e.text}</p>
                  </div>
                  ))}
              </div>

                  <div className=" flex flex-col w-[100%] items-start gap-4">
                    <div className="flex justify-center w-[100%] p-[15px] scr1200:p-[24px] items-center gap-[15px] scr1350:gap-[24px] rounded-[12px] border-[1px] border-[#06A9EF] bg-[#fff]">
                      <p className="text-[#333] scr1350:text-[20px] scr1200:text-[17px] text-[14px] font-[500] ">Profile Match Score</p>
                      <p className="text-[#333] text-[23px] scr1350:text-[36px] scr1200:text-[30px] font-[500] ">87 %</p>
                    </div>
                    <div className="flex w-[100%] rounded-[12px]">
                      <div className="w-[51px] flex justify-center items-center p-[10px] rounded-tl-[12px] rounded-bl-[12px] bg-[#C00000]">
                        <p className="text-[#fff] text-[14px] ">PDF</p>
                      </div>
                      <div className="flex p-4 justify-betweeen items-center bg-[#fff] border-[1px] border-t-[#DEDEDE] border-r-[#DEDEDE] border-b-[#DEDEDE] border-l-[#fff] rounded-tr-[12px] rounded-br-[12px]">
                        <div className="flex flex-col gap-[8px] items-start ">
                          <p className="text-[14px] text-[#333] font-[500] ">John Doe Resume Bsc CS 2024.pdf (Default)</p>
                          <p className="text-[12px] text-[#646464] font-[400]">190 Kb</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-[16px] w-[100%] items-start">
                      <button onClick={() => router.push("/employer/afterLogin/Hiring?content=JobPost")} className="flex py-[12px] w-[50%] scr1200:px-[9px] scr1350:px-[22px] justify-center items-center gap-[10px] rounded-[12px] bg-[#06A9EF] text-[12px] sm:text-[16px] text-[#fff] font-[600] leading-[160%]">Move to Hiring</button>
                      <button onClick={toggleContent} className="flex py-[12px] w-[50%] scr1200:px-[9px] scr1350:px-[22px] justify-center items-center gap-[10px] rounded-[12px] text-[12px] sm:text-[15px] text-[#333] font-[500] border-[1px] border-[#06A9EF] leading-[160%]">See Application</button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      }
      {toggle === 1 &&
        <ApplicantsDetails setIsApplicantDetails={setIsApplicantDetails} setTogglee={setToggle} />
      }

    </>
  );
}

export default BulkUploads;
