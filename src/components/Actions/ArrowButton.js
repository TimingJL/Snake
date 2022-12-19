/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import ArrowUpPath from '../../images/triangle.png';
import {
  ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT,
} from '../../constants';

const BUTTON_SIZE = 60;

const StyledArrowButton = styled.button`
  all: unset;
  border-radius: 100%;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  cursor: pointer;
  background: #FFF;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: yellow;
  }
  &:active {
    background: yellow;
    opacity: 0.9;
  }
  ${(props) => {
    if (props.$direction === ARROW_UP) {
      return `
        grid-column-start: 2;
        grid-row-start: 1;
      `;
    }
    if (props.$direction === ARROW_LEFT) {
      return `
        grid-column-start: 1;
        grid-row-start: 2;
      `;
    }
    if (props.$direction === ARROW_DOWN) {
      return `
        grid-column-start: 2;
        grid-row-start: 2;
      `;
    }
    if (props.$direction === ARROW_RIGHT) {
      return `
        grid-column-start: 3;
        grid-row-start: 2;
      `;
    }
    return null;
  }}
`;

const Arrow = styled.img`
  width: ${BUTTON_SIZE * 0.5}px;
  height: ${BUTTON_SIZE * 0.5}px;
  ${(props) => {
    if (props.$direction === ARROW_LEFT) {
      return `
      transform: rotate(-90deg);
      `;
    }
    if (props.$direction === ARROW_RIGHT) {
      return `
      transform: rotate(90deg);
      `;
    }
    if (props.$direction === ARROW_DOWN) {
      return `
      transform: rotate(180deg);
      `;
    }
    return null;
  }}
`;

const ArrowButton = ({ direction, onClick }) => (
  <StyledArrowButton type="button" $direction={direction} onClick={onClick}>
    <Arrow src={ArrowUpPath} alt="" $direction={direction} />
  </StyledArrowButton>
);

export default ArrowButton;
