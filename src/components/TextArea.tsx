import { ChangeEvent, useState, useRef, useEffect } from "react";
import globalClasses from "../Styles.module.scss";
import { callbackOnBlurType } from "../types";

interface ITextArea {
  callbackOnBlur: callbackOnBlurType;
  value: string;
  id: string;
}

function TextArea({ callbackOnBlur, value, id }: ITextArea) {
  const [val, setVal] = useState(value);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };
  useEffect(resizeTextArea, [val]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setVal(event.target.value);
  }

  return (
    <textarea
      onBlur={() => {
        callbackOnBlur(textAreaRef, setVal, id);
      }}
      ref={textAreaRef}
      className={globalClasses.textArea}
      value={val}
      onChange={handleChange}
    />
  );
}

export default TextArea;
