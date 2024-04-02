import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Services({ setServices }) {
    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    const loginListCandidate = ["My Resumes", "Transform CV", "Skill Assessments", "My Purchases"]
    const loginListRecruiter = ["My Clients", "Transform CV", "Job Description Matching", "Collection", "My Purchases"]
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
        } else return boforeLoginList
    }
    return (
        <div
            className='absolute top-[70px] bg-[#FFF] rounded-b-[16px] w-[287px] '
            style={{
                boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.25)"
            }}
        >
            {list().map((item, index) => (
                <li
                    key={index}
                    className='px-4 py-4 '
                    style={{
                        // opacity: visible ? 1 : 0,
                        // transform: (visible ? "translateX(0)" : "translateX(-100%)"),

                        ...(item === 'Candidate' && { ...getListItemStyles('/'), transition: "transform 0.7s ease-in-out", }),
                        ...(item === 'Recruiter' && { ...getListItemStyles('/recruiter'), transition: "transform 0.8s ease-in-out" }),
                        ...(item === 'Home' && { ...getListItemStyles('/home'), transition: "transform 0.7s ease-in-out" }),
                        ...(item === 'My Clients' && { ...getListItemStyles('/myClients'), transition: "transform 0.8s ease-in-out" }),
                        ...(item === 'My Resumes' && { ...getListItemStyles('/home/MyCollection'), transition: "transform 0.8s ease-in-out" }),
                        ...(item === 'Transform CV' && { ...getListItemStyles('/transform/TransformJob'), transition: "transform 0.9s ease-in-out" }),
                        ...(item === 'Job Description Matching' && { ...getListItemStyles('/transform/JobMatching'), transition: "transform 1s ease-in-out" }),
                        ...(item === 'Collection' && { ...getListItemStyles('/collection'), transition: "transform 1.1s ease-in-out" }),
                        ...(item === 'Skill Assessments' && { ...getListItemStyles('/home/SkillAssessment'), transition: "transform 1.1s ease-in-out" }),
                        ...(item === 'My Purchases' && { ...getListItemStyles('/purchase/MyPurchase'), transition: "transform 1.2s ease-in-out" }),
                    }}


                    onClick={() => {
                        switch (item) {
                            case 'Candidate':
                                handleNavigation('/');
                                break;
                            case 'Recruiter':
                                handleNavigation('/recruiter');
                                break;
                            case 'Home':
                                handleNavigation('/home');
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
                            case 'Collection':
                                handleNavigation('/collection');
                                break;
                            case 'Skill Assessments':
                                handleNavigation('/home/SkillAssessment');
                                break;
                            default:
                                break;
                        }
                    }}                            >
                    {item}
                </li>
            ))}
        </div>
    )
}

export default Services
