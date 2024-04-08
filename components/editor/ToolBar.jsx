"use client";

import React from "react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

const Toolbar = ({ editor, content }) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="sm:px-4 px-2 sm:py-3 py-2 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-[#DEDEDE]"
    >
      <div className="flex justify-start items-center gap-3 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2"
          }
        >
          <Bold className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "  p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2"
          }
        >
          <Italic className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2"
          }
        >
          <Strikethrough className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2"
          }
        >
          <Heading2 className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2"
          }
        >
          <List className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2"
          }
        >
          <ListOrdered className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2"
          }
        >
          <Quote className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400 p-2 hover:bg-[#effaff] hover:rounded-lg"
          }
        >
          <Undo className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "p-2 rounded-lg bg-[#effaff]"
              : "text-sky-400  hover:bg-[#effaff]  p-1 hover:rounded-lg"
          }
        >
          <Redo className="sm:w-5 sm:h-5 w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
