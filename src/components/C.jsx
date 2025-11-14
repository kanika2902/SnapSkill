import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function C() {
  const questions = [
    {
      q: "What is C language?",
      a: "C is a general-purpose, procedural programming language developed in the early 1970s. It’s powerful, fast, and forms the base for many modern languages like C++, Java, and Python."
    },
    {
      q: "What are the key features of C?",
      a: "C is efficient, portable, has low-level memory access, structured programming support, and rich library functions. It's widely used in embedded systems and OS development."
    },
    {
      q: "What is the difference between compiler and interpreter?",
      a: "A compiler converts the entire code into machine language before execution, while an interpreter translates code line by line during execution."
    },
    {
      q: "What are variables and data types in C?",
      a: "Variables are named memory locations. C supports data types like int, float, char, and double to define the type of data a variable can hold."
    },
    {
      q: "What is a pointer?",
      a: "A pointer is a variable that stores the memory address of another variable. Pointers are powerful for dynamic memory allocation and efficient program execution."
    },
    {
      q: "What is the use of sizeof operator?",
      a: "`sizeof` returns the size (in bytes) of a data type or variable. It helps manage memory and understand how data is stored."
    },
    {
      q: "Explain the difference between call by value and call by reference.",
      a: "Call by value passes a copy of the variable to a function, while call by reference passes the address. Changes in reference affect the original variable."
    },
    {
      q: "What are arrays in C?",
      a: "Arrays are collections of elements of the same type stored in contiguous memory locations. They allow indexed access to elements."
    },
    {
      q: "What is the difference between array and pointer?",
      a: "An array is a collection of elements, while a pointer holds the address of a variable. Arrays can be accessed using pointers, but they are not the same."
    },
    {
      q: "What is a structure in C?",
      a: "Structures are user-defined data types that group different types of variables under one name. They help manage complex data in a single unit."
    },
    {
      q: "What are loops in C?",
      a: "C provides loops like for, while, and do-while to execute a block of code repeatedly based on a condition."
    },
    {
      q: "What is recursion?",
      a: "Recursion is when a function calls itself to solve smaller instances of a problem. It's useful in tasks like factorial, Fibonacci, and tree traversal."
    },
    {
      q: "What is a NULL pointer?",
      a: "A NULL pointer is one that doesn’t point to any memory location. It’s used for error handling or to indicate that the pointer is not yet assigned."
    },
    {
      q: "What is dynamic memory allocation?",
      a: "It’s the process of allocating memory at runtime using functions like malloc(), calloc(), realloc(), and freeing it with free()."
    },
    {
      q: "What is a function in C?",
      a: "A function is a reusable block of code that performs a specific task. It helps modularize the program and improves code clarity."
    },
    {
      q: "What is the use of `static` keyword?",
      a: "`static` limits the visibility of a variable or function to the file or function it is defined in. It also retains its value between function calls."
    },
    {
      q: "What is the use of `extern` keyword?",
      a: "`extern` tells the compiler that the variable or function is defined elsewhere. It's used to share variables across multiple files."
    },
    {
      q: "What is the difference between break and continue?",
      a: "`break` exits the loop entirely, while `continue` skips the current iteration and moves to the next loop cycle."
    },
    {
      q: "What is a dangling pointer?",
      a: "A dangling pointer points to a memory location that has been freed or deallocated. Accessing it can cause undefined behavior."
    },
    {
      q: "Why is C called a middle-level language?",
      a: "C combines the features of both low-level and high-level languages. It allows direct memory access like assembly, and abstraction like higher-level languages."
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
      <h2>Top C Language Interview Questions</h2>

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

export default C;
