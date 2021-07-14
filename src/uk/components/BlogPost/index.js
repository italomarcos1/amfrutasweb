import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Translate } from 'react-auto-translate';

import Container from './styles';

export default function BlogPost({ content, index, setHeight }) {
  const { id, title, url, thumbs, description } = content;

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  useEffect(() => {
    if (isDesktop || !setHeight) return;
    const el = document.getElementById(`content${index}`);

    setHeight(el.offsetHeight);
  }, [isDesktop, index, setHeight, content]);

  return (
    <Container
      isDesktop={isDesktop}
      key={id}
      index={index}
      to={{
        pathname: `/${url}`,
        state: { id },
      }}
      id={`content${index}`}
    >
      <img src={thumbs} alt="Content" />
      <strong>
        <Translate>{title}</Translate>
      </strong>
      <small>
        <Translate>{description}</Translate>
      </small>
    </Container>
  );
}

BlogPost.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    url: PropTypes.string,
    title: PropTypes.string,
    thumbs: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setHeight: PropTypes.func,
};

BlogPost.defaultProps = {
  setHeight: null,
};
