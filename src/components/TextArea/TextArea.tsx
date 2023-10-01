import { ChangeEvent, useRef, useEffect } from "react";
import { CallbackOnBlurType, IUsingTextArea } from "../../types";
import styles from "./TextArea.module.scss";

interface ITextArea {
  onBlur: CallbackOnBlurType;
  value: string;
  id: string;
  firstUsingTextArea?: IUsingTextArea;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ onBlur, value, id, onChange, firstUsingTextArea }: ITextArea) {
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
        onBlur(textAreaRef, id);
      }}
      ref={textAreaRef}
      className={styles.textArea}
      value={value}
      onChange={onChange}
    />
  );
}
