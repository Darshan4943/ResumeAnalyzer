import React from "react";

const Progress_bar = ({ progress }) => {
  const Parentdiv = {
    width: "100%",
    // backgroundColor: "#8080804d",
    // margin: 50
    height: "10px",
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    flexDirection: "column",
    gap: 2,
  };

  const Childdiv1 = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#0C8A0A",
    borderRadius: 40,
    height: "10px",
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };

  return (
    <div style={Parentdiv}>
      <div
        className="flex flex-row gap-2 items-center justify-between "
        style={{ width: "100%" }}
      >
        <div
          style={{
            width: "88%",
            background: "#8080804d",
            borderRadius: 12,
            fontSize: "8px",
          }}
        >
          <div style={Childdiv1}></div>
        </div>
        <span className="text-[14px] font-semibold">{progress}%</span>
      </div>
    </div>
  );
};

export default Progress_bar;
