// import ExampleTheme from "./themes/ExampleTheme";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
// import { ListItemNode, ListNode } from "@lexical/list";
// import { CodeHighlightNode, CodeNode } from "@lexical/code";
// import { AutoLinkNode, LinkNode } from "@lexical/link";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
// import { TRANSFORMERS } from "@lexical/markdown";

// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
// import { useEffect, useState } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// function Placeholder() {
//   return (
//     <div className="editor-placeholder">Enter job description here...</div>
//   );
// }
// function MyOnChangePlugin({ onChange }) {
//   const [editor] = useLexicalComposerContext();
//   function serializeEditorState(editorState) {
//     let htmlContent = "";
//     if (Array.isArray(editorState)) {
//       editorState?.forEachBlock((block) => {
//         htmlContent += `<${block.type}>${block.text}</${block.type}>`;
//       });

//       return htmlContent;
//     }
//   }
//   useEffect(() => {
//     return editor.registerUpdateListener(({ editorState }) => {
//       onChange(editorState);
//     });
//   }, [editor, onChange]);

//   return null;
// }

// const editorConfig = {
//   // The editor theme
//   theme: ExampleTheme,
//   // Handling of errors during update
//   onError(error) {
//     throw error;
//   },
//   // Any custom nodes go here
//   nodes: [
//     HeadingNode,
//     ListNode,
//     ListItemNode,
//     QuoteNode,
//     CodeNode,
//     CodeHighlightNode,
//     TableNode,
//     TableCellNode,
//     TableRowNode,
//     AutoLinkNode,
//     LinkNode,
//   ],
// };

// export default function Editor() {
//   const [htmlContent, setEditorState] = useState();
//   function onChange(editorState) {
//     const editorStateJSON = editorState.toJSON();
//     setEditorState(JSON.stringify(editorStateJSON));
//   }

//   return (
//     <>
//       <LexicalComposer initialConfig={editorConfig}>
//         <div className="editor-container">
//           <ToolbarPlugin />
//           <div className="editor-inner">
//             <RichTextPlugin
//               contentEditable={<ContentEditable className="editor-input" />}
//               placeholder={<Placeholder />}
//               ErrorBoundary={LexicalErrorBoundary}
//             />
//             <HistoryPlugin />
//             {/* <TreeViewPlugin /> */}
//             <AutoFocusPlugin />
//             <CodeHighlightPlugin />
//             <ListPlugin />
//             <LinkPlugin />
//             <AutoLinkPlugin />
//             <ListMaxIndentLevelPlugin maxDepth={7} />
//             <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
//             <MyOnChangePlugin onChange={onChange} />
//           </div>
//         </div>
//       </LexicalComposer>
//       <div
//         className="html-content"
//         dangerouslySetInnerHTML={{ __html: htmlContent }}
//       />
//     </>
//   );
// }

"use client";

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
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-[#DEDEDE] text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none min-h-[200px] cursor-auto ",
      },
    },
    content: `<p>${placeholder}</p>`,
    onUpdate: ({ editor }) => {
      setData({ ...data, [value]: editor.getHTML() });
    },
  });

  return (
    <div>
      <Toolbar editor={editor} content={data[value]} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
