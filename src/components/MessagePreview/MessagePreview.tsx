import { ChangeEvent, useEffect, useRef, useState } from "react";
import globalClasses from "../../Styles.module.scss";
import styles from "./MessagePreview.module.scss";
import { IState, ValuesType } from "../../types";
import { messageGenerator } from "../../utils/messageGenerator";

interface IMessagePreview {
  onClose: VoidFunction;
  arrVarNames: string[];
  template: IState[];
}

export function MessagePreview({ onClose, arrVarNames, template }: IMessagePreview) {
  const [values, setValues] = useState(() => {
    const obj: ValuesType = {};
    arrVarNames.forEach((el) => {
      obj[el] = "";
    });
    return obj;
  });

  function handleValueChange(event: ChangeEvent<HTMLInputElement>, key: string) {
    setValues((prevValues) => ({ ...prevValues, [key]: event.target.value }));
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
    <div className={styles.modal} ref={rootRef}>
      <div className={styles.modal_dialog} ref={rootRef}>
        <div className={`${globalClasses.halfMargin} ${globalClasses.fontBold}`}>Message Preview</div>
        <textarea disabled className={styles.disabledTextarea} value={messageGenerator(template, values)}></textarea>
        <div className={`${globalClasses.hBox} ${globalClasses.halfMargin} ${styles.variables}`}>
          Variables:
          {arrVarNames.map((el) => {
            return (
              <label key={el} className={styles.variablesInput}>
                {el}
                <input
                  value={values[el]}
                  placeholder={el}
                  className={globalClasses.halfMargin}
                  onChange={(e) => handleValueChange(e, el)}
                />
              </label>
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
