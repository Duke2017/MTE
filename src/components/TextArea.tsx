import { ChangeEvent, useState } from 'react';
import globalClasses from "../Styles.module.scss";

function TextArea() {
  const [value, setValue] = useState('');

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  return (
    <textarea
      className={globalClasses.textArea}
      value={value}
      rows={6}
      onChange={handleChange}
    />
  );
}

export default TextArea;