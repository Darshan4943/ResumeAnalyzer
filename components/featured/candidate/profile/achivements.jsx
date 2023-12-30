import React from 'react'

const Achiveements = ({userData}) => {
  return (
    userData?.awards?.length>0 &&  <div className="build_ai ai2" style={{ gap: "16px" }}>
    <p className="page_headings">Achievements</p>
    {achive.map((achive) => (
      <div className="essential_gap">
        <div className="gap">
          <p className="heading_first">{achive.a}</p>
          <img
            style={{ width: "24px" }}
            src="./images/profile/edit.png"
            alt=""
          />
        </div>
  
        <p className="sec_head">{achive.b}</p>
      </div>
    ))}
  </div>
  )
}

export default Achiveements