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
  url?: string;
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
        <div className="app-container">
          <h1>攝影小問題</h1>
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
          <h1>攝影小問題</h1>
          <a href={questions?.url} target="_blank">{questions?.answer}</a>
        </div>
      </div>
    );
  }
}

export default App;