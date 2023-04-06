import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

function App() {

  const [questions, setQuestions] = useState<Question>();
  const [questionID, setQuestionID] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ansID = Number(params.get("questionID"));
    setQuestionID(Number(params.get("questionID")));
    setQuestions(questionsData[ansID]);
  }, []);

  if (questions?.isQuestion) {
    return (
      <div className="App">
        <div className="app-container">
          <h1>心理測驗：歡迎來到輪迴小遊戲！</h1>
          <div key={questions?.id}>
            <h2>{questions?.question}</h2>
            <ul>
              {questions?.options && questions?.options.map((option, index) => (
                <li key={option}>
                  {questions?.answers && <a href={`?questionID=${questions?.answers[index]}`}>{option}</a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="app-container">
          <h1>心理測驗：歡迎來到輪迴小遊戲！</h1>
          <h2>{questions?.answer}</h2>
          {questions?.answer && <a href={`?questionID=${questions?.next}`}>{`請回到第${questions?.next && questions?.next + 1}題`}</a>}
        </div>
      </div>
    );
  }
}

export default App;