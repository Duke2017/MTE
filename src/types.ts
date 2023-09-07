export type callbackOnBlurType = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  setVal: React.Dispatch<React.SetStateAction<string>>,
  id: string
) => void;

export interface IITE {
  ifValue: string;
  thenValue: string;
  elseValue: string;
  callbackOnBlur: callbackOnBlurType;
  callbackOnDelete: () => void;
}
