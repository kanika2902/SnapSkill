import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function Cpp() {
  const questions = [
    {
      q: "What is C++?",
      a: "C++ is a powerful, object-oriented programming language built on C. It combines low-level control with high-level features, making it great for system programming and game development."
    },
    {
      q: "What is the difference between C and C++?",
      a: "C is procedural and focuses on functions, while C++ supports both procedural and object-oriented programming. C++ also supports classes, inheritance, and polymorphism."
    },
    {
      q: "What are classes and objects in C++?",
      a: "A class is a blueprint, and an object is an instance of that blueprint. Classes help encapsulate data and behavior together."
    },
    {
      q: "What is a constructor?",
      a: "A constructor is a special method in C++ used to initialize objects. It has the same name as the class and no return type."
    },
    {
      q: "What is the difference between constructor and destructor?",
      a: "Constructor initializes objects when they are created, while destructor cleans up memory when objects are destroyed."
    },
    {
      q: "What is function overloading?",
      a: "Function overloading allows multiple functions with the same name but different parameters. It's useful for performing similar actions in different ways."
    },
    {
      q: "What is operator overloading?",
      a: "Operator overloading lets you redefine how operators work with user-defined types, like overloading '+' to add two objects."
    },
    {
      q: "What is inheritance in C++?",
      a: "Inheritance allows a class to acquire the properties and methods of another. It supports reusability and hierarchical classification."
    },
    {
      q: "Explain polymorphism.",
      a: "Polymorphism means one function behaves differently in different contexts. C++ supports compile-time (overloading) and runtime (overriding) polymorphism."
    },
    {
      q: "What is virtual function?",
      a: "A virtual function is declared in a base class and overridden in a derived class. It enables dynamic binding at runtime."
    },
    {
      q: "What is the difference between ‘new’ and ‘malloc’?",
      a: "`new` is used in C++ to allocate memory and calls the constructor, while `malloc` is from C and does not call constructors."
    },
    {
      q: "What is a reference variable?",
      a: "A reference is an alias for another variable. It helps with memory efficiency and cleaner syntax, especially in function arguments."
    },
    {
      q: "What are access specifiers?",
      a: "Access specifiers like public, private, and protected define how accessible class members are from outside the class."
    },
    {
      q: "What is a template in C++?",
      a: "Templates allow writing generic code. You can write one function or class to work with different data types."
    },
    {
      q: "What is exception handling in C++?",
      a: "C++ uses try, catch, and throw to handle exceptions. It helps manage runtime errors without crashing the program."
    },
    {
      q: "What are the types of inheritance?",
      a: "C++ supports single, multiple, multilevel, hierarchical, and hybrid inheritance. Each has a specific use case in organizing classes."
    },
    {
      q: "What is the STL in C++?",
      a: "STL stands for Standard Template Library. It provides ready-to-use templates for data structures like vector, stack, queue, and algorithms like sort and search."
    },
    {
      q: "What is the difference between stack and heap memory?",
      a: "Stack memory is for static allocation and gets cleared automatically. Heap memory is for dynamic allocation and must be managed manually using `new` and `delete`."
    },
    {
      q: "What are inline functions?",
      a: "Inline functions are expanded at compile time instead of being called normally. They reduce function call overhead for small functions."
    },
    {
      q: "What is the ‘this’ pointer?",
      a: "`this` is a pointer that refers to the current object of a class. It’s useful when variable names are the same inside constructors or methods."
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
      <h2>Top C++ Interview Questions</h2>

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

export default Cpp;
