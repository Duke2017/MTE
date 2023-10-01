import React, { Fragment, useEffect } from "react";
import globalClasses from "../../Styles.module.scss";
import styles from "./ITE.module.scss";
import { TextArea } from "../TextArea/TextArea";
import { IITE } from "../../types";

export function ITE({
  id,
  values,
  onBlur,
  onDelete,
  onTextAreaChange,
  visible,
  onShow,
}: IITE) {
  // using callback onShow for animation
  useEffect(() => {
    if (!visible) {
      onShow(id);
    }
  });

  const textAreasArray = (index: number) => {
    return (
      <div className={`${globalClasses.vBox} ${globalClasses.width100}`}>
        {values[index].map((element) => {
          return (
            <Fragment key={element.id}>
              <div className={globalClasses.hBox}>
                <TextArea
                  id={element.id}
                  onBlur={onBlur}
                  value={element.value}
                  onChange={(e) => onTextAreaChange(e, element.id)}
                ></TextArea>
              </div>
              {element.ITE && (
                <ITE
                  id={element.id}
                  values={element.ITE}
                  onBlur={onBlur}
                  onTextAreaChange={onTextAreaChange}
                  onDelete={onDelete}
                  visible={element.visibleITE}
                  onShow={onShow}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    );
  };
  return (
    <div className={`${globalClasses.hBox} ${styles.ITEBlock} ${visible ? styles.ITEBlockShow : ""}`}>
      <button onClick={() => onDelete(id)} className={`${styles.deleteButton} ${globalClasses.halfMargin}`}>
        X
      </button>

      <div className={`${globalClasses.vBox} ${globalClasses.width100}`}>
        <div className={globalClasses.hBox}>
          <div className={`${globalClasses.hBox} ${styles.conditionText}`}>IF</div>
          {textAreasArray(0)}
        </div>
        <div className={globalClasses.hBox}>
          <div className={`${globalClasses.hBox} ${styles.conditionText}`}>THEN</div>
          {textAreasArray(1)}
        </div>
        <div className={globalClasses.hBox}>
          <div className={`${globalClasses.hBox} ${styles.conditionText}`}>ELSE</div>
          {textAreasArray(2)}
        </div>
      </div>
    </div>
  );
}
