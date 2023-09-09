import React, { useRef, MouseEvent, RefObject, useState } from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";
import VariableElement from "./VariableElement";
import ITE from "./ITE";
import { fnUid } from "../utils/fnUid";
import { IState } from "../types";

interface IProps {
  arrVarNames: string[];
}

interface ILastUsingTextArea {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  id: string;
}

export default function MessageTemplateEditor({ arrVarNames }: IProps) {
  arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : arrVarNames;
  //const template = localStorage.template ? JSON.parse(localStorage.template) : null;

  const lastUsingTextArea: ILastUsingTextArea = {
    textAreaRef: useRef<HTMLTextAreaElement>(null),
    id: "",
  };

  // const callbackSave = (template: string[]) => {
  //   localStorage.template = template;
  // };
  const callbackOnBlur = (textAreaRef: RefObject<HTMLTextAreaElement>, id: string) => {
    lastUsingTextArea.textAreaRef = textAreaRef;
    lastUsingTextArea.id = id;
  };

  const callbackOnDelete = (id: string) => {
    const updatedTemplate = [...template];
    for (let index = 0; index < updatedTemplate.length; index++) {
      const element = updatedTemplate[index];
      if (element.id === id) {
        element.ITE = undefined;
        element.value += updatedTemplate[index + 1].value;
        updatedTemplate.splice(index + 1, 1);
      }
    }
    setTemplate(updatedTemplate);
  };

  const [template, setTemplate] = useState<IState[]>([{ id: fnUid(), type: "TextArea", value: "" }]);

  const onITEbuttonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (lastUsingTextArea.textAreaRef.current) {
      const selectionStart = lastUsingTextArea.textAreaRef.current.selectionStart;
      const firstValue = lastUsingTextArea.textAreaRef.current.value.slice(0, selectionStart);
      const secondValue = lastUsingTextArea.textAreaRef.current.value.slice(selectionStart);

      let indexElement = 0;
      const updatedTemplate = [...template];
      const searchFunc = (array: IState[]) => {
        array.some((element, index) => {
          if (element.id === lastUsingTextArea.id) {
            indexElement = index;
            element.value = firstValue;
            element.ITE = [
              [{ id: fnUid(), type: "TextArea", value: "" }],
              [{ id: fnUid(), type: "TextArea", value: "" }],
              [{ id: fnUid(), type: "TextArea", value: "" }],
            ];
            array.splice(indexElement + 1, 0, { id: fnUid(), type: "TextArea", value: secondValue });
            return true;
          }
          if (element.ITE) {
            searchFunc(element.ITE[0]);
            searchFunc(element.ITE[1]);
            searchFunc(element.ITE[2]);
          }
          return false;
        });
      };

      searchFunc(updatedTemplate);
      setTemplate(updatedTemplate);
    }
  };

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>, id: string) {
    const updatedTemplate = [...template];
    const searchFunc = (array: IState[]) => {
      array.forEach((element) => {
        if (element.id === id) {
          element.value = event.target.value;
        }
        if (element.ITE) {
          searchFunc(element.ITE[0]);
          searchFunc(element.ITE[1]);
          searchFunc(element.ITE[2]);
        }
      });
    };

    searchFunc(updatedTemplate);
    setTemplate(updatedTemplate);
  }

  return (
    <div style={{ margin: "1rem" }} className={globalClasses.vBox}>
      <span style={{ margin: "1rem" }}>Message Template Editor</span>

      <div className={globalClasses.hBox}>
        {arrVarNames.map((element) => {
          return VariableElement(element);
        })}
      </div>

      <div>
        <button className={globalClasses.button} onClick={onITEbuttonClick}>
          IF | THEN | ELSE
        </button>
      </div>

      {template.map((element) => {
        if (element.type === "TextArea") {
          return (
            <React.Fragment key={element.id}>
              <div className={globalClasses.hBox}>
                <TextArea
                  callbackOnBlur={callbackOnBlur}
                  value={element.value}
                  id={element.id}
                  onChange={(e) => handleTextAreaChange(e, element.id)}
                ></TextArea>
              </div>
              {element.ITE && (
                <ITE
                  values={element.ITE}
                  callbackOnBlur={callbackOnBlur}
                  handleTextAreaChange={handleTextAreaChange}
                  callbackOnDelete={() => callbackOnDelete(element.id)}
                />
              )}
            </React.Fragment>
          );
        }
        return null;
      })}
    </div>
  );
}
