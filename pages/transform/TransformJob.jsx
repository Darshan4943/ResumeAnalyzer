import { Document, PDFViewer } from '@react-pdf/renderer';
import React, { useEffect, useRef, useState } from 'react'
import Template1 from '../../components/featured/resumeTemplates/Template1';
import Template2 from '../../components/featured/resumeTemplates/Template2';

function TransformJob() {
  const [selectedResumeIndex, setSelectedResumeIndex] = useState();
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const templates = [
    {
      title: "Template1",
      imgUrl: "/images/templates/template1.png",
      index: 1,
      fontFamily: "Lato",
      themeColor: "#414042",
    },
    {
      title: "Template2",
      imgUrl: "/images/templates/template2.png",
      index: 2,
      fontFamily: "Barlow",
      themeColor: "#F7902B",
    },
    {
      title: "Template3",
      imgUrl: "/images/templates/template3.png",
      index: 3,
      fontFamily: "Inter",
      themeColor: "#414042",
    },
    {
      title: "Template4",
      imgUrl: "/images/templates/template4.png",
      index: 4,
      fontFamily: "Montserrat",
      themeColor: "#00AEEF",
    },
    {
      title: "Template5",
      imgUrl: "/images/templates/template5.png",
      index: 5,
      fontFamily: "Kanit",
      themeColor: "#316059",
    },
    {
      title: "Template6",
      imgUrl: "/images/templates/template6.png",
      index: 6,
      fontFamily: "Lato",
      themeColor: "#FFC20E",
    },
    {
      title: "Template7",
      imgUrl: "/images/templates/template7.png",
      index: 7,
      fontFamily: "Montserrat",
      themeColor: "#0077F9",
    },
    {
      title: "Template8",
      imgUrl: "/images/templates/template8.png",
      index: 8,
      fontFamily: "Montserrat",
      themeColor: "#646464",
    },
    {
      title: "Template9",
      imgUrl: "/images/templates/template9.png",
      index: 9,
      fontFamily: "Montserrat",
      themeColor: "#FFD740",
    },
    {
      title: "Template10",
      imgUrl: "/images/templates/template10.png",
      index: 10,
      fontFamily: "Inter",
      themeColor: "#F2BE5C",
    },
    {
      title: "Template11",
      imgUrl: "/images/templates/template11.png",
      index: 11,
      fontFamily: "Montserrat",
      themeColor: "#E6E7E8",
    },
    {
      title: "Template12",
      imgUrl: "/images/templates/template12.png",
      index: 12,
      fontFamily: "Lato",
      themeColor: "#0C2438",
    },
    {
      title: "Template13",
      imgUrl: "/images/templates/template13.png",
      index: 13,
      fontFamily: "Poppins",
      themeColor: "#0E6CC2",
    },
    {
      title: "Template14",
      imgUrl: "/images/templates/template14.png",
      index: 14,
      fontFamily: "Inter",
      themeColor: "#242424",
    },
    {
      title: "Template15",
      imgUrl: "/images/templates/template15.png",
      index: 15,
      fontFamily: "Inter",
      themeColor: "#716D6D",
    },
    {
      title: "Template16",
      imgUrl: "/images/templates/template53.png",
      index: 16,
      fontFamily: "Inter",
      themeColor: "#545554",
    },
  ]
  const renderTemplates = () => {
    const selectedStyle = {
      borderTop: " 4px solid #06A9EF",
      borderBottom: "4px solid #06A9EF",
      height: " 210px",
      width: "auto",
    };
    return templates.map((template, index) => (
      <div className='flex flex-col gap-4 h-[300px] w-[192px] items-center'>
        <img
          // style={selectedResumeIndex == index + 1 ? selectedStyle : {}}
          style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
          key={index}
          src={template.imgUrl}
          className="h-[272px] w-[192px] rounded-[6px] max-w-none"
          alt=""
          onClick={() => handleImageClick(template)}
        />
        <div className='text-[14px] font-[500]'> {template.title}</div>
      </div>
    ));
  }
  const renderAllTemplates = () => {
    return templates.map((template, index) => (
      <img
        key={index}
        src={template.imgUrl}
        className="h-[330px] w-[234px] rounded-[6px] transition-transform duration-300 ease-in-out hover:scale-105"
        style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }}
        alt=""
        onClick={() => {
          handleImageClick(template);
          setIsAll(false);
        }}
      />
    ));
  };

  const [isAll, setIsAll] = useState(false);

  const handleImageClick = (template) => {
    togglePreview(true, template.index);

  };

  const resumeRef = useRef();
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useState(false);

  const togglePreview = (isVisible, index) => {
    setSelectedResumeIndex(index);
  };
  const selectResumeTemplate = (index) => {
    switch (index) {
      case 1:
        return (
          <Template1
            data={data}

          />
        );
      case 2:
        return (
          <Template2
            data={data}

          />
        );

      default:
        return (
          <Template1
            data={data}

          />
        );
    }
  };

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsAll(false);
      setPreview(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const generatePDFUsingRenderer = async () => {
    // Import the react-pdf/renderer library dynamically (for server-side rendering)
    const ReactPDF = await import("@react-pdf/renderer");

    // Render the PDF document using the defined React component
    const { PDFViewer, renderToString } = ReactPDF.default;

    // Render the React component to a string
    const pdfString = await renderToString(
      <>
        {" "}
        <Document height="1124px">
          {selectResumeTemplate(selectedResumeIndex)}
        </Document>
      </>
    );

    // Convert the PDF string to a blob
    const pdfBlob = new Blob([pdfString], { type: "application/pdf" });

    return pdfBlob;
  };

  const saveResume = async () => {
    const formData = new FormData();
    if (Object.keys(data).length > 0) {
      Object.keys(data).map((key) => {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
    }
    try {
      console.log(await generatePDFUsingRenderer());
    } catch (e) {
      console.log(e);
    }
    // axios
    //   .post("http://localhost:2000/api/resume/add", formData)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };


  return (
    <div className=' p-6 flex flex-col gap-4'>
      <div className=' font-semibold text-[24px]'>Transform for Job Description</div>
      <div className='flex gap-12 w-[100%] p-4 rounded-[12px]' style={{ boxShadow: "0px 1px 6px 0px #00000040" }}>

        <div className='flex flex-col gap-6 w-[50%]'>
          <div className='flex flex-col gap-4 '>
            <div className='text-[20px] font-medium'>
              Job Description
            </div>
            <textarea
              value={text}
              onChange={handleChange}
              rows={6}
              cols={50}
              placeholder="Enter your text here..."
              className=' border border-[#06A9EF] rounded-[8px] outline-none h-auto p-2'
            />

          </div>
          <div className='flex flex-col gap-4 '>
            <div className='text-[20px] font-medium'>
              Select from Collection
            </div>
            <div className="rounded-[16px] border bg-[#F9F9F9] border-[#DEDEDE] pl-4 pr-4 ">
              <div
                className="flex gap-4   py-4  items-center"
                style={{ overflowX: "auto" }}
              >
                {renderTemplates()}
              </div>
            </div>
            <div onClick={() => setIsAll(true)} className='font-medium text-[18px] text-[#06A9EF] flex justify-end'>See All</div>
            {isAll && (
              <div>
                <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
                  <div
                    ref={taskRef} onWheel={(e) => e.stopPropagation()}
                    className=" absolute flex p-6 bg-white rounded-[24px] shadow-md  gap-6 flex-wrap justify-center items-center w-[65%] h-[90vh] overflow-y-auto "
                  >
                    {renderAllTemplates()}
                  </div>
                </div>
              </div>
            )}

            <button className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white w-[188px] font-semibold rounded-[12px]">
              Transform Resume
            </button>
          </div>

        </div>
        <div className='w-full'> 
          
           <div className="flex justify-end w-full" ref={resumeRef}>
        


            <div className="flex gap-[16px] justify-end">
              <button
                onClick={() => saveResume()}
                className="flex gap-1 text-[14px]   justify-center text-[#646464] font-montserrat font-semibold px-4 py-2 rounded-[8px] items-center border border-[#333333] bg-[#DEDEDE]"
              >
                Save
              </button>
              <button
                onClick={() => setPreview(true)}
                className="flex gap-1 text-[14px]   justify-center text-[#646464] font-montserrat font-semibold px-4 py-2 rounded-[8px] items-center border border-[#333333] bg-[#DEDEDE]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g mask="url(#mask0_461_22933)">
                    <path d="M4.16667 15.8333H5.35417L13.5 7.6875L12.3125 6.5L4.16667 14.6458V15.8333ZM2.5 17.5V13.9583L13.5 2.97917C13.6667 2.82639 13.8507 2.70833 14.0521 2.625C14.2535 2.54167 14.4653 2.5 14.6875 2.5C14.9097 2.5 15.125 2.54167 15.3333 2.625C15.5417 2.70833 15.7222 2.83333 15.875 3L17.0208 4.16667C17.1875 4.31944 17.309 4.5 17.3854 4.70833C17.4618 4.91667 17.5 5.125 17.5 5.33333C17.5 5.55556 17.4618 5.76736 17.3854 5.96875C17.309 6.17014 17.1875 6.35417 17.0208 6.52083L6.04167 17.5H2.5ZM12.8958 7.10417L12.3125 6.5L13.5 7.6875L12.8958 7.10417Z" fill="#646464" />
                  </g>
                </svg>

                Edit
              </button>
              <button

                className="flex gap-1 text-[14px]   justify-center text-[#646464] font-montserrat font-semibold px-4 py-2 rounded-[8px] items-center border border-[#333333] bg-[#DEDEDE]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g mask="url(#mask0_461_22942)">
                    <path d="M9.99967 13.3333L5.83301 9.16668L6.99967 7.95834L9.16634 10.125V3.33334H10.833V10.125L12.9997 7.95834L14.1663 9.16668L9.99967 13.3333ZM4.99967 16.6667C4.54134 16.6667 4.14898 16.5035 3.82259 16.1771C3.4962 15.8507 3.33301 15.4583 3.33301 15V12.5H4.99967V15H14.9997V12.5H16.6663V15C16.6663 15.4583 16.5031 15.8507 16.1768 16.1771C15.8504 16.5035 15.458 16.6667 14.9997 16.6667H4.99967Z" fill="#646464" />
                  </g>
                </svg>

                Download
              </button>
            </div>
        
        </div>
          {selectedResumeIndex !== undefined && (
            <div
              className="   "
              style={{
                // width: "78.7rem",
                // scale: "0.65",
                transformOrigin: "top left",
              }}
            >
              <PDFViewer width="100%" height="1160px">
                <Document height="1124px">
                  {selectResumeTemplate(selectedResumeIndex)}
                </Document>
              </PDFViewer>
            </div>
          )}
        </div>

      </div>



    </div>
  )
}

export default TransformJob
