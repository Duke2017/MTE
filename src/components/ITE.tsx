import React from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";
import { fnUid } from "../utils/fnUid";
import { IITE } from "../types";

const conditionalTextStyle = { alignItems: "Center", justifyContent: "End", width: "3rem" };

export default function ITE({ values, callbackOnBlur, callbackOnDelete, handleTextAreaChange }: IITE) {
  const a1 = fnUid();
  const a2 = fnUid();
  const a3 = fnUid();
  return (
    <div className={globalClasses.hBox}>
      <button style={{ margin: "0.5rem" }} onClick={callbackOnDelete}>X</button>
      <div className={globalClasses.vBox} style={{ width: "100%" }}>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={globalClasses.hBox} style={conditionalTextStyle}>
            IF
          </div>
          <TextArea id={a1} callbackOnBlur={callbackOnBlur} value={values[0]} onChange={(e) => handleTextAreaChange(e, a1)}></TextArea>
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={globalClasses.hBox} style={conditionalTextStyle}>
            THEN
          </div>
          <TextArea id={a2} callbackOnBlur={callbackOnBlur} value={values[1]} onChange={(e) => handleTextAreaChange(e, a2)}></TextArea>
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={globalClasses.hBox} style={conditionalTextStyle}>
            ELSE
          </div>
          <TextArea id={a3} callbackOnBlur={callbackOnBlur} value={values[2]} onChange={(e) => handleTextAreaChange(e, a3)}></TextArea>
        </div>
      </div>
    </div>
  );
}
