import { useEffect, useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (data) => {
    if (!Array.isArray(data)) {
      const { target } = data;
      setValues({
        ...values,
        [target.name]: target.value,
      });
    } else {
      let newValues = {};
      data.map(
        (value) => (newValues = { ...newValues, [value.name]: value.value })
      );

      setValues({ ...values, ...newValues });
    }
  };

  return [values, handleInputChange, reset];
};
