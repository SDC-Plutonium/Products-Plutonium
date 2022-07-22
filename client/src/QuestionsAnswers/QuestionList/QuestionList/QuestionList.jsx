import React, { useRef } from 'react';
import styled from 'styled-components';
import IndividualQuestion from './IndividualQuestion';
import { useQuestionList } from '../../contexts/QuestionListContext';

function QuestionList({ renderQuestions, keyword, productName, expanded, page, setPage, hasMore }) {
  const questions = useQuestionList();
  const listInnerRef = useRef();

  if (questions.length === 0) {
    return (
      <NoDataDiv id="question-list">
        No Questions Available.
      </NoDataDiv>
    );
  }

  let filteredQuestions = questions
    .filter((question) => (
      question.question_body.match(new RegExp(keyword, 'i'))
    ));

  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight + 0.75 > scrollHeight) {
        if (hasMore) {
          setPage(page + 1);
          renderQuestions();
        }
      }
    }
  };

  return (
    <div id="question-list">
      {expanded
      && (
        <Scroller onScroll={onScroll} ref={listInnerRef} id="question-scroller">
          {filteredQuestions
            .map((question) => (
              <IndividualQuestion
                key={question.question_id}
                question={question}
                renderQuestions={renderQuestions}
                productName={productName}
              />
            ))}
        </Scroller>
      )}
      {!expanded
      && (
        <div>
          {filteredQuestions
            .slice(0, 2)
            .map((question) => (
              <IndividualQuestion
                key={question.question_id}
                question={question}
                renderQuestions={renderQuestions}
                productName={productName}
              />
            ))}
        </div>
      )}

    </div>
  );
}

export default QuestionList;

const Scroller = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 70vh;
`;

const NoDataDiv = styled.div`
  padding: 10px 0;
  font-size: 18px;
`;
