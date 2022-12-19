/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import VirtualKeyboard from './VirtualKeyboard';
import PauseButton from './PauseButton';

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Actions = ({ handleTogglePause, handleChangeDirection }) => (
  <ActionsContainer>
    <VirtualKeyboard handleChangeDirection={handleChangeDirection} />
    <PauseButton onClick={handleTogglePause} />
  </ActionsContainer>
);

export default Actions;
