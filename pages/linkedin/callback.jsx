import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

const LinkedInCallback = () => {
    const router = useRouter();
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const { code, error: queryError } = router.query;


    const updateToken = () => {

        if (queryError) {

            setError("Authorization failed. Please try again.");
            return;
        }

        if (code) {
            // Exchange authorization code for access token via your backend
            axios
                .post(`http://localhost:2000/api/linkedin/exchange-token/${userDataGlobal?._id}`, { code })
                .then(res => {
                    const data = res.data;
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setSuccessMessage("LinkedIn connected successfully!");
                        // Optional: save token, redirect, etc.
                    }
                })
                .catch(err => {
                    console.error("Axios error:", err.response?.data || err.message);
                    setError("Something went wrong. Please try again.");
                });
        }
    }

    useEffect(() => {
        if (userDataGlobal) {
            updateToken()
        }

    }, [router.query, userDataGlobal]);





    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-600 font-bold">{successMessage}</p>}
            {!error && !successMessage && <p>Connecting to LinkedIn...</p>}
        </div>
    );
};

export default LinkedInCallback;
