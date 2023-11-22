import { useEffect, useState } from "react";
// import "./App.css";

function Testimonial() {
  const [positions, setPositions] = useState([
    {
      left: "unset",
      scale: "0.7",
      zindex: "100",
      right: "585px",
      animation: "transition",
      class: "gallary-item-1",
    },
    {
      left: "unset",
      scale: "0.8",
      zindex: "500",
      right: "455px",
      animation: " transition fadeInscale2",
      class: "gallary-item-2",
    },
    {
      zindex: "800",
      scale: "1",
      left: "unset",
      animation: "fadeIn ",
      right: "285px",
      class: "gallary-item-3 ",
    },
    {
      right: "120px",
      scale: "0.8",
      zindex: "500",
      left: "unset",
      animation: "transition",
      class: "gallary-item-4",
    },
    {
      right: "0",
      scale: "0.7",
      zindex: "100",
      left: "unset",
      animation: "transition fadeInscale3",
      class: "gallary-item-5",
    },
  ]);
  const shiftClockwise = () => {
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      // The last position will become the first one
      newPositions.unshift(newPositions.pop());
      return newPositions;
    });
  };
  const shiftAntiClockwise = () => {
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      // The last position will become the first one
      newPositions.push(newPositions.shift());
      return newPositions;
    });
  };
  useEffect(() => {
    const intervalId = setInterval(shiftClockwise, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // blurr box
  const [isMoving, setIsMoving] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsMoving((prev) => !prev);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  console.log(isMoving);
  return (
    <>
      <div className="testimonial_container customMargins" style={{ overflow: "hidden" }}>
        <p className="testimonial_container_head">
          What our clients say about us..
        </p>
        <div className="HomepageCarousel">
          <div className="gallary">
            <div className="gallary-container">
              {positions.map((position, index) => (
                <img
                  key={index}
                  src={`images//home/scroller-img_${index + 1}.png`}
                  alt={`Image ${index + 1}`}
                  className={`gallary-item ${position.class}`}
                />
              ))}
            </div>
          </div>
          <div
            className={`moving-div ${isMoving ? "move-right" : "move-left"}`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
