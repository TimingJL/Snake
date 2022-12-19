/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';

const Score = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: white;
`;

const Information = ({ score }) => (
  <Score>
    {`Score: ${score}`}
  </Score>
);

export default Information;
