import React, { useEffect, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, Title } from './styles';

export default function CustomInput({
  name,
  title,
  full,
  type,
  style,
  inputStyle,
  fontSize,
  customWidth,
  hasMarginLeft,
  disabled,
  ...rest
}) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [mask, setMask] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',

      setValue(ref, value) {
        ref.setInputValue(value);
      },

      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    switch (type) {
      case 'date': {
        setMask('99/99/9999');
        setPlaceholder('00/00/0000');
        break;
      }
      case 'plate': {
        setMask('aa99 aaa');
        setPlaceholder('AA99 AAA');
        break;
      }
      case 'rate': {
        setMask('9.99');
        setPlaceholder('0.00');
        break;
      }
      case 'dateAndHour': {
        setMask('99/99/9999 99:99');
        setPlaceholder('00/00/0000 00:00');
        break;
      }
      case 'hour': {
        setMask('99:99');
        setPlaceholder('00:00');
        break;
      }
      case 'phone': {
        setMask('99 999 99 99');
        setPlaceholder('00 000 00 00');
        break;
      }
      case 'number': {
        setMask('99999999');
        setPlaceholder('00000000');
        break;
      }
      case '10d': {
        setMask('9999999999');
        setPlaceholder('0000000000');
        break;
      }
      case '9d': {
        setMask('999999999');
        setPlaceholder('000000000');
        break;
      }
      case '8d': {
        setMask('99999999');
        setPlaceholder('00000000');
        break;
      }
      case '7d': {
        setMask('9999999');
        setPlaceholder('0000000');
        break;
      }
      case '6d': {
        setMask('999999');
        setPlaceholder('000000');
        break;
      }
      case 'ni': {
        setMask('aa 99 99 99 a');
        setPlaceholder('AA 99 99 99 A');
        break;
      }
      case 'sortCode': {
        setMask('99-99-99');
        setPlaceholder('00-00-00');
        break;
      }
      case 'code': {
        setMask('99');
        setPlaceholder('00');
        break;
      }
      case 'cost': {
        setMask('9,999.99');
        setPlaceholder('0,000.00');
        break;
      }
      case 'miles': {
        setMask('999,999');
        setPlaceholder('000,000');
        break;
      }
      default:
        setMask('99/99/9999');
    }
  }, [type]);

  return (
    <Container
      full={full}
      style={
        hasMarginLeft
          ? { ...style, width: customWidth, marginLeft: 15.5 }
          : { ...style, width: customWidth }
      }
      active={active}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      error={error}
      disabled={disabled}
    >
      <Title style={{ fontSize }} error={error}>
        {title}
      </Title>

      <ReactInputMask
        name={name}
        placeholder={placeholder}
        mask={mask}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        type="text"
        style={
          rest.dir === ''
            ? {
                ...inputStyle,
                paddingRight: customWidth - 70,
              }
            : { ...inputStyle }
        }
      />
    </Container>
  );
}

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  customWidth: PropTypes.number,
  hasMarginLeft: PropTypes.bool,
  type: PropTypes.string,
  full: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object]),
  inputStyle: PropTypes.oneOfType([PropTypes.object]),
};

CustomInput.defaultProps = {
  full: false,
  disabled: false,
  fontSize: 12,
  hasMarginLeft: false,
  customWidth: 221,
  type: 'date',
  style: {},
  inputStyle: {},
};
