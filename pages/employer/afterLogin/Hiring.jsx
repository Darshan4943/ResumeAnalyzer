import ApplicantDetails from '@/components/featured/employer/ApplicantDetails';
import JobPost from '@/components/featured/employer/JobPost';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


function Hiring() {

    const router = useRouter();
    const query = router.query;

    const [toggle, setToggle] = useState(0);


    useEffect(() => {

        if (query.content === "ApplicantDetails") {
            setToggle(2);
        } else if (query.content === "JobPost") {
            setToggle(1);
        } else {
            setToggle(0);
        }
    }, [router.query]);

    const toggleContent = () => {
        const JobPost = toggle ? "ApplicantDetails" : "JobPost";
        router.push(`Hiring/?content=${JobPost}`);
        setToggle((prevToggle) => !prevToggle);
    };



    const job_card = [
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: 'Full-Time',
            time2: "",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#0C8A0A] rounded-[6px] font-[500] border border-[#0C8A0A] bg-[#E2FFE1]">Live</button>
            ,
            img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: 'Full-Time',
            time2: "",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#0C8A0A] rounded-[6px] font-[500] border border-[#0C8A0A] bg-[#E2FFE1]">Live</button>
            ,
            img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: '',
            time2: "Freelance",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#C00000] rounded-[6px] font-[500] border border-[#C00000] bg-[#FFEBEB]">Closed</button>
            ,
            img: ''
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: '',
            time2: "Freelance",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#C00000] rounded-[6px] font-[500] border border-[#C00000] bg-[#FFEBEB]">Closed</button>
            ,
            img: ''
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: 'Full-Time',
            time2: "",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#0C8A0A] rounded-[6px] font-[500] border border-[#0C8A0A] bg-[#E2FFE1]">Live</button>
            ,
            img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: 'Full-Time',
            time2: "",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#0C8A0A] rounded-[6px] font-[500] border border-[#0C8A0A] bg-[#E2FFE1]">Live</button>
            ,
            img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: '',
            time2: "Freelance",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#C00000] rounded-[6px] font-[500] border border-[#C00000] bg-[#FFEBEB]">Closed</button>
            ,
            img: ''
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: '',
            time2: "Freelance",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#C00000] rounded-[6px] font-[500] border border-[#C00000] bg-[#FFEBEB]">Closed</button>
            ,
            img: ''
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: '',
            time2: "",
            time3: 'Part-Time',
            button: <button className="py-[4px] px-[16px] text-[#C00000] rounded-[6px] font-[500] border border-[#C00000] bg-[#FFEBEB]">Closed</button>
            ,
            img: ''
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: 'Full-Time',
            time2: "",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#0C8A0A] rounded-[6px] font-[500] border border-[#0C8A0A] bg-[#E2FFE1]">Live</button>
            ,
            img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: '',
            time2: "",
            time3: 'Part-Time',
            button: <button className="py-[4px] px-[16px] text-[#C00000] rounded-[6px] font-[500] border border-[#C00000] bg-[#FFEBEB]">Closed</button>
            ,
            img: ''
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },
        {
            post: 'Assistant Manager',
            location: 'Delhi',
            time1: 'Full-Time',
            time2: "",
            time3: '',
            button: <button className="py-[4px] px-[16px] text-[#0C8A0A] rounded-[6px] font-[500] border border-[#0C8A0A] bg-[#E2FFE1]">Live</button>
            ,
            img: <img className="w-[20px]" src="/images/employer/share.png" alt="" />
            ,
            applicant_no: 16,
            date_posted: '24 May 2020',
            due_date: '30 May 2020'
        },

    ]
    const headings = [
        {
            heading: "Department",
            options: ["Assistant Manager", "Option 2", "Option 3"]
        },
        {
            heading: "Location",
            options: ["Mumbai", "Pune", "Banglore"]
        },
        {
            heading: "Status",
            options: ["Pending", "Approved"]
        },
        {
            heading: "Priority",
            options: ["Yes", "No"]
        }

    ];

    const handleHeadingChange = (event, index) => {
        const selectedOption = event.target.value;
        const selectedHeading = headings[index];


    };




    return (
        <div>
            {toggle === 0 &&
                < div className='flex flex-col gap-3 w-[100%] max-h-[80vh]  relative '>

                    <div className="sticky top-0 mobile">
                        <div className=" bg-[#fff] p-[12px]  flex flex-col ms:flex-row gap-[12px] z-[500] justify-between rounded-t-[12px] ">
                            <p className="h-[29px] text-[18px] ml:text-[24px] font-[500px]">
                                All Requisition Requests
                            </p>

                            <button
                                onClick={toggleContent}
                                className=" py-[8px] px-[12px] bg-[#06A9EF] rounded-lg text-[14px] ml:text-[16px] text-white "
                            >
                                Create New Requistion
                            </button>

                        </div>
                        <div className="flex bg-[#06A9EF] gap-[1px] p-4 ml:w-[20%] w-full">
                            <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                                        stroke="#646464"
                                        stroke-width="2.02783"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <input
                                    className="w-[100%] text-[#646464]"
                                    type="text"
                                    placeholder="search"
                                />
                            </div>
                            <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <g clip-path="url(#clip0_7540_118191)">
                                        <path
                                            d="M3.33203 5H16.6654"
                                            stroke="#333333"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M5 10H15"
                                            stroke="#333333"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M6.66797 15H13.3346"
                                            stroke="#333333"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_7540_118191">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div>
                                    Sort

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='sticky top-0 web'>
                        <div className="grid col-span-1 bg-white  rounded-t-[16px] ">
                            <div className="flex items-center p-[16px] align-self-stretch w-full">
                                <p className="text-[#333] font-montserrat text-[24px] font-medium flex-1-0-0 w-[70%]">
                                    Job Post Status
                                </p>
                                <div onClick={() => router.push("/employer/afterLogin/JobPosting?content=CreateNewJob")} className="flex w-[30%] items-stretch justify-end ">
                                    <button className=" flex py-[8px]  font-[600] text-[16px] px-[24px] justify-center text-white items-center rounded-[8px] border border-solid border-[#06A9EF] bg-[#06A9EF] gap-[5px]">
                                        <p className="text-[16px]">+</p>
                                        Create New Job
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="h-[84px] bg-[#06A9EF]  flex flex-row p-[16px] justify-between  text-[#333] sticky top-[72px] ">
                            {headings.map((headingObj, index) => (
                                <>

                                    <select className=" w-[19.87%] bg-white p-4 text-[14px] font-normal " onChange={(e) => handleHeadingChange(e, headingObj.heading)}>
                                        <option value=""> {headingObj.heading}</option>
                                        {headingObj.options.map((option, optIndex) => (
                                            <option key={optIndex} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ))}
                            <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]" >

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z" stroke="#646464" stroke-width="2.02783" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input className="w-[100%] text-[14px] font-normal " type="text" placeholder="search" />
                            </div>
                        </div>
                    </div>
                    <div className="grid scr1300:grid-cols-4 scr1024:grid-cols-3 ml:grid-cols-2 ms:grid-cols-2  grid-cols-1 ms:gap-[20px] gap-2 pb-2 overflow-y-scroll">
                        {
                            job_card.map((job_card) =>
                                <div onClick={toggleContent} className="flex py-[16px] px-[0px] flex-col items-start gap-[12px] flex-shrink-0 rounded-lg bg-[#fff] shadow-md">
                                    <div className="flex w-[100%] py-0 px-[16px] justify-between items-start ">
                                        <div className="flex w-[70%] flex-col items-start gap-[2px]">
                                            <p className="text-[#06A9EF] text-[16px] font-[500]">
                                                {job_card.post}</p>
                                            <p className="text-[12px] text-[#646464]">{job_card.location}</p>
                                            <p className="text-[#2706EF] font-[500] text-[10px]">{job_card.time1}</p>
                                            <p className="text-[#DB0000] font-[500] text-[10px]">{job_card.time2}</p>
                                            <p className="text-[#CE06EF] font-[500] text-[10px]">{job_card.time3}</p>

                                        </div>
                                        <div className="justify-center items-center w-[30%]  gap-[8px] flex">
                                            {job_card.button}
                                            {job_card.img}
                                        </div>
                                    </div>

                                    <div className="flex py-0 px-[16px] justify-between items-center self-stretch bg-[#EFFAFF]">
                                        <p className="text-[#333] text-[14px] font-[600]">
                                            Total Applications</p>
                                        <p className="text-[#333] items-center text-[36px] font-[600] ">16</p>
                                    </div>

                                    <div className="flex py-[0px] px-[16px] justify-between items-center self-stretch">
                                        <div className="flex flex-col items-start gap-[4px]">
                                            <p className="text-[12px] font-[600] text-[#646464]">Date posted</p>
                                            <p className="text-[#333] font-[500] text-[12px]">{job_card.date_posted}</p>
                                        </div>
                                        <div className="flex flex-col items-start gap-[4px]">
                                            <p className="text-[12px] font-[600] text-[#646464]">Due Date</p>
                                            <p className="text-[#333] font-[500] text-[12px]">{job_card.due_date}</p>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                    </div>

                </div>

            }
            {toggle === 1 &&
                <JobPost toggleContentt={toggleContent} setToggle={setToggle} />
            }
            {toggle === 2 &&
                <ApplicantDetails setTogglee={setToggle} />
            }
        </div>
    )
}

export default Hiring


