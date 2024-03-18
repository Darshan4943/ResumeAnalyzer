import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react'
import Files from './files';

function Folders({ tabIndex, setTabIndex, data, setData }) {
    
    const [folderData, setFolderData] = useState([]);
    const [files, setFiles] = useState([])
    const [filesAll, setFilesAll] = useState([])

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event, folderName) => {
        const uploadedFiles = event.target.files;
        const newFiles = Array.from(uploadedFiles);

        const newData = data.map(folder => {
            if (folder.name === folderName) {
                return {
                    ...folder,
                    files: [...folder.files, ...newFiles]
                };
            }
            return folder;
        });

        setData(newData);
    };

    useEffect(() => {

        setFiles(folderData.files)
        setFilesAll(folderData.files)

    }, [folderData]);

    const changeHandler = (value) => {
        if (value.length > 0) {
            const options = {
                includeScore: true,
                keys: ['name', "category"],
            };
            const fuse = new Fuse(filesAll, options);
            const result = fuse.search(value);
            console.log(result, folderData);
            setFiles(result.map((item) => item.item));
        } else {

            setFiles(filesAll)
        }
    };


    return (
        <div className='flex flex-col gap-4 w-[80%] '>

            <div className='flex  gap-4 w-full justify-between'>
                <div className='flex gap-12  items-center w-[45%]'>
                    {tabIndex === 1 &&
                        <>
                            <div className='flex gap-4  items-center '>
                                <svg className='bg-[#FFF] p-2 rounded-[50%] border border-[#DEDEDE] cursor-pointer' onClick={() => setTabIndex(0)} width="40" height="40" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.95831 15.3892L15.9584 25.3892L14 27.3337L0.666687 14.0003L14 0.666992L15.9584 2.61141L5.95831 12.6115H27.3334V15.3892H5.95831Z" fill="#1C1B1F" />
                                </svg>
                                <div className='text-[18px] font-medium py-2 px-4 rounded-[36px] border border-blue'>
                                    {folderData.name}
                                </div>
                            </div>
                            <button className='px-4 py-2 bg-blue text-white rounded-[8px] font-medium flex gap-2 items-center upload-btn-wrapper'>
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 8H0.5V6H6.5V0H8.5V6H14.5V8H8.5V14H6.5V8Z" fill="white" />
                                </svg>
                                <input multiple type="file" accept=".pdf,.doc,.docx" onChange={(event) => handleFileChange(event, folderData.name)} />

                                <div>Upload files</div>
                            </button>
                        </>
                    }

                </div>
                <div className='rounded-[30px] py-2 px-3 flex gap-2 bg-[#E9EEF6] w-[25%] items-center '>

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.499 15.5L18.999 19L15.499 15.5ZM4.99902 11C4.99902 11.7879 5.15422 12.5681 5.45575 13.2961C5.75727 14.0241 6.19923 14.6855 6.75638 15.2426C7.31353 15.7998 7.97497 16.2417 8.70292 16.5433C9.43088 16.8448 10.2111 17 10.999 17C11.787 17 12.5672 16.8448 13.2951 16.5433C14.0231 16.2417 14.6845 15.7998 15.2417 15.2426C15.7988 14.6855 16.2408 14.0241 16.5423 13.2961C16.8438 12.5681 16.999 11.7879 16.999 11C16.999 9.4087 16.3669 7.88258 15.2417 6.75736C14.1164 5.63214 12.5903 5 10.999 5C9.40772 5 7.8816 5.63214 6.75638 6.75736C5.63116 7.88258 4.99902 9.4087 4.99902 11V11Z" stroke="#1F1F1F" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <input
                        onChange={(e) => changeHandler(e.target.value)}
                        className="w-full bg-[#E9EEF6] text-[#333333]"
                        type="text"

                        placeholder="Search File"
                    />
                </div>
                <div className=' flex gap-2 px-5 py-2 bg-[#E9EEF6] rounded-[30px]'>

                    <div className=' flex gap-2 text-[14px] font-medium  items-center '>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g mask="url(#mask0_1148_17404)">
                                <path d="M11.8548 15.3759C11.548 15.3759 11.2839 15.2651 11.0622 15.0435C10.8406 14.8219 10.7298 14.5577 10.7298 14.251V11.1067C10.7298 10.8 10.8406 10.5358 11.0622 10.3142C11.2839 10.0926 11.548 9.98175 11.8548 9.98175H14.999C15.3057 9.98175 15.5699 10.0926 15.7915 10.3142C16.0132 10.5358 16.124 10.8 16.124 11.1067V14.251C16.124 14.5577 16.0132 14.8219 15.7915 15.0435C15.5699 15.2651 15.3057 15.3759 14.999 15.3759H11.8548ZM11.8548 14.251H14.999V11.1067H11.8548V14.251ZM1.87402 13.2413V12.1163H8.33556V13.2413H1.87402ZM11.8548 8.02016C11.548 8.02016 11.2839 7.90935 11.0622 7.68773C10.8406 7.4661 10.7298 7.20193 10.7298 6.8952V3.75096C10.7298 3.44423 10.8406 3.18006 11.0622 2.95843C11.2839 2.7368 11.548 2.62598 11.8548 2.62598H14.999C15.3057 2.62598 15.5699 2.7368 15.7915 2.95843C16.0132 3.18006 16.124 3.44423 16.124 3.75096V6.8952C16.124 7.20193 16.0132 7.4661 15.7915 7.68773C15.5699 7.90935 15.3057 8.02016 14.999 8.02016H11.8548ZM11.8548 6.8952H14.999V3.75096H11.8548V6.8952ZM1.87402 5.88557V4.76059H8.33556V5.88557H1.87402Z" fill="#333333" />
                            </g>
                        </svg>


                        Select
                    </div>

                    <div className='w-[1px] h-full bg-white'></div>
                    <div className='  flex gap-2 text-[14px] font-medium items-center  '>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g mask="url(#mask0_1148_17389)">
                                <path d="M7.5 13.5V12H10.5V13.5H7.5ZM4.5 9.75V8.25H13.5V9.75H4.5ZM2.25 6V4.5H15.75V6H2.25Z" fill="#333333" />
                            </g>
                        </svg>


                        Filter
                    </div>
                    <div className='w-[1px] h-full bg-white'></div>
                    <div className=' flex gap-2 text-[14px] font-medium items-center '>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g mask="url(#mask0_1142_17256)">
                                <path d="M6.30289 9.48938V4.02879L4.17692 6.15476L3.375 5.36439L6.86537 1.87402L10.3557 5.36439L9.55384 6.15476L7.42787 4.02879V9.48938H6.30289ZM11.1274 16.124L7.63701 12.6336L8.43891 11.8432L10.5649 13.9692V8.50864H11.6899V13.9692L13.8158 11.8432L14.6177 12.6336L11.1274 16.124Z" fill="#333333" />
                            </g>
                        </svg>


                        Sort By
                    </div>
                </div>
            </div>


            <Files setTabIndex={setTabIndex} setFolderData={setFolderData} tabIndex={tabIndex} data={data} setData={setData} files={files} />

        </div>
    )
}

export default Folders
