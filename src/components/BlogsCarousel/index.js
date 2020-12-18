import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionTitleMenu, SectionTitle, MenuButtons, Blogs } from './styles';

import chevronL from '~/assets/chevron-l.svg';
import chevronR from '~/assets/chevron-r.svg';

export default class BlogsCarousel extends Component {
  render() {
    const { children, isDesktop } = this.props;
    return (
      <>
        <SectionTitleMenu isDesktop={isDesktop}>
          <SectionTitle style={{ margin: 0, width: 600 }}>
            <div>
              <strong>Blog</strong>
              <small>
                Dicas de receitas com {!isDesktop && <br />}frutas e verduras
              </small>
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

        <Blogs
          itemsToShow={isDesktop ? 4 : 1}
          ref={ref => (this.carousel = ref)}
          showArrows={false}
          pagination={false}
          isDesktop={isDesktop}
        >
          {children}
        </Blogs>
      </>
    );
  }
}

BlogsCarousel.propTypes = {
  children: PropTypes.element.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
