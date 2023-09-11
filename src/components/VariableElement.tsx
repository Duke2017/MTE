import globalClasses from "../Styles.module.scss";

export default function VariableElement(text: string, onVariableElementClick: (text: string) => void) {
  return (
    <button
      className={globalClasses.buttonVariables}
      onClick={() => onVariableElementClick(text)}
      key={text}
      style={{ margin: "0.5rem" }}
    >{`{${text}}`}</button>
  );
}
