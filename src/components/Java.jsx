import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function Java() {
  const questions = [
    {
      q: "What is Java?",
      a: "Java is a high-level, object-oriented programming language known for its platform independence. I like that it's reliable, widely used, and has a vast ecosystem which makes it great for large-scale projects."
    },
    {
      q: "What is JVM?",
      a: "JVM stands for Java Virtual Machine. It runs Java bytecode and makes Java platform-independent. I find it fascinating how one compiled file can run on any device with a JVM."
    },
    {
      q: "What is the difference between JDK, JRE, and JVM?",
      a: "JDK is the development kit, JRE is the runtime environment, and JVM is the virtual machine that executes the code. Together, they help develop and run Java applications."
    },
    {
      q: "What are the features of Java?",
      a: "Java is simple, secure, object-oriented, portable, and robust. Its platform independence and built-in garbage collection are features I really appreciate."
    },
    {
      q: "What is the difference between == and equals() in Java?",
      a: "`==` compares references (memory locations), while `equals()` compares actual values inside objects, especially in classes like String."
    },
    {
      q: "Explain OOP concepts in Java.",
      a: "OOP in Java includes encapsulation, inheritance, polymorphism, and abstraction. These principles help me write modular, reusable, and maintainable code."
    },
    {
      q: "What is inheritance in Java?",
      a: "Inheritance allows one class to acquire the properties and behaviors of another. It helps in code reusability and makes hierarchical classification possible."
    },
    {
      q: "What is method overloading?",
      a: "Method overloading means creating multiple methods with the same name but different parameters. It improves readability and flexibility in code."
    },
    {
      q: "What is method overriding?",
      a: "Overriding is when a subclass provides its own implementation of a method from its parent class. It’s useful for achieving runtime polymorphism."
    },
    {
      q: "What are access modifiers in Java?",
      a: "Access modifiers like `public`, `private`, `protected`, and default control the visibility of classes, methods, and variables."
    },
    {
      q: "What is an abstract class?",
      a: "An abstract class cannot be instantiated and can have abstract as well as concrete methods. It’s used to define common templates for subclasses."
    },
    {
      q: "What is an interface in Java?",
      a: "An interface is like a contract. It has abstract methods and constants. A class implements an interface to follow its structure."
    },
    {
      q: "What is the difference between ArrayList and LinkedList?",
      a: "ArrayList is backed by an array and is better for searching. LinkedList is better for frequent insertions and deletions because of its node-based structure."
    },
    {
      q: "What is exception handling in Java?",
      a: "Exception handling manages runtime errors using try-catch blocks. It keeps the program from crashing unexpectedly."
    },
    {
      q: "Difference between checked and unchecked exceptions?",
      a: "Checked exceptions must be handled (like IOException), while unchecked exceptions (like NullPointerException) occur at runtime and don't require handling."
    },
    {
      q: "What is multithreading in Java?",
      a: "Multithreading allows concurrent execution of two or more threads. It's useful for improving the performance of complex applications."
    },
    {
      q: "Explain the ‘final’ keyword.",
      a: "`final` can be used with variables (value can't change), methods (can't override), or classes (can't extend). It's useful for setting strict rules in code."
    },
    {
      q: "What is garbage collection in Java?",
      a: "Garbage collection automatically deletes unused objects to free memory. It’s one of the reasons Java is considered memory efficient."
    },
    {
      q: "What are constructors in Java?",
      a: "Constructors initialize objects when a class is created. They have the same name as the class and no return type."
    },
    {
      q: "What are wrapper classes in Java?",
      a: "Wrapper classes like Integer, Double, and Boolean convert primitives to objects. They’re helpful when using collections that work only with objects."
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
      <h2>Top Java Interview Questions</h2>

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

export default Java;
