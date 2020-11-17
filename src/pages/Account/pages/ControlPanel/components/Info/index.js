import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

import chevron from '~/assets/chevron-right.svg';

export default function Info({
  icon,
  alt,
  title,
  subTitle,
  style,
  titleStyle,
  noButton,
  ...rest
}) {
  return (
    <Container style={style} {...rest}>
      <img src={icon} alt={alt} />
      <Content>
        <strong style={titleStyle}>{title}</strong>
        <small>{subTitle}</small>
      </Content>
      {noButton && (
        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      )}
    </Container>
  );
}

Info.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  titleStyle: PropTypes.oneOfType([PropTypes.object]),
  noButton: PropTypes.bool,
};

Info.defaultProps = {
  style: {},
  titleStyle: {},
  noButton: true,
};
