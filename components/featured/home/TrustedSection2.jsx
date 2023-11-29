import{ React,useState,useEffect }from 'react'
import { motion } from 'framer-motion'
function TrustedBySection2() {



    const data = [
        {
            img: "./images/home/finance.png",
            name: 'Finance',
            job: '1598 jobs'
        },
        {
            img: "./images/home/Marketing.png",
            name: 'Marketing',
            job: '1598 jobs'
        },
        {
            img: "./images/home/hr.png",
            name: 'Human Resources',
            job: '1598 jobs'
        },
        {
            img: "./images/home/industry.png",
            name: 'Industry',
            job: '1598 jobs'
        }, {
            img: "./images/home/Design & cr.png",
            name: 'Design & Creative',
            job: '1598 jobs'
        }, {
            img: "./images/home/Component 14.png",
            name: 'Content Writing',
            job: '1598 jobs'
        },
        {
            img: "./images/home/Development.png",
            name: 'Development & IT',
            job: '1598 jobs'
        },
        {
            img: "./images/home/Video editing.png",
            name: 'Video Editing',
            job: '1598 jobs'
        },
        {
            img: "./images/home/Project management.png",
            name: 'Project Management',
            job: '1598 jobs'
        },
        {
            img: "./images/home/accounts.png",
            name: 'Accounts',
            job: '1598 jobs'
        },
        {
            img: "./images/home/organization.png",
            name: 'Organization',
            job: '1598 jobs'
        },
        {
            img: "./images/home/networking.png",
            name: 'Networking',
            job: '1598 jobs'
        },
    ]
    return (
        <div className="trust_section_parent">
         
            <div className="customMargins">
                <div className="popular_job">
                    <p id="popular_job"
              
                    >Popular Job Categories</p>
                    <p id="popular_info"
                    
                    >
                        Discover exciting career opportunities in popular fields, from
                        technology to healthcare, finance to marketing, and more.
                    </p>


                </div>

                <div className="job_cat_card">
                    {data.map((item, index) => (
                        <div className="card" key={index}>

                            <motion.img className="card_img" src={item.img} alt='' 
                            whileHover={{ scale: 1.1, rotateY: 360, }}
                            transition={{duration:1, ease: 'easeInOut'}}
                            />
                            <div>
                                <p id="card_budget">{item.name}</p>
                                <p id="card_job">{item.job}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrustedBySection2