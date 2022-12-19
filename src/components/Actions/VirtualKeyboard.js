/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import ArrowButton from './ArrowButton';
import {
  ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT,
} from '../../constants';

const GridContainer = styled.div`
  display: inline-grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;
`;

const VirtualKeyboard = ({ handleChangeDirection }) => (
  <GridContainer>
    <ArrowButton direction={ARROW_UP} onClick={() => handleChangeDirection(ARROW_UP)} />
    <ArrowButton direction={ARROW_LEFT} onClick={() => handleChangeDirection(ARROW_LEFT)} />
    <ArrowButton direction={ARROW_DOWN} onClick={() => handleChangeDirection(ARROW_DOWN)} />
    <ArrowButton direction={ARROW_RIGHT} onClick={() => handleChangeDirection(ARROW_RIGHT)} />
  </GridContainer>
);

export default VirtualKeyboard;
