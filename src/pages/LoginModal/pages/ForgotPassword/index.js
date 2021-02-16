// import React, { useCallback, useState } from 'react';
import React from 'react';
// import PropTypes from 'prop-types';
// import { FaSpinner } from 'react-icons/fa';
// import styled from 'styled-components';

// import { Form } from '@unform/web';
// import { Title, Button, SecureLogin, GoBack } from '~/components/LoginModal';

// import Input from '~/components/FormInput';
// import Toast from '~/components/Toast';

// import lock from '~/assets/lock.svg';

// import backend from '~/services/api';

// import { mailIsValid } from '~/utils/validation';
// import { onlyValues } from '~/utils/onlyValues';

// import { Container } from './styles';

// export default function ForgotPassword({ setPage, isDesktop }) {
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [toastVisible, setToastVisible] = useState(false);
//   const [failedToastVisible, setFailedToastVisible] = useState(false);

//   const handleForgotPassword = useCallback(async () => {
//     try {
//       setLoading(true);
//       const userEmail = new FormData();

//       userEmail.append('email', email);
//       await backend.post('auth/reset-password', userEmail);

//       setLoading(false);
//       setToastVisible(true);

//       setTimeout(() => {
//         setToastVisible(false);
//       }, 2800);
//     } catch (error) {
//       setFailedToastVisible(true);
//       setLoading(false);

//       setTimeout(() => {
//         setFailedToastVisible(false);
//       }, 2800);
//     }
//   }, [email]);

//   return (
//     <Container onSubmit={handleForgotPassword} isDesktop={isDesktop}>
//       <Title isDesktop={isDesktop}>
//         ESCREVA O SEU E-MAIL E LHE
//         <br />
//         <b>ENVIAREMOS UMA NOVA {!isDesktop && <br />} PALAVRA-PASSE</b>
//       </Title>
//       <Input
//         name="email"
//         title="E-mail"
//         placeholder="Escreve o teu e-mail"
//         customWidth={isDesktop ? 462 : '85%'}
//         style={{ marginTop: 20 }}
//         setError={value => setEmailError(!mailIsValid(value))}
//         value={email}
//         onChange={({ target: { value } }) => onlyValues(value, setEmail)}
//         error={emailError}
//       />
//       <Button
//         type="submit"
//         color="#1DC167"
//         shadowColor="#17A75B"
//         style={isDesktop ? { marginTop: 48 } : { width: '85%', marginTop: 48 }}
//       >
//         {loading ? (
//           <FaSpinner color="#fff" size={20} />
//         ) : (
//           'Recuperar Palavra-passe'
//         )}
//       </Button>
//       <GoBack onClick={() => setPage('main')}>Ou voltar</GoBack>
//       <SecureLogin style={{ marginTop: 139 }}>
//         Secure <img src={lock} alt="Lock" /> Login
//       </SecureLogin>
//       {toastVisible && (
//         <Toast
//           status="Enviamos um link de redefinição de senha para seu e-mail!"
//           color="#1DC167"
//         />
//       )}
//       {failedToastVisible && (
//         <Toast
//           status="O e-mail informado não pertence a nenhum usuário. Tente novamente"
//           color="#f56060"
//         />
//       )}
//     </Container>
//   );
// }

// ForgotPassword.propTypes = {
//   setPage: PropTypes.func.isRequired,
//   isDesktop: PropTypes.bool.isRequired,
// };

export default function ForgotPassword() {
  return <h1>Em testes</h1>;
}
