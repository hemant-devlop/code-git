'use client'
import React, { useState, useRef, useEffect } from "react";

export default function IndentedTagTextArea() {
  const [currentTag, setCurrentTag] = useState("");
  const [text, setText] = useState("");
  const [textIndent, setTextIndent] = useState("0px");
  
  const tagRef = useRef(null);
  const textareaRef = useRef(null);
  const tags = ["exam", "paper", "student", "teacher"];

  // Calculate and update the text-indent whenever the active tag changes
  useEffect(() => {
    if (currentTag && tagRef.current) {
      // Get the width of the tag element in pixels
      const tagWidth = tagRef.current.offsetWidth;
      // Indent equals the tag width + a tiny gap (e.g., 4px)
      setTextIndent(`${tagWidth + 4}px`);
    } else {
      setTextIndent("0px");
    }
  }, [currentTag]);

  // Handle Backspace detection
  const handleKeyDown = (e) => {
    // If textarea is completely empty and user hits Backspace
    if (e.key === "Backspace" && text === "") {
      setCurrentTag(""); // Remove the tag
    }
  };

  const handleTagClick = (tag) => {
    setCurrentTag(tag);
    // Focus the textarea right after clicking a tag for better UX
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md space-y-4">
      {/* Tag Selection Buttons */}
     

      {/* Textarea Container */}
      <div className="relative w-full">
        {/* Absolute Layered Tag */}
        {currentTag && (
          <span
            ref={tagRef}
            className="absolute left-3 top-3 text-purple-700 font-semibold pointer-events-none select-none z-10 block whitespace-nowrap"
            style={{ direction: "ltr" }}
          >
            "{currentTag}" - 
          </span>
        )}

        {/* Indented Native Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans text-gray-800 text-base resize-y block z-0"
          style={{ 
            textIndent: textIndent,
            direction: "ltr",
            textAlign: "left"
          }}
          placeholder={currentTag ? "" : "Select a tag or start typing..."}
        />
      </div>
       <div className="flex gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              currentTag === tag
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}