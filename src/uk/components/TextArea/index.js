import React from 'react';
import PropTypes from 'prop-types';

import { Container, Input, Title } from './styles';

export default function CustomInput({
  title,
  inputStyle,
  style,
  error,
  full,
  ...rest
}) {
  return (
    <Container full={full} style={style}>
      <Title error={error}>{title}</Title>
      <Input {...rest} error={error} style={{ inputStyle }} />
    </Container>
  );
}

CustomInput.propTypes = {
  title: PropTypes.string.isRequired,
  full: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  inputStyle: PropTypes.oneOfType([PropTypes.object]),
};

CustomInput.defaultProps = {
  full: false,
  style: {},
  inputStyle: {},
};
