import React, { useState, useEffect } from "react";

import "./App.css";

import questionsData from "./question.json";

interface Question {
  id: number;
  isQuestion: boolean;
  question: string;
  answers?: number[];
  options?: string[];
  answer?: string;
  next?: number;
}

interface AnswerProps {
  answer?: Question;
}

interface QuestionProps {
  question?: Question;
}

function App() {

  const [questions, setQuestions] = useState<Question>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ansID = Number(params.get("questionID"));
    setQuestions(questionsData[ansID]);
  }, []);

  if (questions?.isQuestion) {
    return (
      <div className="App">
        <QestionPage question={questions} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <AnswerPage answer={questions} />
      </div>
    );
  }
}



function AnswerPage(props: AnswerProps) {
  return (
    <div className="app-container">
      <h1>心理測驗：歡迎來到輪迴小遊戲！</h1>
      <h2>{props.answer?.answer}</h2>
      {props.answer?.answer && <a href={`?questionID=${props.answer?.next}`}>{`請回到第${props.answer?.next && props.answer?.next + 1}題`}</a>}
    </div>
  )
}

function QestionPage(props: QuestionProps) {
  return (
    <div className="app-container">
      <h1>心理測驗：歡迎來到輪迴小遊戲！</h1>
      <div key={props.question?.id}>
        <h2>{props.question?.question}</h2>
        <ul>
          {props.question?.options && props.question?.options.map((option, index) => (
            <li key={option}>
              {props.question?.answers && <a href={`?questionID=${props.question?.answers[index]}`}>{option}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default App;