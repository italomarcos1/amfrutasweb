import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SectionTitle,
  SectionTitleMenu,
  MenuButtons,
  Addresses,
} from './styles';

import chevronL from '~/assets/chevron-l.svg';
import chevronR from '~/assets/chevron-r.svg';

export default class AddressesCarousel extends Component {
  render() {
    const { children, isDesktop } = this.props;
    return (
      <>
        <SectionTitleMenu isDesktop={isDesktop}>
          <SectionTitle style={{ margin: 0, width: 600 }}>
            <div>
              <strong>Addresses</strong>
              <small>Check out and update your addresses</small>
            </div>
          </SectionTitle>
          <MenuButtons isDesktop={isDesktop}>
            <button type="button" onClick={() => this.carousel.slidePrev()}>
              <img src={chevronL} alt="" />
            </button>
            <button type="button" onClick={() => this.carousel.slideNext()}>
              <img src={chevronR} alt="" />
            </button>
          </MenuButtons>
        </SectionTitleMenu>

        <Addresses
          itemsToShow={isDesktop ? 3 : 1}
          ref={ref => (this.carousel = ref)}
          showArrows={false}
          pagination={false}
          isDesktop={isDesktop}
        >
          {children}
        </Addresses>
      </>
    );
  }
}

AddressesCarousel.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
