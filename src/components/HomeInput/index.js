import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import Input from './styles';

export default function CustomInput({
  name,
  full,
  fontSize,
  style,
  customWidth,
  error,
  setError,
  placeholder,
  inputStyle,
  titleStyle,
  hasMarginLeft,
  ...rest
}) {
  const [active, setActive] = useState(false);

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField /* error */ } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Input
      name={name}
      placeholder={placeholder}
      error={error}
      ref={inputRef}
      defaultValue={defaultValue}
      style={inputStyle}
      active={active}
      type="text"
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      {...rest}
    />
  );
}

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  fontSize: PropTypes.number,
  full: PropTypes.bool,
  error: PropTypes.bool,
  hasMarginLeft: PropTypes.bool,
  customWidth: PropTypes.number,
  resetValue: PropTypes.func,
  setError: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object]),
  inputStyle: PropTypes.oneOfType([PropTypes.object]),
  titleStyle: PropTypes.oneOfType([PropTypes.object]),
};

CustomInput.defaultProps = {
  full: false,
  error: false,
  placeholder: 'Text here...',
  hasMarginLeft: false,
  fontSize: 12,
  customWidth: 221,
  style: {},
  inputStyle: {},
  titleStyle: {},
  resetValue: () => {},
  setError: () => {},
};
