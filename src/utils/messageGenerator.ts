import { IState, valuesType } from "../types";

export default function messageGenerator(template: IState[], values: valuesType) {
  let result = "";
  const searchFunc = (array: IState[]) => {
    array.forEach((element: IState) => {
      let value = element.value;
      if (value === ''){
        return;
      }
      for (const key in values) {
        value = value.replaceAll("{" + key + "}", values[key]);
      }
      result += value + "\n";
      if (element.ITE) {
     
        if (element.ITE[0][0].value) {
          let value = element.ITE[0][0].value;
          for (const key in values) {
            value = value.replaceAll("{" + key + "}", values[key]);
          }
          if (value) {
            searchFunc(element.ITE[1]);
          } else {
            searchFunc(element.ITE[2]);
          }
        } else {
          searchFunc(element.ITE[2]);
        }
      }
    });
  };
  searchFunc(template);
  return result;
}
