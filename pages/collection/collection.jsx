import Fuse from 'fuse.js';
import React, { useEffect, useRef, useState } from 'react'
import Folders from '../../components/featured/candidate/createResume/components/folders';

function Collection() {
  const [isCreate, setIsCreate] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)


  const [folderName, setFolderName] = useState('Untitled folder');
  const inputRef = useRef(null);
  

  useEffect(() => {

    if (inputRef.current) {
      inputRef.current.select();
    }
  }, [isCreate]);

 


  const addFolder = () => {
    const newFolder = {
      name: folderName,
      files: []
    };

    setData(prevData => [...prevData, newFolder]);
    setIsCreate(false)
    setFolderName('Untitled folder');
  }

  const [data, setData] = useState([
    {
      name: "Folder 1",
      files: [
        {
          name: "folder1_file1.pdf",
          dateModified: "2024-03-15",
          category: "React",
          size: "100kb"
        },
        {
          name: "folder1_file2.pdf",
          dateModified: "2024-03-14",
          category: "JavaScript",
          size: "200kb"
        },
        {
          name: "folder1_file3.pdf",
          dateModified: "2024-03-13",
          category: "Node.js",
          size: "150kb"
        }
      ]
    },
    {
      name: "Folder 2",
      files: [
        {
          name: "folder2_file1.pdf",
          dateModified: "2024-03-15",
          category: "Python",
          size: "110kb"
        },
        {
          name: "folder2_file2.pdf",
          dateModified: "2024-03-14",
          category: "Django",
          size: "220kb"
        }
      ]
    },
    {
      name: "Folder 3",
      files: [
        {
          name: "folder3_file1.pdf",
          dateModified: "2024-03-15",
          category: "HTML",
          size: "90kb"
        },
        {
          name: "folder3_file2.pdf",
          dateModified: "2024-03-14",
          category: "CSS",
          size: "180kb"
        }
      ]
    },
    {
      name: "Folder 4",
      files: [
        {
          name: "folder4_file1.pdf",
          dateModified: "2024-03-15",
          category: "Java",
          size: "120kb"
        },
        {
          name: "folder4_file2.pdf",
          dateModified: "2024-03-14",
          category: "Spring",
          size: "240kb"
        }
      ]
    },
    {
      name: "Folder 5",
      files: [
        // {
        //   name: "folder5_file1.pdf",
        //   dateModified: "2024-03-15",
        //   category: "C#",
        //   size: "130kb"
        // },
        // {
        //   name: "folder5_file2.pdf",
        //   dateModified: "2024-03-14",
        //   category: ".NET",
        //   size: "260kb"
        // }
      ]
    }
  ]);
 
  return (
    <>
      {isCreate &&
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute  w-[30%] rounded-[14px] bg-white p-4 flex flex-col gap-6 ">
              <div className='text-[24px] font-medium'>New Folder</div>
              <input className='border border-blue rounded-[8px] py-2 px-4'
                ref={inputRef}
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <div className='flex justify-end gap-6 text-blue font-medium'>
                <button onClick={() => { setIsCreate(false); setFolderName('Untitled folder') }}>Cancel</button>
                <button onClick={addFolder}>Create</button>


              </div>

            </div>
          </div>
        </>
      }

      <div className='flex flex-col gap-4 p-6 min-h-[100vh]'>
        <p className='text-[24px] font-semibold'>Collection</p>
        <div className='bg-[#F9F9F9] rounded-[16px] flex justify-between  gap-4 p-6 ' style={{ boxShadow: "0px 2px 6px 0px #00000040" }}>
          <div className='flex flex-col gap-5  justify-between w-[20%] min-h-[50vh]' >
            <div className='flex flex-col gap-5 ' >

              <button disabled={tabIndex === 1} onClick={() => setIsCreate(true)} className={`rounded-[8px] text-[14px] font-semibold px-4 py-2 flex gap-2 justify-center items-center w-[139px] bg-blue text-white ${tabIndex === 1 && "opacity-30"} `}>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xlgns="http://www.w3.org/2000/svg">
                  <path d="M6.5 8H0.5V6H6.5V0H8.5V6H14.5V8H8.5V14H6.5V8Z" fill="white" />
                </svg>
                New Folder

              </button>
              <button onClick={() => ""} className=" rounded-[30px] text-[16px] font-semibold px-6 py-2 flex gap-2 justify-start items-center  bg-[#C2E7FF]  ">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g mask="url(#mask0_1148_17425)">
                    <path d="M2.49967 17.5003C2.04134 17.5003 1.64898 17.3371 1.32259 17.0107C0.996202 16.6844 0.833008 16.292 0.833008 15.8337V5.00033H2.49967V15.8337H16.6663V17.5003H2.49967ZM5.83301 14.167C5.37467 14.167 4.98231 14.0038 4.65592 13.6774C4.32954 13.351 4.16634 12.9587 4.16634 12.5003V3.33366C4.16634 2.87533 4.32954 2.48296 4.65592 2.15658C4.98231 1.83019 5.37467 1.66699 5.83301 1.66699H9.99967L11.6663 3.33366H17.4997C17.958 3.33366 18.3504 3.49685 18.6768 3.82324C19.0031 4.14963 19.1663 4.54199 19.1663 5.00033V12.5003C19.1663 12.9587 19.0031 13.351 18.6768 13.6774C18.3504 14.0038 17.958 14.167 17.4997 14.167H5.83301ZM5.83301 12.5003H17.4997V5.00033H10.9788L9.31217 3.33366H5.83301V12.5003Z" fill="#1C1B1F" />
                  </g>
                </svg>

                Folders

              </button>
              <button onClick={() => ""} className=" rounded-[30px] text-[16px] font-semibold px-6  flex gap-2 justify-start items-center    ">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.83301 15.5C2.37467 15.5 1.98231 15.3368 1.65592 15.0104C1.32954 14.684 1.16634 14.2917 1.16634 13.8333V3H0.333008V1.33333H4.49967V0.5H9.49967V1.33333H13.6663V3H12.833V13.8333C12.833 14.2917 12.6698 14.684 12.3434 15.0104C12.017 15.3368 11.6247 15.5 11.1663 15.5H2.83301ZM11.1663 3H2.83301V13.8333H11.1663V3ZM4.49967 12.1667H6.16634V4.66667H4.49967V12.1667ZM7.83301 12.1667H9.49967V4.66667H7.83301V12.1667Z" fill="#1C1B1F" />
                </svg>

                Trash

              </button>
            </div>
            <div className='border border-[#DEDEDE] rounded-[14px] py-2 px-4 flex flex-col gap-2 bg-white'>
              <p className='text-[14px] font-semibold'>Cloud Storage</p>
              <div className='h-[6px] rounded-[6px] bg-[#DEDEDE] relative'>
                <div className='absolute h-[6px] rounded-[6px]  bg-blue w-[30%]'></div>

              </div>
              <p className='text-[14px] font-normal'>400 mb of 2 GB used</p>

            </div>
          </div>

          <Folders tabIndex={tabIndex} setTabIndex={setTabIndex} data={data} setData={setData} />
        </div>
      </div>
    </>
  )
}

export default Collection
