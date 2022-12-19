/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { PAGE_PADDING, MAX_CONTENT_WIDTH, GRID_SIZE } from '../constants';

const ripple = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 red;
    box-shadow: 0 0 0 0 red;
  }
  70% {
    -moz-box-shadow: 0 0 0 20px rgba(204,169,44, 0);
    box-shadow: 0 0 0 20px rgba(204,169,44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
    box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`;

const mapSize = css`
  width: min(calc(100vw - ${PAGE_PADDING * 2}px), ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px);
  height: min(calc(100vw - ${PAGE_PADDING * 2}px), ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px);
`;

const GridContainer = styled.div`
  ${mapSize}
  display: grid;
  grid-template-columns: repeat(${GRID_SIZE}, 1fr);
  grid-template-rows: repeat(${GRID_SIZE}, 1fr);
  grid-gap: 2px;
`;

const Square = styled.div`
  background-color: ${(props) => (props.$isSnake ? '#FFF' : '#161616')};
`;

const Food = styled.div`
  border-radius: 100%;
  width: 100%;
  height: 100%;
  background: red;
  animation: ${ripple} 2s infinite;
  position: relative;
`;

const Container = styled.div`
  position: relative;
`;

const GameOver = styled.div`
  margin-bottom: 20px;
  font-weight: 900;
  font-size: 24px;
  color: white;
`;

const Mask = styled.div`
  ${mapSize}
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StartButton = styled.button`
  border: 2px solid #fff;
  background: none;
  color: #fff;
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #161616;
    background: #FFF;
    transition: all 0.2s ease-in-out;
  }
`;

const MainMap = ({
  snake, food, isGameStart, gameOver, handleOnGameStart,
}) => {
  const { head, bodyList } = snake;
  const squares = Array(GRID_SIZE).fill(0).map((_, index) => index);
  return (
    <Container>
      <GridContainer>
        {
          squares.map((row) => squares.map((column) => {
            const isSnake = [head, ...bodyList].find((item) => item.x === column && item.y === row);
            const isFood = food.x === column && food.y === row;
            return (
              <Square key={`${row}_${column}`} data-x={column} data-y={row} $isSnake={isSnake} $isFood={isFood}>
                {isFood && <Food />}
              </Square>
            );
          }))
        }
      </GridContainer>
      {!isGameStart && (
        <Mask>
          {gameOver && <GameOver>Game Over</GameOver>}
          <StartButton type="button" onClick={handleOnGameStart}>{gameOver ? 'Restart' : 'Start'}</StartButton>
        </Mask>
      )}
    </Container>
  );
};

export default MainMap;
