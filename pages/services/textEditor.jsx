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
//       ["link", "image", "video"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
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
//     "link",
//     "image",
//     "video",
//   ];

//   return (
//     <div>
//       <ReactQuill
//         theme="snow"
//         value={editorHtml}
//         onChange={setEditorHtml}
//         modules={modules}
//         formats={formats}
//         placeholder="Write something amazing..."
       
//         style={{ height: "100px" }}
//       />
//     </div>
//   );
// };

// export default TextEditor;
