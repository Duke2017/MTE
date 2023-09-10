import React, { useRef, MouseEvent, RefObject, useState } from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";
import VariableElement from "./VariableElement";
import ITE from "./ITE";
import { fnUid } from "../utils/fnUid";
import { IState, IUsingTextArea } from "../types";

interface IProps {
  arrVarNames: string[];
}

export default function MessageTemplateEditor({ arrVarNames }: IProps) {
  arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : arrVarNames;
  //const template = localStorage.template ? JSON.parse(localStorage.template) : null;

  const lastUsingTextArea: IUsingTextArea = {
    textAreaRef: useRef<HTMLTextAreaElement>(null),
    id: "",
  };
  const firstUsingTextArea: IUsingTextArea = {
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
    const searchFunc = (array: IState[]) => {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.id === id) {
          element.value += array[index + 1].value;
          element.ITE = array[index + 1].ITE;
          array.splice(index + 1, 1);
        }
        if (element.ITE) {
          searchFunc(element.ITE[0]);
          searchFunc(element.ITE[1]);
          searchFunc(element.ITE[2]);
        }
      }
    }
    searchFunc(updatedTemplate);
    setTemplate(updatedTemplate);
  };

  const [template, setTemplate] = useState<IState[]>([{ id: fnUid(), value: "" }]);

  const onITEButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedTemplate = [...template];

    let current = lastUsingTextArea.textAreaRef.current;
    let id = lastUsingTextArea.id;
    if (updatedTemplate.length === 1 && !current) {
      current = firstUsingTextArea.textAreaRef.current;
      id = firstUsingTextArea.id;
    }

    if (current) {
      const selectionStart = current.selectionStart;
      const firstValue = current.value.slice(0, selectionStart);
      const secondValue = current.value.slice(selectionStart);
      let indexElement = 0;
      const searchFunc = (array: IState[]) => {
        array.some((element, index) => {
          if (element.id === id) {
            indexElement = index;
            element.value = firstValue;
            if (element.ITE) {
              return true;
            }
            element.ITE = [
              [{ id: fnUid(), value: "" }],
              [{ id: fnUid(), value: "" }],
              [{ id: fnUid(), value: "" }],
            ];
            array.splice(indexElement + 1, 0, { id: fnUid(), value: secondValue });
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
        <button className={globalClasses.button} onClick={onITEButtonClick}>
          IF | THEN | ELSE
        </button>
      </div>

      {template.map((element, index) => {
          return (
            <React.Fragment key={element.id}>
              <div className={globalClasses.hBox}>
                <TextArea
                  callbackOnBlur={callbackOnBlur}
                  value={element.value}
                  id={element.id}
                  firstUsingTextArea={index === 0 ? firstUsingTextArea : undefined}
                  onChange={(e) => handleTextAreaChange(e, element.id)}
                ></TextArea>
              </div>
              {element.ITE && (
                <ITE
                  id={element.id}
                  values={element.ITE}
                  callbackOnBlur={callbackOnBlur}
                  handleTextAreaChange={handleTextAreaChange}
                  callbackOnDelete={callbackOnDelete}
                />
              )}
            </React.Fragment>
          );
      })}
    </div>
  );
}
