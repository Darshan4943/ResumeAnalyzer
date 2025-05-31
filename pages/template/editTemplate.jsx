import React, { useEffect, useRef, useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Quill from "quill";

// const Embed = Quill.import("blots/embed");

// class TokenBlot extends Embed {
//   static create(value) {
//     const node = super.create();
//     node.setAttribute("data-token", value);
//     node.innerText = value;
//     return node;
//   }

//   static value(node) {
//     return node.getAttribute("data-token");
//   }
// }

// TokenBlot.blotName = "token";
// TokenBlot.tagName = "span";
// TokenBlot.className = "custom-token";
// TokenBlot.contentEditable = "false";

// Quill.register(TokenBlot);

function EditTemplate() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [isShortlist, setIsShortlist] = useState(null);
  const [isReject, setIsReject] = useState(null);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import Quill dynamically
      import("quill").then((Quill) => {
        const Embed = Quill.default.import("blots/embed");

        class TokenBlot extends Embed {
          static create(value) {
            const node = super.create();
            node.setAttribute("data-token", value);
            node.innerText = value;
            return node;
          }

          static value(node) {
            return node.getAttribute("data-token");
          }
        }

        TokenBlot.blotName = "token";
        TokenBlot.tagName = "span";
        TokenBlot.className = "custom-token";
        TokenBlot.contentEditable = "false";

        Quill.default.register(TokenBlot);
      });
    }
  }, []);

  const { userDataGlobal } = useSelector((state) => state.user.userData);

  const dynamicTags = ["[Candidate Name]", "[Company Name]", "[Position]"];

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      const editor = editorRef.current?.getElement(); // get underlying contentEditable element
      if (!editor) return;

      const selection = window.getSelection();
      if (!selection || !selection.focusNode) return;

      const caretPos = selection.focusOffset;
      const nodeText = selection.focusNode.textContent;

      if (!nodeText) return;

      // Check if caret is just after one of the placeholders
      for (const word of dynamicTags) {
        const startIndex = caretPos - word.length;
        if (startIndex >= 0) {
          const possibleWord = nodeText.slice(startIndex, caretPos);
          if (possibleWord === word) {
            e.preventDefault();

            // Remove the whole word from the node's textContent
            const newText =
              nodeText.slice(0, startIndex) + nodeText.slice(caretPos);

            // Update the text node content
            selection.focusNode.textContent = newText;

            // Move caret to startIndex
            const range = document.createRange();
            range.setStart(selection.focusNode, startIndex);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);

            // Update editor content state with new HTML
            setContent(editor.innerHTML);

            break;
          }
        }
      }
    }
  };

  const [shortlistSubject, setShortlistSubject] = useState(
    "Congratulations! You Have Been Shortlisted for the Next Round"
  );
  const [shortlistContent, setShortlistContent] = useState(`
     <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; ">
       <p style="display: block; ">Dear Candidate,</p>
        <p></p>
       <div style="display: block; ">
         <p style="display: block; ">
           We are pleased to inform you that after a thorough review of your profile, you have been shortlisted for the next round of the selection process for the 
           <strong>[Position]</strong> at 
           <strong>[Company Name]</strong>.
         </p>
         <p></p>
         <p style="display: block; ">
           Your skills and experience align well with the requirements of the role, and we are excited to proceed further with your application.
           Please confirm your availability by responding to this email at your earliest convenience.
           Should you have any questions, feel free to reach out. We look forward to connecting with you soon.
         </p>
       </div>
        <p></p>
       <p style="display: block;">Best Regards,</p>
       <p style="display: block; ">Team Skilotech</p>
       <p style="display: block; ">
         <a href="https://skilotech.com" style="color: #007bff; text-decoration: none;">Skilotech.com</a>
       </p>
     </div>
   `);

  const [rejectedSubject, setRejectedSubject] = useState(`
    Update on Your Application - "Job Position"
  `);
  const [rejectedContent, setRejectedContent] = useState(`
     <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.8;">
       <p style="display: block; ">Dear Candidate,</p>
        <p></p>
       <p style="display: block; ">
         Thank you for taking the time to apply for the 
         <strong>position</strong> at 
         <strong>[Company Name]</strong>. 
         We appreciate your interest and the effort you put into the process.
       </p>
        <p></p>
       <p style="display: block; ">
         After careful consideration, we regret to inform you that we have decided to move forward with other candidates at this time. 
         This decision was not an easy one, as we received a large number of strong applications, including yours.
         We sincerely appreciate your time and effort, and we encourage you to stay connected with us for future opportunities that may be a great fit for your skills and experience.
         We wish you success in your career endeavors and hope to cross paths again in the future.
       </p>
        <p></p>
       <p style="display: block; ">Best Regards,</p>
       <p style="display: block; ">Team Skilotech</p>
       <p style="display: block; ">
         <a href="https://skilotech.com" style="color: #007bff; text-decoration: none;">Skilotech.com</a>
       </p>
     </div>
   `);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        `https://jamblix.com/api/getTemplates/${userDataGlobal._id}`
      );
      const result = await response.json();

      if (response.ok) {
        if (result.templates.length === 0) {
          setSubject(rejectedSubject);
          setContent(rejectedContent);
        } else {
          result.templates.forEach((template) => {
            if (template.templateType === "shortlist") {
              setShortlistSubject(
                template?.tempData?.subject || shortlistSubject
              );
              setShortlistContent(
                template?.tempData?.content || shortlistContent
              );
            } else if (template.templateType === "reject") {
              setRejectedSubject(
                template?.tempData?.subject || rejectedSubject
              );
              setRejectedContent(
                template?.tempData?.content || rejectedContent
              );
            }
          });
        }
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    if (userDataGlobal._id) {
      fetchTemplates();
    }
  }, [userDataGlobal._id]);

  useEffect(() => {
    if (router.isReady) {
      const isShortlistParam = router.query.isShortlist === "true";
      const isRejectParam = router.query.isReject === "true";

      setIsShortlist(isShortlistParam);
      setIsReject(isRejectParam);

      if (isShortlistParam) {
        setSubject(shortlistSubject);
        setContent(shortlistContent);
      } else if (isRejectParam) {
        setSubject(rejectedSubject);
        setContent(rejectedContent);
      }
    }
  }, [
    router.isReady,
    router.query,
    shortlistSubject,
    shortlistContent,
    rejectedSubject,
    rejectedContent,
  ]);

  const handleContentChange = (newContent) => setContent(newContent);
  const handleSubjectChange = (event) => setSubject(event.target.value);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://jamblix.com/api/createTemplate/${userDataGlobal._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject,
            content,
            templateType: subject === shortlistSubject ? "shortlist" : "reject",
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        router.push("/template");
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const renderHeader = () => (
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-align" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
    </span>
  );

  const header = renderHeader();
  
 const handleDrop = (e) => {
  e.preventDefault();
  const token = e.dataTransfer.getData("text/plain");
  if (!dynamicTags.includes(token)) return;

  const quill = editorRef.current?.getQuill();
  if (!quill) return;

  const range = quill.getSelection(true);
  quill.insertEmbed(range.index, "token", token);

  
  if (token !== "[Candidate Name]") {
    quill.formatText(range.index, token.length, "bold", true);
  }

  quill.setSelection(range.index + token.length);
};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (isShortlist === null || isReject === null) return <div>Loading...</div>;

  return (
    <>
      <div className="text-[18px] font-[600]">Edit Template</div>
      <div className="pt-[16px] flex gap-[24px] w-full">
        <div className="w-1/2 flex flex-col gap-[16px]">
          <div className="bg-[#FFFFFF] rounded-[16px] p-[26px] flex flex-col gap-[28px]">
            <div className="flex flex-col gap-[6px]">
              <div className="text-[16px] font-[600]">Subject</div>
              <input
                type="text"
                value={subject}
                onChange={handleSubjectChange}
                className="border border-[#DEDEDE] rounded-[8px] text-[14px] font-[400] p-[12px] w-full"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="text-[16px] font-[600]">Content</div>
              <Editor
                ref={editorRef}
                headerTemplate={header}
                value={content}
                onTextChange={(e) => handleContentChange(e.htmlValue)}
                className="editor-container h-[416px]"
                style={{
                  fontSize: "16px",
                  color: "#333",
                  padding: "10px",
                  minHeight: "340px",
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Drag Tags Section */}
          <div className="bg-white p-4 rounded-lg  flex gap-4 flex-wrap text-[12px] text-red font-medium">
            * To insert a keyword, first click inside the editor where you want
            it to appear, then drag and drop an option below.
            {dynamicTags.map((tag, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", tag)}
                className="cursor-move bg-blue-100   mx-2  text-sm font-bold text-[#333333] border-b border-blue"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              className="px-[36px] bg_Button h-[38px] bg-blue-600 text-white rounded-[30px] font-[600] transition"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="w-1/2">
          <div className="bg-gray pt-2 pb-2 pr-8 pl-8 rounded-lg h-[602px] flex items-center overflow-auto">
            <div className="bg-white p-6 rounded-lg min-h-[502px] w-full">
              <p className="text-sm font-medium text-gray-800">
                <span className="text-base font-semibold">Subject:</span>{" "}
                {subject}
              </p>
              <hr className="my-4 border-gray-300" />
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTemplate;
