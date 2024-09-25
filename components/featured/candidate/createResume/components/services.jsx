import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Services({ setServices }) {
    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    const loginListCandidate = [
        { name: "Create New Resume", imgSrc: "/images/resumeBuilder/createResume.png" },
        {
            name: "Create New Cover Letter",
            imgSrc: "/images/resumeBuilder/createResume.png",
        },
        { name: "My Resumes", imgSrc: "/images/resumeBuilder/myResume.png" },

        // { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png" },
        { name: "Skill Assessments & Certification", imgSrc: "/images/resumeBuilder/skill_assessments.png" },

        { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png" }
    ];

    const loginListRecruiter = [
        { name: "Create New Resume", imgSrc: "/images/resumeBuilder/createResume.png" },
        {
            name: "Create New Cover Letter",
            imgSrc: "/images/resumeBuilder/createResume.png",
        },
        { name: "My Clients", imgSrc: "/images/resumeBuilder/my_clients.png" },

        // { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png" },
        { name: "Job Description Matching", imgSrc: "/images/resumeBuilder/job_description_matching.png" },
        { name: "My Collection", imgSrc: "/images/resumeBuilder/collection.png" },
        { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png" }
    ];
    const [visible, setvisible] = useState(false);
    const [selectedPage, setSelectedPage] = useState("");

    useEffect(() => {
        setSelectedPage(router.pathname);
    }, [router.pathname]);

    const handleNavigation = (page) => {
        setServices(false);
        router.push(page);
    };


    const getListItemStyles = (page) => {
        const isSelected = selectedPage === page;
        const fontSize = isSelected ? "16px" : "14px"
        const backgroundColor = isSelected ? 'rgba(234, 247, 255, 1)' : '';
        const textColor = isSelected ? '#000' : '#000';
        const fontWeight = isSelected ? "600" : "500"
        const border = isSelected ? "4px solid rgba(6, 169, 239, 1)" : "none";
        return {
            backgroundColor,
            color: textColor,
            cursor: 'pointer',
            borderLeft: border,
            fontWeight,
            fontSize,
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
        <div
            className='absolute top-[50px] bg-[#FFF] rounded-b-[16px] w-[297px]  '
            style={{
                boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.25)"
            }}
        >
            {list().map((item, index) => (
                <li
                    key={index}
                    className='px-4 py-4 hover:bg-[#EAF7FF] '
                    style={{
                        // opacity: visible ? 1 : 0,
                        // transform: (visible ? "translateX(0)" : "translateX(-100%)"),

                        ...(item.name === 'Candidate' && { ...getListItemStyles('/'), transition: "transform 0.7s ease-in-out", }),
                        ...(item.name === 'Recruiter' && { ...getListItemStyles('/recruiter'), transition: "transform 0.8s ease-in-out" }),
                        ...(item.name === 'Home' && { ...getListItemStyles('/home'), transition: "transform 0.7s ease-in-out" }),
                        ...(item.name === 'Create New Resume' && { ...getListItemStyles('/home/BuildResume'), transition: "transform 0.8s ease-in-out" }),
                        ...(item.name === 'Create New Cover Letter' && { ...getListItemStyles(userDataGlobal.role === "user" ? "/coverLetter" : `/myClients/ClientResume?cover=true`), transition: "transform 0.8s ease-in-out" }),
                        ...(item.name === 'My Clients' && { ...getListItemStyles('/myClients'), transition: "transform 0.8s ease-in-out" }),
                        ...(item.name === 'My Resumes' && { ...getListItemStyles('/home/MyCollection'), transition: "transform 0.8s ease-in-out" }),
                        ...(item.name === 'Transform CV' && { ...getListItemStyles('/transform/TransformJob'), transition: "transform 0.9s ease-in-out" }),
                        ...(item.name === 'Job Description Matching' && { ...getListItemStyles('/transform/JobMatching'), transition: "transform 1s ease-in-out" }),
                        ...(item.name === 'My Collection' && { ...getListItemStyles('/collection'), transition: "transform 1.1s ease-in-out" }),
                        ...(item.name === 'Skill Assessments & Certification' && { ...getListItemStyles('/home/SkillAssessment'), transition: "transform 1.1s ease-in-out" }),
                        ...(item.name === 'My Purchases' && { ...getListItemStyles('/purchase/MyPurchase'), transition: "transform 1.2s ease-in-out" }),
                    }}


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
                            case 'Create New Cover Letter':
                                handleNavigation(userDataGlobal.role === "user" ? "/coverLetter" : `/myClients/ClientResume?cover=true`);
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
                            case 'Skill Assessments & Certification':
                                handleNavigation('/home/SkillAssessment');
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    <div className="flex items-center gap-3">
                        <img
                            src={item.imgSrc}
                            alt=""
                            className="w-[24px] h-[24px]"
                        />
                        <span>{item.name}</span>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default Services
