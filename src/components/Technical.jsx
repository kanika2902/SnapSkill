import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function Technical() {
  const categories = [
    { name: "Java", path: "/java" },
    { name: "C++", path: "/cpp" },
    { name: "Python", path: "/python" },
    { name: "JavaScript", path: "/javascript" },
    { name: "C", path: "/c" }
  ];

  return (
    <div className="category-page">
      <h2>Select a Programming Language</h2>
      <div className="category-container">
        {categories.map((cat, index) => (
          <Link key={index} to={cat.path} className="category-box">
            {cat.name}
          </Link>
        ))}
      </div>
      <Link to="/" className="back-btn">← Back to Home</Link>
    </div>
  );
}

export default Technical;
