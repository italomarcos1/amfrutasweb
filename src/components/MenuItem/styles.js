import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 9.5px;
  border-bottom: 1px solid #ccc;

  background: #fff;

  strong {
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    font-family: ${({ active }) => (active ? 'SFProBold' : 'SFPro')};
    letter-spacing: 0px;
    color: #141319;
    text-transform: capitalize;

    &:hover {
      color: ${({ active }) => (active ? '#141319' : '#3AB879')};
    }
  }

  img {
    width: 16px;
  }
`;

export const ChildrenCategories = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: #fff;
`;

export const ChildrenCategory = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  height: 38px;
  background: #fff;
  display: flex;
  justify-content: space-between;

  padding: 0 9.5px;

  strong {
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0px;
    color: ${({ active }) => (active ? '#F5B027' : '#3AB879')};
    font-family: 'SFPro';

    &:hover {
      color: #f5b027;
    }
  }
`;
