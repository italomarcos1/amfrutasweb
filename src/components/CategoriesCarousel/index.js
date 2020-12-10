import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SectionTitleMenu,
  SectionTitle,
  MenuButtons,
  Categories,
  Category,
} from './styles';

import chevronL from '~/assets/chevron-l.svg';
import chevronR from '~/assets/chevron-r.svg';

export default class CategoriesCarousel extends Component {
  render() {
    const { categories, isDesktop } = this.props;
    return (
      <>
        <SectionTitleMenu isDesktop={isDesktop}>
          <SectionTitle style={{ margin: 0, width: 600 }}>
            <div>
              <strong>Categorias</strong>
              <small>Visite todas as categorias do site</small>
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

        <Categories
          itemsToShow={isDesktop ? 7 : 2}
          ref={ref => (this.carousel = ref)}
          showArrows={false}
          pagination={false}
          enableAutoPlay
          autoPlaySpeed={4000}
          isDesktop={isDesktop}
        >
          {categories.map(({ id, name, url, thumbs }, index) => (
            <Category
              to={{
                pathname: `/${url}`,
                state: { id },
              }}
              isDesktop={isDesktop}
            >
              <img src={thumbs} alt="" />
              <small>{name}</small>
            </Category>
          ))}
        </Categories>
      </>
    );
  }
}

CategoriesCarousel.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
