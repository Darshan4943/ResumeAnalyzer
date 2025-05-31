import axios from "axios";
import React, { useEffect, useState } from "react";
import { DownSvg, UpSvg } from "../../utils/svg";
import MiniLoader from "../../components/common/mini-loader";
import { setPageOpened } from "../../Redux/slices/websiteSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MiniLoaderr from "../../components/common/miniLoader";
function SkilotechCollection() {
  const dispatch = useDispatch();
  // dispatch(setPageOpened());
  const [option, setOption] = useState("skilotechCollection");
  const [data, setData] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterType, setFilterType] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  const widths = ["25%", "10%", "15%", "25%", "15%", "10%"];
  const texts = ["start", "start", "start", "start", "start", "center"];

  const getSkilotechResume = async () => {
    try {
      setLoading1(true);
      const response = await axios.get("https://jamblix.com/api/resume/get/AllResume", {
        params: { countryCode }
      });
      
      if (response.data.success) {
        setData(response.data.data);
        setLoading1(false);
      } else {
        console.error("Failed to fetch resumes:", response.data);
        setLoading1(false);
        return [];
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setLoading1(false);
      return [];
    }
  };

  useEffect(() => {
    getSkilotechResume();
  }, [countryCode]);

  const handleCheckboxChange = (applicant) => {
    // Prevent selection if paymentStatus is true
    if (applicant.paymentStatus === true) return;
  
    setSelectedApplicants((prevSelected) => {
      const isSelected = prevSelected.find(
        (item) => item._id === applicant._id
      );
      if (isSelected) {
        return prevSelected.filter((item) => item._id !== applicant._id);
      } else {
        return [...prevSelected, applicant];
      }
    });
  };
  

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // select only those whose paymentStatus is not true
      const toSelect = data.filter(applicant => !applicant.paymentStatus);
      setSelectedApplicants(toSelect);
    } else {
      setSelectedApplicants([]);
    }
    setSelectAll(e.target.checked);
  };
  

  const handleSendMail = async (applicants) => {
    setLoading2(true)
    try {
      const response = await axios.post(
        "https://jamblix.com/api/sendEvaluationMail",
        {
          userData: applicants.map((app) => ({
            email: app.email,
            evaluationSummary: app.evaluation,
            id: app._id,
            skilotechCollection: true,
            resumeUrl: app.resumeUrl,
          })),
        }
      );

      if (response.data.success) {
        toast.success("Email sent successfully!");
        setLoading2(false)
        setSelectedApplicants([]);
      } else {
        setLoading2(false)
        toast.error("Failed to send email.");
      }
    } catch (error) {
      setLoading2(false)
      console.error("Error sending email:", error);
      toast.error("Error sending email.");
    }
  };

  // Function to send email to an individual applicant
  const handleSendIndividualMail = async (applicant) => {
    setLoading(applicant._id);
    try {
      const response = await axios.post(
        "https://jamblix.com/api/sendEvaluationMail",
        {
          userData: [
            {
              email: applicant.email,
              evaluationSummary: applicant.evaluation,
              id: applicant._id,
              skilotechCollection: true,
              resumeUrl: applicant.resumeUrl,
            },
          ],
        }
      );

      if (response.data.success) {
        setLoading("");
        toast.success("Email Sent Successfully");
      } else {
        setLoading("");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setLoading("");
    }
  };

  // Table headers
  const applicant_head = [
    {
      name: "Name of Candidate",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "Dial Code",
      check: "",
    },
    {
      name: "Mobile No",
      check: "",
    },
    {
      name: "Email",
      check: "",
    },
    {
      name: "Payment Status",
      check: "",
      isFilter: true,
      filters: ["paid", "unpaid"],
    },
    {
      name: "Action",
      check: "",
    },
  ];

  const handleChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <div>
      {loading1 ? (
        <MiniLoaderr />
      ) : 
      <div className="web">
        {/* Bulk Mail Button */}
        <div className="flex justify-end mb-4 gap-4">
          <select id="country" className="px-4 rounded-[30px] outline-none text-[14px] font-medium " onChange={handleChange} defaultValue="">
            <option value="" disabled>
              Select Country
            </option>
            <option value="+91">India</option>
            <option value="+263">Zimbabwe</option>
            <option value="+44">United Kingdom</option>
          </select>
          {loading2 ?
          
          <div className="flex w-[140.2px] justify-center items-center h-[40px] rounded-[30px] bg-blue">
            <MiniLoader/>

          </div>
          :
          <button
            className={`text-[14px] font-[500] rounded-[30px] bg-blue-500 text-white px-6 h-[40px] bg_Button ${selectedApplicants.length === 0 && "opacity-50"} `}
            onClick={() => handleSendMail(selectedApplicants)} // Send to selected applicants
            disabled={selectedApplicants.length === 0}
          >
            Send Bulk Mail
          </button>
}
        </div>

        {/* Table Header */}
        <div className="flex p-[16px] items-center gap-[20px] bg-[#EFFAFF] border border-[#D6DDEB]">
          <input
            className="w-[16px] h-[16px]"
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />

          {applicant_head.map((applicant_head, index) => (
            <div
              key={index}
              className="flex items-center w-full text-[#333333] gap-[8px] relative"
              style={{ width: widths[index] }}
            >
              <p
                style={{ textAlign: texts[index] }}
                className="text-[14px] w-full font-[600] "
              >
                {applicant_head.name}
              </p>
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start bg-[#fff] overflow-y-auto">
          {data.length !== 0 ? (
            <>
              {data.map((applicant, index) => (
                <div
                  className={`flex w-[100%] border-b border-[#D4D4D480] p-[16px] justify-between items-center ${
                    selectedApplicants.some(
                      (item) => item._id === applicant._id
                    )
                      ? "bg-[#D3F1FF]"
                      : "bg-[#FFFFFF]"
                  }`}
                  key={applicant?._id}
                >
                  <div className="gap-[20px] w-full justify-between flex items-center">
                    <input
                      key={applicant.id}
                      className="w-[16px] h-[16px]"
                      type="checkbox"
                      checked={selectedApplicants.some(
                        (item) => item._id === applicant._id
                      )}
                      onChange={() => handleCheckboxChange(applicant)}
                    />
                    <div className="flex w-[25%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                      <img
                        className="w-[40px]"
                        src="/images/employer/profile_icon.png"
                        alt=""
                      />
                      <p className="text-[14px] font-[600]">
                        {applicant?.firstName} {applicant?.lastName}
                      </p>
                    </div>
                    <div className="flex w-[10%] items-center justify-start gap-[8px]">
                      <p className="text-[14px] font-[600]">
                        {applicant?.dial_code}
                      </p>
                    </div>
                    <div className="flex w-[15%] items-center justify-start gap-[8px]">
                      <p className="text-[14px] font-[600]">
                        {applicant?.mobileNumber}
                      </p>
                    </div>
                    <div className="flex w-[25%] items-center justify-start gap-[8px]">
                      <p className="text-[14px] font-[600]">
                        {applicant?.email}
                      </p>
                    </div>
                    <div className="flex w-[15%] items-center justify-start gap-[8px]">
                      <p
                        className={`text-[14px] font-[600] ${
                          applicant?.paymentStatus ? "text-green" : "text-red"
                        }`}
                      >
                        {applicant?.paymentStatus ? "Paid" : "Unpaid"}
                      </p>
                    </div>
                    <div className="flex w-[10%] items-center justify-center gap-[8px]">
                      {loading === applicant._id ? (
                        <button className="text-[14px] font-[500] flex items-center justify-center w-[92.49px] rounded-[30px] bg_Button px-4 h-[40px]">
                          <MiniLoader />
                        </button>
                      ) : (
                        <button
                          disabled={
                            !applicant.isEvaluate || applicant.paymentStatus
                          }
                          className={`text-[14px] font-[500] rounded-[30px] bg_Button px-4 h-[40px] ${
                            (!applicant.isEvaluate ||
                              applicant.paymentStatus) &&
                            "opacity-50"
                          }`}
                          onClick={() => handleSendIndividualMail(applicant)} // Send mail to individual
                        >
                          Send Mail
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="p-10 w-full flex items-center justify-center">
              <img
                src="/images/employer/OBJECTS.png"
                alt="No data available"
                className="h-[200px] w-[300px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
}
    </div>
  );
}

export default SkilotechCollection;
