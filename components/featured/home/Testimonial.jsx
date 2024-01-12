import { useEffect, useState } from "react";
// import "./App.css";

function Testimonial() {
  const [isMoving, setIsMoving] = useState(true);
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
      newPositions.unshift(newPositions.pop());
      return newPositions;
    });
  };
  useEffect(() => {
    const intervalId = setInterval(shiftClockwise, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsMoving((prev) => !prev);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="h-[36rem">
      <div
        className="testimonial_container customMargins"
        style={{ overflow: "hidden" }}
      >
        <p className="testimonial_container_head ">
          What our clients say about us..
        </p>
        <div className="HomepageCarousel">
          <div className="gallary">
            <div className="gallary-container">
              {positions.map((position, index) => (
                <img
                  key={index}
                  src={`/images/home/company_logs/scroller-img_${
                    index + 1
                  }.png`}
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
      <div className="testimonial_2_container customMargins">
        <div className="testimonial_2_wrapper">
          <div className="testimonial_2_paraghrph One_para">
            <div className="testimonial_2_para   ">
              “Skilotech has been an invaluable partner in our quest for skilled
              talent. Their platform simplifies the hiring process, connecting
              us with highly qualified professionals in our industry. The
              personalized support and insights provided by Skilotech have
              elevated our recruitment efforts, making them a go-to resource for
              our talent needs.”
            </div>
            <div className="testimonial_2_director_head">
              John Doe <br />
              <span className="testimonial_2_director">Director</span>
            </div>
          </div>
          <div className="testimonial_2_paraghrph Two_para">
            <div className="testimonial_2_para ">
              “Skilotech has been an invaluable partner in our quest for skilled
              talent. Their platform simplifies the hiring process, connecting
              us with highly qualified professionals in our industry.”
            </div>
            <div className="testimonial_2_director_head">
              John Doe <br />{" "}
              <span className="testimonial_2_director">Director</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
