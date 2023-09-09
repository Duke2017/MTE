export type callbackOnBlurType = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  id: string
) => void;

export interface IITE {
  values: Array<IState[]>;
  callbackOnBlur: callbackOnBlurType;
  callbackOnDelete: VoidFunction;
  handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>, id: string) => void;
}

export interface IState {
  id: string;
  type: string;
  value: string;
  ITE?: Array<IState[]>;
}