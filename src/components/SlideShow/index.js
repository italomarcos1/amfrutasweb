import React, { useRef, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function SlideShow({ data }) {
  const slideRef = useRef();

  const properties = {
    duration: 3000,
    autoplay: true,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: 'ease',
    indicators: i => (
      <div className="indicator" style={{ display: 'none' }}>
        {i + 1}
      </div>
    ),
  };

  return (
    <>
      <Container>
        <Slide ref={slideRef} {...properties}>
          {data.map((each, index) => (
            <Content key={index} width={each.width} height={each.height}>
              <img className="lazy" src={each.url} alt="sample" />
            </Content>
          ))}
        </Slide>
        {/* 
        <div>
          <button onClick={() => slideRef.current.goBack()} type="button">
            Go Back
          </button>
          <button onClick={() => slideRef.current.goNext()} type="button">
            Go Next
          </button>
        </div> */}
      </Container>
    </>
  );
}

SlideShow.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
