import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react'
import Files from './files';

function Folders({ tabIndex, setTabIndex, data, setData, clientData, setClientData, tab, setFolderData, folderData }) {

    const [isSort, setIsSort] = useState(false)
    const [sortSelect, setSortSelect] = useState(1)
    const [files, setFiles] = useState()
    const [filesAll, setFilesAll] = useState([])
    const [select, setSelect] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isList, setIsList] = useState(false)
    const [isMove, setIsMove] = useState(false)
   
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


        setFilesAll(files)

    }, [folderData]);

    const changeHandler = (value) => {
        if (value.length > 0) {
            const options = {
                includeScore: true,
                keys: ['fileName', "category"],
            };
            const fuse = new Fuse(filesAll, options);
            const result = fuse.search(value);

            setFiles(result.map((item) => item.item));
        } else {

            setFiles(filesAll)
        }
    };
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedIndexes([]);
        } else {
            setSelectedIndexes(Array.from({ length: clientData.length }, (_, index) => index));
        }
        setSelectAll(!selectAll);
    };

    const sort = ["A to Z", "Date Modified", "Type"]
    const sortClientData = (data, selectedIndex) => {
        switch (sort[selectedIndex]) {
            case "A to Z":
                return data.sort((a, b) => a.firstName.localeCompare(b.firstName));

            case "Date Modified":
                return data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

            case "Type":

            default:
                return data;
        }
    };
    const handleSortSelect = (index) => {
        setSortSelect(index);
        const sortedData = sortClientData([...clientData], index);
        setClientData(sortedData);
    };

    return (
        <div className='flex flex-col gap-4 w-[80%] '>
            <div className='flex justify-between'>
                <p className='text-[24px] font-semibold'>My Collection</p>
                <div className='bg-[#FFFFFF] rounded-[36px] py-[10px] px-3 flex gap-2 items-center ' style={{ boxShadow: "0px 1px 2px 0px #00000040" }}>
                    <svg className='cursor-pointer' onClick={() => setIsList(true)} width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.50033 11.9997H15.667V9.77051H6.50033V11.9997ZM2.33366 4.22884H4.83366V1.99967H2.33366V4.22884ZM2.33366 8.12467H4.83366V5.89551H2.33366V8.12467ZM2.33366 11.9997H4.83366V9.77051H2.33366V11.9997ZM6.50033 8.12467H15.667V5.89551H6.50033V8.12467ZM6.50033 4.22884H15.667V1.99967H6.50033V4.22884ZM2.33366 13.6663C1.87533 13.6663 1.48296 13.5031 1.15658 13.1768C0.830187 12.8504 0.666992 12.458 0.666992 11.9997V1.99967C0.666992 1.54134 0.830187 1.14898 1.15658 0.822591C1.48296 0.496202 1.87533 0.333008 2.33366 0.333008H15.667C16.1253 0.333008 16.5177 0.496202 16.8441 0.822591C17.1705 1.14898 17.3337 1.54134 17.3337 1.99967V11.9997C17.3337 12.458 17.1705 12.8504 16.8441 13.1768C16.5177 13.5031 16.1253 13.6663 15.667 13.6663H2.33366Z" fill={isList ? "#333333" : "#808080"} />
                    </svg>
                    <div className='h-full w-[1px] bg-[#DEDEDE]'></div>
                    <svg className='cursor-pointer' onClick={() => setIsList(false)} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 7.16667V0.5H7.16667V7.16667H0.5ZM0.5 15.5V8.83333H7.16667V15.5H0.5ZM8.83333 7.16667V0.5H15.5V7.16667H8.83333ZM8.83333 15.5V8.83333H15.5V15.5H8.83333ZM2.16667 5.5H5.5V2.16667H2.16667V5.5ZM10.5 5.5H13.8333V2.16667H10.5V5.5ZM10.5 13.8333H13.8333V10.5H10.5V13.8333ZM2.16667 13.8333H5.5V10.5H2.16667V13.8333Z" fill={!isList ? "#333333" : "#808080"} />
                    </svg>

                </div>
            </div>

            <div className='flex flex-col gap-4  border border-[#DEDEDE] bg-white p-6 rounded-[16px] h-full '>

                <div className='flex  gap-4 w-full justify-between '>
                    <div className='flex gap-12  items-center w-[45%] h-[40px]'>
                        {select ?

                            <div className='bg-[#D1EDFF] flex gap-4 rounded-[50px] pl-[6px] pr-4 py-[6px] items-center w-full min-w-[440px]'>
                                <div onClick={() => setSelect(false)} style={{ boxShadow: "0px 1px 2px 0px #00000040" }} className='bg-[#F9F9F9] rounded-[50%] p-[8.5px]  cursor-pointer'>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 10.5L0.5 9.5L4.5 5.5L0.5 1.5L1.5 0.5L5.5 4.5L9.5 0.5L10.5 1.5L6.5 5.5L10.5 9.5L9.5 10.5L5.5 6.5L1.5 10.5Z" fill="#333333" />
                                    </svg>
                                </div>
                                <div className='flex  gap-4   justify-between w-full '>
                                    <div className='flex gap-2 text-[14px] font-medium'>
                                        <label className="flex items-center gap-2 text-[14px] font-medium">
                                            Select All
                                            <input
                                                type="checkbox"
                                                className=" rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox cursor-pointer"
                                                style={{ width: '20px', height: '20px', }}
                                                checked={selectAll}
                                                onChange={toggleSelectAll}
                                            />

                                        </label>
                                    </div>


                                    <div className='flex gap-3 min-w-[160px] justify-between'>
                                        <div className=' cursor-pointer' onClick={() => setIsMove(!isMove)}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                <g mask="url(#mask0_1381_18129)">
                                                    <path d="M10.1641 11.6654L8.8099 13.0195L9.97656 14.1862L13.3307 10.832L9.97656 7.47786L8.8099 8.64453L10.1641 9.9987H6.66406V11.6654H10.1641ZM3.33073 16.6654C2.8724 16.6654 2.48003 16.5022 2.15365 16.1758C1.82726 15.8494 1.66406 15.457 1.66406 14.9987V4.9987C1.66406 4.54036 1.82726 4.148 2.15365 3.82161C2.48003 3.49523 2.8724 3.33203 3.33073 3.33203H8.33073L9.9974 4.9987H16.6641C17.1224 4.9987 17.5148 5.16189 17.8411 5.48828C18.1675 5.81467 18.3307 6.20703 18.3307 6.66536V14.9987C18.3307 15.457 18.1675 15.8494 17.8411 16.1758C17.5148 16.5022 17.1224 16.6654 16.6641 16.6654H3.33073ZM3.33073 14.9987H16.6641V6.66536H9.3099L7.64323 4.9987H3.33073V14.9987Z" fill="#333333" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className='min-w-[1px] h-full bg-[#06A9EF] '> </div>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <g mask="url(#mask0_1381_18133)">
                                                <path d="M7.5 15.0003C7.04167 15.0003 6.64931 14.8371 6.32292 14.5107C5.99653 14.1844 5.83333 13.792 5.83333 13.3337V3.33366C5.83333 2.87533 5.99653 2.48296 6.32292 2.15658C6.64931 1.83019 7.04167 1.66699 7.5 1.66699H15C15.4583 1.66699 15.8507 1.83019 16.1771 2.15658C16.5035 2.48296 16.6667 2.87533 16.6667 3.33366V13.3337C16.6667 13.792 16.5035 14.1844 16.1771 14.5107C15.8507 14.8371 15.4583 15.0003 15 15.0003H7.5ZM7.5 13.3337H15V3.33366H7.5V13.3337ZM4.16667 18.3337C3.70833 18.3337 3.31597 18.1705 2.98958 17.8441C2.66319 17.5177 2.5 17.1253 2.5 16.667V5.00033H4.16667V16.667H13.3333V18.3337H4.16667Z" fill="#333333" />
                                            </g>
                                        </svg>
                                        <div className='min-w-[1px] h-full bg-[#06A9EF] '> </div>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <g mask="url(#mask0_1381_18138)">
                                                <path d="M5.83594 17.5C5.3776 17.5 4.98524 17.3368 4.65885 17.0104C4.33247 16.684 4.16927 16.2917 4.16927 15.8333V5H3.33594V3.33333H7.5026V2.5H12.5026V3.33333H16.6693V5H15.8359V15.8333C15.8359 16.2917 15.6727 16.684 15.3464 17.0104C15.02 17.3368 14.6276 17.5 14.1693 17.5H5.83594ZM14.1693 5H5.83594V15.8333H14.1693V5ZM7.5026 14.1667H9.16927V6.66667H7.5026V14.1667ZM10.8359 14.1667H12.5026V6.66667H10.8359V14.1667Z" fill="#333333" />
                                            </g>
                                        </svg>
                                        <div className='min-w-[1px] h-full bg-[#06A9EF] '> </div>

                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <g mask="url(#mask0_1381_18142)">
                                                <path d="M2 20V16H18V20H2ZM5.5 12.5H6.5625L12.375 6.6875L11.8333 6.125L11.3125 5.625L5.5 11.4375V12.5ZM4 14V10.8142L12.375 2.4375C12.5278 2.28472 12.6933 2.17361 12.8716 2.10417C13.0499 2.03472 13.2374 2 13.4341 2C13.6308 2 13.8194 2.03472 14 2.10417C14.1806 2.17361 14.3479 2.28431 14.5022 2.43627L15.5625 3.5C15.7153 3.65278 15.8264 3.81944 15.8958 4C15.9653 4.18056 16 4.37081 16 4.57077C16 4.75823 15.9656 4.94256 15.8969 5.12377C15.8281 5.30498 15.7188 5.47057 15.5688 5.62054L7.1875 14H4ZM12.375 6.6875L11.8333 6.125L11.3125 5.625L12.375 6.6875Z" fill="#333333" />
                                            </g>
                                        </svg>

                                    </div>
                                    <div className='text-[14px] font-semibold min-w-[85px] flex justify-end'>
                                        {selectedIndexes.length} selected
                                    </div>
                                </div>

                            </div>
                            :
                            <>
                                {tabIndex === 1 &&
                                    <>
                                        <div className='flex gap-4  items-center h-[40px] '>
                                            <svg className='bg-[#FFF] p-2 rounded-[50%] border border-[#DEDEDE] cursor-pointer' onClick={() => setTabIndex(0)} width="40" height="40" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.95831 15.3892L15.9584 25.3892L14 27.3337L0.666687 14.0003L14 0.666992L15.9584 2.61141L5.95831 12.6115H27.3334V15.3892H5.95831Z" fill="#1C1B1F" />
                                            </svg>
                                            <div className='text-[18px] font-medium py-[5.8px] px-4 rounded-[36px] border border-blue'>
                                                {tab === 0 ? folderData?.firstName : folderData?.folderName}
                                            </div>

                                        </div>
                                        {/* <button className='px-4 py-2 bg-blue text-white rounded-[8px] font-medium flex gap-2 items-center upload-btn-wrapper'>
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 8H0.5V6H6.5V0H8.5V6H14.5V8H8.5V14H6.5V8Z" fill="white" />
                                </svg>
                                <input multiple type="file" accept=".pdf,.doc,.docx" onChange={(event) => handleFileChange(event, folderData.name)} />

                                <div>Upload files</div>
                            </button> */}
                                    </>
                                }
                            </>
                        }
                    </div>
                    <div className=' w-[80%] flex justify-end gap-4 items-center h-[38px] '>
                        <div className='rounded-[30px] py-2 px-3 flex gap-2 bg-[#E9EEF6] w-[50%] items-center h-[40px]  '>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.499 15.5L18.999 19L15.499 15.5ZM4.99902 11C4.99902 11.7879 5.15422 12.5681 5.45575 13.2961C5.75727 14.0241 6.19923 14.6855 6.75638 15.2426C7.31353 15.7998 7.97497 16.2417 8.70292 16.5433C9.43088 16.8448 10.2111 17 10.999 17C11.787 17 12.5672 16.8448 13.2951 16.5433C14.0231 16.2417 14.6845 15.7998 15.2417 15.2426C15.7988 14.6855 16.2408 14.0241 16.5423 13.2961C16.8438 12.5681 16.999 11.7879 16.999 11C16.999 9.4087 16.3669 7.88258 15.2417 6.75736C14.1164 5.63214 12.5903 5 10.999 5C9.40772 5 7.8816 5.63214 6.75638 6.75736C5.63116 7.88258 4.99902 9.4087 4.99902 11V11Z" stroke="#1F1F1F" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <input
                                // onChange={(e) => changeHandler(e.target.value)}
                                className="w-full bg-[#E9EEF6] text-[#333333]"
                                type="text"

                                placeholder="Search File"
                            />
                        </div>
                        <div className=' flex gap-2 px-5 py-2 bg-[#E9EEF6] rounded-[30px] w-[30%] min-w-[289px] h-[40px]'>

                            <div onClick={() => setSelect(!select)} className=' flex gap-2 text-[14px] font-medium  items-center cursor-pointer '>
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
                            <div onClick={() => setIsSort(!isSort)} className=' flex gap-2 text-[14px] font-medium items-center relative cursor-pointer'>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                    <g mask="url(#mask0_1142_17256)">
                                        <path d="M6.30289 9.48938V4.02879L4.17692 6.15476L3.375 5.36439L6.86537 1.87402L10.3557 5.36439L9.55384 6.15476L7.42787 4.02879V9.48938H6.30289ZM11.1274 16.124L7.63701 12.6336L8.43891 11.8432L10.5649 13.9692V8.50864H11.6899V13.9692L13.8158 11.8432L14.6177 12.6336L11.1274 16.124Z" fill="#333333" />
                                    </g>
                                </svg>


                                Sort By

                                {isSort &&
                                    <>

                                        <div className='absolute flex flex-col text-[14px] text-[#000000] rounded-[8px] right-[-20%] z-10 top-[140%] min-w-[150px] p-4 gap-4 bg-white' style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}>
                                            {sort?.map((item, index) => (
                                                <div key={index} onClick={() => handleSortSelect(index)} className='flex gap-2 items-center'>
                                                    {sortSelect === index ?
                                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.00295 7.5C3.02876 7.5 2.20139 7.1607 1.52083 6.48211C0.840278 5.80351 0.5 4.97712 0.5 4.00295C0.5 3.02876 0.839296 2.20139 1.51789 1.52083C2.19649 0.840278 3.02288 0.5 3.99705 0.5C4.97124 0.5 5.79861 0.839295 6.47917 1.51789C7.15972 2.19649 7.5 3.02288 7.5 3.99705C7.5 4.97124 7.1607 5.79861 6.48211 6.47917C5.80351 7.15972 4.97712 7.5 4.00295 7.5Z" fill="#808080" />
                                                        </svg>
                                                        :
                                                        <div className='w-[8px] h-[8px]'> </div>
                                                    }
                                                    {item}
                                                </div>
                                            ))}

                                        </div>


                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-[1px] w-full bg-[#DEDEDE]'></div>
                <Files isMove={isMove} setIsMove={setIsMove} isList={isList} selectedIndexes={selectedIndexes} setSelectedIndexes={setSelectedIndexes} setSelect={setSelect} select={select} setTabIndex={setTabIndex} setFolderData={setFolderData} tabIndex={tabIndex} data={data} setData={setData} files={files} setFiles={setFiles} clientData={clientData} setClientData={setClientData} tab={tab} />

            </div>
        </div>
    )
}

export default Folders
