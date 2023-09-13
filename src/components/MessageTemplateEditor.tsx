import React, { useRef, MouseEvent, RefObject, useState } from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";
import VariableElement from "./VariableElement";
import ITE from "./ITE";
import fnUid from "../utils/fnUid";
import { IState, IUsingTextArea } from "../types";
import { createPortal } from "react-dom";
import MessagePreview from "./MessagePreview";

interface IProps {
  arrVarNames: string[];
  callbackClose: VoidFunction;
  callbackSave: (template: IState[]) => void;
  template?: IState[];
}

export default function MessageTemplateEditor({ arrVarNames, template, callbackClose, callbackSave }: IProps) {
  const [templateState, setTemplateState] = useState<IState[]>(template || [{ id: fnUid(), value: "" }]);
  const [showModal, setShowModal] = useState(false);
  arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : arrVarNames;

  const lastUsingTextArea: IUsingTextArea = {
    textAreaRef: useRef<HTMLTextAreaElement>(null),
    id: "",
  };
  const firstUsingTextArea: IUsingTextArea = {
    textAreaRef: useRef<HTMLTextAreaElement>(null),
    id: "",
  };

  const onVariableElementClick = (text: string) => {
    const updatedTemplate = [...templateState];
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
      const searchFunc = (array: IState[]) => {
        array.some((element) => {
          if (element.id === id) {
            element.value = `${firstValue}{${text}}${secondValue}`;
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
      setTemplateState(updatedTemplate);
    }
  };

  const callbackOnBlur = (textAreaRef: RefObject<HTMLTextAreaElement>, id: string) => {
    lastUsingTextArea.textAreaRef = textAreaRef;
    lastUsingTextArea.id = id;
  };

  const callbackOnDelete = (id: string) => {
    const updatedTemplate = [...templateState];
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
    };
    searchFunc(updatedTemplate);
    setTemplateState(updatedTemplate);
  };

  const onITEButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedTemplate = [...templateState];
    let oneTextArea = false;
    let current = lastUsingTextArea.textAreaRef.current;
    let id = lastUsingTextArea.id;
    if (updatedTemplate.length === 1 && !current) {
      current = firstUsingTextArea.textAreaRef.current;
      id = firstUsingTextArea.id;
      oneTextArea = true;
    }

    if (current) {
      const selectionStart = oneTextArea ? current.value.length : current.selectionStart;
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
            element.ITE = [[{ id: fnUid(), value: "" }], [{ id: fnUid(), value: "" }], [{ id: fnUid(), value: "" }]];
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
      setTemplateState(updatedTemplate);
    }
  };

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>, id: string) {
    const updatedTemplate = [...templateState];
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
    setTemplateState(updatedTemplate);
  }

  return (
    <div style={{ margin: "1rem" }} className={globalClasses.vBox}>
      <span style={{ margin: "1rem" }}>Message Template Editor</span>

      <div className={globalClasses.hBox}>
        {arrVarNames.map((element) => {
          return VariableElement(element, onVariableElementClick);
        })}
      </div>

      <div>
        <button className={globalClasses.button} onClick={onITEButtonClick}>
          IF | THEN | ELSE
        </button>
      </div>

      {templateState.map((element, index) => {
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

      <div className={globalClasses.hBox} style={{ justifyContent: "center" }}>
        <button
          className={globalClasses.button}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Preview
        </button>
        {showModal && createPortal(<MessagePreview template={templateState} arrVarNames={arrVarNames} onClose={() => setShowModal(false)} />, document.body)}
        <button className={globalClasses.button} onClick={() => callbackSave(templateState)}>
          Save
        </button>
        <button className={globalClasses.button} onClick={callbackClose}>
          Close
        </button>
      </div>
    </div>
  );
}
