import React, { useState, useEffect } from "react";
// import RichTextEditor from "react-rte";

import CustomTextEditor from "./CustomTextEditor";

const CustomLetterBody = ({ data, setData, isCoverEdit }) => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-[16px] w-full bg-white py-4">
      <div>
        <span className="font-montserrat text-[18px] font-[600] leading-[21.94px] text-left text-[#333333]">
          Letter Body
        </span>
      </div>

      <CustomTextEditor
        data={data}
        // value={"Para"}
        isCoverEdit={isCoverEdit}
        setData={setData}
        placeholder={
          "Explain why you are the ideal candidate for a particular job"
        }
        text={text}
        setText={setText}
        // style={{ whiteSpace: "pre-line" }}
        // editor={editor}
        // rerender={rerender}
        //  placeholder={placeholder}
      />
    </div>
  );
};

export default CustomLetterBody;
