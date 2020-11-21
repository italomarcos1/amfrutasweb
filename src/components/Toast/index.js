import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Toast } from './styles';

export default function ToastContainer({ status }) {
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
    <Container>
      {toastVisible && <Toast visible={visible}>{status}</Toast>}
    </Container>
  );
}

ToastContainer.status = {
  status: PropTypes.string.isRequired,
};
