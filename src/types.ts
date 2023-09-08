export type callbackOnBlurType = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  id: string
) => void;

export interface IITE {
  values: string[];
  callbackOnBlur: callbackOnBlurType;
  callbackOnDelete: VoidFunction;
  handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>, id: string) => void;
}
