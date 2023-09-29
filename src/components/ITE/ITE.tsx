import React, { useEffect } from "react";
import globalClasses from "../../Styles.module.scss";
import styles from "./ITE.module.scss";
import TextArea from "../TextArea/TextArea";
import { IITE } from "../../types";

export default function ITE({ id, values, callbackOnBlur, callbackOnDelete, handleTextAreaChange, visible, setVisibleTrue }: IITE) {
  // using callback setVisibleTrue for animation 
  useEffect(()=>{
    if (!visible) {
      setVisibleTrue(id);
    }
  });
  
  const textAreasArray = (index: number) => {
    return (
      <div className={globalClasses.vBox} style={{ width: "100%" }}>
        {values[index].map((element) => {
          return (
            <React.Fragment key={element.id}>
              <div className={globalClasses.hBox}>
                <TextArea
                  id={element.id}
                  callbackOnBlur={callbackOnBlur}
                  value={element.value}
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
                  visible={element.visibleITE}
                  setVisibleTrue={setVisibleTrue}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  return (
    <div className={`${globalClasses.hBox} ${styles.ITEBlock} ${visible ? styles.ITEBlockShow : ''}`}>
      <button style={{ margin: "0.5rem" }} onClick={() => callbackOnDelete(id)} className={styles.deleteButton}>
        X
      </button>

      <div className={globalClasses.vBox} style={{ width: "100%" }}>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={`${globalClasses.hBox} ${styles.conditionText}`}>IF</div>
          {textAreasArray(0)}
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={`${globalClasses.hBox} ${styles.conditionText}`}>THEN</div>
          {textAreasArray(1)}
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={`${globalClasses.hBox} ${styles.conditionText}`}>ELSE</div>
          {textAreasArray(2)}
        </div>
      </div>
    </div>
  );
}
