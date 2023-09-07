import globalClasses from "../Styles.module.scss";

export default function VariableElement(text: string) {
  return (
    <button className={globalClasses.buttonVariables} key={text} style={{ margin: "0.5rem" }}>{`{${text}}`}</button>
  );
};