import React from "react";
import DOMPurify from "dompurify";

const CustomParastyle = ({ style, key, passage }) => {
  const sanitizedHTML = DOMPurify.sanitize(passage);

  return (
    <>
      <p
        key={key}
        style={style}
        // className="text-[12px] font-[400] text-[#6D6E71] text-justify font-Lato"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </>
  );
};

export default CustomParastyle;
