import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Toast } from './styles';

export default function ToastContainer({ status, color, isDesktop }) {
  const [visible, setVisible] = useState(true);
  const [toastVisible, setToastVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 2500);
    setTimeout(() => {
      setToastVisible(false);
    }, 2700);
  }, []);

  return (
    <Container isDesktop={isDesktop}>
      {toastVisible && (
        <Toast color={color} visible={visible} isDesktop={isDesktop}>
          {status}
        </Toast>
      )}
    </Container>
  );
}

ToastContainer.status = {
  status: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
