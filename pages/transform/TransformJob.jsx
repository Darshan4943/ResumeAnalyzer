import React, { useEffect, useRef, useState } from "react";
import TransformJd from "../../components/featured/home/transformJd";
import Fonts from "../../public/fonts/fonts";
import UserResumes from "./UserResumes";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { data } from "autoprefixer";
<Fonts />;

function TransformJob() {
  const [isAll, setIsAll] = useState(false);
  const [text, setText] = useState("");
  const [selected, setSelect] = useState({});
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState(null);
  const [details, setDetails] = useState();
  const [resumeList, setResumeList] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const userDataGlobal = useSelector((state) => state.userData);
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const transformHandler = () => {
    setLoading(true);
    axios
      .post("http://localhost:2000/api/cv/transform", {
        jd: text,
        json: selected,
      })
      .then((res) => {
        setLoading(false);
        setNewData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("ok", userDataGlobal);

    if (userDataGlobal.role == "recruiter") {
      axios
        .get(
          `http://localhost:2000/api/client/getByRecruiter/${userDataGlobal._id}`
        )
        .then((res) => {
          const result = res.data.data;

          setDetails(result);
          setSelectedClient({
            value: res.data.data[0]?._id,
            label:
              res.data.data[0]?.firstName + " " + res.data.data[0]?.lastName,
          });
          axios
            .get("http://localhost:2000/api/resume/" + res.data.data[0]?._id)
            .then((res) => {
              console.log("first", selectedClient, res.data.data);
              setResumeList(res.data.data);
              setSelect(res.data.data[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal]);

  const selectHandler = (data) => {
    if (userDataGlobal.role == "recruiter") {
      setSelectedClient(data);
      axios
        .get("http://localhost:2000/api/resume/" + data.value)
        .then((res) => {
          setResumeList(res.data.data);
          setSelect(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className=" p-6 flex flex-col gap-4">
      <div className=" font-semibold text-[24px]">
        Transform for Job Description
      </div>
      <div
        className="flex ml:flex-row flex-col gap-12 w-[100%] p-4 rounded-[12px]"
        style={{ boxShadow: "0px 1px 6px 0px #00000040" }}
      >
        <div className="flex flex-col gap-6 ml:w-[50%] w-[100%]">
          <div className="flex flex-col gap-4 ">
            <div className="text-[20px] font-medium">Job Description</div>
            <textarea
              value={text}
              onChange={handleChange}
              rows={6}
              cols={50}
              placeholder="Enter your text here..."
              className=" border border-[#06A9EF] rounded-[8px] outline-none h-auto p-2"
            />
          </div>
          <div className="flex flex-col gap-4 ">
            {userDataGlobal.role != "user" && (
              <div className="w-full ">
                <div className="text-[20px] font-medium">Select Client</div>
                <ReactSelect
                  options={details?.map((item) => ({
                    value: item._id,
                    label: item.firstName + " " + item.lastName,
                  }))}
                  className="my-4 outline outline-offset-1 outline-blue rounded-[8px]"
                  name=""
                  placeholder="Search"
                  value={selectedClient}
                  onChange={(data) => selectHandler(data)}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",

                      minWidth: "130px",
                    }),
                  }}
                />
              </div>
            )}
            <div className="text-[20px] font-medium">
              Select from Collection
            </div>

            <div className="rounded-[16px] border bg-[#F9F9F9] border-[#DEDEDE] pl-4 pr-4 ">
              {resumeList?.length > 0 || userDataGlobal.role != "recruiter" ? (
                <div
                  className="flex gap-4   py-4  items-center"
                  style={{ overflowX: "auto" }}
                >
                  <UserResumes
                    setSelect={setSelect}
                    setIsAll={setIsAll}
                    isAll={false}
                    resumeList={resumeList}
                    selected={selected}
                  />
                </div>
              ) : (
                <div className="text-[20px] font-medium text-center w-full py-[24px]">
                  No Resume Available
                </div>
              )}
            </div>
            <div
              onClick={() => setIsAll(true)}
              className="font-medium text-[18px] text-[#06A9EF] flex justify-end cursor-pointer"
            >
              See All
            </div>
            {isAll && (
              <UserResumes
                setSelect={setSelect}
                setIsAll={setIsAll}
                isAll={true}
                resumeList={resumeList}
              />
            )}

            <button
              className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white w-[188px] font-semibold rounded-[12px]"
              disabled={loading}
              onClick={() => {
                transformHandler();
              }}
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-white animate-spin"
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
                "Transform Resume"
              )}
            </button>
          </div>
        </div>
        <div className="ml:w-[50%] w-[100% flex flex-col gap-4">
          {selected && (
            <TransformJd
              data={
                newData !== null
                  ? {
                      ...newData,
                      summery: newData.summary
                        ? newData.summary
                        : newData.summery,
                    }
                  : selected
              }
              resumeTemplateIndex={selected.resumeTemplateIndex}
              selectedColor={selected.selectedColor}
              selectedFont={selected.selectedFont}
              preview={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TransformJob;
