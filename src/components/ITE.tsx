import React from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";
import { IITE } from "../types";

export default function ITE({ id, values, callbackOnBlur, callbackOnDelete, handleTextAreaChange }: IITE) {
  const textAreaArray = (index: number) => {
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
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  return (
    <div className={globalClasses.hBox}>
      <button style={{ margin: "0.5rem" }} onClick={() => callbackOnDelete(id)} className={globalClasses.deleteButton}>
        X
      </button>

      <div className={globalClasses.vBox} style={{ width: "100%" }}>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={`${globalClasses.hBox} ${globalClasses.conditionText}`}>IF</div>
          {textAreaArray(0)}
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={`${globalClasses.hBox} ${globalClasses.conditionText}`}>THEN</div>
          {textAreaArray(1)}
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={`${globalClasses.hBox} ${globalClasses.conditionText}`}>ELSE</div>
          {textAreaArray(2)}
        </div>
      </div>
    </div>
  );
}
