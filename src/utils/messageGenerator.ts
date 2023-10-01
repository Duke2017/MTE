import { IState, ValuesType } from "../types";

export function messageGenerator(template: IState[], values: ValuesType) {
  let result = "";
  const replaceValues = (value: string) => {
    for (const key in values) {
      value = value.replaceAll("{" + key + "}", values[key]);
    }
    return value;
  };
  const searchFunc = (array: IState[]) => {
    array.forEach((element: IState) => {
      let value = element.value;
      value = replaceValues(value);
      if (value) {
        result += value + "\n";
      }
      if (element.ITE) {
        const searchTrueCondition = (array : IState[]) : boolean => {
          return array.some((el:IState) => {
              if (replaceValues(el.value)) {
                return true;
              }
              if (el.ITE) {
                if (searchTrueCondition(el.ITE[0])) {
                  return searchTrueCondition(el.ITE[1]);
                } else {
                  return searchTrueCondition(el.ITE[2]);
                }
              }
            return false;
          });
        };

        if (searchTrueCondition(element.ITE[0])) {
          searchFunc(element.ITE[1]);
        } else {
          searchFunc(element.ITE[2]);
        }
      }
    });
  };
  searchFunc(template);
  return result;
}
