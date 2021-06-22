import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  display: flex;
  opacity: ${({ isNull }) => (isNull ? 0 : 1)};
  flex-direction: column;
  width: ${({ isDesktop }) => (isDesktop ? '295px' : '100%')};
  height: 332px;
  max-height: 332px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ isDesktop, index }) =>
    !isDesktop && index > 0 ? '20px' : 0};
  padding-bottom: 10px;

  img {
    background-position: cover;
    width: ${({ isDesktop }) => (isDesktop ? '293px' : '99.3%')};
    height: ${({ isDesktop }) => (isDesktop ? '172.5px' : 'auto')};
    max-height: 149.4px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    object-fit: cover;
  }

  strong {
    text-align: center;
    font-family: 'SFProBold';
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #000;
    text-transform: uppercase;
    margin-top: 10px;
    width: 229px;
    height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  small {
    text-align: center;
    font-family: 'SFPro';
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #8d8d8d;
    margin-top: 10px;
    width: 229px;
  }
`;
