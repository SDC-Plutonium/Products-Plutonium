import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReviewTile from './ReviewTile';

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

function ReviewList(props) {
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight + 0.75 > scrollHeight) {
        props.scrollMore();
      }
    }
  };

  return (props.reviews.length > 0) ? (
    <StyledList
      onScroll={onScroll}
      ref={listInnerRef}
    >
      {props.reviews.slice(0, props.page * 5).map((review, index) => (
        <ReviewTile
          review={review}
          key={index}
          markHelpful={props.markHelpful}
          report={props.report}
        />
      ))}
    </StyledList>
  ) : (
    <StyledList>
      <h2>
        There are no reviews currently
      </h2>
    </StyledList>
  );
}

export default ReviewList;
