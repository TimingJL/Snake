/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Information from './components/Information';
import MainMap from './components/MainMap';
import Actions from './components/Actions';
import {
  GRID_SIZE, SNAKE_INITIAL_SPEED, ARROW_RIGHT, SPACE,
  ARROW_UP, ARROW_DOWN, ARROW_LEFT, SNAKE_DELTA_SPEED, SNAKE_LIMITED_SPEED,
} from './constants';

const formatPosition = (position) => {
  if (position > (GRID_SIZE - 1)) {
    return 0;
  }
  if (position < 0) {
    return GRID_SIZE - 1;
  }
  return position;
};

const directionMap = {
  [ARROW_UP]: { x: 0, y: -1 },
  [ARROW_DOWN]: { x: 0, y: 1 },
  [ARROW_LEFT]: { x: -1, y: 0 },
  [ARROW_RIGHT]: { x: 1, y: 0 },
};

const Background = styled.div`
  background: #000;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const Container = styled.div`
  margin-top: 40px;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const createFood = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const defaultSnake = {
  head: { x: 2, y: 0 },
  bodyList: [
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ],
  maxLength: 3,
  direction: ARROW_RIGHT,
  speed: SNAKE_INITIAL_SPEED,
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(defaultSnake);
  const [food, setFood] = useState(() => createFood());
  const [isGameStart, setIsGameStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [score, setScore] = useState(0);
  const eatFood = snake.head.x === food.x && snake.head.y === food.y;
  const gameOver = snake.bodyList.find(
    (item) => item.x === snake.head.x && item.y === snake.head.y,
  );

  const handleOnGameStart = () => {
    setScore(0);
    setSnake(defaultSnake);
    setIsGameStart(true);
    if (gameOver) {
      setFood(createFood());
    }
  };

  const handleChangeDirection = (directionKey) => {
    if (directionKey === ARROW_UP && snake.direction !== ARROW_DOWN) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_UP,
      }));
    }
    if (directionKey === ARROW_DOWN && snake.direction !== ARROW_UP) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_DOWN,
      }));
    }
    if (directionKey === ARROW_LEFT && snake.direction !== ARROW_RIGHT) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_LEFT,
      }));
    }
    if (directionKey === ARROW_RIGHT && snake.direction !== ARROW_LEFT) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_RIGHT,
      }));
    }
  };

  const handleTogglePause = () => {
    if (isGameStart) {
      setIsPause((prev) => !prev);
    }
  };

  const handleKeydown = useCallback((event) => {
    const { code } = event;
    if (code === SPACE) {
      handleTogglePause();
      return;
    }
    handleChangeDirection(code);
  }, [snake]);

  useEffect(() => {
    const gameIntervalId = setInterval(() => {
      if (!isGameStart || isPause) {
        return;
      }
      setSnake((prevSnake) => {
        const updatedX = formatPosition(prevSnake.head.x + directionMap[prevSnake.direction].x);
        const updatedY = formatPosition(prevSnake.head.y + directionMap[prevSnake.direction].y);
        const newBodyList = [
          prevSnake.head,
          ...prevSnake.bodyList.slice(0, prevSnake.maxLength - 2),
        ];
        return ({
          ...prevSnake,
          head: {
            x: updatedX,
            y: updatedY,
          },
          bodyList: newBodyList,
        });
      });
    }, snake.speed);
    return () => {
      clearInterval(gameIntervalId);
    };
  }, [snake.speed, isGameStart, isPause]);

  useEffect(() => {
    if (eatFood) {
      setFood(createFood());
      setScore((prevScore) => prevScore + 1);
      setSnake((prevSnake) => {
        const updatedSpeed = prevSnake.speed - SNAKE_DELTA_SPEED;
        return ({
          ...prevSnake,
          maxLength: prevSnake.maxLength + 1,
          speed: Math.max(updatedSpeed, SNAKE_LIMITED_SPEED),
        });
      });
    }
  }, [eatFood]);

  useEffect(() => {
    if (gameOver) {
      setIsGameStart(false);
    }
  }, [gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <Background>
      <Container>
        <Information score={score} />
        <MainMap
          snake={snake}
          food={food}
          gameOver={gameOver}
          isGameStart={isGameStart}
          handleOnGameStart={handleOnGameStart}
        />
        <Actions
          isPause={isPause}
          handleTogglePause={handleTogglePause}
          handleChangeDirection={handleChangeDirection}
        />
      </Container>
    </Background>
  );
};

export default SnakeGame;
