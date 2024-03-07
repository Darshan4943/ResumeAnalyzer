import React, { useState } from "react";

const Hobbie = ({ data, setData }) => {
  const [text, setText] = useState("");
  const [saveDisabled, setSaveDisabled] = useState(true);

  const deleteHobbies = (index) => {
    const updatedHobbies = data.hobbies.filter((_, i) => i !== index);
    setData({ ...data, hobbies: updatedHobbies });
    setSaveDisabled(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setSaveDisabled(false);
  };
  const addHobby = () => {
    setSaveDisabled(true);
    if (text.split(",").length > 1) {
      if (text.trim() !== "") {
        setText("");
        console.log(text.split(","))
        setData({
          ...data,
          hobbies: [
            ...data.hobbies,
           ...text.split(",").map((item) => ({ title: item })),
          ],
        });
      }
    } else {
      if (text.trim() !== "") {
        setText("");
        setData({ ...data, hobbies: [...data.hobbies, { title: text }] });
      }
    }
  };

  return (
    <>
      <div
        className="flex flex-col p-4 gap-2 rounded-lg bg-white"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full text-[20px] font-montserrat  font-medium">
            Hobbies
          </div>
          <div className="flex flex-wrap gap-4">
            {data?.hobbies?.map((hobby, index) => (
              <div
                key={index}
                className="flex gap-1 px-3 py-2 border border-[#06A9EF] rounded-[24px] justify-between items-center"
              >
                <p className="text-[14px] font-medium">{hobby.title}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  onClick={() => deleteHobbies(index)}
                >
                  <g mask="url(#mask0_5716_136486)">
                    <path
                      d="M6.0625 15L5 13.9375L8.9375 10L5 6.0625L6.0625 5L10 8.9375L13.9375 5L15 6.0625L11.0625 10L15 13.9375L13.9375 15L10 11.0625L6.0625 15Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              </div>
            ))}
          </div>

          <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your hobbies"
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
              <button
                onClick={addHobby}
                disabled={saveDisabled}
                style={{ opacity: saveDisabled ? 0.5 : 1 }}
                className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hobbie;
