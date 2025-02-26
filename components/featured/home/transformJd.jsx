import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  BlobProvider,
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import Template1 from "../resumeTemplates/Template1";
import { selectResumeTemplate } from "../../../utils/middleware";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FileNameModel from "../candidate/createResume/components/fileNameModel";
import LimitUsedModal from "../../models/limitUsedModal";

function TransformJd({
  resumeTemplateIndex,
  data,
  selectedColor,
  selectedFont,
  preview,
  selected,
}) {
  const [namePreview, setNamePreview] = useState(false);
  const [downloadBtnLoading, setDownloadBtnLoading] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(0);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data?.firstName + "_resume");
  const [saveLimit, setSaveLimit] = useState(0);
  const [limitUsedModal, setLimitUsedModal] = useState(false);

  const getLimits = () => {
    const downloadCount = localStorage.getItem("downloadCount");
    const saveCount = localStorage.getItem("saveCount");
    if (downloadCount) {
      setDownloadLimit(downloadCount);
    }
    if (saveCount) {
      setSaveLimit(saveCount);
    }
  };

  useEffect(() => {
    getLimits();
  }, []);

  useEffect(() => {
    setName(data?.firstName + "_resume");
  }, [data]);
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const saveResume = async (blob, download) => {
    setLoading(true);

    if (saveLimit <= 0) {
      setLimitUsedModal(true);
      return;
    }

    const formData = new FormData();
    if (Object.keys(data).length > 0) {
      Object.keys(data).map((key) => {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          formData.append(key, JSON.stringify(data[key]));
        } else if (key == "fileName") {
          formData.append("fileName", name);
        } else {
          if (data[key] != undefined) {
            formData.append(key, data[key]);
          }
        }
      });
    }
    formData.append("pdfBlob", blob);

    axios
      .post("https://dev.api.skilotech.com/api/resume/add", formData)
      .then((res) => {
        const pdfUrl = res.data.data.resumeUrl;

        localStorage.setItem("saveCount", saveLimit - 1);
        if (download) {
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = res.data.data.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        getLimits();
        toast.success("Resume Saved To Collection successfully");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong ");
        setLoading(false);
      });
  };
  const MyComponent = () => {
    return (
      <Document height="1124px" dpi={72}>
        {selectResumeTemplate(
          resumeTemplateIndex,
          data,
          selectedColor,
          selectedFont,
          preview
        )}
      </Document>
    );
  };

  return (
    <div>
      {namePreview && (
        <FileNameModel
          data={data}
          setNamePreview={setNamePreview}
          setFunction={(data) => setName(data)}
        />
      )}

      <LimitUsedModal visible={limitUsedModal} setVisible={setLimitUsedModal} />
      <div className="flex justify-between w-full">
        <div
          className=" text-[18px] font-montserrat font-medium flex gap-3 items-center cursor-pointer max-w-[300px]"
          onClick={() => setNamePreview(true)}
        >
          <p>{name}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 21 20"
            fill="none"
          >
            <g mask="url(#mask0_5925_110931)">
              <path
                d="M4.66404 15.8317H5.71531L14.2458 7.30121L13.1945 6.24994L4.66404 14.7804V15.8317ZM3.41406 17.0817V14.2612L14.4061 3.27402C14.5321 3.15956 14.6712 3.07112 14.8235 3.00868C14.9757 2.94625 15.1354 2.91504 15.3025 2.91504C15.4696 2.91504 15.6314 2.94469 15.7881 3.004C15.9447 3.06329 16.0834 3.15757 16.2041 3.28683L17.2217 4.31727C17.351 4.43799 17.4431 4.57691 17.4981 4.73402C17.5532 4.89112 17.5807 5.04821 17.5807 5.20531C17.5807 5.37288 17.5521 5.5328 17.4948 5.68506C17.4376 5.83734 17.3466 5.97648 17.2217 6.1025L6.23454 17.0817H3.41406ZM13.7109 6.78479L13.1945 6.24994L14.2458 7.30121L13.7109 6.78479Z"
                fill="#646464"
              />
            </g>
          </svg>
        </div>
        <div className="ml:flex hidden gap-[16px] justify-end">
          {resumeTemplateIndex !== undefined && (
            <BlobProvider document={<MyComponent />}>
              {({ blob, url, loading, error }) => {
                return (
                  <button
                    onClick={() => saveResume(blob)}
                    className="flex gap-1 text-[14px] w-[150px]  justify-center text-[#FFF] font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]"
                  >
                    Save
                  </button>
                );
              }}
            </BlobProvider>
          )}
          {resumeTemplateIndex !== undefined && (
            // <PDFDownloadLink
            //   document={<MyComponent />}
            //   fileName="Skilotech_resume.pdf"
            // >
            //   {({ blob, url, loading, error }) => (
            //     <button className="flex  gap-1 text-[14px]   justify-center text-[#fff] font-montserrat font-semibold px-4 py-2 rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]">
            //       <svg
            //         width="20"
            //         height="20"
            //         viewBox="0 0 20 20"
            //         fill="none"
            //         xmlns="http://www.w3.org/2000/svg"
            //       >
            //         <g mask="url(#mask0_461_22942)">
            //           <path
            //             d="M9.99967 13.3333L5.83301 9.16668L6.99967 7.95834L9.16634 10.125V3.33334H10.833V10.125L12.9997 7.95834L14.1663 9.16668L9.99967 13.3333ZM4.99967 16.6667C4.54134 16.6667 4.14898 16.5035 3.82259 16.1771C3.4962 15.8507 3.33301 15.4583 3.33301 15V12.5H4.99967V15H14.9997V12.5H16.6663V15C16.6663 15.4583 16.5031 15.8507 16.1768 16.1771C15.8504 16.5035 15.458 16.6667 14.9997 16.6667H4.99967Z"
            //             fill="#fff"
            //           />
            //         </g>
            //       </svg>
            //       Downl
            //     </button>
            //   )}
            // </PDFDownloadLink>
            <BlobProvider document={<MyComponent />} fileName="demo.pdf">
              {({ blob, url, loading, error }) => (
                <button
                  onClick={() => saveResume(blob, true)}
                  // disabled={saveDisabled}
                  // style={{ opacity: saveDisabled ? "0.5" : 1 }}
                  className="flex gap-1 text-[14px] w-fit  justify-center  font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center border border-[#06A9EF] "
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3  animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_635_20356)">
                        <path
                          d="M9.99967 13.333L5.83301 9.16634L6.99967 7.95801L9.16634 10.1247V3.33301H10.833V10.1247L12.9997 7.95801L14.1663 9.16634L9.99967 13.333ZM4.99967 16.6663C4.54134 16.6663 4.14898 16.5031 3.82259 16.1768C3.4962 15.8504 3.33301 15.458 3.33301 14.9997V12.4997H4.99967V14.9997H14.9997V12.4997H16.6663V14.9997C16.6663 15.458 16.5031 15.8504 16.1768 16.1768C15.8504 16.5031 15.458 16.6663 14.9997 16.6663H4.99967Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  )}
                </button>
              )}
            </BlobProvider>
          )}
        </div>
      </div>
      {resumeTemplateIndex !== undefined && (
        <div
          className=" ml:flex hidden items-center justify-center bg-[#525659] py-[12px] rounded-[8px] mt-4"
          style={{ width: "100%", height: "800px" }}
        >
          <PDFViewer width="80%" height="760px" showToolbar={false}>
            <Document>
              {selectResumeTemplate(
                resumeTemplateIndex,
                data,
                selectedColor,
                selectedFont,
                preview
              )}
            </Document>
          </PDFViewer>
        </div>
      )}

      <div className="flex w-[100%] scr420:w-[80%] ms:w-[50%] items-center justify-between ml:hidden rounded-[8px] border-[1px] border-[#DEDEDE] p-[16px]">
        <div className="flex gap-[14px] items-center">
          {selected.resumeUrl?.includes?.("pdf") ? (
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.2079 0L42.6435 9.96849V47.8763H7.39551V48H42.7639V10.094L33.2079 0Z"
                fill="#909090"
              />
              <path
                d="M32.6587 0H7.39551V48H42.7639V10.094L32.6587 0Z"
                fill="#F4F4F4"
              />
              <path
                d="M32.0263 39.4745H5.5V28.4219H32.0263V39.4745Z"
                fill="#DD2025"
              />
              <path d="M32.6592 0V10.1053H42.7644L32.6592 0Z" fill="#AEAEAE" />
              <path
                d="M12.0091 30.6527H9.9209V37.2565H11.5697V35.0305L11.934 35.0484C12.2864 35.0431 12.6355 34.9888 12.9677 34.8874C13.2589 34.8011 13.5269 34.6649 13.7554 34.487C13.9861 34.3171 14.1677 34.1033 14.2858 33.8624C14.446 33.4614 14.5033 33.0351 14.4536 32.6132C14.4436 32.3118 14.3822 32.0132 14.2714 31.7272C14.1706 31.5207 14.0209 31.3345 13.8319 31.1806C13.6429 31.0266 13.4188 30.9082 13.1738 30.8329C12.961 30.7662 12.741 30.7178 12.5172 30.6884C12.3485 30.666 12.1798 30.6541 12.0091 30.6527ZM11.7055 33.8088H11.5633V31.7726H11.8733C12.0094 31.7641 12.1459 31.7821 12.2729 31.8252C12.3998 31.8683 12.5139 31.9354 12.6066 32.0216C12.7989 32.2431 12.9015 32.5128 12.899 32.7893C12.899 33.1277 12.899 33.4345 12.5443 33.6505C12.2888 33.7716 11.9963 33.8274 11.7055 33.8088ZM17.5707 30.6348C17.3933 30.6348 17.2208 30.6458 17.0993 30.6499L16.7239 30.6582H15.4777V37.262H16.9444C17.5049 37.2753 18.0629 37.1935 18.5868 37.0213C19.0085 36.8773 19.3818 36.6451 19.6732 36.3457C19.9566 36.0437 20.16 35.692 20.2692 35.3153C20.3947 34.8886 20.4559 34.4498 20.4513 34.0096C20.4823 33.4898 20.4356 32.9687 20.3123 32.4591C20.1953 32.084 19.9763 31.7383 19.6732 31.4506C19.4355 31.2183 19.1445 31.031 18.8185 30.9003C18.5385 30.7888 18.244 30.7065 17.9413 30.6554C17.821 30.6383 17.699 30.6305 17.5771 30.632M17.2863 36.0486H17.1265V31.8331H17.1473C17.4767 31.8005 17.8099 31.8517 18.1059 31.9803C18.3226 32.1294 18.4993 32.3171 18.6235 32.5306C18.7577 32.7554 18.835 33.002 18.8504 33.2543C18.8648 33.557 18.8504 33.8046 18.8504 34.0096C18.8569 34.2458 18.8393 34.4819 18.7977 34.7154C18.7485 34.9551 18.6574 35.187 18.5277 35.4033C18.3808 35.6044 18.1824 35.7738 17.9477 35.8986C17.7506 36.0084 17.5172 36.0596 17.2831 36.0444M25.3946 30.6582H21.5122V37.262H23.1546V34.6425H25.2316V33.4153H23.1546V31.8854H25.3914V30.6582"
                fill="white"
              />
            </svg>
          ) : (
            <img
              src="/images/docIcon.png"
              alt=""
              className="w-[38px] h-[48px]"
            />
          )}
          <p className="text-[14px] font-[500]">{selected.fileName}</p>
        </div>
        <div className="flex gap-[14px] items-center">
          {resumeTemplateIndex !== undefined && (
            <BlobProvider document={<MyComponent />}>
              {({ blob, url, loading, error }) => {
                return (
                  <button
                    onClick={() => saveResume(blob)}
                    className="font-[600] text-[#06A9EF] text-[14px]"
                  >
                    Save
                  </button>
                );
              }}
            </BlobProvider>
          )}
          {resumeTemplateIndex !== undefined && (
            <PDFDownloadLink
              document={<MyComponent />}
              fileName="Skilotech_resume.pdf"
            >
              {({ blob, url, loading, error }) => (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_1489_20378)">
                    <path
                      d="M9.99967 13.333L5.83301 9.16634L6.99967 7.95801L9.16634 10.1247V3.33301H10.833V10.1247L12.9997 7.95801L14.1663 9.16634L9.99967 13.333ZM4.99967 16.6663C4.54134 16.6663 4.14898 16.5031 3.82259 16.1768C3.4962 15.8504 3.33301 15.458 3.33301 14.9997V12.4997H4.99967V14.9997H14.9997V12.4997H16.6663V14.9997C16.6663 15.458 16.5031 15.8504 16.1768 16.1768C15.8504 16.5031 15.458 16.6663 14.9997 16.6663H4.99967Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransformJd;
