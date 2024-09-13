import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import PersonalDetails from './personalDetails';
import ProfessionalDetails from './professionalDetails';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function ApplyForm() {

    const userDataGlobal = useSelector((state) => state.userData);
    const [formData, setFormData] = useState({
        personal: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNo: '',
            currentLocation: '',
            dial_code: '',
            dob: '',
            gender: ''
        },
        professional: {
            totalExperience: '',
            relevantExperience: '',
            currentCTC: '',
            expectedCTC: '',
            noticePeriod: ''
        }
    });
    const router = useRouter();
    const { id } = router.query;
    const [jobDetails, setJobDetails] = useState()
    console.log(jobDetails)

    useEffect(() => {
        axios
            .get(`http://localhost:2000/api/job/getById/${id}`)
            .then((res) => {
                setJobDetails(res.data.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const [formError, setFormError] = useState({});

    // Update state when inputs change
    const handleInputChange = (section, fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [fieldName]: value,
            }
        }));
    };

    const validateInput = () => {
        const errors = {};

        // Validate personal details
        const personal = formData.personal;
        if (!personal?.firstName) errors.firstName = "First name is required";
        if (!personal?.lastName) errors.lastName = "Last name is required";
        if (!personal?.email) errors.email = "Email is required";
        if (!personal?.dob) errors.dob = "Date of birth is required";
        if (!personal?.gender) errors.gender = "Gender is required";
        if (!personal?.mobileNo) errors.mobileNo = "Mobile Number is required";
        // Validate professional details
        const professional = formData.professional;
        if (!professional?.totalExperience) errors.totalExperience = "Total experience is required";
        if (!professional?.relevantExperience) errors.relevantExperience = "Relevant experience is required";
        if (!professional?.currentCTC) errors.currentCTC = "Current CTC is required";
        if (!professional?.expectedCTC) errors.expectedCTC = "Expected CTC is required";
        if (!professional?.noticePeriod) errors.noticePeriod = "Notice period is required";

        setFormError(errors);
        return Object.keys(errors).length === 0;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (validateInput()) {
            toast.success("Form submitted successfully!");
            // Submit data logic here...
            console.log(formData);
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    const applyForJob = () => {
        // setLoading(true);
        axios
          .post("http://localhost:2000/api/job/apply/" + id, {
            userId: userDataGlobal._id,
            resumeUrl: "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com",
            percentage: 30,
            formData
          })
          .then((res) => {
            // setLoading(false);
    
            getData();
            toast.success("Application Sent Successfully");
          })
          .catch((err) => {
            console.log(err);
            // setLoading(false);
          });
      };
    
    return (
        <div className='customMargins rounded-[16px] mt-6 bg-[#FFFFFF] p-6 w-[60%]' style={{ boxShadow: "0px 1px 2px 0px #00000040" }}>
            <div className=' flex flex-row gap-4 items-center '>
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.12656 10.665L11.6599 17.1984L9.99739 18.8317L0.664062 9.49837L9.99739 0.165039L11.6599 1.79837L5.12656 8.33171H19.3307V10.665H5.12656Z" fill="#1C1B1F" />
                </svg>

                <p className='text-[#06A9EF] text-[24px] font-medium'>
                    Apply to <span className='font-[24px] text-[#333333]'> {jobDetails?.jobTitle}</span>
                </p>

                <div className='bg-[#DEDEDE] w-[2px] h-[29px]'>

                </div>
                <p className='text-[24px] font-medium'>
                    {jobDetails?.companyName}
                </p>
                <div className='flex flex-row gap-1 items-center'>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g mask="url(#mask0_5716_128824)">
                            <path d="M9.91082 10.5023C10.3681 10.5023 10.7595 10.3391 11.0851 10.0127C11.4108 9.68631 11.5736 9.29395 11.5736 8.83561C11.5736 8.37728 11.4108 7.98492 11.0851 7.65853C10.7595 7.33214 10.3681 7.16895 9.91082 7.16895C9.45356 7.16895 9.06212 7.33214 8.73649 7.65853C8.41087 7.98492 8.24806 8.37728 8.24806 8.83561C8.24806 9.29395 8.41087 9.68631 8.73649 10.0127C9.06212 10.3391 9.45356 10.5023 9.91082 10.5023ZM9.91082 16.6273C11.6013 15.0717 12.8553 13.6585 13.6728 12.3877C14.4903 11.1169 14.8991 9.98839 14.8991 9.00228C14.8991 7.48839 14.4176 6.24881 13.4546 5.28353C12.4916 4.31825 11.3103 3.83561 9.91082 3.83561C8.51133 3.83561 7.33007 4.31825 6.36705 5.28353C5.40404 6.24881 4.92253 7.48839 4.92253 9.00228C4.92253 9.98839 5.33129 11.1169 6.14882 12.3877C6.96634 13.6585 8.22034 15.0717 9.91082 16.6273ZM9.91082 18.8356C7.67994 16.9328 6.01372 15.1655 4.91214 13.5335C3.81056 11.9016 3.25977 10.3912 3.25977 9.00228C3.25977 6.91895 3.92834 5.25922 5.26547 4.02311C6.60261 2.787 8.15106 2.16895 9.91082 2.16895C11.6706 2.16895 13.219 2.787 14.5562 4.02311C15.8933 5.25922 16.5619 6.91895 16.5619 9.00228C16.5619 10.3912 16.0111 11.9016 14.9095 13.5335C13.8079 15.1655 12.1417 16.9328 9.91082 18.8356Z" fill="#1C1B1F" />
                        </g>
                    </svg>
                    {jobDetails?.country?.join(', ')} ||  {jobDetails?.location?.join(', ')}

                </div>

            </div>
            <div >
                <PersonalDetails
                    data={formData.personal}
                    setFormData={setFormData}
                    handleInputChange={(fieldName, value) =>
                        handleInputChange("personal", fieldName, value)
                    }

                    formError={formError}
                />
                <ProfessionalDetails
                    data={formData.professional}
                    handleInputChange={(fieldName, value) =>
                        handleInputChange("professional", fieldName, value)
                    }
                    formError={formError}
                />
            </div>
            <div className="flex justify-end flex-row gap-4 pt-8">
                <button
                   
                  className=' px-[24px] py-2  rounded-[12px] border border-[#06A9EF]'
                    onClick={()=>router.back()}
                >
                    Cancel
                </button>
                <button
                   
                  className='bg-[#06A9EF] px-[24px] py-2 text-[#FFFFFF] rounded-[12px]'
                    onClick={applyForJob}
                >
                    Apply
                </button>
            </div>

        </div>
    )
}

export default ApplyForm
