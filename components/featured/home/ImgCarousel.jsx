import React, { useEffect, useState } from "react";


 const ImageSlider = () => {
  const [positions, setPositions] = useState([
    {
      left: "unset",
      scale: "0.7",
      zindex: "100",
      right: "585px",
      
      animation: "transition",
      class:"gallary-item-1",
    },
    {
      left: "unset",
      scale: "0.8",
      zindex: "500",
      right: "455px",
   
      animation: " transition fadeInscale2",
      class:"gallary-item-2",

    },
    {
      zindex: "800",
      scale: "1",
      left: "unset",
      animation: "fadeIn ",
      right: "285px",
     
      class:"gallary-item-3 ",

    },
    {
      right: "120px",
      scale: "0.8",
      zindex: "500",
      left: "unset",
     
      animation: "transition",
      class:"gallary-item-4",

    },
    {
      right: "0",
      scale: "0.7",
      zindex: "100",
      left: "unset",
     
      animation: "transition fadeInscale3",
      class:"gallary-item-5",

    },
  ]);

  const [shiftDirection, setShiftDirection] = useState("clockwise");

  const shiftClockwise = () => {
    setShiftDirection("clockwise");
  };

  const shiftAntiClockwise = () => {
    setShiftDirection("anticlockwise");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (shiftDirection === "clockwise") {
        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions.unshift(newPositions.pop());
          return newPositions;
        });
      } else {
        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions.push(newPositions.shift());
          return newPositions;
        });
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [shiftDirection]);



  return (
    <div className="main ">
    <div className="HomepageCarousel">
    <div className="gallary">
      <div className="gallary-container flex gap-4">
        {positions.map((position, index) => (
          <img
            key={index}
            src={`/images/templates/template${index + 1}.png`}
            alt={` ${index + 1}`}
            className={`gallary-item ${position.class} `}
            style={{ borderRadius:"16px",boxShadow:"0px 0px 16.499px 0px rgba(0, 0, 0, 0.25)"}}
          />
        ))}
      </div>
      
    </div>
  </div>
  </div>
  );
};
export default ImageSlider;