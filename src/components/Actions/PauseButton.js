/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 2px solid #fff;
  background: none;
  color: #fff;
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  &:hover {
    color: #161616;
    background: #FFF;
    transition: all 0.2s ease-in-out;
  }
`;

const PauseButton = ({ isPause, onClick }) => (
  <StyledButton onClick={onClick}>
    {isPause ? '繼續' : '暫停'}
  </StyledButton>
);

export default PauseButton;
