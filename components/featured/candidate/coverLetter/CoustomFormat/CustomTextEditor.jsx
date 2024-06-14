import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import axios from "axios";
import { SparklingStarts } from "../../../../../utils/svg";
import MiniLoader from "../../../../common/mini-loader";
import CustomToolbar from "./CustomToolbar";

const CustomTextEditor = ({
  data,
  setData,
  value,
  placeholder,
  description,
  setText,
  text,
}) => {
  const [rerender, setRerender] = useState(false);
 
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "flex flex-col  pt-2 pr-4 pb-2 pl-4 gap-16 justify-start border-b border-r border-l border-[#F5F5F5] text-[#333333] items-start w-full font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[100px] cursor-auto min-h-[300px]",
      },
    },
    content: `<p>${text}</p>`,
    onUpdate: ({ editor }) => {
      setData({ ...data, description: editor.getHTML() });
    },
  });


  return (
    <div className="flex flex-col border-none shadow-custom rounded-[10px] ">
      <CustomToolbar editor={editor} content={text} rerender={rerender} />
      <EditorContent
        // style={{ whiteSpace: "pre-line" }}
        editor={editor}
        rerender={rerender}
        placeholder={placeholder}
      
      />
    </div>
  );
};

export default CustomTextEditor;
