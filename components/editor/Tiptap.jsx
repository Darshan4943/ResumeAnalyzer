import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import Toolbar from "./ToolBar";
import axios from "axios";
import { SparklingStarts } from "../../utils/svg";
import MiniLoader from "../common/mini-loader";

const Tiptap = ({ data, setData, value, placeholder }) => {
  const [text, setText] = useState("");
  const [rerender, setRerender] = useState(false); 
  useEffect(() => {
    if (data.description.length > 0) {
      setText(data.description);
    }
  }, [data]);
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-[#DEDEDE] text-[#333333] items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[200px] cursor-auto ",
      },
    },
    content: `<p>${text}</p>`,
    onUpdate: ({ editor }) => {
      setData({ ...data, description: editor.getHTML() });
    },
  });

  return (
    data && (
      <div>
        <Toolbar editor={editor} content={text}  rerender={rerender} />
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor}  rerender={rerender} />
      </div>
    )
  );
};

export default Tiptap;
