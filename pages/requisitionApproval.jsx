import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPageOpened } from '../Redux/slices/websiteSlice';
import axios from 'axios';
import SuccessPopUp from '../components/common/successPopUp';

function RequisitionApproval() {
    const router = useRouter();
    const { requisitionId, levelId,status } = router.query

    const dispatch = useDispatch();
    dispatch(setPageOpened());

    const [previousStatus, setPreviousStatus] = useState("");
      const [updated, setUpdated] = useState(false);
    console.log(previousStatus)

    const getRequisitionLevelStatus = async () => {
        try {
            const response = await axios.get(`http://192.168.1.161:2000/api/requisition/requisitionLevelStatus/${requisitionId}/${levelId}`);
            setPreviousStatus(response.data.levelStatus)
            if(!updated && response.data.levelStatus === "Pending" ){
                setTimeout(() => {
                    requisitionUpdate()
                  }, 500);
    
            }

            return response.data.levelStatus;
        } catch (error) {
            console.error("Error fetching offer acceptance status:", error.response?.data || error.message);
            throw error;
        }
    };

    useEffect(() => {

        getRequisitionLevelStatus()

    }, [])

    const requisitionUpdate = async () => {

        try {
            const response = await axios.put(`http://192.168.1.161:2000/api/requisition/requisitionUpdate/${requisitionId}/${levelId}`, { status })
           
            setUpdated(true)

            return response.data;
        } catch (error) {
            console.error("Error uploading files:", error);
          
            throw error;
        }
    };


  return (
    <div>
        <div className="bg-white z-[2000] fixed w-full top-0 ml-[-24px]" style={{ borderBottom: "1.5px solid #DEDEDE" }}>
                <div className="customMargins py-3 flex justify-between items-center">
                    <img className="object-contain h-[40px]" src="/images/logo_skilotech.png" alt="Logo" />
                </div>
            </div>
            {(previousStatus === "Approved" || previousStatus === "Rejected") &&
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

                            <SuccessPopUp text={`Requisition ${status} Successfully`} isButton={false} />
                        </div>
                    </div>
                </>
            }

    </div>
  )
}

export default RequisitionApproval