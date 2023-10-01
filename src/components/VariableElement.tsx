import globalClasses from "../Styles.module.scss";

export function VariableElement(text: string, onVariableElementClick: (text: string) => void) {
  return (
    <button
      className={`${globalClasses.buttonVariables} ${globalClasses.halfMargin}`}
      onClick={() => onVariableElementClick(text)}
      key={text}
    >{`{${text}}`}</button>
  );
}
