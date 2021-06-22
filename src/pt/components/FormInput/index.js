import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, Title, Input, VerifiedEmail } from './styles';

export default function CustomInput({
  name,
  title,
  full,
  fontSize,
  style,
  customWidth,
  verified,
  setError,
  placeholder,
  inputStyle,
  titleStyle,
  hasMarginLeft,
  disabled,
  ...rest
}) {
  const [active, setActive] = useState(false);

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      full={full}
      style={
        hasMarginLeft
          ? { ...style, width: customWidth, marginLeft: 20 }
          : { ...style, width: customWidth }
      }
      disabled={disabled}
    >
      <Title style={{ ...titleStyle, fontSize }} error={error}>
        {title}
        {verified && (
          <VerifiedEmail verified={verified === 'yes'}>Verified</VerifiedEmail>
        )}
      </Title>
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
        onBlur={({ target: { value } }) => setActive(false)}
        {...rest}
      />
    </Container>
  );
}

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  fontSize: PropTypes.number,
  full: PropTypes.bool,
  disabled: PropTypes.bool,
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
  disabled: false,
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
