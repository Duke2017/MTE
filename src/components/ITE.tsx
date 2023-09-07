import React from "react";
import globalClasses from "../Styles.module.scss";
import TextArea from "./TextArea";
import { fnUid } from "../util/fnUid";
import { IITE } from "../types";

const conditionalTextStyle = { alignItems: "Center", justifyContent: "End", width: "3rem" };

export default function ITE({ ifValue, thenValue, elseValue, callbackOnBlur, callbackOnDelete }: IITE) {
  return (
    <div className={globalClasses.hBox}>
      <button style={{ margin: "0.5rem" }} onClick={callbackOnDelete}>X</button>
      <div className={globalClasses.vBox} style={{ width: "100%" }}>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={globalClasses.hBox} style={conditionalTextStyle}>
            IF
          </div>
          <TextArea id={fnUid()} callbackOnBlur={callbackOnBlur} value={ifValue}></TextArea>
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={globalClasses.hBox} style={conditionalTextStyle}>
            THEN
          </div>
          <TextArea id={fnUid()} callbackOnBlur={callbackOnBlur} value={thenValue}></TextArea>
        </div>
        <div className={globalClasses.hBox} style={{ marginLeft: "1rem" }}>
          <div className={globalClasses.hBox} style={conditionalTextStyle}>
            ELSE
          </div>
          <TextArea id={fnUid()} callbackOnBlur={callbackOnBlur} value={elseValue}></TextArea>
        </div>
      </div>
    </div>
  );
}
