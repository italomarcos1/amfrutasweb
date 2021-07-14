import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { consts } from 'react-elastic-carousel';
import { Button, Images, Image } from './styles';

import chevronL from '~/assets/chevron-l.svg';
import chevronR from '~/assets/chevron-r.svg';

export default class ImagesCarousel extends Component {
  myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? chevronL : chevronR;

    return (
      <Button onClick={onClick} disabled={isEdge}>
        <img src={pointer} alt="" />
      </Button>
    );
  }

  render() {
    const { images, setImage } = this.props;

    return (
      <>
        <Images
          itemsToShow={3}
          ref={ref => (this.carousel = ref)}
          pagination={false}
          renderArrow={this.myArrow}
        >
          {images.map(({ banner, thumbs }) => (
            <Image onClick={() => setImage(banner)}>
              <img src={thumbs} alt="" />
            </Image>
          ))}
        </Images>
      </>
    );
  }
}

ImagesCarousel.propTypes = {
  images: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setImage: PropTypes.func.isRequired,
};
