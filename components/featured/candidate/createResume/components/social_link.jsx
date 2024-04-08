import React, { useState } from "react";

const SocialLink = ({ setData, data }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(false);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [linkData, setLinkData] = useState({
    platform: "",
    link: "",
    discription: "",
  });
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showCourse: !isChecked });
  };

  const handleSave = () => {
    if (isModified.status === true) {
      const dumyData = data.sociaLinks;
      const index = isModified.index;
      dumyData.splice(index, 1, linkData);
      setData({ ...data, sociaLinks: dumyData });
      setView(false);
    } else {
      setData({
        ...data,
        sociaLinks: [linkData, ...data.sociaLinks],
      });
      setView(false);
    }
    setLinkData({
      platform: "",
      link: "",
      discription: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinkData({
      ...linkData,
      [name]: value,
    });
  };
  const handleEditSocial = (index) => {
    const dataToEdit = data.sociaLinks[index];

    if (dataToEdit) {
      setView(true);
      setLinkData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteSocial = (index) => {
    setData({
      ...data,
      sociaLinks: data.sociaLinks.filter((item, i) => i !== index),
    });
  };
  return (
    <>
      <div
        className="flex flex-col p-4 gap-2 rounded-lg bg-white"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Website & Social link</p>

          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {data?.sociaLinks?.map((social, index) => (
          <div  key={index} className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]">
            <div className="flex justify-between">
              <p>{social.platform}</p>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  onClick={() => handleEditSocial(index)}
                >
                  <g mask="url(#mask0_5808_93842)">
                    <path
                      d="M4.16404 15.8317H5.21531L13.7458 7.30121L12.6945 6.24994L4.16404 14.7804V15.8317ZM2.91406 17.0817V14.2612L13.9061 3.27402C14.0321 3.15956 14.1712 3.07112 14.3235 3.00868C14.4757 2.94625 14.6354 2.91504 14.8025 2.91504C14.9696 2.91504 15.1314 2.94469 15.2881 3.004C15.4447 3.06329 15.5834 3.15757 15.7041 3.28683L16.7217 4.31727C16.851 4.43799 16.9431 4.57691 16.9981 4.73402C17.0532 4.89112 17.0807 5.04821 17.0807 5.20531C17.0807 5.37288 17.0521 5.5328 16.9948 5.68506C16.9376 5.83734 16.8466 5.97648 16.7217 6.1025L5.73454 17.0817H2.91406ZM13.2109 6.78479L12.6945 6.24994L13.7458 7.30121L13.2109 6.78479Z"
                      fill="#646464"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  onClick={() => handleDeleteSocial(index)}
                >
                  <g mask="url(#mask0_5808_93845)">
                    <path
                      d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                      fill="#646464"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        ))}
        {view && (
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                  <input
                    type="text"
                    name="platform"
                    id=""
                    placeholder=" Your Social Name eg. Linkedin, Behance"
                    className="w-full text-[14px] font-montserrat font-small"
                    value={linkData.platform}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                  />
                </div>
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                  <input
                    type="text"
                    name="link"
                    id=""
                    placeholder="Enter your social Profile URL"
                    className="w-full text-[14px] font-montserrat font-small"
                    value={linkData.link}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Description
                </div>

                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] min-h-[140px]">
                  <textArea
                    type="text"
                    name="discription"
                    id=""
                    placeholder="Describe about your Profile"
                    className="w-full text-[14px] font-montserrat font-small outline-none h-full  min-h-[140px]"
                    onChange={handleInputChange}
                  >
                    {linkData.discription}
                  </textArea>
                </div>
                <p className="flex justify-end text-[14px] font-normal text-[#646464]">
                  {400 - linkData.discription.length} characters left
                </p>
              </div>
            </div>
            <div className="flex justify-end ">
              <div className="flex justify-between  py-2 gap-2">
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => setView(false)}
                >
                  Cancel
                </button>
                {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                  Update to Profile
                </button> */}
                <button
                  onClick={handleSave}
                  disabled={!isChecked}
                  className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {!view && (
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_5716_136351)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
            <p
              onClick={() => setView(true)}
              className="text-[16px] font-semibold text-[#06A9EF]"
              disabled={!isChecked}
            >
              Add More
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SocialLink;
