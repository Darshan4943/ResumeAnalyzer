import { useEditor } from "@tiptap/react";
import React, { useEffect, useState } from "react";

const Languages = ({
  setData,
  data,
  languages,
  setLanguages,
  setCustomOptions,
}) => {
  const [text, setText] = useState("");
  const initialRatingsLanguages = Array(3).fill(3);

  const [ratingsLanguages, setRatingsLanguages] = useState(
    initialRatingsLanguages
  );

  const [saveDisabled, setSaveDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
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
    const languageItem = data?.languages[languagesIndex];
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

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showLanguage: !isChecked });
  };

  useEffect(() => {
    if (data) {
      if (data?.showLanguage === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [data]);

  return (
    <div
      className="flex flex-col p-4 gap-2 rounded-2xl bg-white"
      // style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      style={{
        // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        opacity: isChecked ? 1 : 0.5,
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Languages</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
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
            {data?.languages?.length <= 0 && (
              <button
                className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                onClick={() => {
                  if (data.languages.length <= 0) {
                    setCustomOptions((prevState) => ({
                      ...prevState,
                      ["Languages"]: false,
                    }));
                    setData({
                      ...data,
                      languages: [],
                    });
                  }
                }}
              >
                Cancel
              </button>
            )}
            <button
              disabled={saveDisabled}
              style={{ opacity: saveDisabled ? 0.5 : 1 }}
              onClick={addLanguages}
              className={`font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] ${
                !saveDisabled ? "bg_Button" : ""
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
