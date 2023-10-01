import { ChangeEvent, RefObject } from "react";

export type CallbackOnBlurType = (
  textAreaRef: RefObject<HTMLTextAreaElement>,
  id: string
) => void;

export interface IITE {
  id: string;
  values: IState[][];
  onBlur: CallbackOnBlurType;
  onDelete: (id: string) => void;
  onTextAreaChange: (event: ChangeEvent<HTMLTextAreaElement>, id: string) => void;
  visible?: boolean;
  onShow: (id: string) => void;
}

export interface IState {
  id: string;
  value: string;
  ITE?: IState[][];
  ref?: IUsingTextArea;
  visibleITE?: boolean;
}

export interface IUsingTextArea {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  id: string;
}

export type ValuesType = {
  [key: string]: string;
}