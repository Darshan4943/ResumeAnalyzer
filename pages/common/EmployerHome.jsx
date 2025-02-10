// import StackedBarChart from "@/components/common/StackedBarChart";
// import StackedBarChart from "@/components/common/Bars";
// import ChartComponent, { Bars } from "@/components/common/Bars";
// import StackedBarChart from "@/components/common/StackedBarChart";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import StackedBarChart from "../../components/common/StackedBarChart";

function EmployerHome({ toggleContentt }) {


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const applicant_head = [
    {
      name: "Full Name",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "score",
      check: "",
    },
    {
      name: "Hiring stage",
      check: "",
    },
    {
      name: "Applied Date",
      check: "",
    },
    {
      name: "Action",
      check: "",
    },
  ];

  const applicants = [
    {
      img: (
        <img
          className="w-[40px]"
          src="./images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] h-[24px]"
          src="/images/employer/st.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",

      status: "In Review",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="./images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="./images/employer/empty_star.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",

      status: "In Review",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Shortlisted",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "5.0",

      status: "Hired",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "2.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "3.0",

      status: "Interview",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
  ];
  return (
    <div className=" ml:h-[80vh] w-[100%]  overflow-y-auto">
      {/*  */}
    </div>
  );
}

export default EmployerHome;
