import React from "react";
import { currenciesWithIcons } from "../../../../utils/data";

function PreviewCard({ item, openModel, croppedImage }) {
  return (
    <div className="flex flex-col gap-4 px-5 pb-3 h-[80vh] overflow-auto relative">
      <div className="w-full flex justify-end sticky pt-3 top-0 bg-white">
        <svg
          className=" cursor-pointer"
          onClick={() => openModel(false)}
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g mask="url(#mask0_6706_94001)">
            <path
              d="M23.9973 26.1271L17.5048 32.6191C17.2152 32.9091 16.864 33.0508 16.4513 33.0441C16.0383 33.0378 15.687 32.8898 15.3973 32.6001C15.1077 32.3104 14.9628 31.9559 14.9628 31.5366C14.9628 31.1173 15.1077 30.7628 15.3973 30.4731L21.8703 24.0001L15.3783 17.5576C15.0883 17.2679 14.9467 16.9134 14.9533 16.4941C14.9597 16.0751 15.1077 15.7208 15.3973 15.4311C15.687 15.1411 16.0415 14.9961 16.4608 14.9961C16.8802 14.9961 17.2347 15.1411 17.5244 15.4311L23.9973 21.9231L30.4398 15.4311C30.7295 15.1411 31.0807 14.9961 31.4933 14.9961C31.9063 14.9961 32.2577 15.1411 32.5473 15.4311C32.8577 15.7411 33.0128 16.1006 33.0128 16.5096C33.0128 16.9186 32.8577 17.2679 32.5473 17.5576L26.0743 24.0001L32.5663 30.4926C32.8563 30.7823 33.0013 31.1334 33.0013 31.5461C33.0013 31.9591 32.8563 32.3104 32.5663 32.6001C32.2563 32.9104 31.8968 33.0656 31.4878 33.0656C31.0788 33.0656 30.7295 32.9104 30.4398 32.6001L23.9973 26.1271Z"
              fill="#333333"
            />
          </g>
        </svg>
      </div>
      <div className="flex flex-col gap-3 px-4">
        <div className=" flex flex-col gap-[8px]  ">
          <div className="flex flex-row">
            <div className="flex flex-col gap-[4px] w-full">
              <div className="xxsm:text-[16px] sm:text-[16px] font-[600]">
                {item?.jobTitle}
              </div>
              <div className="text-[12px] font-medium">{item?.companyName}</div>
            </div>
            {croppedImage?.url ? (
              <div className="flex flex-row items-end">
                <img
                  src={croppedImage.url}
                  alt="Cropped"
                  style={{
                    height: "56px",
                    width: "56px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : item?.logo ? (
              <div className="flex flex-row items-end">
                <img
                  src={item.logo}
                  alt="Logo"
                  style={{
                    height: "56px",
                    width: "56px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className="flex flex-row sm:gap-[11px] gap-1 items-center leading-tight  flex-wrap ">
            {item?.experience && (
              <>
                {" "}
                <div className="flex flex-row gap-[4px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <g mask="url(#mask0_4135_57914)">
                      <path
                        d="M2.33073 12.7503C2.0099 12.7503 1.73524 12.6361 1.50677 12.4076C1.2783 12.1792 1.16406 11.9045 1.16406 11.5837V5.16701C1.16406 4.84617 1.2783 4.57152 1.50677 4.34305C1.73524 4.11458 2.0099 4.00034 2.33073 4.00034H4.66406V2.83367C4.66406 2.51284 4.7783 2.23819 5.00677 2.00972C5.23524 1.78124 5.5099 1.66701 5.83073 1.66701H8.16406C8.48489 1.66701 8.75955 1.78124 8.98802 2.00972C9.21649 2.23819 9.33073 2.51284 9.33073 2.83367V4.00034H11.6641C11.9849 4.00034 12.2595 4.11458 12.488 4.34305C12.7165 4.57152 12.8307 4.84617 12.8307 5.16701V11.5837C12.8307 11.9045 12.7165 12.1792 12.488 12.4076C12.2595 12.6361 11.9849 12.7503 11.6641 12.7503H2.33073ZM2.33073 11.5837H11.6641V5.16701H2.33073V11.5837ZM5.83073 4.00034H8.16406V2.83367H5.83073V4.00034Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>

                  <div className="text-[#262626] text-[12px] font-[400] ">
                    {item.experience}
                  </div>
                </div>
                <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
              </>
            )}
            {item?.jobType && (
              <>
                <div className="flex flex-row gap-[4px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <g mask="url(#mask0_4135_57920)">
                      <path
                        d="M4.66732 12.167H9.33398V10.417C9.33398 9.77534 9.10551 9.22604 8.64857 8.76909C8.19162 8.31215 7.64232 8.08367 7.00065 8.08367C6.35898 8.08367 5.80968 8.31215 5.35273 8.76909C4.89579 9.22604 4.66732 9.77534 4.66732 10.417V12.167ZM7.00065 6.91701C7.64232 6.91701 8.19162 6.68854 8.64857 6.23159C9.10551 5.77465 9.33398 5.22534 9.33398 4.58367V2.83367H4.66732V4.58367C4.66732 5.22534 4.89579 5.77465 5.35273 6.23159C5.80968 6.68854 6.35898 6.91701 7.00065 6.91701ZM2.33398 13.3337V12.167H3.50065V10.417C3.50065 9.82395 3.63919 9.26735 3.91628 8.74722C4.19336 8.22708 4.57982 7.81145 5.07565 7.50034C4.57982 7.18923 4.19336 6.77361 3.91628 6.25347C3.63919 5.73333 3.50065 5.17673 3.50065 4.58367V2.83367H2.33398V1.66701H11.6673V2.83367H10.5007V4.58367C10.5007 5.17673 10.3621 5.73333 10.085 6.25347C9.80794 6.77361 9.42148 7.18923 8.92565 7.50034C9.42148 7.81145 9.80794 8.22708 10.085 8.74722C10.3621 9.26735 10.5007 9.82395 10.5007 10.417V12.167H11.6673V13.3337H2.33398Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div className="text-[#262626] text-[12px] font-[400]">
                    {item.jobType}
                  </div>
                </div>
                <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
              </>
            )}
            {item?.location && (
              <div className="flex flex-row gap-[4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <g mask="url(#mask0_4135_57926)">
                    <path
                      d="M7.00065 7.50034C7.32148 7.50034 7.59614 7.38611 7.82461 7.15763C8.05308 6.92916 8.16732 6.65451 8.16732 6.33367C8.16732 6.01284 8.05308 5.73819 7.82461 5.50972C7.59614 5.28124 7.32148 5.16701 7.00065 5.16701C6.67982 5.16701 6.40516 5.28124 6.17669 5.50972C5.94822 5.73819 5.83398 6.01284 5.83398 6.33367C5.83398 6.65451 5.94822 6.92916 6.17669 7.15763C6.40516 7.38611 6.67982 7.50034 7.00065 7.50034ZM7.00065 11.7878C8.18676 10.699 9.06662 9.70972 9.64023 8.82013C10.2138 7.93055 10.5007 7.14062 10.5007 6.45034C10.5007 5.39062 10.1628 4.52291 9.48711 3.84722C8.81141 3.17152 7.9826 2.83367 7.00065 2.83367C6.01871 2.83367 5.18989 3.17152 4.51419 3.84722C3.8385 4.52291 3.50065 5.39062 3.50065 6.45034C3.50065 7.14062 3.78746 7.93055 4.36107 8.82013C4.93468 9.70972 5.81454 10.699 7.00065 11.7878ZM7.00065 13.3337C5.43537 12.0017 4.26628 10.7646 3.49336 9.62222C2.72044 8.47986 2.33398 7.42256 2.33398 6.45034C2.33398 4.99201 2.80308 3.8302 3.74128 2.96492C4.67947 2.09965 5.76593 1.66701 7.00065 1.66701C8.23537 1.66701 9.32183 2.09965 10.26 2.96492C11.1982 3.8302 11.6673 4.99201 11.6673 6.45034C11.6673 7.42256 11.2809 8.47986 10.5079 9.62222C9.73503 10.7646 8.56593 12.0017 7.00065 13.3337Z"
                      fill="#646464"
                    />
                  </g>
                </svg>
                <div className="text-[#262626] text-[12px] font-[400] ">
                  {item?.country?.join(", ")} || {item?.location?.join(", ")}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-[4px]">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g mask="url(#mask0_4135_57931)">
                  <path
                    d="M4.375 10.675H9.625V9.45H4.375V10.675ZM4.375 8.225H9.625V7H4.375V8.225ZM3.0625 13.125C2.70156 13.125 2.39258 13.0051 2.13555 12.7652C1.87852 12.5253 1.75 12.2369 1.75 11.9V2.1C1.75 1.76313 1.87852 1.47474 2.13555 1.23484C2.39258 0.994948 2.70156 0.875 3.0625 0.875H8.3125L12.25 4.55V11.9C12.25 12.2369 12.1215 12.5253 11.8645 12.7652C11.6074 13.0051 11.2984 13.125 10.9375 13.125H3.0625ZM7.65625 5.1625V2.1H3.0625V11.9H10.9375V5.1625H7.65625Z"
                    fill="#646464"
                  />
                </g>
              </svg>
            </div>
            <div className="text-[#262626] font-[400] text-[12px] max-h-[36px] overflow-hidden ">
              {item?.description?.length > 160 ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.description.length > 160
                          ? `${item?.description.slice(0, 160)}...`
                          : description,
                    }}
                  />

                </>
              ) : (
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#DEDEDE] "> </div>

        <div>
          {item && (
            <>
              <div
                onWheel={(e) => e.stopPropagation()}
                className="  bg-[#fff] rounded-[12px] flex flex-col gap-[16px]   overflow-y-scroll py-4 "
              >
                {item?.description?.length > 0 && (
                  <div className="flex flex-col gap-[8px]">
                    <div className="text-[16px] font-[600]">
                      Full job Description
                    </div>
                    <div className="text-[14px] font-[400] gap-[8px] flex flex-col">
                      <div
                        className="px-4"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      />
                    </div>
                  </div>
                )}
                {item.requiredQualification && (
                  <div className="flex flex-col gap-[10px] pb-[6px]">
                    <div className="text-[16px] font-[600]">
                      Qualifications :
                    </div>

                    <div className="text-[14px] font-[400]">
                      {item.requiredQualification} <br />
                      {item.experience && (
                        <>Total Experience {item.experience} (Required) </>
                      )}
                      <br />
                      {item.mustSkills}
                    </div>
                  </div>
                )}

                <div className="pb-[12px]  flex flex-col gap-2">
                  <div className="flex flex-col gap-[16px] text-[12px] text-[#333] font-[500]">
                    <div className="text-[14px] font-[600] ">
                      Job Type :{" "}
                      <span className="text-[14px] font-[500]">
                        {" "}
                        {item.jobType}
                      </span>
                    </div>
                    {(item.minSalary > 0 || item.maxSalary > 0) && (
                      <div className="text-[14px] font-[600] flex">
                        Salary :
                        {(() => {
                          const icon = currenciesWithIcons?.find(
                            (items) =>
                              items?.icon?.toLowerCase() ===
                              item?.currency?.toLowerCase()
                          );

                          return (
                            <div className="text-[14px] font-[500]">
                              {icon ? icon.symbol : item?.currency}{" "}
                              {item.minSalary}{" "}
                              {item.minSalary && item.maxSalary && "-"}{" "}
                              {icon ? icon.symbol : item?.currency}{" "}
                              {item.maxSalary}{" "}
                              {item.salaryType === "Annual"
                                ? "per annum"
                                : item.salaryType === "Monthly"
                                  ? "per month"
                                  : "per week"}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                    {item.qualificationType && (
                      <div className="text-[14px] font-[600] ">
                        Education :{" "}
                        <span className="text-[14px] font-[500]">
                          {item.requiredQualification} (Preferred)
                        </span>
                      </div>
                    )}
                    {item.experience && (
                      <div className="text-[14px] font-[600] ">
                        Experience :{" "}
                        <span className="text-[14px] font-[500]">
                          Total Work : {item.experience} (Required)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;
