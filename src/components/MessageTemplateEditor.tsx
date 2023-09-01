import React from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";

interface IProps {
  arrVarNames: string[];
}
function MessageTemplateEditor({ arrVarNames }: IProps) {
  const callbackSave = (template: string[]) => {
    localStorage.template = template;
  };
  function VariableElement(text: string) {
    return <button className={globalClasses.buttonVariables} key={text} style={{ margin: "0.5rem" }}>{`{${text}}`}</button>;
  }
  arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : arrVarNames;
  const template = localStorage.template ? JSON.parse(localStorage.template) : null;
  return (
    <div style={{ margin: "1rem" }} className={globalClasses.vBox}>
      <span style={{ marginBottom: "1rem" }}>Message Template Editor</span>
      <div className={globalClasses.hBox}>
        {arrVarNames.map((element) => {
          return VariableElement(element);
        })}
      </div>
      <div>
        <button className={globalClasses.button}>IF | THEN | ELSE</button>
      </div>
      <TextArea></TextArea>
    </div>
  );
}

export default MessageTemplateEditor;
