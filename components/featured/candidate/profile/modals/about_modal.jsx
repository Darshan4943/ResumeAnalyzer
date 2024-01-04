import { Close_svg } from "@/utils/svg";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { reCallUserData } from "../../../../../Redux/actions/user";
import axios from "axios";
import MiniLoader from "@/components/common/mini-loader";

const AboutModal = ({ handleImageClick, userData, setIsComponentOpen }) => {
  const [text, setText] = useState(userData?.summary);
  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState({
  //   summary: "",
  // });
  const generateText = () => {
    const prompt = `Original Paragraph:\n${text}\n\nNew Paragraph:\n`;
    if (text.length > 100) {
      setLoading(true);
      axios
        .post("http://localhost:2000/api/text/regenrate", { prompt })
        .then((res) => {
          setLoading(false);
          setText(res.data.data.choices[0].message.content);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setError("Minimum 100 characters required");
    }
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 400) {
      setText(inputValue);
    } else {
      // console.log("Input exceeds 400 characters");
    }
  };

  // <input type="text" onChange={handleChange} value={text} />

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:2000/api/candidate/updateSummery/" +
          userDataGlobal._id,

        { summery: text }
      )

      .then((res) => {
        if (res.data.success) {
          toast.success("Summary added successfully");
          dispatch(reCallUserData());
          handleImageClick(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (userData) {
      setText(userData?.summary);
    }
  }, [userData]);

  return (
    <>
      <div id="demo-modal" class="modal ">
        <div class="modal__content w-[56%] gap-4 flex flex-col p-6 rounded-xl">
          <div className="flex items-center gap-4 self-stretch w-full">
            <div className="w-[23.24%] text-[#25324B] font-Montserrat font-medium text-base lg:text-xl leading-160">
              Edit About me
            </div>
            <div className="bg-[#DEDEDE] h-[1px] w-[68.45%]"></div>

            <Close_svg handleImageClick={handleImageClick} />
          </div>
          <div className="flex w-full  px-4 py-3 rounded-md border border-gray-300 bg-white">
            <textarea
              className="text-[#333] font-Montserrat text-base font-normal leading-170 w-full focus:outline-none"
              name="summary"
              id=""
              cols="30"
              rows="10"
              // onChange={(e) => setText(e.target.value)}
              onChange={handleChange}
              value={text}
            ></textarea>
          </div>
          <div className="w-full flex justify-between items-start self-stretch">
            <div
              className=" flex px-4 py-2 justify-center items-center gap-2 rounded-md border border-primary bg-white w-[220px] cursor-pointer"
              onClick={generateText}
            >
              {loading ? (
                <MiniLoader />
              ) : (
                <>
                  {" "}
                  <img
                    src="/images/jobs/strs.png"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                  <p className="text-[14px]  text-[#333] font-Montserrat text-14 font-semibold leading-normal">
                    Generate with AI
                  </p>
                </>
              )}
            </div>
            <p className="text-Text-Secondary text-right font-Montserrat text-14 font-normal leading-170]">
              {400 - text?.length} characters left
            </p>
          </div>
          <div className="w-full flex items-end justify-end self-stretch">
            <button
              className="flex items-center justify-center px-4 py-2 font-Montserrat text-16 font-medium leading-normal rounded-md border-[#06A9EF]  bg-white "
              onClick={() => {
                handleImageClick(false);
              }}
            >
              Cancel
            </button>
            <button
              className="flex items-center justify-center px-4 py-2 font-Montserrat text-16 font-medium leading-normal text-[#fff]  border-[#06A9EF]  bg-[#06A9EF] rounded-md border border-border-color bg-primary"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutModal;
