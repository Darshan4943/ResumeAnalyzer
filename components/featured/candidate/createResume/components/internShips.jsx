import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const Internships = ({ data, setData, setIntern, intern }) => {
  const [isChecked, setIsChecked] = useState(true);
  // const [view, setView] = useState(false);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [internShipData, setInternshipData] = useState({
    jobTittle: "",
    Employer: "",
    discription: "",
    city: "",
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
  });
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showInternship: !isChecked });
  };

  useEffect(() => {
    if (data) {
      if (data?.showInternship === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [data]);

  console.log(99, data);

  const handleSave = () => {
    if (isModified.status === true) {
      const dumyData = data.internship;
      const index = isModified.index;
      dumyData.splice(index, 1, internShipData);
      setData({ ...data, intership: dumyData });
    } else {
      setData({
        ...data,
        internship: [internShipData, ...data.internship],
      });
    }
    setIsModified({ status: false, index: 0 });
    setInternshipData({
      jobTittle: "",
      Employer: "",
      discription: "",
      city: "",
      duration: {
        start: { year: "Year", month: "Month" },
        end: { year: "Year", month: "Month" },
      },
    });
    window.scrollTo(0, 0);
    setIntern(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInternshipData({
      ...internShipData,
      [name]: value,
    });
  };
  const handleEditCourse = (index) => {
    const dataToEdit = data.internship[index];

    if (dataToEdit) {
      setInternshipData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteCourse = (index) => {
    setData({
      ...data,
      intership: data.internship.filter((item, i) => i !== index),
    });
  };

  //   console.log(131313,data)

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
          <p className="w-[80%]"> Internship</p>
        </div>

        {data?.internship?.map((internship, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]"
          >
            <div className="flex justify-between">
              <p>{internship.jobTittle}</p>
              <div className="flex gap-2">
                <div onClick={() => handleEditCourse(index)}>
                  <Edit_icon />
                </div>
                <div onClick={() => handleDeleteCourse(index)}>
                  <Delete_icon />
                </div>
              </div>
            </div>
          </div>
        ))}

        {intern && (
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-[50%]">
                  <div className=" text-[14px] font-montserrat  font-medium">
                    Job Tittle
                  </div>
                  <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name="jobTittle"
                      placeholder="Enter Certificate Name"
                      className="w-full text-[14px] font-montserrat font-small "
                      value={internShipData.jobTittle}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <div className="w-full text-[14px] font-montserrat  font-medium">
                    Employer
                  </div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name="Employer"
                      id=""
                      placeholder="Issued by"
                      className="w-full text-[14px] font-montserrat font-small "
                      value={internShipData.Employer}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>
                </div>
              </div>

              {/* city here */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-[50%]">
                  <div className=" text-[14px] font-montserrat  font-medium">
                    city
                  </div>
                  <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter Certificate Name"
                      className="w-full text-[14px] font-montserrat font-small "
                      value={internShipData.city}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>
                </div>
              </div>

              <DateSelector
                idPrefix="education"
                data={internShipData}
                dataSeter={setInternshipData}
                fromCreate={true}
              />

              <div className="flex flex-col gap-2 w-full">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Description
                </div>

                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px]  min-h-[140px]">
                  <textArea
                    type="text"
                    name=""
                    id=""
                    className="w-full h-full text-[14px] font-montserrat font-small outline-none  min-h-[140px]"
                    onChange={(e) => {
                      setInternshipData({
                        ...internShipData,
                        discription: e.target.value,
                      });
                    }}
                  >
                    {internShipData.discription}
                  </textArea>
                </div>
              </div>
            </div>

            <div className="flex justify-end ">
              <div className="flex justify-between  py-2 gap-2">
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => setIntern(false)}
                >
                  Cancel
                </button>
                {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                  Update to Profile
                </button> */}
                <button
                  onClick={() => {
                    handleSave();
                  }}
                  // disabled={!isChecked}

                  className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Internships;
