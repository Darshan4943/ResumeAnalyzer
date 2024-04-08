import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Toolbar from "./ToolBar";

const Tiptap = ({ data, setData, value, placeholder }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-[#DEDEDE] text-[#333333] items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[200px] cursor-auto ",
      },
    },
    content: `<p>${data[value] ? data[value] : placeholder}</p>`,
    onUpdate: ({ editor }) => {
      setData({ ...data, [value]: editor.getHTML() });
    },
  });
  console.log(data[value]);
  return (
    data && (
      <div>
        <Toolbar editor={editor} content={data[value] ? data[value] : ""} />
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    )
  );
};

export default Tiptap;
