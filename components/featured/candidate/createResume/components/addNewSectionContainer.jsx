import React from "react";

function AddNewSectionContainer({
  data,
  setData,
  setCustomOptions,
  customOptions,
}) {
  const information = [
    { img: "/images/instant_mix.png", name: "Custom Section" },
    { img: "/images/celebration.png", name: "Extra-Curriculum Activities" },
    { img: "/images/clarify.png", name: "Courses & Certifications" },
    { img: "/images/work.png", name: "Internships & Projects" },
    { img: "/images/stadia_controller.png", name: "Hobbies" },
    { img: "/images/translate.png", name: "Languages" },
    { img: "/images/trophy.png", name: "Achievements & Awards" },
    { img: "/images/quick_reference_all.png", name: "References" },
    // { img: "/images/instant_mix.png", name: "Custom Section" },
  ];

  const handleSetData = (item, index) => {
    setCustomOptions((prevState) => ({
      ...prevState,
      [item.name]: !prevState[item.name],
    }));
  };

  return (
    <div className="grid grid-cols-1 p-4 gap-x-3 gap-y-3 rounded-lg bg-white xxlg:grid-cols-2 ms:grid-cols-1 sm:grid-cols-2">
      {information.map((item, index) => {
        return (
          <div
            onClick={() => {
              handleSetData(item, index);
            }}
            key={index}
            className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row"
          >
            <div className="w-[24px] h[24px]">
              <img className="w-full h-full" src={`${item.img}`} />
            </div>
            <div className="flex justify-center items-center">
              <p className="font-Montserrat text-[12px] font-[600]">
                {item.name}
              </p>
            </div>
          </div>
        );
      })}

      {/* <div className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row">
        <div className="w-[24px] h[24px]">
          <img className="w-full h-full" src="/images/celebration.png" />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-Montserrat text-[12px] font-[600]">
            Extra-Curriculum Activities
          </p>
        </div>
      </div>
      <div className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row">
        <div className="w-[24px] h[24px]">
          <img className="w-full h-full" src="/images/clarify.png" />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-Montserrat text-[12px] font-[600]">
            Courses & Certifications
          </p>
        </div>
      </div>
      <div className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row">
        <div className="w-[24px] h[24px]">
          <img className="w-full h-full" src="/images/work.png" />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-Montserrat text-[12px] font-[600]">
            Internships & Projects
          </p>
        </div>
      </div>
      <div className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row">
        <div className="w-[24px] h[24px]">
          <img className="w-full h-full" src="/images/stadia_controller.png" />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-Montserrat text-[12px] font-[600]">Hobbies</p>
        </div>
      </div>
      <div className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row">
        <div className="w-[24px] h[24px]">
          <img className="w-full h-full" src="/images/translate.png" />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-Montserrat text-[12px] font-[600]">Languages</p>
        </div>
      </div>
      <div className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row">
        <div className="w-[24px] h[24px]">
          <img className="w-full h-full" src="/images/trophy.png" />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-Montserrat text-[12px] font-[600]">
            Achievements & Awards
          </p>
        </div>
      </div>
      <div className=" h-[46px] px-[16px] py-[8px] rounded-[8px] border-2 border-[#DEDEDE] gap-[14px] flex flex-row">
        <div className="w-[24px] h[24px]">
          <img
            className="w-full h-full"
            src="/images/quick_reference_all.png"
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-Montserrat text-[12px] font-[600]">References</p>
        </div>
      </div> */}
    </div>
  );
}

export default AddNewSectionContainer;
