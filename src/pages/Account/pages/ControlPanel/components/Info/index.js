import React from 'react';
import { useMediaQuery } from 'react-responsive';

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
  imageStyle,
  noButton,
  ...rest
}) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <Container style={style} {...rest} isDesktop={isDesktop}>
      <img src={icon} alt={alt} style={isDesktop ? {} : imageStyle} />
      <Content isDesktop={isDesktop}>
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
  imageStyle: PropTypes.oneOfType([PropTypes.object]),
  noButton: PropTypes.bool,
};

Info.defaultProps = {
  style: {},
  titleStyle: {},
  imageStyle: {},
  noButton: true,
};
