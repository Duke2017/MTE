export type callbackOnBlurType = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  id: string
) => void;

export interface IITE {
  id: string;
  values: Array<IState[]>;
  callbackOnBlur: callbackOnBlurType;
  callbackOnDelete: (id: string) => void;
  handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>, id: string) => void;
}

export interface IState {
  id: string;
  value: string;
  ITE?: Array<IState[]>;
  ref?: IUsingTextArea;
}

export interface IUsingTextArea {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  id: string;
}