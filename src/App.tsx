import React from "react";
import "./App.css";
import classes from "./Styles.module.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MessageTemplateEditor from "./components/MessageTemplateEditor";

function App() {
  const [isMessageEditorOpen, setIsMessageEditorOpen] = React.useState(false);
  return (
    <div className={classes.app}>
      {isMessageEditorOpen ? (
        <div className={classes.appContent}>
          <MessageTemplateEditor/>
        </div>
      ) : (
        <button
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
