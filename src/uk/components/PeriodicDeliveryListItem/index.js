import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from './styles';

import checked from '~/assets/checked.svg';
import unchecked from '~/assets/unchecked.svg';

export default function PeriodicDeliveryListItem({ image, value }) {
  const [selected, setSelected] = useState(value);
  const [hover, setHover] = useState(false);

  return (
    <Container
      image={image}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      selected={selected}
      hover={hover}
    >
      <button type="button" onClick={() => setSelected(!selected)}>
        <img src={selected ? checked : unchecked} alt="Selecionar esse item" />
      </button>
    </Container>
  );
}

PeriodicDeliveryListItem.propTypes = {
  image: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};
