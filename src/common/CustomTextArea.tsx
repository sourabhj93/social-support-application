import React, { useRef, useEffect } from "react";

interface CustomTextAreaProps {
  value: string;
  onChange: (value: any) => void;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`; 
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="w-full border p-2 rounded mb-4 resize-none overflow-hidden"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type here..."
    />
  );
};

export default CustomTextArea;
