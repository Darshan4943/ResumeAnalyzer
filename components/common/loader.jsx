import React from 'react'

function Loader() {
    return (
<div className="relative h-[40vh] flex justify-center items-center">
      <img
        src="/images/resumeBuilder/earth.png"
        alt=""
        style={{ width: '200px', height: '200px' }}
        className="absolute"
      />
      <img
        src="/images/resumeBuilder/magnify.png"
        alt=""
        style={{ width: '150px', height: '150px' }}
        className="absolute  moveImage"
      />
    </div>
    )
}

export default Loader