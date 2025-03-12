import React, { useEffect, useRef, useState } from "react";
import { setPageOpened } from "../Redux/slices/websiteSlice";
import { useDispatch } from "react-redux";

import MiniLoader from "../components/common/mini-loader";
import { useRouter } from "next/router";
import { DocSVG, PDFSvg, PNGICON } from "../utils/svg";
import axios from "axios";
import { toast } from "react-toastify";
import SuccessPopUp from "../components/common/successPopUp";

function OfferAccept() {
    const router = useRouter();
    const { applicantId, jobId,status } = router.query

    const dispatch = useDispatch();
    dispatch(setPageOpened());


    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
   
    const [previousStatus, setPreviousStatus] = useState("");
    const [updated, setUpdated] = useState(false);

    const getOfferAcceptanceStatus = async () => {
        try {
            const response = await axios.get(`http://192.168.1.161:2000/api/preboarding/offerAcceptanceStatus/${applicantId}/${jobId}`);
            setPreviousStatus(response.data.offerAcceptanceStatus)
            if(!updated && response.data.offerAcceptanceStatus === "Pending" ){
                setTimeout(() => {
                    OfferUpdate()
                  }, 500);
    
            }
            
            return response.data.offerAcceptanceStatus;
        } catch (error) {
            console.error("Error fetching offer acceptance status:", error.response?.data || error.message);
            throw error;
        }
    };

    useEffect(() => {

        getOfferAcceptanceStatus()

    }, [])


    


    const OfferUpdate = async () => {

        try {
            const response = await axios.put(`http://192.168.1.161:2000/api/preboarding/offerAccept/${applicantId}/${jobId}`, { status })
            setLoading(false)
            setLoading1(false)
            // toast.success("Documents uploaded successfully.");
            setUpdated(true)

            return response.data;
        } catch (error) {
            console.error("Error uploading files:", error);
            setLoading(false)
            setLoading1(false)
            throw error;
        }
    };



    return (
        <>
            <div className="bg-white z-[2000] fixed w-full top-0 ml-[-24px]" style={{ borderBottom: "1.5px solid #DEDEDE" }}>
                <div className="customMargins py-3 flex justify-between items-center">
                    <img className="object-contain h-[40px]" src="/images/logo_skilotech.png" alt="Logo" />
                </div>
            </div>
            {(previousStatus === "Accepted" || previousStatus === "Rejected") &&
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">

                        <div className="customMargins w-full flex justify-center items-center ">

                            <SuccessPopUp text={"Already Responded"} isButton={false} />
                        </div>
                    </div>
                </>
            }


            {updated &&
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">

                        <div className="customMargins w-full flex justify-center items-center">

                            <SuccessPopUp text={`Offer ${status} Successfully`} isButton={false} />
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default OfferAccept;
