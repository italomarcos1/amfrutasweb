import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  padding: 27px 30px 121px;
  overflow-x: hidden;
`;

export const Content = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};

  align-items: flex-start;
  justify-content: space-between;
  margin: ${({ isDesktop }) => (isDesktop ? '94.5px auto 0' : '30px auto 0')};
`;

export const Title = styled.h1`
  font-family: 'SFPro';
  font-size: 25px;
  line-height: 33px;
  letter-spacing: 0px;
  color: #000;
  font-weight: normal;
`;

export const TopWarning = styled.div`
  display: flex;
  align-items: center;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 55 : 155)}px;
  background: #2cbdd3;
  border-radius: 6px;
  margin: 0 auto;
  padding: 18px;

  img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #fff;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45px;
  text-align: left;
  width: 221px;

  strong {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #424242;
  }

  small {
    display: block;
    margin-top: 2.5px;
    font-size: 12px;
    line-height: 16px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #424242;

    padding: 0;
    padding-right: 5px;
    height: 16px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    background: none;
    text-align: left;
    /* background-color: #00f; */

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export const CustomInputContainer = styled.div`
  height: ${({ isDesktop }) => (isDesktop ? 45 : 100)}px;
  margin-top: ${({ isDesktop }) => (isDesktop ? 20 : 10)}px;

  display: flex;
  width: ${({ isDesktop }) => (isDesktop ? '328px' : '100%')};
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  justify-content: space-between;
`;

export const CashbackCredit = styled.div`
  display: flex;
  align-items: center;
  width: 201px;
  height: 49px;
  margin-top: 38px;

  img {
    margin-right: 20px;
    width: 49px;
    height: 49px;
  }

  strong {
    font-weight: normal;
    font-size: 47px;
    line-height: 56px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #0cb68b;
  }
`;

export const InfoContainer = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '400px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 304 : 414)}px;

  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  padding: 21px 26px 37px;
`;

export const WithdrawContainer = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '400px' : '100%')};
  height: 304px;
  background: #0cb68b;
  border: 1px solid #0cb68b;
  border-radius: 6px;
  margin-top: ${({ isDesktop }) => (isDesktop ? 0 : 20)}px;

  padding: 21px 26px 37px;
  display: flex;
  align-items: center;
  justify-content: center;

  strong {
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #fff;

    b {
      font-family: 'SFProBold';
    }
  }
`;

// export const PeriodicDeliveryContainer = styled.div`
//   width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};
//   height: 596px;
//   background: #fff;
//   border: 1px solid #e0e0e0;
//   border-radius: 4px;
//   padding: 22px 30px 103px;
//   margin: 24px auto 0;

//   span {
//     margin-left: 20px;
//   }

//   p {
//     font-family: 'SFPro';
//     font-size: 22px;
//     line-height: 29px;
//     color: #555555;
//     text-align: left;
//   }

//   b {
//     font-family: 'SFProBold';
//   }
// `;

// export const PeriodicDeliveryItem = styled.button`
//   display: flex;
//   height: 53px;
//   background: none;
//   text-align: left;
//   align-items: flex-start;
//   margin: 40px 22px;

//   span {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 28px;
//     height: 28px;
//     background-color: #fff;
//     border: 3px solid #0cb68b;
//     border-color: ${({ selected }) => (selected ? '#0cb68b' : '#ccc')};
//     border-radius: 50%;
//     margin-left: 0;
//     padding: 2px;
//     text-align: center;

//     img {
//       display: ${({ selected }) => (selected ? 'block' : 'none')};
//       width: 15px;
//       height: 15px;
//     }
//   }

//   div {
//     margin-left: 23px;
//     height: 50px;
//     text-align: left;

//     strong {
//       font-weight: bold;
//       font-size: 18px;
//       line-height: 29px;
//       font-family: 'SFProBold';
//       letter-spacing: 0px;
//       color: #393939;
//     }

//     small {
//       font-weight: normal;
//       font-size: 18px;
//       line-height: 29px;
//       font-family: 'SFPro';
//       letter-spacing: 0px;
//       color: #393939;
//     }

//     b {
//       color: #0cb68b;
//     }
//   }
// `;

// export const PeriodicDeliveryList = styled.ul`
//   display: flex;
//   height: 70px;
//   margin-top: 39px;
//   margin-left: 73px;
// `;

// export const PeriodicDeliveryUnwantedProducts = styled.small`
//   display: inline-block;
//   margin-top: 16px;
//   margin-left: 73px;
//   font-weight: normal;
//   font-size: 15px;
//   line-height: 29px;
//   font-family: 'SFPro';
//   letter-spacing: 0px;
//   color: #393939;
// `;

// export const PeriodicDeliveryWannaReceive = styled.div`
//   height: 45px;
//   background: #fff;
//   margin-left: 73px;
//   margin-top: 20px;
//   display: flex;
//   text-align: left;
//   align-items: center;

//   small {
//     font-weight: normal;
//     font-size: 18px;
//     line-height: 29px;
//     font-family: 'SFPro';
//     letter-spacing: 0px;
//     color: #393939;
//   }

//   b {
//     font-family: 'SFProBold';
//   }
// `;

export const SectionTitle = styled.div`
  display: block;
  text-align: left;
  width: ${({ isDesktop }) => (isDesktop ? '1240px' : '100%')};

  margin: 0 auto;

  strong {
    font-weight: normal;
    font-size: ${({ isDesktop }) => (isDesktop ? 22 : 20)}px;
    line-height: 29px;
    font-family: 'SFProBold';
    letter-spacing: 0px;
    color: #000;
  }

  small {
    display: block;
    margin-top: 2.5px;
    font-size: 15px;
    line-height: 20px;
    font-family: 'SFPro';
    letter-spacing: 0px;
    color: #0cb68b;
  }
`;

export const CheckoutDetails = styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '360px' : '100%')};
  height: ${({ isDesktop }) => (isDesktop ? 455 : 483)}px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 27px;
`;

export const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47.5px;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  padding: 13.5px 0;

  h1 {
    font-weight: normal;
    text-align: left;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;

    b {
      font-family: 'SFProBold';
    }
  }

  h2 {
    text-align: right;
    font-family: 'SFProBold';
    font-size: 20px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #393939;
  }
`;

export const ConfirmationText = styled.small`
  letter-spacing: 0px;
  font-family: 'SFPro';
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #0cb68b;
  margin-top: 27.5px;
  align-self: flex-start;
`;

// export const Options = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 103px;
//   height: 45px;
//   margin: 0 19px;

//   strong {
//     font-size: 18px;
//     line-height: 22px;
//     font-weight: normal;
//     font-family: 'SFPro';
//     color: #393939;
//     margin: 0 10px;
//   }

//   button {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex: 1;
//     padding: 10px;
//     height: 45px;
//     background-color: #f2f2f2;
//     border-radius: 4px;
//   }
// `;
