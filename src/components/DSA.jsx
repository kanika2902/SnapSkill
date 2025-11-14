import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function DSA() {
  const questions = [
    { q: "What is a Data Structure?", a: "A data structure is a particular way of organizing and storing data in a computer so that it can be accessed and modified efficiently. Common types include arrays, linked lists, stacks, queues, trees, and graphs." },
    { q: "What is the difference between linear and non-linear data structures?", a: "Linear data structures store elements in a sequential manner (e.g., arrays, linked lists), whereas non-linear data structures store elements in a hierarchical manner (e.g., trees, graphs)." },
    { q: "What are the advantages of using arrays?", a: "Arrays provide fast access to elements using indices, are easy to traverse, and are simple to implement. However, they have fixed size and are not efficient for insertion and deletion operations." },
    { q: "Explain the concept of a linked list.", a: "A linked list is a linear data structure in which elements (nodes) are connected using pointers. Each node contains data and a pointer to the next node. They are dynamic and allow efficient insertion and deletion." },
    { q: "What are stacks and their applications?", a: "A stack is a linear data structure that follows LIFO (Last In First Out) principle. Applications include expression evaluation, backtracking, and undo operations in editors." },
    { q: "What is a queue and where is it used?", a: "A queue is a linear data structure that follows FIFO (First In First Out) principle. It is used in scheduling, buffering, and handling requests in order." },
    { q: "What is a circular queue?", a: "A circular queue is a linear data structure in which the last position is connected back to the first to make a circle. It overcomes the problem of unused space in simple queues." },
    { q: "What is the difference between a stack and a queue?", a: "A stack uses LIFO while a queue uses FIFO. In a stack, insertion and deletion happen at the same end, whereas in a queue, insertion happens at the rear and deletion at the front." },
    { q: "Explain binary search and its time complexity.", a: "Binary search is an efficient algorithm to find an element in a sorted array by repeatedly dividing the search interval in half. Time complexity is O(log n)." },
    { q: "What is recursion?", a: "Recursion is a technique in which a function calls itself to solve a problem. It is commonly used in algorithms like factorial, Fibonacci series, and tree traversal." },
    { q: "What are the drawbacks of recursion?", a: "Drawbacks include high memory usage due to function call stack and risk of stack overflow if the recursion depth is too high." },
    { q: "What is a binary tree?", a: "A binary tree is a hierarchical structure in which each node has at most two children, called the left and right child." },
    { q: "What is a binary search tree (BST)?", a: "A binary search tree is a type of binary tree where the left child contains values less than the parent and the right child contains values greater than the parent." },
    { q: "What is tree traversal?", a: "Tree traversal refers to visiting all the nodes in a tree in a specific order. Common types include inorder, preorder, and postorder traversal." },
    { q: "What is the difference between BFS and DFS?", a: "BFS (Breadth First Search) explores nodes level by level, while DFS (Depth First Search) explores as far as possible along one branch before backtracking." },
    { q: "What is a graph?", a: "A graph is a non-linear data structure consisting of nodes (vertices) and edges connecting them. It can be directed or undirected." },
    { q: "What are the types of graphs?", a: "Types include directed, undirected, weighted, unweighted, cyclic, acyclic, connected, and disconnected graphs." },
    { q: "What is a hash table?", a: "A hash table is a data structure that maps keys to values using a hash function to compute an index into an array of buckets." },
    { q: "What is dynamic programming?", a: "Dynamic programming is a technique used to solve problems by breaking them down into simpler subproblems and storing the results to avoid redundant computations." },
    { q: "What is memoization?", a: "Memoization is an optimization technique where intermediate results are stored to avoid repeated computations in recursive algorithms." },
    { q: "What is the difference between greedy algorithms and dynamic programming?", a: "Greedy algorithms make local optimal choices, hoping to find a global optimum. Dynamic programming considers all possibilities and ensures the optimal solution." },
    { q: "What is time complexity?", a: "Time complexity is a measure of the amount of time an algorithm takes to run as a function of the input size." },
    { q: "What is space complexity?", a: "Space complexity is the amount of memory an algorithm uses in terms of the input size." },
    { q: "Explain the Big O notation.", a: "Big O notation describes the upper bound of an algorithm’s running time. It gives the worst-case scenario of an algorithm's growth rate." },
    { q: "What is the difference between best, worst, and average case?", a: "Best case is the minimum time taken, worst case is the maximum time taken, and average case is the expected time taken for an algorithm to complete." },
    { q: "What is sorting and why is it important?", a: "Sorting is the process of arranging data in a specific order. It improves the efficiency of other algorithms like search and merge." },
    { q: "Name some common sorting algorithms.", a: "Common sorting algorithms include Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort, and Heap Sort." },
    { q: "Which sorting algorithm is best in the worst case?", a: "Merge Sort is one of the best with a consistent worst-case time complexity of O(n log n)." },
    { q: "What is the difference between a shallow copy and a deep copy?", a: "A shallow copy copies references to objects, whereas a deep copy duplicates the actual objects themselves." },
    { q: "Explain the concept of backtracking.", a: "Backtracking is an algorithmic technique to solve problems incrementally by trying partial solutions and then abandoning them if they do not lead to a solution." }
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
      <h2>Top 30 DSA Theoretical Questions</h2>
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

export default DSA;
