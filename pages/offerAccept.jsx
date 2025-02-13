import React, { useEffect, useRef, useState } from "react";
import { setPageOpened } from "../Redux/slices/websiteSlice";
import { useDispatch } from "react-redux";

import MiniLoader from "../components/common/mini-loader";
import { useRouter } from "next/router";
import { DocSVG, PDFSvg, PNGICON } from "../utils/svg";
import axios from "axios";
import { toast } from "react-toastify";

function OfferAccept() {
    const router = useRouter();
    const { applicantId, jobId } = router.query

    const dispatch = useDispatch();
    dispatch(setPageOpened());


    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [status, setStatus] = useState("");
    const [previousStatus, setPreviousStatus] = useState("");
    const [updated, setUpdated] = useState(false);

    const getOfferAcceptanceStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/preboarding/offerAcceptanceStatus/${applicantId}/${jobId}`);
            setPreviousStatus(response.data.offerAcceptanceStatus)

            return response.data.offerAcceptanceStatus;
        } catch (error) {
            console.error("Error fetching offer acceptance status:", error.response?.data || error.message);
            throw error;
        }
    };

    useEffect(() => {

        getOfferAcceptanceStatus()

    }, [])


    const offerAccpet = async () => {
        setLoading(true)
        setStatus("Accepted")


    }
    const offerReject = async () => {
        setLoading1(true)
        setStatus("Rejected")

    }
    useEffect(() => {
        if (status === "Accepted" || status === "Rejected") {
            OfferUpdate()
        }

    }, [status])


    const OfferUpdate = async () => {

        try {
            const response = await axios.put(`http://localhost:2000/api/preboarding/offerAccept/${applicantId}/${jobId}`, { status })
            setLoading(false)
            setLoading1(false)
            toast.success("Documents uploaded successfully.");
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
            {previousStatus === "Pending" ?

                <>
                    {updated ?
                        <div className="customMargins w-full flex justify-center items-center pt-[120px]">
                            Response Submitted

                        </div>

                        :
                        <div className="flex gap-12 customMargins w-full justify-center pt-[120px]">

                            {loading1 ?
                                <div className="bg-blue px-4 py-2 text-white rounded-[12px] flex justify-center items-center font-medium w-[91.64px]">
                                    <MiniLoader />
                                </div>
                                :
                                <button onClick={offerReject} className="bg-white px-4 py-2 text-red rounded-[12px] flex justify-center items-center font-medium">
                                    Reject
                                </button>
                            }


                            {loading ?
                                <div className="bg-blue px-4 py-2 text-white rounded-[12px] flex justify-center items-center font-medium w-[91.64px]">
                                    <MiniLoader />
                                </div>
                                :
                                <button onClick={offerAccpet} className="bg-blue px-4 py-2 text-white rounded-[12px] flex justify-center items-center font-medium">
                                    Accept
                                </button>
                            }



                        </div>
                    }
                </>
                :
                <>
                <div className="customMargins w-full flex justify-center items-center pt-[120px]">
                Already Responded
                </div>
           
                </>
            }
        </>
    );
}

export default OfferAccept;
