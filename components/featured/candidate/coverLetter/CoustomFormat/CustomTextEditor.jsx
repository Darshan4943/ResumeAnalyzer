import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState, useRef } from "react";
import CustomToolbar from "./CustomToolbar";

const CustomTextEditor = ({ data, setData, placeholder }) => {
  const [rerender, setRerender] = useState(false);
  const prevDataRef = useRef(data);
  console.log("data", data);
  // Initialize editor with content from data.passages
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "flex flex-col pt-2 pr-4 pb-2 pl-4 gap-16 justify-start border-b border-r border-l border-[#F5F5F5] text-[#333333] items-start w-full font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[100px] cursor-auto",
      },
    },
    content: data?.passages
      ? data?.passages.map((p) => `<p>${p}</p>`).join("")
      : "<p></p>",
    onUpdate: ({ editor }) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(editor.getHTML(), "text/html");
      const passages = Array.from(doc.querySelectorAll("p")).map(
        (p) => p.textContent
      );
      setData((prevData) => ({ ...prevData, passages }));
    },
  });

  // Update editor content when data changes
  useEffect(() => {
    const prevData = prevDataRef.current;
    const newContent = data?.passages
      ? data?.passages.map((p) => `<p>${p}</p>`).join("")
      : "<p></p>";
    const prevContent = prevData?.passages
      ? prevData?.passages?.map((p) => `<p>${p}</p>`).join("")
      : "<p></p>";

    if (editor && newContent !== prevContent) {
      const selection = editor.state.selection;

      editor.commands.setContent(newContent);

      editor.commands.setTextSelection(selection);
    }

    prevDataRef.current = data;
  }, [data, editor]);

  console.log("e", editor);
  return (
    <div className="flex flex-col border-none shadow-custom rounded-[10px]">
      <CustomToolbar editor={editor} rerender={rerender} />
      <EditorContent
        editor={editor}
        rerender={rerender}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomTextEditor;
