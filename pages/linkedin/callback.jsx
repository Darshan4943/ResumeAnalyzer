import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

const LinkedInCallback = () => {
    const router = useRouter();
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const { code, error: queryError } = router.query;
        if (queryError) {

            setError("Authorization failed. Please try again.");
            return;
        }

        const msg = localStorage.getItem("linkeddinMsg")
        setSuccessMessage(msg)
        if (code) {

            axios
                .post(`https://api.skilotech.com/api/linkedin/exchange-token/${userDataGlobal?._id}`, { code })
                .then(res => {
                    const data = res.data;
                    if (data) {

                        setSuccessMessage("LinkedIn connected successfully!");
                        localStorage.setItem("linkeddinMsg", "LinkedIn connected successfully!")
                    }
                })
                .catch(err => {
                    console.error("Axios error:", err.response?.data || err.message);
                    setError("Something went wrong. Please try again.");
                });
        }
    }, [router.query]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        
            {successMessage && <p className="text-green-600 font-bold">{successMessage}</p>}
            {!error && !successMessage && <p>Connecting to LinkedIn...</p>}
        </div>
    );
};

export default LinkedInCallback;
