import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PersonalDetails from './personalDetails';
import ProfessionalDetails from './professionalDetails';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import MiniLoader from '../../../components/common/mini-loader';
import MiniLoader1 from '../../../components/common/miniLoader';
import moment from 'moment';
function ApplyForm() {
    const [formError, setFormError] = useState({});
    const userDataGlobal = useSelector((state) => state.userData);
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [loading, setLoading] = useState(false)
    const [loadingg, setLoadingg] = useState(true)
    const [uploadedResume, setUploadedResume] = useState(null);

    const [isUploaded, setIsUploaded] = useState(false);

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
    const [jobDetails, setJobDetails] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:2000/api/job/getByJobId/${id}`)
            .then((res) => setJobDetails(res.data))

            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:2000/api/resume/${userDataGlobal._id}`)
            .then((res) => {setResumes(res.data.data)  ;setLoadingg(false)})
            .catch((err) => console.error(err));
           
    }, [userDataGlobal]);

    const handleInputChange = (section, fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [fieldName]: value,
            }
        }));
        setFormError((prevErrors) => ({
            ...prevErrors,
            [fieldName]: '',
        }));
    };

    const validateInput = () => {
        const errors = {};
        const personal = formData.personal;
        const professional = formData.professional;

        if (!personal?.firstName) errors.firstName = 'First name is required';
        if (!personal?.lastName) errors.lastName = 'Last name is required';
        if (!personal?.email) errors.email = 'Email is required';
        if (!personal?.dob) errors.dob = 'Date of birth is required';
        if (!personal?.gender) errors.gender = 'Gender is required';
        if (!personal?.mobileNo) errors.mobileNo = 'Mobile Number is required';

        if (!professional?.totalExperience) errors.totalExperience = 'Total experience is required';
        if (!professional?.relevantExperience) errors.relevantExperience = 'Relevant experience is required';
        if (!professional?.currentCTC) errors.currentCTC = 'Current CTC is required';
        if (!professional?.expectedCTC) errors.expectedCTC = 'Expected CTC is required';
        if (!professional?.noticePeriod) errors.noticePeriod = 'Notice period is required';

        // Check if a resume is selected or uploaded
        if (!selectedResume && !uploadedResume) {
            errors.resume = 'Please select or upload a resume';
        }

        setFormError(errors);
        return Object.keys(errors).length === 0;
    };


    const applyForJob = () => {
        if (!validateInput()) return;

        setLoading(true);
        const formDataToSend = new FormData();

        formDataToSend.append('userId', userDataGlobal._id);
        formDataToSend.append('resumeUrl', isUploaded ? null : selectedResume);
        formDataToSend.append('resumeId', null);
        formDataToSend.append('percentage', '');

        if (isUploaded && uploadedResume) {
            formDataToSend.append('uploadedResume', uploadedResume);
        } else if (!selectedResume && !uploadedResume) {

            setLoading(false);
            return;
        }

        formDataToSend.append('formData', JSON.stringify({
            personal: {
                firstName: formData.personal?.firstName,
                lastName: formData.personal?.lastName,
                email: formData.personal?.email,
                mobileNo: formData.personal?.mobileNo,
                currentLocation: formData.personal?.currentLocation,
                dob: formData.personal?.dob,
                gender: formData.personal?.gender
            },
            professional: {
                totalExperience: formData.professional?.totalExperience,
                relevantExperience: formData.professional?.relevantExperience,
                currentCTC: formData.professional?.currentCTC,
                expectedCTC: formData.professional?.expectedCTC,
                noticePeriod: formData.professional?.noticePeriod,
                comfortableWithLocation: formData.professional?.comfortableWithLocation
            }
        }));

        axios.post(`http://localhost:2000/api/job/apply/${id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                toast.success('Application Sent Successfully');
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                router.push('/jobs/search?applied=${true}')
            })
            .catch((err) => {
                console.error(err);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    };

    const handleResumeSelection = (resumeUrl) => {
        setSelectedResume(resumeUrl);
        // setUploadedResume(null); 
        setIsUploaded(false);
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        setUploadedResume(file);
        setSelectedResume(null);
        setIsUploaded(true);
    };

    const getLastUpdatedText = (updatedAt) => {
        const now = moment();
        const updatedDate = moment(updatedAt);
        const diffInHours = now.diff(updatedDate, 'hours');
        const diffInDays = now.diff(updatedDate, 'days');

        if (diffInHours < 24) {
            return `Last updated at ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return `Last updated at ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
        }
    };
    return (
        <>
            {!loadingg ?

                <div className='customMargins wl:w-[80%] w-[100%]'>
                    <div className='rounded-[16px] my-6 bg-[#FFFFFF] sm:p-6 p-3 flex flex-col gap-6' style={{ boxShadow: '0px 1px 2px 0px #00000040' }}>
                        <div className=' flex ml:flex-row flex-col sm:gap-4 gap-2 ml:items-center '>
                            <p className='text-[#06A9EF] sm:text-[24px] text-[18px] font-medium'>
                                Apply to <span className='font-[24px] text-[#333333]'>{jobDetails?.jobTitle}</span>
                            </p>
                            <div className='bg-[#DEDEDE] w-[2px] h-[29px] ml:block hidden'></div>
                            <p className='sm:text-[24px] text-[18px]  font-medium'>{jobDetails?.companyName}</p>
                            <div className='flex flex-row gap-1 items-center'>
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">

                                    <g mask="url(#mask0_5716_128824)">
                                        <path d="M9.91082 10.5023C10.3681 10.5023 10.7595 10.3391 11.0851 10.0127C11.4108 9.68631 11.5736 9.29395 11.5736 8.83561C11.5736 8.37728 11.4108 7.98492 11.0851 7.65853C10.7595 7.33214 10.3681 7.16895 9.91082 7.16895C9.45356 7.16895 9.06212 7.33214 8.73649 7.65853C8.41087 7.98492 8.24806 8.37728 8.24806 8.83561C8.24806 9.29395 8.41087 9.68631 8.73649 10.0127C9.06212 10.3391 9.45356 10.5023 9.91082 10.5023ZM9.91082 16.6273C11.6013 15.0717 12.8553 13.6585 13.6728 12.3877C14.4903 11.1169 14.8991 9.98839 14.8991 9.00228C14.8991 7.48839 14.4176 6.24881 13.4546 5.28353C12.4916 4.31825 11.3103 3.83561 9.91082 3.83561C8.51133 3.83561 7.33007 4.31825 6.36705 5.28353C5.40404 6.24881 4.92253 7.48839 4.92253 9.00228C4.92253 9.98839 5.33129 11.1169 6.14882 12.3877C6.96634 13.6585 8.22034 15.0717 9.91082 16.6273ZM9.91082 18.8356C7.67994 16.9328 6.01372 15.1655 4.91214 13.5335C3.81056 11.9016 3.25977 10.3912 3.25977 9.00228C3.25977 6.91895 3.92834 5.25922 5.26547 4.02311C6.60261 2.787 8.15106 2.16895 9.91082 2.16895C11.6706 2.16895 13.219 2.787 14.5562 4.02311C15.8933 5.25922 16.5619 6.91895 16.5619 9.00228C16.5619 10.3912 16.0111 11.9016 14.9095 13.5335C13.8079 15.1655 12.1417 16.9328 9.91082 18.8356Z" fill="#1C1B1F" />
                                    </g>
                                </svg>
                                {jobDetails?.country?.join(', ')} ||  {jobDetails?.location?.join(', ')}

                            </div>
                        </div>

                        <PersonalDetails
                            data={formData.personal}
                            setFormData={setFormData}
                            handleInputChange={(fieldName, value) => handleInputChange('personal', fieldName, value)}
                            formError={formError}
                        />

                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-4 items-center'>
                                <h2 className='sm:text-[24px] text-[20px]  font-medium sm:min-w-[270px] min-w-[210px]'>Upload CV / Resume</h2>
                                <div className='h-[1px] w-[70%] bg-[#DEDEDE]'></div>
                            </div>

                            <div className='flex flex-col gap-3 h-[200px] overflow-y-auto overflow-x-hidden sm:pr-4 pr-2'>
                                {resumes?.map((item, index) => (
                                    <div key={index} className='flex flex-row border border-[#DEDEDE] rounded-[12px]'>
                                        <div className='px-[10px] text-center flex sm:text-[16px] text-[13px] flex-row items-center bg-[#C00000] text-white rounded-l-[12px]'>
                                            PDF
                                        </div>
                                        <div className='flex flex-row justify-between items-center sm:p-4 p-2 w-full'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-[#333333] font-medium text-[14px]'>{item.fileName}</p>
                                                <p className='text-[#646464] font-[400] text-[12px]'>
                                                    {getLastUpdatedText(item.updatedAt)}
                                                </p>
                                            </div>

                                            <div className='flex flex-row sm:gap-4 gap-2 h-[40px] py-1 items-center'>
                                                <div className='px-[10px] py-1 border border-[#06A9EF] rounded-[8px]'>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g mask="url(#mask0_5716_128902)">
                                                            <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#646464" />
                                                        </g>
                                                    </svg>
                                                </div>

                                                <input
                                                    name='resume'
                                                    type='radio'
                                                    value={item.resumeUrl}
                                                    checked={selectedResume === item.resumeUrl && !isUploaded}
                                                    onChange={() => handleResumeSelection(item.resumeUrl)}
                                                    className='custom-radio h-4 w-4 border-[#DEDEDE]'
                                                />
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex sm:flex-row flex-col gap-4 justify-between w-[100%]'>
                                {formError.resume && (
                                    <p className='text-red font-medium  text-[14px]'>{formError.resume}</p>
                                )}
                                {uploadedResume ? (
                                    <div className='flex flex-row border border-[#DEDEDE] rounded-[12px] sm:w-[70%] w-[100%]'>
                                        <div className='px-[10px] text-center flex flex-row items-center bg-[#C00000] text-white rounded-l-[12px] sm:text-[16px] text-[13px]'>
                                            PDF
                                        </div>
                                        <div className='flex flex-row justify-between items-center px-4 py-1 w-full'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-[#333333] font-medium text-[14px]'>{uploadedResume.name}</p>
                                            </div>
                                            <div className='flex flex-row gap-4 h-[30px] py-1 items-center'>
                                                <input
                                                    name='resume'
                                                    type='radio'
                                                    checked={isUploaded}
                                                    onChange={() => setIsUploaded(true)}
                                                    className='custom-radio h-4 w-4 border-[#DEDEDE]'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className='text-[14px] font-medium text-[#646464]'>DOC, DOCX, PDF (2 MB)</p>
                                )}
                                <label className='sm:px-6 px-3 sm:py-[10px] py-[6px] min-w-[140px] max-w-[140px] sm:max-w-full border border-[#06A9EF] rounded-[8px] sm:text-[16px] text-[14px]  font-medium text-[#333333] cursor-pointer'>
                                    Upload Resume
                                    <input
                                        type='file'
                                        name='resume'
                                        accept='.doc,.docx,.pdf'
                                        onChange={handleResumeUpload}
                                        className='hidden'
                                    />
                                </label>
                            </div>

                        </div>

                        <ProfessionalDetails
                            data={formData.professional}
                            setFormData={setFormData}
                            handleInputChange={(fieldName, value) => handleInputChange('professional', fieldName, value)}
                            formError={formError}
                        />


                        <div className='flex justify-end flex-row gap-4 pt-8'>
                            <button className='px-[24px] py-2 rounded-[12px] border border-[#06A9EF]' onClick={() => router.back()}>
                                Cancel
                            </button>
                            <button className='bg-[#06A9EF] px-[24px] py-2 text-[#FFFFFF] rounded-[12px]' onClick={() => validateInput() && applyForJob()}>
                                {loading ? <MiniLoader /> :
                                    "Apply"
                                }
                            </button>
                        </div>
                    </div>

                </div>
                :

                <MiniLoader1 />
            }
        </>
    );
}

export default ApplyForm;
