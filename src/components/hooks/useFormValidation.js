import { useState, useCallback } from 'react';

function useFormValidation () {
  const [values, setValues] = useState('');
  const [errors, setErrors] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback((event, setErrorRequest) => {
    if (event.target.value === '') {
      setIsDirty(false);
    }
    setValues(event.target.value);
    setIsValid(event.target.validity.valid);
    setErrors(event.target.validationVessage);
    setErrorRequest(false);
  },[]);


  return {
    values,
    errors,
    handleChange,
    isValid,
    isDirty,
  };
}

export default useFormValidation;