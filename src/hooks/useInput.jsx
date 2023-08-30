import { useState } from "react";
import useValidator from "./useValidator";

const useInput = (initialValue, validation) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [value, setValue] = useState(initialValue);
  const valid = useValidator(value, validation);

  const onBlur = (event) => {
    setHasChanged(true);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    hasChanged,
    value,
    onChange,
    onBlur,
    ...valid,
  };
};

export default useInput;
