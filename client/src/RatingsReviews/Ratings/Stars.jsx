import React from 'react';
import starRating from '../lib/starRatings.js';
import styled from 'styled-components';

const StyledStars = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  font-size: 18px;
  width: 100px;
  background: linear-gradient(90deg, black ${props => props.percentage}, white ${props => props.percentage});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

function Stars({ percentage, average }) {
  return (
    <React.Fragment>
      <StyledStars percentage={starRating(average)}>★★★★★</StyledStars>
    </React.Fragment>
  );
}

export default Stars;