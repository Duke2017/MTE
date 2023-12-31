import React, { useState } from "react";
import globalClasses from "./Styles.module.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { MessageTemplateEditor } from "./components/MessageTemplateEditor";
import { IState } from "./types";

export function App() {
  const [isMessageEditorOpen, setIsMessageEditorOpen] = useState(false);
  const callbackSave = (template: IState[]) => {
    // it was so in task, but i prefer using localStorage.setItem()
    localStorage.template = JSON.stringify(template);
  };
  const onClose = () => {
    setIsMessageEditorOpen(false);
  };

  return (
    <div className={globalClasses.app}>
      {isMessageEditorOpen ? (
        <div className={globalClasses.appContent}>
          <MessageTemplateEditor
            arrVarNames={
              localStorage.arrVarNames
                ? JSON.parse(localStorage.arrVarNames)
                : ["firstname", "lastname", "company", "position", "mutualFirstFullName"]
            }
            template={localStorage.template ? JSON.parse(localStorage.template) : null}
            onClose={onClose}
            callbackSave={callbackSave}
          />
        </div>
      ) : (
        <button
          className={globalClasses.button}
          onClick={() => {
            setIsMessageEditorOpen(true);
          }}
        >
          Message Editor
        </button>
      )}
    </div>
  );
}
