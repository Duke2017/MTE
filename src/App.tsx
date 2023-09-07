import React from "react";
import "./App.css";
import globalClasses from "./Styles.module.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MessageTemplateEditor from "./components/MessageTemplateEditor";


function App() {
  const [isMessageEditorOpen, setIsMessageEditorOpen] = React.useState(true); //TODO false
  return (
    <div className={globalClasses.app}>
      {isMessageEditorOpen ? (
        <div className={globalClasses.appContent}>
          <MessageTemplateEditor arrVarNames={["firstname", "lastname", "company", "position"]}/>
        </div>
      ) : (
        <button className={globalClasses.button}
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

export default App;
