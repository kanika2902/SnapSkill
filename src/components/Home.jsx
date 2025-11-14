import './Home.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is active on first load
    setIsDarkMode(document.body.classList.contains('dark-mode'));

    // Observe changes in body class to detect theme switch
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== Header Navigation ===== */}
      <header className="header">
        <div className="logo-container">
          <img className="logo-image" src="/logo.png" alt="Skill Snap logo" />
          <span className="logo">Snapskill</span>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#categories">Categories</a>
        </nav>
      </header>

      {/* ===== Intro Section ===== */}
      <section id="home" className="section home-section">
        <div className="intro-left">
          <img
            src={isDarkMode ? "/darkmodeimage.png" : "/homeImage.jpg"}
            alt="Intro Visual"
          />
        </div>
        <div className="intro-right">
          <h1>Welcome to SnapSkill</h1>
          <p>Your personal interview practice buddy!</p>
        </div>
      </section>

      <section className="prop-section" >

<div className="four-boxes">
  <div className="box">Voice Practice</div>
  <div className="box">Beginner Friendly</div>
  <div className="box">Category-Wise Prep</div>
  <div className="box">Confidence Builder</div>
</div>
</section>

      {/* ===== About Section ===== */}

<h2 className="about-heading" id="about">Why SnapSkill?</h2>

<section id="about" className="section about-section">

  {/* Top Left Para */}
  <div className="about-left"> 
    <p>
      Interviews don’t have to be intimidating. Skill Snap is your daily practice partner — guiding you from anxiety to clarity.
    </p>
  </div>

  {/* Top Right Para */}
  <div className="about-right">
    <p>
      From voice-based reflection to real HR questions, we help you learn in a quiet, calm, self-paced environment.
    </p>
  </div>

  {/* Bottom Left Para */}
  <div className="about-left-bottom">
    <p>
      Practice consistently, speak confidently. With Skill Snap, your communication skills grow one voice session at a time.
    </p>
  </div>

  {/* Image Centered in Middle */}
  <div className="about-middle">
    <lottie-player
      src="https://assets2.lottiefiles.com/packages/lf20_kyu7xb1v.json"
      background="transparent"
      speed="1"
      style={{ width: "320px", height: "320px", marginTop: "120px" }}
      loop
      autoplay>
    </lottie-player>
  </div>

  {/* Bottom Right Para */}
  <div className="about-right-bottom">
    <p>
      Whether you're shy or unsure, we’re here to help you prepare smartly and speak with impact in interviews.
    </p>
  </div>

</section>


      {/* ===== Categories Section ===== */}
<section id="categories" className="section categories-section">
  <h2 className="category-heading">Categories</h2>

  <div className="category-grid">
    <Link to="/hr" className="cate-main">
      <div className="cate-head"><h1>HR-Questions</h1></div>
      <div className="cate-para"><p>Prepare for behavioral questions with sample answers & voice recording feature</p></div>
    </Link>

    <Link to="/technical" className="cate-main">
      <div className="cate-head"><h1>Technical</h1></div>
      <div className="cate-para"><p>Practice technical interview questions and improve coding concepts with confidence</p></div>
    </Link>

    <Link to="/resume" className="cate-main">
      <div className="cate-head"><h1>Resume Tips</h1></div>
      <div className="cate-para"><p>Sharpen your resume and make it the best one to get shortlisted</p></div>
    </Link>

    <Link to="/dsa" className="cate-main">
      <div className="cate-head"><h1>DSA</h1></div>
      <div className="cate-para"><p>Master Data Structures & Algorithms with problem-solving patterns and examples</p></div>
    </Link>

    <Link to="/core" className="cate-main">
      <div className="cate-head"><h1>Core Subjects</h1></div>
      <div className="cate-para"><p>Revise core engineering subjects like OS, DBMS, CN, and OOP for interviews</p></div>
    </Link>
  </div>
</section>


      {/* ===== Footer ===== */}
      <footer className="footer">
  <div className="footer-container">
    
    <div className="footer-about">
      <h3>Skill Snap</h3>
      <p>Your path to confident interviews through practice and preparation.</p>
    </div>

    
    <div className="footer-contact">
      <h4>Contact</h4>
      <p>Email: support@skillsnap.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>New Delhi, India</p>
    </div>

    
    <div className="footer-social">
      <h4>Follow Us</h4>
      <div className="social-icons">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-linkedin-in"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
<a href="#"><i className="fab fa-telegram-plane"></i>
</a>

      </div>
    </div>
  </div>

  
  <div className="footer-bottom">
    <p>© 2025 Skill Snap. All rights reserved.</p>
  </div>
</footer>
     
    </>
  );
}

export default Home;