import { useState, useEffect } from "react";

const useValidator = (value, validations) => {
  const regular =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [minLengthErr, setMinLengthErr] = useState(false);
  const [maxLengthErr, setMaxLengthErr] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          if (value) {
            setEmpty(false);
          } else {
            setEmpty(true);
          }
          break;
        case "isEmail":
          if (regular.test(String(value).toLocaleLowerCase())) {
            setEmailErr(false);
          } else {
            setEmailErr(true);
          }
          break;
        case "minLength":
          if (value.length < validations[validation]) {
            setMinLengthErr(true);
          } else {
            setMinLengthErr(false);
          }
          break;
        case "maxLength":
          if (value.length > validations[validation]) {
            setMaxLengthErr(true);
          } else {
            setMaxLengthErr(false);
          }
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthErr || maxLengthErr || emailErr) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthErr, maxLengthErr, emailErr]);

  return {
    isEmpty,
    emailErr,
    minLengthErr,
    maxLengthErr,
    inputValid,
  };
};

export default useValidator;
