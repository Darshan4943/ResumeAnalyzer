import React, { useEffect, useState } from "react";

const SocialLink = ({
  setData,
  data,
  setLinkView,
  linkView,
  setCustomOptions,
}) => {
  const [isChecked, setIsChecked] = useState(true);

  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [linkData, setLinkData] = useState({
    platform: "",
    link: "",
  });
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showLinks: !isChecked });
  };
  useEffect(() => {
    if (data) {
      if (data?.showLinks === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [data]);
  


  const handleSave = () => {
    if (isModified?.status === true) {
      const dumyData = data?.socialLinks;
      const index = isModified?.index;
      dumyData?.splice(index, 1, linkData);
      setData({ ...data, socialLinks: dumyData });
      setLinkView(false);
    } else {
      setData({
        ...data,
        socialLinks: [linkData, ...data.socialLinks],
      });
      setLinkView(false);
    }
    setLinkData({
      platform: "",
      link: "",
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
    const dataToEdit = data?.socialLinks[index];

    if (dataToEdit) {
      setLinkView(true);
      setLinkData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteSocial = (index) => {
    setData({
      ...data,
      socialLinks: data?.socialLinks?.filter((item, i) => i !== index),
    });
  };
  return (
    <>
      <div
        className="flex flex-col py-4 gap-2 rounded-lg bg-white"
        style={{
          // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p>Links</p>

          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
          {/* <div onClick={() => {
            setCustomOptions((prevState) => ({
              ...prevState,
              ["Links"]: false,
            })); setData({
              ...data,
              socialLinks: [],
            })
          }} className="w-[36px] h-[36px] rounded-[50%] border border-[#DEDEDE] bg-[#F7F7F7] flex justify-center items-center cursor-pointer">
          <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g mask="url(#mask0_3986_38982)">
              <path d="M7.30775 20.5002C6.81058 20.5002 6.385 20.3232 6.031 19.9692C5.677 19.6152 5.5 19.1896 5.5 18.6925V6.00022H5.25C5.0375 6.00022 4.85942 5.92831 4.71575 5.78447C4.57192 5.64064 4.5 5.46247 4.5 5.24997C4.5 5.03731 4.57192 4.85922 4.71575 4.71572C4.85942 4.57206 5.0375 4.50022 5.25 4.50022H9C9 4.25539 9.08625 4.04672 9.25875 3.87422C9.43108 3.70189 9.63967 3.61572 9.8845 3.61572H14.1155C14.3603 3.61572 14.5689 3.70189 14.7413 3.87422C14.9138 4.04672 15 4.25539 15 4.50022H18.75C18.9625 4.50022 19.1406 4.57214 19.2843 4.71597C19.4281 4.85981 19.5 5.03797 19.5 5.25047C19.5 5.46314 19.4281 5.64122 19.2843 5.78472C19.1406 5.92839 18.9625 6.00022 18.75 6.00022H18.5V18.6925C18.5 19.1896 18.323 19.6152 17.969 19.9692C17.615 20.3232 17.1894 20.5002 16.6923 20.5002H7.30775ZM17 6.00022H7V18.6925C7 18.7823 7.02883 18.8561 7.0865 18.9137C7.14417 18.9714 7.21792 19.0002 7.30775 19.0002H16.6923C16.7821 19.0002 16.8558 18.9714 16.9135 18.9137C16.9712 18.8561 17 18.7823 17 18.6925V6.00022ZM10.1543 17.0002C10.3668 17.0002 10.5448 16.9284 10.6885 16.7847C10.832 16.6409 10.9037 16.4627 10.9037 16.2502V8.75022C10.9037 8.53772 10.8318 8.35956 10.688 8.21572C10.5443 8.07206 10.3662 8.00022 10.1535 8.00022C9.941 8.00022 9.76292 8.07206 9.61925 8.21572C9.47575 8.35956 9.404 8.53772 9.404 8.75022V16.2502C9.404 16.4627 9.47583 16.6409 9.6195 16.7847C9.76333 16.9284 9.94158 17.0002 10.1543 17.0002ZM13.8465 17.0002C14.059 17.0002 14.2371 16.9284 14.3807 16.7847C14.5242 16.6409 14.596 16.4627 14.596 16.2502V8.75022C14.596 8.53772 14.5242 8.35956 14.3805 8.21572C14.2367 8.07206 14.0584 8.00022 13.8458 8.00022C13.6333 8.00022 13.4552 8.07206 13.3115 8.21572C13.168 8.35956 13.0962 8.53772 13.0962 8.75022V16.2502C13.0962 16.4627 13.1682 16.6409 13.312 16.7847C13.4557 16.9284 13.6338 17.0002 13.8465 17.0002Z" fill="#C00000" />
            </g>
          </svg>

        </div> */}
        </div>

        {data?.socialLinks?.length > 0 &&
          data?.socialLinks?.map((social, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]"
            >
              <div className="flex justify-between">
                <p className="text-[14px]">{social?.platform}</p>
                <div className="flex gap-2 cursor-pointer">
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
              <div>
                <p className="text-[12px] break-all">{social?.link}</p>
              </div>
            </div>
          ))}
        {(linkView || data.socialLinks.length <= 0) && (
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
                    value={linkData?.platform}
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
                    value={linkData?.link}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end ">
              <div className="flex justify-between  py-2 gap-2">
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => {
                    setLinkView(false);
                    if (data.socialLinks.length <= 0) {
                      setCustomOptions((prevState) => ({
                        ...prevState,
                        ["Links"]: false,
                      }));
                      setData({
                        ...data,
                        socialLinks: [],
                      });
                    }
                  }}
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
        {!linkView && data.socialLinks.length > 0 && (
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
              onClick={() => setLinkView(true)}
              className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
              disabled={!isChecked}
            >
              Add Links
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SocialLink;
