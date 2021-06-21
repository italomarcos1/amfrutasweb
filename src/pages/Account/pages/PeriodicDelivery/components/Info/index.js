import React from 'react';
import PropTypes from 'prop-types';

import { Translate } from 'react-auto-translate';

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
}) {
  return (
    <Container style={style}>
      <img src={icon} alt={alt} />
      <Content>
        <strong style={titleStyle}>
          <Translate>{title}</Translate>
        </strong>
        <small>
          <Translate>{subTitle}</Translate>
        </small>
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
