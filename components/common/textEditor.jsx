// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";


// const TextEditor = () => {
//   const [editorHtml, setEditorHtml] = useState("");

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
//       [ "image"],
//       ["clean"],
//     ],
//   };

//   const formats = [
    
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
   
//   ];

//   return (
//     <div>
//       <ReactQuill
//         theme="snow"
//         value={editorHtml}
//         onChange={setEditorHtml}
//         modules={modules}
//         formats={formats}
//         placeholder="Describe about your work"
       
//         style={{ height: "155px" }}
//       />
//     </div>
//   );
// };

// export default TextEditor;
