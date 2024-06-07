import React, { useState } from "react";

const Languages = ({ setData, data, languages, setLanguages,setCustomOptions }) => {
  const [text, setText] = useState("");
  const initialRatingsLanguages = Array(3).fill(3);

  const [ratingsLanguages, setRatingsLanguages] = useState(
    initialRatingsLanguages
  );

  const [saveDisabled, setSaveDisabled] = useState(true);

  const handleChange = (e) => {
    setText(e.target.value);
    setSaveDisabled(false);
  };
  const addLanguages = () => {
    setSaveDisabled(true);
    if (text.split(",").length > 1) {
      if (text.trim() !== "") {
        setText("");
        setData({
          ...data,
          languages: [
            ...data.languages,
            ...text.split(",").map((item) => ({
              languages: item,
              rating: [...ratingsLanguages],
            })),
          ],
        });
      }
    } else {
      if (text.trim() !== "") {
        setData({
          ...data,
          languages: [
            ...data.languages,
            { languages: text, rating: [...ratingsLanguages] },
          ],
        });
        setSaveDisabled(true);
        setText("");
        setRatingsLanguages(initialRatingsLanguages);
      }
    }
  };

  const deleteLanguages = (index) => {
    const updatedLanguages = data.languages.filter((_, i) => i !== index);
    setData({ ...data, languages: updatedLanguages });
    setSaveDisabled(false);
  };

  const handleStarClickLanguages = (languagesIndex, starIndex) => {
    const updatedLanguages = data.languages.map((languages, index) => {
      if (index === languagesIndex) {
        const updatedRatings = languages.rating.map((rating, i) =>
          i <= starIndex ? 1 : 0
        );
        return { ...languages, rating: updatedRatings };
      }
      return languages;
    });
    setData({ ...data, languages: updatedLanguages });
    setSaveDisabled(false);
  };

  const renderStarsLanguages = (languagesIndex) => {
    const languageItem = data.languages[languagesIndex];
    if (languageItem && languageItem.rating) {
      return languageItem.rating.map((rating, index) => (
        <img
          key={`star_${index}`}
          src={
            rating ? "/images/services/Star.png" : "/images/services/Star1.png"
          }
          alt=""
          className="h-[30px] w-[30px]"
          onClick={() => handleStarClickLanguages(languagesIndex, index)}
        />
      ));
    } else {
      return null;
    }
  };
  return (
    <div
      className="flex flex-col p-4 gap-2 rounded-lg bg-white"
      // style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full text-[20px] font-montserrat  font-medium flex justify-between gap-4">
          Languages
          <div onClick={() => {
            setCustomOptions((prevState) => ({
              ...prevState,
              ["Languages"]: false,
            })); setData({
              ...data,
              languages: [],
            })
          }} className="w-[36px] h-[36px] rounded-[50%] border border-[#DEDEDE] bg-[#F7F7F7] flex justify-center items-center cursor-pointer">
          <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g mask="url(#mask0_3986_38982)">
              <path d="M7.30775 20.5002C6.81058 20.5002 6.385 20.3232 6.031 19.9692C5.677 19.6152 5.5 19.1896 5.5 18.6925V6.00022H5.25C5.0375 6.00022 4.85942 5.92831 4.71575 5.78447C4.57192 5.64064 4.5 5.46247 4.5 5.24997C4.5 5.03731 4.57192 4.85922 4.71575 4.71572C4.85942 4.57206 5.0375 4.50022 5.25 4.50022H9C9 4.25539 9.08625 4.04672 9.25875 3.87422C9.43108 3.70189 9.63967 3.61572 9.8845 3.61572H14.1155C14.3603 3.61572 14.5689 3.70189 14.7413 3.87422C14.9138 4.04672 15 4.25539 15 4.50022H18.75C18.9625 4.50022 19.1406 4.57214 19.2843 4.71597C19.4281 4.85981 19.5 5.03797 19.5 5.25047C19.5 5.46314 19.4281 5.64122 19.2843 5.78472C19.1406 5.92839 18.9625 6.00022 18.75 6.00022H18.5V18.6925C18.5 19.1896 18.323 19.6152 17.969 19.9692C17.615 20.3232 17.1894 20.5002 16.6923 20.5002H7.30775ZM17 6.00022H7V18.6925C7 18.7823 7.02883 18.8561 7.0865 18.9137C7.14417 18.9714 7.21792 19.0002 7.30775 19.0002H16.6923C16.7821 19.0002 16.8558 18.9714 16.9135 18.9137C16.9712 18.8561 17 18.7823 17 18.6925V6.00022ZM10.1543 17.0002C10.3668 17.0002 10.5448 16.9284 10.6885 16.7847C10.832 16.6409 10.9037 16.4627 10.9037 16.2502V8.75022C10.9037 8.53772 10.8318 8.35956 10.688 8.21572C10.5443 8.07206 10.3662 8.00022 10.1535 8.00022C9.941 8.00022 9.76292 8.07206 9.61925 8.21572C9.47575 8.35956 9.404 8.53772 9.404 8.75022V16.2502C9.404 16.4627 9.47583 16.6409 9.6195 16.7847C9.76333 16.9284 9.94158 17.0002 10.1543 17.0002ZM13.8465 17.0002C14.059 17.0002 14.2371 16.9284 14.3807 16.7847C14.5242 16.6409 14.596 16.4627 14.596 16.2502V8.75022C14.596 8.53772 14.5242 8.35956 14.3805 8.21572C14.2367 8.07206 14.0584 8.00022 13.8458 8.00022C13.6333 8.00022 13.4552 8.07206 13.3115 8.21572C13.168 8.35956 13.0962 8.53772 13.0962 8.75022V16.2502C13.0962 16.4627 13.1682 16.6409 13.312 16.7847C13.4557 16.9284 13.6338 17.0002 13.8465 17.0002Z" fill="#C00000" />
            </g>
          </svg>

        </div>
        </div>
        <div className="flex flex-col gap-4">
          {data?.languages?.map((languages, index) => (
            <div key={index} className="flex gap-4 flex-wrap justify-between">
              <div className="flex gap-1 px-3 py-2 border md:w-[48%] border-[#06A9EF] rounded-[24px] justify-between items-center">
                <p className="text-[14px] font-medium">{languages.languages}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  onClick={() => deleteLanguages(index)}
                >
                  <g mask="url(#mask0_5716_136486)">
                    <path
                      d="M6.0625 15L5 13.9375L8.9375 10L5 6.0625L6.0625 5L10 8.9375L13.9375 5L15 6.0625L11.0625 10L15 13.9375L13.9375 15L10 11.0625L6.0625 15Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              </div>
              <div className="flex border md:w-[48%] flex-wrap border-[#DEDEDE] px-2 py-2 rounded-[8px] items-center justify-between">
                {renderStarsLanguages(index)}
                <p>
                  {languages.rating[2] !== 0
                    ? "Expert"
                    : languages.rating[1] !== 0
                    ? "Proficient"
                    : "Beginner"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter your language"
            className="w-full text-[14px] font-montserrat font-small"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-between  py-2 gap-2">
            {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
              Update to Profile
            </button> */}
             {data.languages.length <= 0 &&
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => {
                    if (data.languages.length <= 0) {
                      setCustomOptions((prevState) => ({
                        ...prevState,
                        ["Languages"]: false,
                      })); setData({
                        ...data,
                        languages: [],
                      })
                    }
                  }}
                >
                  Cancel
                </button>
              }
            <button
              disabled={saveDisabled}
              style={{ opacity: saveDisabled ? 0.5 : 1 }}
              onClick={addLanguages}
              className={`font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] ${
                !saveDisabled ? "btn_hover_effect" : ""
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Languages;
