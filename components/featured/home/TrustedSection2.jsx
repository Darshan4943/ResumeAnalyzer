import { React, useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function TrustedBySection2() {
  const root = useRef();

  //   useLayoutEffect(() => {
  //     // let ctx = gsap.context(() => {

  //     //   gsap.set("#popular_job", { x: "-300" });
  //     //   gsap.to("#popular_job", { x: "400", duration: "3" });
  //     //   gsap.to("#popular_info", { x: "-400", duration: "3" });
  //     //   gsap.to(".card", {
  //     //     y: "-200",
  //     //     duration: "5",
  //     //     stagger: { from: "random", each: "0.2" },
  //     //   });

  //     // }, root); // <- scopes all selector text to the root element

  //     // return () => ctx.revert();
  //     let tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  //     tl.from("#popular_job", { x: "-300", duration: 1 })
  //       .to("#popular_job", { x: "0", duration: 3 })
  //       .from("#popular_info", { x: "-300", duration: 1 }, "-=2")
  //       .to("#popular_info", { x: "0", duration: 3 }, "-=2")
  //       .to(
  //         ".card",
  //         { y: "-200", duration: 5, stagger: { from: "random", each: "0.2" } },
  //         "-=2"
  //       );

  //     return () => tl.kill();
  //   });

  useEffect(() => {
    const boxes = gsap.utils.toArray(".card");
    gsap.set(boxes, { y: 0 });

    gsap.to(boxes, {
      y: -600,
      stagger: {
        each: 0.4,
        from: "random",
      },
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        y: 800,
        trigger: root.current,
        start: "top center+=100",
        end: "bottom center-=100",
        scrub: true,
      },
    });
  });

  useEffect(() => {
    gsap.set("#popular_job", { x: "-300" });
    gsap.set("#popular_info", { x: "300" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: root.current, // Replace with the actual trigger element ID or reference
          start: "top center", // Adjust the start position
          end: "bottom center", // Adjust the end position
          scrub: true, // Smoothly animates the timeline on scroll
        },
      })
      .to("#popular_job", { x: "400", duration: 3 })
      .to("#popular_info", { x: "-400", duration: 3 });
  });

  const data = [
    {
      img: "./images/home/finance.png",
      name: "Finance",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Marketing.png",
      name: "Marketing",
      job: "1598 jobs",
    },
    {
      img: "./images/home/hr.png",
      name: "Human Resources",
      job: "1598 jobs",
    },
    {
      img: "./images/home/industry.png",
      name: "Industry",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Design & cr.png",
      name: "Design & Creative",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Component 14.png",
      name: "Content Writing",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Development.png",
      name: "Development & IT",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Video editing.png",
      name: "Video Editing",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Project management.png",
      name: "Project Management",
      job: "1598 jobs",
    },
    {
      img: "./images/home/accounts.png",
      name: "Accounts",
      job: "1598 jobs",
    },
    {
      img: "./images/home/organization.png",
      name: "Organization",
      job: "1598 jobs",
    },
    {
      img: "./images/home/networking.png",
      name: "Networking",
      job: "1598 jobs",
    },
  ];
  return (
    <div ref={root} className="trust_section_parent">
      <div className="customMargins">
        <div className="popular_job">
          <p id="popular_job">Popular Job Categories</p>
          <p id="popular_info">
            Discover exciting career opportunities in popular fields, from
            technology to healthcare, finance to marketing, and more.
          </p>
        </div>

        <div className="job_cat_card">
          {data.map((item, index) => (
            <div className="card" key={index}>
              <motion.img
                className="card_img"
                src={item.img}
                alt=""
                whileHover={{ scale: 1.1, rotateY: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <div>
                <p id="card_budget">{item.name}</p>
                <p id="card_job">{item.job}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustedBySection2;
