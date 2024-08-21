const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const buttonStyle = "text-sky-400 p-2";

  return (
    <div className="flex flex-wrap gap-2 bg-[#F2F4F7] w-full p-4">
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
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={
          editor.isActive("orderedList")
            ? "p-2 rounded-lg bg-[#effaff]"
            : buttonStyle
        }
      >
        <ListOrdered className="w-5 h-5" />
      </button>
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
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className={buttonStyle}
      >
        <Undo className="w-5 h-5" />
      </button>
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

export default Toolbar;
