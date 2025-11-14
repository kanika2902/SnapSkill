import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function Python() {
  const questions = [
    {
      q: "What is Python?",
      a: "Python is a high-level, interpreted programming language known for its readability and simplicity. It's great for beginners and widely used in web development, data science, AI, and automation."
    },
    {
      q: "What are Python’s key features?",
      a: "Python is easy to read, dynamically typed, interpreted, and supports multiple paradigms like OOP and functional programming. It has a vast library ecosystem which makes development faster."
    },
    {
      q: "What are Python data types?",
      a: "Python supports various types like int, float, str, list, tuple, dict, set, and boolean. Each plays a unique role in handling data."
    },
    {
      q: "What is the difference between list and tuple?",
      a: "Lists are mutable, meaning they can be changed after creation. Tuples are immutable and often used for fixed data. Both are ordered collections."
    },
    {
      q: "What are Python dictionaries?",
      a: "Dictionaries store data in key-value pairs. They're fast and ideal when you need a relationship between two pieces of data."
    },
    {
      q: "What is a Python function?",
      a: "A function is a reusable block of code that performs a specific task. It's defined using the `def` keyword and helps in code modularity."
    },
    {
      q: "What is a lambda function?",
      a: "A lambda function is an anonymous, one-line function used for simple operations. It's often used in places where a full function isn’t necessary."
    },
    {
      q: "What are *args and **kwargs?",
      a: "`*args` allows passing a variable number of positional arguments, and `**kwargs` allows passing keyword arguments to functions."
    },
    {
      q: "What is a Python module and package?",
      a: "A module is a file containing Python code (functions, classes, etc.). A package is a collection of modules organized in directories."
    },
    {
      q: "What is list comprehension?",
      a: "List comprehension is a concise way to create lists using a single line of code. It's both readable and efficient."
    },
    {
      q: "What is the difference between ‘is’ and ‘==’?",
      a: "`==` checks value equality while `is` checks if two variables point to the same object in memory."
    },
    {
      q: "What is a decorator in Python?",
      a: "A decorator is a function that adds functionality to another function without modifying its structure. It's often used for logging, authentication, etc."
    },
    {
      q: "Explain Python’s memory management.",
      a: "Python uses automatic garbage collection and reference counting to manage memory. Developers don’t need to manually allocate or free memory."
    },
    {
      q: "What are Python exceptions?",
      a: "Exceptions are runtime errors like ZeroDivisionError or FileNotFoundError. They are handled using try-except blocks to prevent program crashes."
    },
    {
      q: "What is the use of ‘with’ statement?",
      a: "`with` simplifies exception handling in file operations. It automatically closes the file after the block finishes, even if an error occurs."
    },
    {
      q: "What are Python generators?",
      a: "Generators allow iteration over values without storing them in memory. They use `yield` instead of `return`, which makes them memory-efficient."
    },
    {
      q: "What is the difference between Python 2 and 3?",
      a: "Python 3 introduced changes in syntax and libraries for better consistency and Unicode support. It’s the present and future of Python."
    },
    {
      q: "What is PEP 8?",
      a: "PEP 8 is Python's official style guide that outlines how to format code for better readability and maintainability."
    },
    {
      q: "What is slicing in Python?",
      a: "Slicing is used to extract a portion of a list, tuple, or string using syntax like `[start:stop:step]`. It’s a very handy feature."
    },
    {
      q: "What is the use of `__init__`?",
      a: "`__init__` is a special method in Python classes. It acts as a constructor and gets called automatically when an object is created."
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
      <h2>Top Python Interview Questions</h2>

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

export default Python;
