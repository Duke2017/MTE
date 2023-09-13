import { useEffect, useRef, useState } from "react";
import globalClasses from "../Styles.module.scss";
import { IState, valuesType } from "../types";
import messageGenerator from "../utils/messageGenerator";

interface IMessagePreview {
  onClose: VoidFunction;
  arrVarNames: string[];
  template: IState[];
}

export default function MessagePreview({ onClose, arrVarNames, template }: IMessagePreview) {
  const obj: valuesType = {};
  arrVarNames.forEach((el) => {
    obj[el] = "";
  });
  const [values, setValues] = useState(obj);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>, key: string) {
    // const valuesNew = {...values};
    // valuesNew[key] = event.target.value;
    // setValues(valuesNew);
    setValues(prevValues => ({ ...prevValues, [key]: event.target.value }));
  }

  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return (
    <div className={globalClasses.modal} ref={rootRef}>
      <div className={globalClasses.modal_dialog} ref={rootRef}>
        <div style={{ fontWeight: "bold", margin: "0.5rem" }}>Message Preview</div>
        <textarea
          disabled
          style={{ resize: "none", width: "100%", height: "100%" }}
          value={messageGenerator(template, values)}
        ></textarea>
        <div className={globalClasses.hBox} style={{ margin: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          Variables:
          {arrVarNames.map((el) => {
            return (
              <input
                key={el}
                value={values[el]}
                placeholder={el}
                style={{ margin: "0.5rem" }}
                onChange={(e) => handleValueChange(e, el)}
              />
            );
          })}
        </div>
        <button className={globalClasses.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
