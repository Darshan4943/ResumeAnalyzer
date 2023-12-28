// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const TextEditor = ({ onDataUpdate }) => {
//   const [aboutData, setAboutData] = useState("");

//   const modules = {
//     toolbar: [
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["image"],
//       ["clean"],
//     ],
//   };

//   const handleEditorChange = (content) => {
//     setAboutData(content);
//     onDataUpdate(content);
//   };

//   return (
//     <div>
//       <ReactQuill
//         theme="snow"
//         value={aboutData}
//         onChange={handleEditorChange}
//         modules={modules}
//         placeholder="Describe about your work"
//         style={{ height: "90px", marginBottom: "40px" }}
//       />
//     </div>
//   );
// };

// export default TextEditor;
