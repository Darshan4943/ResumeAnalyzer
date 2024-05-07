import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ResumePreview from "../../components/common/ResumePreview";
import { reCallUserData } from "../../Redux/actions/user";
import { toast } from "react-toastify";
import DeleteModal from "../../components/common/deleteModal";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function ClientDetail({ tabIndex }) {

  const router = useRouter();
  const [detail, setDetails] = useState({});
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState([]);
  const clientId = router.query.detailIndex;
  const [resumeList, setResumeList] = useState([]);
  const [view, setView] = useState(false);
  const [deleted, setDeleted] = useState(false)
  const dispatch = useDispatch();
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    if (clientId) {
      axios
        .get(`https://freedygoservices.in/api/client/getByClientId/${clientId}`)
        .then((res) => {
          setDetails(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get("https://freedygoservices.in/api/resume/" + clientId)
        .then((res) => {
          setResumeList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [clientId, deleted]);


  const toggleSelect = (index) => {

    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };



  const deleteResume = () => {

    const ids = selectedIndexes.map((item) => resumeList[item]?._id);
    console.log(ids)

    if (ids.length === 0) {
      toast.error("Please select file to delete");
      return;
    }

    axios.delete("https://freedygoservices.in/api/resume/deleteResume", { data: { ids } })
      .then(response => {


        toast.success("Resume Deleted successfully");

        setView(false)
        setDeleted(!deleted)
        dispatch(reCallUserData());
        setSelectedIndexes([])

      })
      .catch(error => {

        console.error('Error:', error);
      });
  };

  const closeDeleteModal = () => {
    setView(false)
  }
  const PdfViewer = ({ pdfUrl }) => {
    function onDocumentLoadSuccess(numPages) { }

    return (
      <div
        style={{
          width: "192px",
          height: "272px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 py-6 customMargins">
      <div className="flex text-[18px] font-semibold gap-4 items-center">
        <svg
          className=" cursor-pointer"
          onClick={() => router.push("/myClients")}
          width="24"
          height="24"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g mask="url(#mask0_629_16604)">
            <path
              d="M11.9583 21.3892L21.9584 31.3892L20 33.3337L6.66669 20.0003L20 6.66699L21.9584 8.61141L11.9583 18.6115H33.3334V21.3892H11.9583Z"
              fill="#1C1B1F"
            />
          </g>
        </svg>
        My Clients
      </div>
      <div className="flex  gap-8 flex-wrap scr700:justify-start justify-center ">
        <div
          className="flex scr540:flex-row flex-col gap-8 sm:p-6 p-4 rounded-[24px] w-[50%] scr540:min-w-[500px] min-w-[280px]"
          style={{ boxShadow: "0px 2px 7px 0px #00000040" }}
        >
          <div className="flex justify-center items-center relative ">
            <img
              className="rounded-[50%] scr540:h-[200px] scr540:w-[200px] h-[120px] w-[120px] "
              style={{ objectFit: "contain" }}
              // src={detail.profilePath}
              src={
                detail.profilePicture
                  ? detail.profilePicture
                  : "/images/services/profile.png"
              }
              alt="image"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-[18px] font-medium">
                {" "}
                {detail.firstName} {detail.lastName}
              </p>
              <div className="flex  gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_625_15669)">
                    <path
                      d="M3.58967 17.0833C3.16872 17.0833 2.81242 16.9374 2.52075 16.6458C2.22909 16.3541 2.08325 15.9978 2.08325 15.5768V6.92304C2.08325 6.5021 2.22909 6.14579 2.52075 5.85412C2.81242 5.56246 3.16872 5.41662 3.58967 5.41662H7.08325V4.0064C7.08325 3.58547 7.22909 3.22917 7.52075 2.9375C7.81242 2.64583 8.16872 2.5 8.58967 2.5H11.4101C11.8311 2.5 12.1874 2.64583 12.479 2.9375C12.7707 3.22917 12.9165 3.58547 12.9165 4.0064V5.41662H16.4101C16.8311 5.41662 17.1874 5.56246 17.479 5.85412C17.7707 6.14579 17.9165 6.5021 17.9165 6.92304V15.5768C17.9165 15.9978 17.7707 16.3541 17.479 16.6458C17.1874 16.9374 16.8311 17.0833 16.4101 17.0833H3.58967ZM8.33323 5.41662H11.6666V4.0064C11.6666 3.94228 11.6399 3.88352 11.5864 3.8301C11.533 3.77667 11.4742 3.74996 11.4101 3.74996H8.58967C8.52556 3.74996 8.46679 3.77667 8.41336 3.8301C8.35994 3.88352 8.33323 3.94228 8.33323 4.0064V5.41662ZM16.6666 12.2916H12.0832V13.7499H7.91659V12.2916H3.33323V15.5768C3.33323 15.6409 3.35994 15.6997 3.41336 15.7531C3.46679 15.8066 3.52556 15.8333 3.58967 15.8333H16.4101C16.4742 15.8333 16.533 15.8066 16.5864 15.7531C16.6399 15.6997 16.6666 15.6409 16.6666 15.5768V12.2916ZM9.16656 12.4999H10.8332V10.8333H9.16656V12.4999ZM3.33323 11.0416H7.91659V9.58329H12.0832V11.0416H16.6666V6.92304C16.6666 6.85893 16.6399 6.80016 16.5864 6.74673C16.533 6.69331 16.4742 6.6666 16.4101 6.6666H3.58967C3.52556 6.6666 3.46679 6.69331 3.41336 6.74673C3.35994 6.80016 3.33323 6.85893 3.33323 6.92304V11.0416Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>
                <p className="text-[14px] font-medium">{detail.designation}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[16px] font-medium">Contact</p>

              <div className="flex  gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_625_15649)">
                    <path
                      d="M3.58967 16.25C3.16872 16.25 2.81242 16.1041 2.52075 15.8125C2.22909 15.5208 2.08325 15.1645 2.08325 14.7435V5.25642C2.08325 4.83547 2.22909 4.47917 2.52075 4.1875C2.81242 3.89583 3.16872 3.75 3.58967 3.75H16.4101C16.8311 3.75 17.1874 3.89583 17.479 4.1875C17.7707 4.47917 17.9165 4.83547 17.9165 5.25642V14.7435C17.9165 15.1645 17.7707 15.5208 17.479 15.8125C17.1874 16.1041 16.8311 16.25 16.4101 16.25H3.58967ZM9.9999 10.4647L3.33323 6.20187V14.7435C3.33323 14.8183 3.35727 14.8798 3.40536 14.9279C3.45344 14.9759 3.51488 15 3.58967 15H16.4101C16.4849 15 16.5464 14.9759 16.5944 14.9279C16.6425 14.8798 16.6666 14.8183 16.6666 14.7435V6.20187L9.9999 10.4647ZM9.9999 9.16665L16.5384 4.99998H3.46144L9.9999 9.16665ZM3.33323 6.20187V4.99998V14.7435C3.33323 14.8183 3.35727 14.8798 3.40536 14.9279C3.45344 14.9759 3.51488 15 3.58967 15H3.33323V6.20187Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>

                <p className="text-[14px] font-normal">{detail.email}</p>
              </div>
              <div className="flex  gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_625_15654)">
                    <path
                      d="M16.2004 17.0846C14.6299 17.0846 13.0521 16.7195 11.4672 15.9892C9.88228 15.259 8.42609 14.2288 7.09864 12.8987C5.77119 11.5686 4.74234 10.1124 4.0121 8.53014C3.28187 6.94787 2.91675 5.37149 2.91675 3.80099C2.91675 3.5487 3.00008 3.33846 3.16675 3.17026C3.33341 3.00207 3.54175 2.91797 3.79175 2.91797H6.50966C6.72014 2.91797 6.90577 2.98661 7.06656 3.12391C7.22735 3.2612 7.32964 3.4308 7.37344 3.63272L7.851 6.08462C7.88412 6.31218 7.87718 6.5077 7.83016 6.67116C7.78316 6.83461 7.69876 6.9719 7.57696 7.08301L5.65229 8.95641C5.96212 9.52371 6.31603 10.0603 6.714 10.5662C7.11197 11.0721 7.54279 11.5552 8.00646 12.0157C8.46373 12.473 8.94985 12.8977 9.46481 13.2898C9.97977 13.6819 10.5359 14.0467 11.1331 14.3843L13.0033 12.4981C13.1336 12.3624 13.2915 12.2673 13.4768 12.2128C13.6622 12.1584 13.8548 12.145 14.0546 12.1728L16.3686 12.6439C16.5791 12.6995 16.7508 12.8069 16.8839 12.966C17.0169 13.1252 17.0834 13.3058 17.0834 13.5077V16.2096C17.0834 16.4596 16.9993 16.6679 16.8311 16.8346C16.6629 17.0013 16.4526 17.0846 16.2004 17.0846ZM5.06096 7.77374L6.54814 6.35066C6.57485 6.32928 6.59221 6.2999 6.60023 6.26251C6.60824 6.22511 6.60691 6.19039 6.59623 6.15834L6.23404 4.29616C6.22336 4.25342 6.20466 4.22137 6.17796 4.20001C6.15125 4.17864 6.11653 4.16795 6.07379 4.16795H4.29173C4.25969 4.16795 4.23298 4.17864 4.2116 4.20001C4.19023 4.22137 4.17954 4.24808 4.17954 4.28014C4.22228 4.84958 4.31549 5.42811 4.45919 6.01572C4.60289 6.60333 4.80348 7.18934 5.06096 7.77374ZM12.3109 14.9756C12.8633 15.2331 13.4394 15.43 14.0393 15.5662C14.6392 15.7024 15.1998 15.7833 15.7212 15.809C15.7533 15.809 15.78 15.7983 15.8013 15.7769C15.8227 15.7556 15.8334 15.7288 15.8334 15.6968V13.9436C15.8334 13.9009 15.8227 13.8661 15.8013 13.8394C15.78 13.8127 15.7479 13.794 15.7052 13.7833L13.9552 13.4276C13.9231 13.4169 13.8951 13.4155 13.8711 13.4236C13.847 13.4316 13.8216 13.4489 13.7949 13.4756L12.3109 14.9756Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>

                <p className="text-[14px] font-normal">{detail.mobileNo}</p>
              </div>
              <div className="flex  gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_625_15659)">
                    <path
                      d="M10.0015 9.88649C10.4161 9.88649 10.7706 9.73885 11.065 9.44357C11.3593 9.1483 11.5065 8.79333 11.5065 8.37868C11.5065 7.96402 11.3588 7.60953 11.0635 7.3152C10.7683 7.02086 10.4133 6.8737 9.99865 6.8737C9.58399 6.8737 9.2295 7.02134 8.93517 7.31661C8.64083 7.61189 8.49367 7.96686 8.49367 8.38151C8.49367 8.79616 8.64131 9.15066 8.93658 9.44499C9.23186 9.73932 9.58683 9.88649 10.0015 9.88649ZM10.0001 16.2599C11.6304 14.8005 12.878 13.4007 13.7429 12.0604C14.6077 10.7201 15.0401 9.54623 15.0401 8.53874C15.0401 7.01952 14.5575 5.77059 13.5922 4.79195C12.6269 3.81331 11.4295 3.32399 10.0001 3.32399C8.57058 3.32399 7.3732 3.81331 6.40792 4.79195C5.44264 5.77059 4.96 7.01952 4.96 8.53874C4.96 9.54623 5.39242 10.7201 6.25727 12.0604C7.12213 13.4007 8.36973 14.8005 10.0001 16.2599ZM10.0001 17.9233C7.90285 16.106 6.33021 14.4148 5.28213 12.8496C4.23406 11.2845 3.71002 9.8475 3.71002 8.53874C3.71002 6.61568 4.33208 5.0588 5.57621 3.86809C6.82032 2.67739 8.29494 2.08203 10.0001 2.08203C11.7052 2.08203 13.1798 2.67739 14.4239 3.86809C15.668 5.0588 16.2901 6.61568 16.2901 8.53874C16.2901 9.8475 15.7661 11.2845 14.718 12.8496C13.6699 14.4148 12.0973 16.106 10.0001 17.9233Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>

                <p className="text-[14px] font-normal">{detail.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-[18px] font-semibold gap-4 items-center">
        Resumes
      </div>
      <div className="w-full rounded-[12px] border flex flex-wrap scr540:justify-start justify-center gap-9 border-[#DEDEDE] bg-[#F9F9F9] p-6 cursor-pointer">

        <div className="flex flex-row flex-wrap gap-6">
          <div
            onClick={() => router.push(`/home/BuildResume?clientId=${clientId}`)}
            style={{ boxShadow: "0px 0px 10px 5px #00000040" }}
            className="rounded-[12px] text-center text-white justify-center flex scr540:flex-col flex-row text-[18px] items-center gap-2 font-medium  scr540:w-[192px] w-[280px]  scr540:h-[272px] h-[135px] bg-[#646464] p-6 cursor-pointer"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8187 14.6206H0.0750732V12.1079H11.8187V0.364258H14.3314V12.1079H26.075V14.6206H14.3314V26.3642H11.8187V14.6206Z"
                fill="white"
              />
            </svg>

            <p>Create New Resume</p>
          </div>
          {resumeList?.map((item, index) => (


            <div
              key={index}
              className="flex flex-col w-[192px] break-all items-center justify-between group relative "
            >
              <PdfViewer pdfUrl={item?.resumeUrl} />
              <div className="text-[14px] text-[#333333] font-500">
                {item.fileName}.pdf
              </div>

              <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-[272px] w-full rounded-[6px] opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">
                  <div
                    className="flex items-center flex-col cursor-pointer"
                    style={{
                      borderBottom: "1px solid #646464",
                      paddingBottom: "12px",
                    }}
                    onClick={() => {
                      setSelected(item);
                      setPreview(true);
                    }}
                  >
                    <img
                      src="/images/icons/visibility.png"
                      className="h-[24px] w-[24px]"
                      alt=""
                    />
                    <span className="text-[12px] font-semibold text-white ">
                      Preview
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      router.push({
                        pathname: "/home/createResume",
                        query: {
                          data: JSON.stringify(item),
                          isEdit: true,
                        },
                      });
                    }}
                    className="flex items-center flex-col cursor-pointer"
                    style={{
                      borderBottom: "1px solid #646464",
                      paddingBottom: "12px",
                    }}
                  >
                    <img
                      src="/images/icons/edit.png"
                      className="h-[24px] w-[24px]"
                      alt=""
                    />
                    <span className="text-[12px] font-semibold text-white ">
                      Edit
                    </span>
                  </div>

                  <a
                    href={item.resumeUrl}
                    className="flex items-center flex-col cursor-pointer"
                  >
                    <img
                      src="/images/icons/download.png"
                      className="h-[24px] w-[24px]"
                      alt=""
                    />
                    <span className="text-[12px] font-semibold text-white ">
                      Download
                    </span>
                  </a>
                  <a
                    onClick={() => { toggleSelect(index); setView(true) }}

                    className="flex items-center flex-col cursor-pointer"
                  >
                    <img
                      src="/images\icons\delete_icon.png"
                      className="h-[24px] w-[24px]"
                      alt=""
                    />
                    <span className="text-[12px] font-semibold text-white ">
                      Delete
                    </span>
                  </a>
                  {
                    view && <DeleteModal deleteHandler={deleteResume} closeDeleteModal={closeDeleteModal} />
                  }
                </div>
              </div>
            </div>

          ))}
        </div>
        {preview && (
          <>
            <ResumePreview
              selectedResumeIndex={selected.resumeTemplateIndex}
              data={selected}
              selectedColor={selected.selectedColor}
              selectedFont={selected.selectedFont}
              setPreview={setPreview}
              preview={true}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ClientDetail;
