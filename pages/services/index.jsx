import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Services() {
    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    const loginListCandidate = [
        { name: "Create New Resume", imgSrc: "/images/resumeBuilder/createResume.png", desc: "Short description for create new resume to give context", color: "#06A9EF" },
        { name: "My Resumes", imgSrc: "/images/resumeBuilder/myResume.png", desc: "Short description for create new resume to give context", color: "#00D2EF" },
        { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png", desc: "Short description for create new resume to give context", color: "#428FF5" },
        { name: "Skill Assessments", imgSrc: "/images/resumeBuilder/skill_assessments.png", desc: "Short description for create new resume to give context", color: "#FE7701" },
        { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png", desc: "Short description for create new resume to give context", color: "#8901FF" },
        { name: "Search Jobs", imgSrc: "/images/resumeBuilder/job.png", desc: "Short description for create new resume to give context", color: "#6441A5" }
    ];

    const loginListRecruiter = [
        { name: "Create New Resume", imgSrc: "/images/resumeBuilder/createResume.png", desc: "Create a new resume for your clients.", color: "#06A9EF" },
        { name: "My Clients", imgSrc: "/images/resumeBuilder/my_clients.png", desc: "Short description for create new resume to give context", color: "#FE7701" },
        { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png", desc: "Short description for create new resume to give context", color: "#428FF5" },
        { name: "Job Description Matching", imgSrc: "/images/resumeBuilder/job_description_matching.png", desc: "Short description for create new resume to give context", color: "#B847FF" },
        { name: "My Collection", imgSrc: "/images/resumeBuilder/collection.png", desc: "Short description for create new resume to give context", color: "#45ABA0" },
        { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png", desc: "Short description for create new resume to give context", color: "#8901FF" },
        { name: "Post Jobs", imgSrc: "/images/resumeBuilder/job.png", desc: "Short description for create new resume to give context", color: "#6441A5" }
    ];
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [selectedPage, setSelectedPage] = useState("");

    useEffect(() => {
        setSelectedPage(router.pathname);
    }, [router.pathname]);

    const handleNavigation = (page) => {
        // setServices(false);
        router.push(page);
    };


    const getListItemStyles = (page, gradient) => {
        console.log(38, gradient)
        const isSelected = selectedPage === page;
        const fontSize = isSelected ? "16px" : "14px"
        const backgroundColor = isSelected ? 'rgba(234, 247, 255, 1)' : '';
        const textColor = isSelected ? '#000' : '#000';
        const fontWeight = isSelected ? "600" : "500"
        const border = isSelected ? "4px solid rgba(6, 169, 239, 1)" : "none";
        const hoverBgColor = gradient
        return {
            backgroundColor: hoverBgColor,
            color: textColor,
            cursor: 'pointer',
            borderLeft: border,
            fontWeight,
            fontSize,
            // '&:hover': {
            //     backgroundColor: hoverBgColor,
            // },
        };
    };
    const list = () => {
        if (userDataGlobal.role === "user") {
            return loginListCandidate
        } else if (userDataGlobal.role === "recruiter") {
            return loginListRecruiter
        } else return loginListRecruiter
    }
    return (
        <div className=' py-10  customMargins w-full '>
            <div className='scr1400:px-[4%] flex gap-9 justify-center w-full'>
                <div onClick={() => router.push("/home")} onMouseEnter={() => {
                    setVisible1(true);

                }}
                    onMouseLeave={() => setVisible1(false)} className={`rounded-[24px] bg-[#F9F9F9]  flex flex-col justify-between gap-2  p-6 min-w-[272px]  h-[186px] leading-tight border cursor-pointer ${!visible1 ? " border-[#DEDEDE]" : "border-[#F9F9F9]"}`}>
                    <div className={`svg-transition flex justify-end ${visible1 ? 'svg-original' : 'svg-left'}`}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={`svg-transition ${visible1 ? 'svg-original' : 'svg-left'}`}>

                            <g mask="url(#mask0_1897_29995)">
                                <path d="M12.6 12.5L8 7.9L9.4 6.5L15.4 12.5L9.4 18.5L8 17.1L12.6 12.5Z" fill="#06A9EF" />
                            </g>
                        </svg>
                    </div>
                    <div
                        className='flex flex-col gap-2 w-[124px] '>
                        <svg className='min-w-[32px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g mask="url(#mask0_2038_22277)">
                                <path d="M7.99997 25.3332H12.4615V17.4101H19.5384V25.3332H24V13.3332L16 7.30755L7.99997 13.3332V25.3332ZM6 27.3331V12.3332L16 4.80762L25.9999 12.3332V27.3331H17.5384V19.4101H14.4615V27.3331H6Z" fill={visible1 ? "#06A9EF" : '#808080'} />
                            </g>
                        </svg>
                        <p className='text-[14px] font-medium'>DashBoard</p>
                        <p className='text-[12px] font-medium text-[#808080]'>Go to your personalised home page</p>

                    </div>

                </div>
                <div className='flex flex-col gap-6 w-[750px]   '>
                    <div className='header1 text-[16px] font-semibold px-4 py-2 h-[36px] leading-tight text-[#FFF] w-[159px] '>Services</div>
                    <div className='flex gap-6 flex-wrap'>
                        {list().map((item, index) => (
                            <div
                                key={index}
                                className={`rounded-[16px]  ${item.name === 'Create New Resume' ? "createResume" : item.name === 'My Clients' ? "myClinet" : item.name === 'My Resumes' ? "MyResume" : item.name === 'Transform CV' ? "TransFormCV" : item.name === 'Job Description Matching' ? "JobDes" : item.name === 'My Collection' ? "MyCollection" : item.name === 'Skill Assessments' ? "SkillAss" : item.name === 'My Purchases' ? "MyPurchase" : item.name === "Search Jobs" ? "searchJobs" : item.name === "Post Jobs" ? "postJobs" : ""}`}

                                onClick={() => {
                                    switch (item.name) {
                                        case 'Candidate':
                                            handleNavigation('/');
                                            break;
                                        case 'Recruiter':
                                            handleNavigation('/recruiter');
                                            break;
                                        case 'Home':
                                            handleNavigation('/home');
                                            break;
                                        case 'Create New Resume':
                                            handleNavigation('/home/BuildResume');
                                            break;
                                        case 'My Clients':
                                            handleNavigation('/myClients');
                                            break;
                                        case 'My Resumes':
                                            handleNavigation('/home/MyCollection');
                                            break;
                                        case 'Transform CV':
                                            handleNavigation('/transform/TransformJob');
                                            break;
                                        case 'Job Description Matching':
                                            handleNavigation('/transform/JobMatching');
                                            break;

                                        case 'My Purchases':
                                            handleNavigation('/purchase/MyPurchase');
                                            break;
                                        case 'My Collection':
                                            handleNavigation('/collection');
                                            break;
                                        case 'Skill Assessments':
                                            handleNavigation('/home/SkillAssessment');
                                            break;
                                        case 'Search Jobs':
                                            handleNavigation('/jobs/list');
                                            break;
                                        case 'Post Jobs':
                                            handleNavigation('/jobs/list');
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                onMouseEnter={() => {
                                    setVisible(index);

                                }}
                                onMouseLeave={() => setVisible(false)}
                            >
                                <div className={`flex items-start gap-[60px] p-4  ${visible !== index ? "border border-[#DEDEDE]" : "border border-[#FFF]"} rounded-[16px] cursor-pointer w-[359.33px] `}>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.imgSrc}
                                            alt=""
                                            className="w-[46px] h-[46px]"
                                        />
                                        <div className='w-[184px]'>
                                            <span className='text-[14px] font-medium'>{item.name}</span>
                                            <p className='text-[12px] font-normal text-[#808080]'>{item.desc}</p>
                                        </div>
                                    </div>

                                    <div className={`svg-transition ${visible === index ? 'svg-original' : 'svg-left'}`}>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={`svg-transition ${visible === index ? 'svg-original' : 'svg-left'}`}>

                                            <g mask="url(#mask0_1897_29995)">
                                                <path d="M12.6 12.5L8 7.9L9.4 6.5L15.4 12.5L9.4 18.5L8 17.1L12.6 12.5Z" fill={item.color} />
                                            </g>
                                        </svg>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Services
