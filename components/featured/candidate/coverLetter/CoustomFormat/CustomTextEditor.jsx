import React, { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { Heading } from "@tiptap/extension-heading";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list-item";

const CustomToolbar = ({ editor }) => {
  if (!editor) return null;

  const buttonStyle = "text-sky-400 p-2";

  return (
    <div className="flex flex-wrap gap-2 bg-[#F2F4F7] w-full p-4">
      {/* Bold Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={
          editor.isActive("bold") ? "p-2 rounded-lg bg-[#effaff]" : buttonStyle
        }
      >
        <Bold className="w-5 h-5" />
      </button>
      {/* Italic Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={
          editor.isActive("italic")
            ? "p-2 rounded-lg bg-[#effaff]"
            : buttonStyle
        }
      >
        <Italic className="w-5 h-5" />
      </button>
      {/* Strikethrough Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        className={
          editor.isActive("strike")
            ? "p-2 rounded-lg bg-[#effaff]"
            : buttonStyle
        }
      >
        <Strikethrough className="w-5 h-5" />
      </button>
      {/* Heading Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={
          editor.isActive("heading", { level: 2 })
            ? "p-2 rounded-lg bg-[#effaff]"
            : buttonStyle
        }
      >
        <Heading2 className="w-5 h-5" />
      </button>
      {/* Bullet List Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={
          editor.isActive("bulletList")
            ? "p-2 rounded-lg bg-[#effaff]"
            : buttonStyle
        }
      >
        <List className="w-5 h-5" />
      </button>
      {/* Ordered List Button */}
      {/** <button
        onClick={(e) => {
          e.preventDefault();
          // Ensure unordered list is deactivated before applying ordered list
          if (editor.isActive("bulletList")) {
            editor.chain().focus().toggleBulletList().run();
          }
          // Apply the ordered list
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={
          editor.isActive("orderedList")
            ? "p-2 rounded-lg bg-[#effaff]"
            : buttonStyle
        }
      >
        <ListOrdered className="w-5 h-5" />
      </button> */}

      {/* Blockquote Button */}
      {/***
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={
          editor.isActive("blockquote")
            ? "p-2 rounded-lg bg-[#effaff]"
            : buttonStyle
        }
      >
        <Quote className="w-5 h-5" />
      </button> */}
      {/* Undo Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className={buttonStyle}
      >
        <Undo className="w-5 h-5" />
      </button>
      {/* Redo Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className={buttonStyle}
      >
        <Redo className="w-5 h-5" />
      </button>
    </div>
  );
};

// Main Editor Component
const CustomTextEditor = ({ data, setData, placeholder }) => {
  const prevDataRef = useRef(data);
  const contentRef = useRef(data?.passages || []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col pt-2 pr-4 pb-2 pl-4 gap-16 justify-start border-b border-r border-l border-[#F5F5F5] text-[#333333] items-start w-full font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[100px] cursor-auto",
      },
    },
    content: contentRef.current.map((p) => `<p>${p}</p>`).join("") || "<p></p>",
    onUpdate: ({ editor }) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(editor.getHTML(), "text/html");

      const passages = Array.from(doc.body.childNodes)
        .map((node) => {
          if (node.nodeName === "P" && node.textContent.trim() === "") {
            return null;
          }
          switch (node.nodeName) {
            case "P":
              return node.innerHTML;
            case "H1":
            case "H2":
            case "H3":
              return `<${node.nodeName.toLowerCase()}>${
                node.innerHTML
              }</${node.nodeName.toLowerCase()}>`;
            case "UL":
            case "OL":
              return node.outerHTML;
            default:
              return node.innerHTML;
          }
        })
        .filter((passage) => passage !== null && passage.trim() !== "");

      if (JSON.stringify(passages) !== JSON.stringify(contentRef.current)) {
        contentRef.current = passages;
        setData((prevData) => ({ ...prevData, passages }));
      }
    },
  });

  useEffect(() => {
    if (
      editor &&
      JSON.stringify(contentRef.current) !== JSON.stringify(data?.passages)
    ) {
      editor.commands.setContent(
        (data?.passages || []).map((p) => `<p>${p}</p>`).join("") || "<p></p>"
      );
      contentRef.current = data?.passages || [];
    }

    prevDataRef.current = data;
  }, [data, editor]);
  console.log("d2", data);

  return (
    <div className="flex flex-col border-none shadow-custom rounded-[10px]">
      <CustomToolbar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
};

export default CustomTextEditor;
