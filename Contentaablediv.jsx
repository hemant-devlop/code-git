"use client";

import { useState, useRef } from "react";

export default function InteractiveEditor() {
  const editorRef = useRef(null);
  const [msgData, setMsgData] = useState("");
  console.log(msgData)
  
  const tags = [
    { label: "Create Chart", value: " /Create-Chart\u00A0 " },
    { label: "Create Exam", value: " /Create-Exam\u00A0 " },
    { label: "Create Image", value: " /Create-Image\u00A0 " },
  ];

  // Function to insert the tag at the current cursor position
  const insertTag = (tagText) => {
    const editor = editorRef.current;
    if (!editor) return;

    // Focus the editor so the insertion happens inside it
    editor.focus();
    // Create a styled span for the tag
    const span = document.createElement("span");
    span.className = "text-red-600 font-semibold";
    span.textContent = tagText;
    span.contentEditable = "false";

    // Get the user's current cursor position (Selection API)
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Check if the cursor is actually inside our editor box
    if (editor.contains(range.commonAncestorContainer)) {
      range.deleteContents(); // Delete any highlighted text
      range.insertNode(span); // Insert our red, semi-bold tag

      // Move the cursor right after the inserted tag
      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);

    } else {
      // If the editor wasn't focused, just append it to the end
      editor.appendChild(span);
    } 
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div
      id="editDiv"
        ref={editorRef}
         contentEditable
        suppressContentEditableWarning
        className="w-full min-h-40 max-h-60 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black text-base overflow-y-auto"
        placeholder="Type your text here..."
      onInput={(e) => setMsgData(e.target.textContent)}
      />
        <div className="flex gap-2">
        {tags.map((tag) => (
          <button
            key={tag.label}
            onClick={() => insertTag(tag.value)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm font-medium transition-colors"
          >
            + {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}