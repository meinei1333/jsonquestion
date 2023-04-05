import React, { useState, useEffect } from "react";
import "./App.css";

import questionsData from "./question.json";
import { log } from "console";

interface Question {
  id: string;
  question: string;
  options: string[];
  answers: string[];
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

  return (
    <div className="App">
      <h1>Questions</h1>
      <div key={questions?.id}>
        <h2>{questions?.question}</h2>
        <ul>
          {questions?.options.map((option, index) => (
            <li key={option}>
              <a href={`http://localhost:3000/?questionID=${questions?.answers[index]}`}>{option}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;