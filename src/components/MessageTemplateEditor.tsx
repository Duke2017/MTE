import { useRef, MouseEvent, RefObject, useState } from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";
import VariableElement from "./VariableElement";
import ITE from "./ITE";
import { fnUid } from "../util/fnUid";

interface IProps {
  arrVarNames: string[];
}

interface IStateITE {
  id: string;
  type: string;
  ifValue: string;
  thenValue: string;
  elseValue: string;
  parentId: string;
}
interface IState {
  id: string;
  type: string;
  value: string;
  ITE?: IStateITE;
}
interface ILastUsingTextArea {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  setVal: React.Dispatch<React.SetStateAction<string>> | undefined;
  id: string;
}

export default function MessageTemplateEditor({ arrVarNames }: IProps) {
  arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : arrVarNames;
  //const template = localStorage.template ? JSON.parse(localStorage.template) : null;

  const lastUsingTextArea: ILastUsingTextArea = {
    textAreaRef: useRef<HTMLTextAreaElement>(null),
    setVal: undefined,
    id: "",
  };

  // const callbackSave = (template: string[]) => {
  //   localStorage.template = template;
  // };
  const callbackOnBlur = (
    textAreaRef: RefObject<HTMLTextAreaElement>,
    setVal: React.Dispatch<React.SetStateAction<string>>,
    id: string
  ) => {
    lastUsingTextArea.textAreaRef = textAreaRef;
    lastUsingTextArea.setVal = setVal;
    lastUsingTextArea.id = id;
  };

  const callbackOnDelete = (id: string) => {
    setTemplate((prevTemplate) => {
      return prevTemplate.filter((element) => {
        return element.id !== id;
      });
    });
  };

  const [template, setTemplate] = useState<IState[]>([{ id: fnUid(), type: "TextArea", value: "" }]);

  const onITEbuttonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (lastUsingTextArea.textAreaRef.current) {
      const selectionStart = lastUsingTextArea.textAreaRef.current.selectionStart;
      const firstValue = lastUsingTextArea.textAreaRef.current.value.slice(0, selectionStart);
      const secondValue = lastUsingTextArea.textAreaRef.current.value.slice(selectionStart);
      if (lastUsingTextArea.setVal) lastUsingTextArea.setVal(firstValue);

      let indexElement = 0;
      const updatedTemplate = [...template];
      updatedTemplate.some((element, index) => {
        if (element.id === lastUsingTextArea.id) {
          indexElement = index + 1;
          element.ITE = { id: fnUid(), type: "ITE", ifValue: "", thenValue: "", elseValue: "", parentId: "" };
          return true;
        }
        return false;
      });

      updatedTemplate.splice(
        indexElement,
        0,
        { id: fnUid(), type: "TextArea", value: secondValue }
      );

      setTemplate(updatedTemplate);
    }
  };

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
            <div key={element.id} className={globalClasses.hBox}>
              <TextArea callbackOnBlur={callbackOnBlur} value={element.value} id={element.id}></TextArea>
            </div>
          );
        }
        if (element.ITE) {
          return (
            <ITE
              key={element.id}
              ifValue=""
              thenValue=""
              elseValue=""
              callbackOnBlur={callbackOnBlur}
              callbackOnDelete={() => callbackOnDelete(element.id)}
            ></ITE>
          );
        }
        return null;
      })}
    </div>
  );
}
