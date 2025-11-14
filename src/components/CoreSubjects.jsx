import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function CoreSubjects() {
  const questions = [
    // Operating Systems
    { q: "What is an operating system?", a: "An operating system (OS) is system software that acts as an intermediary between the user and the computer hardware. It manages hardware, software resources, and provides services for computer programs." },
    { q: "What are the types of operating systems?", a: "Common types include batch OS, time-sharing OS, distributed OS, real-time OS, and network OS." },
    { q: "What is a process?", a: "A process is an instance of a program in execution. It has a program counter, stack, data section, and heap." },
    { q: "What is the difference between a process and a thread?", a: "A process is an independent program with its own memory space, while threads are smaller execution units within a process that share the same memory." },
    { q: "Explain process scheduling.", a: "Process scheduling is the activity of the OS that decides which process will run next using algorithms like FCFS, SJF, Round Robin, etc." },

    // Computer Networks
    { q: "What is the OSI model?", a: "OSI (Open Systems Interconnection) model is a 7-layer architecture: Physical, Data Link, Network, Transport, Session, Presentation, and Application layer." },
    { q: "Differentiate between TCP and UDP.", a: "TCP is connection-oriented, reliable, and slower; UDP is connectionless, faster, but unreliable." },
    { q: "What is an IP address?", a: "An IP address is a numerical label assigned to each device connected to a computer network. IPv4 uses 32-bit, IPv6 uses 128-bit addresses." },
    { q: "What is DNS?", a: "Domain Name System (DNS) is used to translate domain names (like www.example.com) into IP addresses." },
    { q: "What is a firewall?", a: "A firewall is a security system that controls and monitors incoming and outgoing network traffic based on security rules." },

    // DBMS
    { q: "What is DBMS?", a: "DBMS (Database Management System) is software used to store, retrieve, and manage data in databases efficiently." },
    { q: "What is the difference between SQL and NoSQL?", a: "SQL databases are relational and use structured schema. NoSQL databases are non-relational and suited for unstructured data." },
    { q: "What is normalization?", a: "Normalization is the process of organizing data to reduce redundancy and improve data integrity using normal forms like 1NF, 2NF, 3NF." },
    { q: "What are joins in SQL?", a: "Joins combine rows from two or more tables based on a related column. Types include INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN." },
    { q: "What is ACID property?", a: "ACID stands for Atomicity, Consistency, Isolation, and Durability. These are key properties of reliable database transactions." },

    // Computer Organization & Architecture
    { q: "What is a register?", a: "Registers are small, fast storage locations within a CPU used to hold temporary data and instructions." },
    { q: "What is pipelining?", a: "Pipelining is a technique where multiple instruction phases are overlapped to improve performance in CPU execution." },
    { q: "What is the difference between RAM and ROM?", a: "RAM is volatile memory used for temporary storage during processing, while ROM is non-volatile and stores firmware or boot instructions." },
    { q: "What is cache memory?", a: "Cache memory is a small, high-speed memory located close to the CPU to store frequently accessed data and instructions." },
    { q: "Explain RISC vs CISC.", a: "RISC (Reduced Instruction Set Computer) uses simple, fast instructions. CISC (Complex Instruction Set Computer) has complex, multi-cycle instructions." },

    // Software Engineering
    { q: "What is SDLC?", a: "Software Development Life Cycle (SDLC) is the process used to design, develop, test, and deploy software. Common models include Waterfall, Agile, Spiral, etc." },
    { q: "What is Agile methodology?", a: "Agile is an iterative software development approach that promotes flexibility, customer collaboration, and quick delivery." },
    { q: "What is the difference between verification and validation?", a: "Verification checks if the product is built correctly. Validation checks if the right product is built according to user needs." },
    { q: "What are functional and non-functional requirements?", a: "Functional requirements describe what the system should do. Non-functional requirements describe how the system performs functions (e.g., performance, security)." },
    { q: "What is a test case?", a: "A test case is a set of actions executed to verify a particular feature or functionality of your software application." },

    // Compiler Design
    { q: "What is a compiler?", a: "A compiler is a program that translates high-level source code into machine code or intermediate code." },
    { q: "What are the phases of a compiler?", a: "The phases are: Lexical Analysis, Syntax Analysis, Semantic Analysis, Intermediate Code Generation, Optimization, Code Generation, and Code Linking." },
    { q: "What is lexical analysis?", a: "Lexical analysis is the first phase of a compiler where the input code is converted into tokens by the lexer or scanner." },
    { q: "What is a parse tree?", a: "A parse tree represents the syntactic structure of source code according to a grammar. It’s generated during parsing." },
    { q: "What is syntax-directed translation?", a: "Syntax-directed translation uses syntax rules to direct the translation of source language constructs into intermediate code." },

    // Theory of Computation
    { q: "What is a finite automaton?", a: "A finite automaton is a theoretical machine used in computation theory to model computation. It has states, inputs, and transitions." },
    { q: "What is a regular expression?", a: "A regular expression is a sequence of characters that define a search pattern, mainly for string pattern matching." },
    { q: "What is the difference between DFA and NFA?", a: "DFA (Deterministic Finite Automata) has a single transition for each input symbol, while NFA (Non-deterministic Finite Automata) can have multiple transitions." },
    { q: "What is a Turing Machine?", a: "A Turing Machine is a theoretical model of computation that defines an abstract machine with infinite memory and read/write head. It helps define computability." },
    { q: "What is the Halting Problem?", a: "The Halting Problem states that it is impossible to write a program that can determine whether another program will halt or run forever." },

    // Miscellaneous
    { q: "What are interrupts?", a: "Interrupts are signals sent to the processor to indicate that an event needs immediate attention. They pause the current operations and transfer control to the interrupt handler." },
    { q: "What is virtual memory?", a: "Virtual memory is a memory management technique that gives the illusion of a large, continuous memory space by using disk storage." },
    { q: "What is context switching?", a: "Context switching is the process of storing and restoring the state of a CPU so that execution can be resumed from the same point later." },
    { q: "What is deadlock?", a: "Deadlock is a situation in a multiprogramming environment where two or more processes are unable to proceed because each is waiting for the other to release resources." },
    { q: "What is paging and segmentation?", a: "Paging divides memory into fixed-size pages while segmentation divides it into variable-sized segments based on logical divisions." }
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
      <h2>Top 40 Core Subject Interview Questions</h2>
      {questions.map((item, index) => (
        <div key={index} className="question-card">
          <h4>Q{index + 1}: {item.q}</h4>
          <button onClick={() => toggleAnswer(index)} className="btn">
            {visibleAnswers[index] ? 'Hide Answer' : 'See Answer'}
          </button>
          {visibleAnswers[index] && (
            <p className="sample-answer" style={{ whiteSpace: 'pre-wrap' }}>👉 {item.a}</p>
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
<Link to="/" className="back-btn">← Back to Home</Link>
    </div>
  );
}

export default CoreSubjects;