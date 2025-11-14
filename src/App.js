import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HR from './components/HR';
import Technical from './components/Technical';
import ResumeTips from './components/ResumeTips';
import DSA from './components/DSA';
import CoreSubjects from './components/CoreSubjects';
import Java from './components/Java';
import Cpp from './components/Cpp';
import Python from './components/Python';
import Javascript from './components/Javascript';
import C from './components/C';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Update body class and save preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
      <header
  className="header"
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px 20px'
  }}
>
  <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
  </button>
</header>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/resume" element={<ResumeTips />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/core" element={<CoreSubjects />} />
          <Route path="/java" element={<Java />} />
          <Route path="/cpp" element={<Cpp />} />
          <Route path="/python" element={<Python />} />
          <Route path="/javascript" element={<Javascript />} />
          <Route path="/c" element={<C />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
