import { ChangeEvent, useState, useRef, useEffect } from "react";
import globalClasses from "../Styles.module.scss";
import { callbackOnBlurType } from "../types";

interface ITextArea {
  callbackOnBlur: callbackOnBlurType;
  value: string;
  id: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ callbackOnBlur, value, id, onChange }: ITextArea) {
 // const [val, setVal] = useState(value);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };
  useEffect(resizeTextArea, [value]);

  return (
    <textarea
      onBlur={() => {
        callbackOnBlur(textAreaRef, id);
      }}
      ref={textAreaRef}
      className={globalClasses.textArea}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextArea;
