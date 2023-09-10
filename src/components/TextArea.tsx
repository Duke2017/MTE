import { ChangeEvent, useRef, useEffect } from "react";
import globalClasses from "../Styles.module.scss";
import { callbackOnBlurType, IUsingTextArea } from "../types";

interface ITextArea {
  callbackOnBlur: callbackOnBlurType;
  value: string;
  id: string;
  firstUsingTextArea?: IUsingTextArea;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ callbackOnBlur, value, id, onChange, firstUsingTextArea }: ITextArea) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  if (firstUsingTextArea) {
    firstUsingTextArea.textAreaRef = textAreaRef;
    firstUsingTextArea.id = id;
  }

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
