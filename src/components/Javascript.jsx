import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function Javascript() {
  const questions = [
    {
      q: "What is JavaScript?",
      a: "JavaScript is a lightweight, interpreted scripting language used to make web pages interactive. It runs in the browser and powers everything from animations to form validations and dynamic content."
    },
    {
      q: "Difference between var, let, and const?",
      a: "`var` is function-scoped, while `let` and `const` are block-scoped. `const` is used for variables whose value shouldn’t change. `let` is preferred for variables that might be reassigned."
    },
    {
      q: "What is hoisting in JavaScript?",
      a: "Hoisting is JavaScript’s default behavior of moving declarations to the top of the current scope. This can cause unexpected results if not understood properly."
    },
    {
      q: "What is a closure?",
      a: "A closure is a function that remembers variables from its outer scope, even after the outer function has closed. It’s useful for maintaining state in async environments."
    },
    {
      q: "Difference between == and ===?",
      a: "`==` compares values with type coercion, while `===` checks both value and type. It’s safer to use `===` to avoid unexpected bugs."
    },
    {
      q: "What is the DOM?",
      a: "DOM stands for Document Object Model. It's the structure of your HTML page that JavaScript uses to interact with and manipulate page elements."
    },
    {
      q: "What are arrow functions?",
      a: "Arrow functions are a shorter syntax for writing functions. They don’t have their own `this`, which makes them useful for preserving context in callbacks."
    },
    {
      q: "What is an event loop?",
      a: "The event loop is how JavaScript handles asynchronous operations. It continuously checks the call stack and task queue to run functions in order."
    },
    {
      q: "What is async/await?",
      a: "`async/await` simplifies working with promises in JavaScript. It allows writing asynchronous code that looks synchronous and is easier to read and manage."
    },
    {
      q: "What is a promise?",
      a: "A promise is an object that represents the eventual completion or failure of an asynchronous operation. It has three states: pending, resolved, and rejected."
    },
    {
      q: "Explain scope in JavaScript.",
      a: "Scope refers to the accessibility of variables. JavaScript has function scope and block scope. Understanding it is key to avoiding bugs."
    },
    {
      q: "What is the difference between null and undefined?",
      a: "`undefined` means a variable has been declared but not assigned a value, while `null` is an assignment value that represents no value."
    },
    {
      q: "What is NaN?",
      a: "`NaN` stands for Not-a-Number. It is returned when a mathematical operation fails or a value isn’t a valid number."
    },
    {
      q: "What is the use of `this` keyword?",
      a: "`this` refers to the object that the function is a property of. In arrow functions, it refers to the context where the function was defined."
    },
    {
      q: "What are callback functions?",
      a: "A callback is a function passed into another function as an argument. It's commonly used in asynchronous operations like API calls or setTimeout."
    },
    {
      q: "What is the difference between localStorage and sessionStorage?",
      a: "`localStorage` persists data even after the browser is closed, while `sessionStorage` clears data once the session ends."
    },
    {
      q: "What is JSON?",
      a: "JSON stands for JavaScript Object Notation. It is a lightweight format for storing and transporting data, often used with APIs."
    },
    {
      q: "What is a higher-order function?",
      a: "A higher-order function is a function that takes another function as an argument or returns a function. Examples include `map()`, `filter()`, and `reduce()`."
    },
    {
      q: "What is event delegation?",
      a: "Event delegation allows you to handle events at a parent level rather than attaching handlers to every child element. It improves performance and simplifies code."
    },
    {
      q: "What are JavaScript data types?",
      a: "JavaScript has primitive types like string, number, boolean, null, undefined, symbol, and bigint — and reference types like objects and arrays."
    }
  ];

  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [recordings, setRecordings] = useState({});
  const [playingIndex, setPlayingIndex] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const toggleAnswer = (index) => {
    setVisibleAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const startRecording = (index) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      chunks.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => ({ ...prev, [index]: url }));
        setPlayingIndex(null);
      };

      setPlayingIndex(index);
    });
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const deleteRecording = (index) => {
    setRecordings((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  return (
    <div className="category-page">
      <h2>Top JavaScript Interview Questions</h2>

      {questions.map((item, index) => (
        <div key={index} className="question-card">
          <h4>Q{index + 1}: {item.q}</h4>

          <button onClick={() => toggleAnswer(index)} className="btn">
            {visibleAnswers[index] ? 'Hide Sample Answer' : 'See Sample Answer'}
          </button>

          {visibleAnswers[index] && (
            <p className="sample-answer">👉 {item.a}</p>
          )}

          {playingIndex === index ? (
            <button onClick={stopRecording} className="btn stop">🛑 Stop Recording</button>
          ) : (
            <button onClick={() => startRecording(index)} className="btn record">🎤 Record Your Answer</button>
          )}

          {recordings[index] && (
            <>
              <audio controls src={recordings[index]} style={{ marginTop: '10px' }} />
              <button onClick={() => deleteRecording(index)} className="btn delete">🗑 Delete Recording</button>
            </>
          )}
        </div>
      ))}

      <Link to="/technical" className="back-btn">← Back to Technical</Link>
    </div>
  );
}

export default Javascript;
