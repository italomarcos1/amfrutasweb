import React, { useRef, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import PropTypes from 'prop-types';

export default function SlideShow({ data }) {
  const slideRef = useRef();

  const [current, setCurrent] = useState(0);

  const properties = {
    duration: 5000,
    autoplay: false,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: 'ease',
    indicators: i => <div className="indicator">{i + 1}</div>,
  };

  const slideImages = [
    'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  ];

  return (
    <>
      <div>
        <Slide ref={slideRef} {...properties}>
          {data.map((each, index) => (
            <div
              key={index}
              className="each-slide"
              style={{ width: each.width, height: each.height }}
            >
              <img
                className="lazy"
                src={each.url}
                alt="sample"
                style={{ width: each.width, height: each.height }}
              />
            </div>
          ))}
        </Slide>
      </div>

      <div className="slide-container buttons">
        <button onClick={() => slideRef.current.goBack()} type="button">
          Go Back
        </button>
        <button onClick={() => slideRef.current.goNext()} type="button">
          Go Next
        </button>
      </div>
    </>
  );
}

SlideShow.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
