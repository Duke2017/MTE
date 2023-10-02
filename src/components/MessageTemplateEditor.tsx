import React, { useRef, MouseEvent, RefObject, useState, ChangeEvent, Fragment } from "react";
import globalClasses from "../Styles.module.scss";
import { TextArea } from "./TextArea/TextArea";
import { VariableElement } from "./VariableElement";
import { ITE } from "./ITE/ITE";
import { uid } from "../utils/fnUid";
import { IState, IUsingTextArea } from "../types";
import { createPortal } from "react-dom";
import { MessagePreview } from "./MessagePreview/MessagePreview";

interface IProps {
  arrVarNames: string[];
  onClose: VoidFunction;
  callbackSave: (template: IState[]) => void;
  template?: IState[];
}

export function MessageTemplateEditor({ arrVarNames, template, onClose, callbackSave }: IProps) {
  const [templateState, setTemplateState] = useState<IState[]>(
    template || [{ id: uid(), value: "", visibleITE: true }]
  );
  const [showModal, setShowModal] = useState(false);

  // we don't need it in state, it's normal that it will be cleared when rerender
  const lastUsingTextArea: IUsingTextArea = {
    textAreaRef: useRef<HTMLTextAreaElement>(null),
    id: "",
  };
  const firstUsingTextArea: IUsingTextArea = {
    textAreaRef: useRef<HTMLTextAreaElement>(null),
    id: "",
  };

  // add a variable to the area where the cursor was last
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
      const searchElement = (array: IState[]) => {
        array.some((element) => {
          if (element.id === id) {
            element.value = `${firstValue}{${text}}${secondValue}`;
            current?.focus();
            current?.setSelectionRange(selectionStart,selectionStart);
            return true;
          }
          if (element.ITE) {
            searchElement(element.ITE[0]);
            searchElement(element.ITE[1]);
            searchElement(element.ITE[2]);
          }
          return false;
        });
      };
      searchElement(updatedTemplate);
      setTemplateState(updatedTemplate);
    }
  };

  const saveLastPointedTextArea = (textAreaRef: RefObject<HTMLTextAreaElement>, id: string) => {
    lastUsingTextArea.textAreaRef = textAreaRef;
    lastUsingTextArea.id = id;
  };

  const deleteITEblock = (id: string) => {
    const updatedTemplate = [...templateState];
    const searchElement = (array: IState[]) => {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.id === id) {
          element.value += array[index + 1].value;
          element.ITE = array[index + 1].ITE;
          array.splice(index + 1, 1);
          break;
        }
        if (element.ITE) {
          searchElement(element.ITE[0]);
          searchElement(element.ITE[1]);
          searchElement(element.ITE[2]);
        }
      }
    };
    searchElement(updatedTemplate);
    setTemplateState(updatedTemplate);
  };

  // for animation
  const onShow = (id: string) => {
    const updatedTemplate = [...templateState];
    const searchElement = (array: IState[]) => {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.id === id) {
          element.visibleITE = true;
          break;
        }
        if (element.ITE) {
          searchElement(element.ITE[0]);
          searchElement(element.ITE[1]);
          searchElement(element.ITE[2]);
        }
      }
    };
    searchElement(updatedTemplate);
    setTemplateState(updatedTemplate);
  };

  // add ITE block then press ITE button
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
      const searchElement = (array: IState[]) => {
        array.some((element, index) => {
          if (element.id === id) {
            let existingITE;
            if (element.ITE) {
              existingITE = element.ITE;
            }
            element.value = firstValue;
            element.ITE = [
              [{ id: uid(), value: "", visibleITE: true }],
              [{ id: uid(), value: "", visibleITE: true }],
              [{ id: uid(), value: "", visibleITE: true }],
            ];
            array.splice(index + 1, 0, { id: uid(), value: secondValue, visibleITE: true });
            element.visibleITE = false;
            if (existingITE) array[index + 1].ITE = existingITE;
            current?.focus();
            current?.setSelectionRange(selectionStart,selectionStart);
            return true;
          }
          if (element.ITE) {
            searchElement(element.ITE[0]);
            searchElement(element.ITE[1]);
            searchElement(element.ITE[2]);
          }
          return false;
        });
      };

      searchElement(updatedTemplate);
      setTemplateState(updatedTemplate);
    }
  };

  function textAreaOnChange(event: ChangeEvent<HTMLTextAreaElement>, id: string) {
    const updatedTemplate = [...templateState];
    const searchElement = (array: IState[]) => {
      array.forEach((element) => {
        if (element.id === id) {
          element.value = event.target.value;
        }
        if (element.ITE) {
          searchElement(element.ITE[0]);
          searchElement(element.ITE[1]);
          searchElement(element.ITE[2]);
        }
      });
    };

    searchElement(updatedTemplate);
    setTemplateState(updatedTemplate);
  }

  return (
    <div className={`${globalClasses.vBox} ${globalClasses.halfMargin}`}>
      <span className={globalClasses.halfMargin}>Message Template Editor</span>

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
          <Fragment key={element.id}>
            <div className={globalClasses.hBox}>
              <TextArea
                onBlur={saveLastPointedTextArea}
                value={element.value}
                id={element.id}
                firstUsingTextArea={index === 0 ? firstUsingTextArea : undefined}
                onChange={(e) => textAreaOnChange(e, element.id)}
              ></TextArea>
            </div>
            {element.ITE && (
              <ITE
                id={element.id}
                values={element.ITE}
                onBlur={saveLastPointedTextArea}
                onTextAreaChange={textAreaOnChange}
                onDelete={deleteITEblock}
                visible={element.visibleITE}
                onShow={onShow}
              />
            )}
          </Fragment>
        );
      })}

      <div className={`${globalClasses.hBox} ${globalClasses.justifyCenter}`}>
        <button
          className={globalClasses.button}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Preview
        </button>
        {showModal &&
          createPortal(
            <MessagePreview template={templateState} arrVarNames={arrVarNames} onClose={() => setShowModal(false)} />,
            document.body
          )}
        <button className={globalClasses.button} onClick={() => callbackSave(templateState)}>
          Save
        </button>
        <button className={globalClasses.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
