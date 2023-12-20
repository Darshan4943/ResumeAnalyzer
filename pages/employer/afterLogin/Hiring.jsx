import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ApplicantDetails from '~/components/featured/employer/ApplicantDetails';
import JobPost from '~/components/featured/employer/JobPost';

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

    
    return (
        <div>
            {toggle === 0 &&
                <div onClick={toggleContent}>Hiring </div>

            }
            {toggle === 1 &&
                <JobPost toggleContentt={toggleContent} />
            }
            {toggle === 2 &&
                <ApplicantDetails />
            }
        </div>
    )
}

export default Hiring
