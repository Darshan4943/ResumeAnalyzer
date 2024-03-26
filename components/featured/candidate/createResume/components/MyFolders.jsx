import React, { useState } from 'react'

function MyFolders({ setIsMove, isMove, toggleSelect, isList, tabIndex, setTabIndex, data, setData, setFolderData, files, setFiles, clientData, setClientData, tab, select, setSelect, selectedIndexes, setSelectedIndexes, openFolder }) {
    const [list, setList] = useState(false)
    return (
        <div className=''>
            {isMove &&
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
                        <div className='absolute bg-white rounded-[16px] p-4 flex flex-col gap-4 w-[40%]'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-[24px] font-medium'>Move  <span className='text-[24px] font-semibold text-[#1C75BC]'> fileName</span></p> { }
                                <p className='py-2 text-[18px] font-medium'>Current Location/ path  <span className='px-4 py-2 border border-[#06A9EF] rounded-[36px]'> folder 1</span></p>

                            </div>
                            <div className='h-[1px] w-full bg-[#DEDEDE]'></div>
                            <div className='flex flex-col gap-4'>
                                <p className='text-[18px] font-medium'>select location to move file</p>

                                <div className='border border-[#DEDEDE] rounded-[12px] px-2 py-4 w-full min-h-[200px]'>
                                    {!list ?
                                        <button onClick={() => setList(true)} className={`w-full rounded-[12px] text-[16px] font-semibold px-6 py-2 flex gap-2 justify-between items-center  ${tab === 1 && "bg-[#C2E7FF]"}  `}>
                                            <div className='  flex gap-2 justify-start items-center '>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                    <g mask="url(#mask0_1148_17425)">
                                                        <path d="M2.49967 17.5003C2.04134 17.5003 1.64898 17.3371 1.32259 17.0107C0.996202 16.6844 0.833008 16.292 0.833008 15.8337V5.00033H2.49967V15.8337H16.6663V17.5003H2.49967ZM5.83301 14.167C5.37467 14.167 4.98231 14.0038 4.65592 13.6774C4.32954 13.351 4.16634 12.9587 4.16634 12.5003V3.33366C4.16634 2.87533 4.32954 2.48296 4.65592 2.15658C4.98231 1.83019 5.37467 1.66699 5.83301 1.66699H9.99967L11.6663 3.33366H17.4997C17.958 3.33366 18.3504 3.49685 18.6768 3.82324C19.0031 4.14963 19.1663 4.54199 19.1663 5.00033V12.5003C19.1663 12.9587 19.0031 13.351 18.6768 13.6774C18.3504 14.0038 17.958 14.167 17.4997 14.167H5.83301ZM5.83301 12.5003H17.4997V5.00033H10.9788L9.31217 3.33366H5.83301V12.5003Z" fill="#1C1B1F" />
                                                    </g>
                                                </svg>

                                                My Folders
                                            </div>
                                            <div className='text-[14px] font-medium flex gap-1 justify-end items-center'>
                                                See Contents
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                    <g mask="url(#mask0_1338_29151)">
                                                        <path d="M13.3667 12L8 6.63333L9.63333 5L16.6333 12L9.63333 19L8 17.3667L13.3667 12Z" fill="#333333" />
                                                    </g>
                                                </svg>

                                            </div>
                                        </button>

                                        :
                                        <div className='flex flex-col gap-2'>
                                            <button onClick={() => setList(false)} className='bg-[#E9EEF6] px-2 py-[5px] flex gap-2 text-[20px] font-semibold rounded-[12px] items-center w-fit'>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                    <g mask="url(#mask0_1338_28924)">
                                                        <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#333333" />
                                                    </g>
                                                </svg>

                                                Back
                                            </button>
                                            <button onClick={() => setList(true)} className={`w-full rounded-[12px] text-[16px] font-semibold px-6 py-2 flex gap-2 justify-between items-center  ${tab === 1 && "bg-[#C2E7FF]"}  `}>
                                                <div className='  flex gap-2 justify-start items-center '>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                        <g mask="url(#mask0_1148_17425)">
                                                            <path d="M2.49967 17.5003C2.04134 17.5003 1.64898 17.3371 1.32259 17.0107C0.996202 16.6844 0.833008 16.292 0.833008 15.8337V5.00033H2.49967V15.8337H16.6663V17.5003H2.49967ZM5.83301 14.167C5.37467 14.167 4.98231 14.0038 4.65592 13.6774C4.32954 13.351 4.16634 12.9587 4.16634 12.5003V3.33366C4.16634 2.87533 4.32954 2.48296 4.65592 2.15658C4.98231 1.83019 5.37467 1.66699 5.83301 1.66699H9.99967L11.6663 3.33366H17.4997C17.958 3.33366 18.3504 3.49685 18.6768 3.82324C19.0031 4.14963 19.1663 4.54199 19.1663 5.00033V12.5003C19.1663 12.9587 19.0031 13.351 18.6768 13.6774C18.3504 14.0038 17.958 14.167 17.4997 14.167H5.83301ZM5.83301 12.5003H17.4997V5.00033H10.9788L9.31217 3.33366H5.83301V12.5003Z" fill="#1C1B1F" />
                                                        </g>
                                                    </svg>

                                                    Folder Name
                                                </div>
                                                <div className='text-[14px] font-medium flex gap-1 justify-end items-center'>
                                                    See Contents
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                        <g mask="url(#mask0_1338_29151)">
                                                            <path d="M13.3667 12L8 6.63333L9.63333 5L16.6333 12L9.63333 19L8 17.3667L13.3667 12Z" fill="#333333" />
                                                        </g>
                                                    </svg>

                                                </div>
                                            </button>

                                        </div>

                                    }
                                </div>

                            </div>
                            <div className='flex gap-4 justify-end items-center'>
                                <button onClick={() => setIsMove(false)} className='text-[18px] font-semibold text-[#06A9EF] py-3 px-9 '>Cancel</button>
                                <button className='text-[18px] font-semibold text-white bg-[#06A9EF] rounded-[12px] py-3 px-9 '>Move</button>
                            </div>
                        </div>

                    </div>
                </>
            }

            {tabIndex === 0 &&
                <div className='rounded-[16px] p-4 flex flex-row gap-y-6 flex-wrap  w-full h-full'>
                    {data?.length > 0 ?
                        <>
                            {!isList ?
                                data?.map((item, index) => (
                                    <>

                                        <div onClick={() => { !select && openFolder(index) }} key={index} className=' break-all flex flex-col items-center text-center cursor-pointer h-fit w-[120px] px-2'>
                                            <div className=' relative'>
                                                <svg width="57" height="48" viewBox="0 0 57 48" fill="none" xmlns="http://www.w3.org/2000/svg ">
                                                    <path d="M50.4997 7.99998H29.7362L27.3944 3.31641C26.8987 2.31758 26.1333 1.47753 25.1847 0.891397C24.2361 0.305266 23.1423 -0.00351467 22.0273 3.01816e-05H6.49996C4.90921 0.00177713 3.38411 0.634475 2.25928 1.75931C1.13445 2.88414 0.501747 4.40924 0.5 5.99999V41.9998C0.501747 43.5905 1.13445 45.1156 2.25928 46.2405C3.38411 47.3653 4.90921 47.998 6.49996 47.9997H50.4997C52.0904 47.998 53.6155 47.3653 54.7404 46.2405C55.8652 45.1156 56.4979 43.5905 56.4996 41.9998V13.9999C56.4979 12.4092 55.8652 10.8841 54.7404 9.75926C53.6155 8.63443 52.0904 8.00173 50.4997 7.99998Z" fill="#4294FF" />
                                                    <path d="M51.9597 47.7996C51.4854 47.9373 50.9935 48.0047 50.4997 47.9996H6.49996C4.9101 47.995 3.38668 47.3614 2.26248 46.2371C1.13827 45.1129 0.504644 43.5895 0.5 41.9997V5.99989C0.499548 4.7876 0.868792 3.60401 1.55846 2.60702C2.24814 1.61003 3.22544 0.847069 4.35998 0.419922C9.95994 16.1198 23.0599 40.0197 51.9597 47.7996Z" fill="#2965ED" />
                                                </svg>
                                                {select &&
                                                    <input
                                                        type="checkbox"
                                                        className=" absolute right-[-15%] top-0 rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox"
                                                        style={{ width: '20px', height: '20px', }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        checked={selectedIndexes.includes(index)}
                                                        onChange={() => toggleSelect(index)}
                                                    />
                                                }
                                            </div>


                                            {item.folderName}

                                        </div>



                                    </>
                                ))
                                :
                                <table className="w-[100%]" >
                                    <thead>
                                        <tr>
                                            <th className='py-3 px-4 rounded-l-[12px] bg-[#C2E7FF] w-[30%] text-left'>Name</th>
                                            <th className='py-3 px-4 bg-[#C2E7FF] w-[25%] text-left'>Date Modified</th>
                                            <th className='py-3 px-4 bg-[#C2E7FF] w-[20%] text-left'>Category</th>
                                            <th className='py-3 px-4 rounded-r-[12px] bg-[#C2E7FF] w-[25%] text-left'>Size</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {data.map((item, index) => (
                                            <tr key={index} onClick={() => openFolder(index)} className=''>
                                                <td className='px-4 py-2 font-medium flex gap-2 relative items-center '>
                                                    {select &&
                                                        <input
                                                            type="checkbox"
                                                            className="   rounded-[4.5px]  outline-none text-[14px] font-medium custom-checkbox"
                                                            style={{ width: '20px', height: '20px', }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            checked={selectedIndexes.includes(index)}
                                                            onChange={() => toggleSelect(index)}
                                                        />
                                                    }
                                                    {item.folderName}
                                                </td>
                                                {/* <td className='px-4 py-2 text-[#858585]'>{item.dateModified}</td>
                            <td className='px-4 py-2 text-[#858585]'>{item.category}</td>
                            <td className='px-4 py-2 text-[#858585]'>{item.size}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                        </>
                        :
                        <div className='w-full h-full flex flex-col gap-6 justify-center items-center'>
                            <img
                                src="/images/noFile.png"
                                className="h-[300px] w-[375px]"
                                alt=""
                            />
                            <div className='text-[20px] font-medium text-[#808080]'>No Folders Available </div>
                        </div>
                    }
                </div>
            }
            {tabIndex === 1 &&
                <div className=' gap-[1px] p-4 bg-white w-full min-h-[60vh]'>
                    {files?.length > 0 ?
                        <table className="w-[100%] ">
                            <thead>
                                <tr>
                                    <th className='py-3 px-4 rounded-l-[12px] bg-[#C2E7FF] w-[30%] text-left'>Name</th>
                                    <th className='py-3 px-4 bg-[#C2E7FF] w-[25%] text-left'>Date Modified</th>
                                    <th className='py-3 px-4 bg-[#C2E7FF] w-[20%] text-left'>Category</th>
                                    <th className='py-3 px-4 rounded-r-[12px] bg-[#C2E7FF] w-[25%] text-left'>Size</th>
                                </tr>
                            </thead>
                            <tbody >
                                {files.map((item, index) => (
                                    <tr key={index} className=''>
                                        <td className='px-4 py-2 font-medium'>{item.fileName}</td>
                                        {/* <td className='px-4 py-2 text-[#858585]'>{item.dateModified}</td>
                            <td className='px-4 py-2 text-[#858585]'>{item.category}</td>
                            <td className='px-4 py-2 text-[#858585]'>{item.size}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        :
                        <div className='w-full h-full flex flex-col gap-6 justify-center items-center'>
                            <img
                                src="/images/noFile.png"
                                className="h-[300px] w-[375px]"
                                alt=""
                            />
                            <div className='text-[20px] font-medium text-[#808080]'>No Files Available </div>
                        </div>
                    }
                </div>

            }
        </div>
    )
}

export default MyFolders
