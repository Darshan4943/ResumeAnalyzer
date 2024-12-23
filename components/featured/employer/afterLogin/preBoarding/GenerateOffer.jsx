import React, { useState } from "react";
import EditOfferTemplate from "./EditOfferTemplate";

function GenerateOffer({ setGenerateOffer, setPopup, setSuccessfull ,setEditTemplate}) {





  return (
   
   
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute w-[95%] ms:w-[90%] ">
              <div
                className="flex w-[100%] p-[10px] sm:p-[24px] flex-col items-center gap-[16px] rounded-[16px] h-[80vh] overflow-y-auto bg-[#fff] "
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex justify-between w-full">
                  <p className="text-[24px] text-[#333] font-[500] ">
                    Generate Offer
                  </p>
                  <svg
                    onClick={() => setGenerateOffer(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_67168)">
                      <path
                        d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                </div>

                <div className="ms:flex ms:flex-row flex flex-col items-start ms:items-center gap-[16px] w-full">
                  <div className="flex gap-2 flex-col max-w-[228px]">
                    <p className="text-[20px] text-[#333] leading-[160%]">
                      Company Logo
                    </p>
                    <p className="text-[14px] font-[400] text-[#646464">
                      This image will be shown as company logo.
                    </p>
                  </div>

                  <div className=" flex flex-row gap-3 items-center w-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="73"
                      height="66"
                      viewBox="0 0 73 66"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18 1V43.6673L54.6482 65.7019L55.4988 64.3321L54.6482 22.922L19.2601 1.02534L18 1Z"
                        fill="#449B82"
                      />
                    </svg>

                    <button className="py-[6px]  px-[12px] flex items-center justify-center gap-1 rounded-[8px] border-[1px] border-[#06A9EF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g mask="url(#mask0_7804_67184)">
                          <path
                            d="M9.45768 12.823V5.48968L7.38237 7.56499L6.60835 6.80702L9.99933 3.41602L13.3903 6.80702L12.6163 7.56499L10.541 5.48968V12.823H9.45768ZM5.74985 15.5826C5.37452 15.5826 5.05838 15.4531 4.80143 15.1941C4.54449 14.9351 4.41602 14.618 4.41602 14.2429V12.9833H5.49933V14.2429C5.49933 14.307 5.52604 14.3658 5.57945 14.4192C5.63288 14.4726 5.69165 14.4993 5.75577 14.4993H14.2429C14.307 14.4993 14.3658 14.4726 14.4192 14.4192C14.4726 14.3658 14.4993 14.307 14.4993 14.2429V12.9833H15.5826V14.2429C15.5826 14.618 15.453 14.9351 15.1938 15.1941C14.9347 15.4531 14.6174 15.5826 14.2421 15.5826H5.74985Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>
                      Upload File
                    </button>
                  </div>

                </div>

                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="text-[20px] text-[#333] font-[500] ">
                    Select Template
                  </p>
                  <div className="flex gap-2 items-start">
                    <div className=" flex max-w-[141px] items-center justify-center flex-col gap-2 py-[8px] px-[16px] rounded-[8px] border-[1px] border-[#646464]">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex flex-col items-center  gap-[1px] ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="13"
                            viewBox="0 0 11 13"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3 2V8.33128L8.43812 11.6009L8.56434 11.3977L8.43812 5.25293L3.18698 2.00376L3 2Z"
                              fill="#449B82"
                            />
                          </svg>
                          <p className="text-[3px] text-[#333] leading-[160%] font-[500]">
                            Company Logo
                          </p>
                        </div>
                        <div onClick={() => setEditTemplate(true)} className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                          >
                            <g mask="url(#mask0_7804_67203)">
                              <path
                                d="M5.49997 19.5683H6.7615L16.9981 9.33176L15.7366 8.07024L5.49997 18.3068V19.5683ZM4 21.0683V17.6837L17.1904 4.49913C17.3416 4.36178 17.5086 4.25565 17.6913 4.18073C17.874 4.10582 18.0656 4.06836 18.2661 4.06836C18.4666 4.06836 18.6608 4.10394 18.8488 4.17511C19.0368 4.24626 19.2032 4.35939 19.348 4.51451L20.5692 5.75103C20.7243 5.8959 20.8349 6.0626 20.9009 6.25114C20.9669 6.43965 21 6.62817 21 6.81669C21 7.01777 20.9656 7.20967 20.8969 7.39238C20.8283 7.57512 20.719 7.74209 20.5692 7.89331L7.38458 21.0683H4ZM16.3563 8.71206L15.7366 8.07024L16.9981 9.33176L16.3563 8.71206Z"
                                fill="#646464"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <img
                        className="w-full h-full"
                        src="/images/template_text.png"
                        alt=""
                      />
                    </div>
                    <div className="flex h-[12rem] w-[141px] items-center justify-center flex-col gap-2 py-[8px] px-[16px] rounded-[8px] border-[1px] border-[#646464]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="41"
                        height="41"
                        viewBox="0 0 41 41"
                        fill="none"
                      >
                        <g mask="url(#mask0_7804_67206)">
                          <path
                            d="M19.4523 21.5463H9.66602V19.4523H19.4523V9.66602H21.5463V19.4523H31.3326V21.5463H21.5463V31.3326H19.4523V21.5463Z"
                            fill="#646464"
                          />
                        </g>
                      </svg>
                      <p className="text-[14px] text-[#646464] font-[500] leading-[16px] max-w-[70%] text-center">
                        Create New Template
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="text-[20px] text-[#333] font-[500] ">
                    Subject
                  </p>
                  <div className="w-full flex py-[8px] px-[16px] items-center gap-[8px] rounded-[6px] border-[1px] border-[#646464] text-[14px] text-[#646464] font-[600] leading-[16px]">
                    Skilotech-Offer Letter for John Doe
                  </div>
                </div>

                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="text-[20px] text-[#333] font-[500] ">
                    Body
                  </p>
                  <textarea className="h-[200px] w-full overscroll-y-auto py-[8px] px-[16px] rounded-[6px] border-[1px] border-[#646464]" name="" id="" >

                  </textarea>
                </div>

                <div className="w-full justify-end gap-4 flex ">
                  <button
                    onClick={() => setGenerateOffer(false)}
                    className="flex items-center justify-center py-[8px] px-[24px] rounded-[12px] font-[600] border-[1px] text-[#333] border-[#06A9EF] bg-[#fff]">
                    Cancel
                  </button>
                  <button
                    onClick={() => { setPopup(true), setGenerateOffer(false) }}
                    className="flex items-center justify-center py-[8px] px-[24px] rounded-[12px] font-[600] border-[1px] text-[#fff] border-[#06A9EF] bg-[#06A9EF]">
                    Next
                  </button>
                </div>

              </div>
            </div>
          </div>

        </>
    
    
  
  );
}

export default GenerateOffer;
