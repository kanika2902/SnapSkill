import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function ResumeTips() {
  const tips = [
    { q: "What is the ideal length of a resume?", a: "For freshers and students, a one-page resume is ideal. Keep it concise and relevant to the job or internship you're applying for." },
    { q: "What are the must-have sections in a resume?", a: "Name and contact info, career objective, education, technical skills, projects, internships, certifications, and achievements. Add extracurriculars only if relevant." },
    { q: "How should I write a career objective?", a: "It should be tailored to the role you're applying for. Example: \"To obtain a software engineering position where I can leverage my coding skills and academic background to contribute to organizational goals.\"" },
    { q: "Should I include a photo in my resume?", a: "No. It is not standard in Indian resumes unless specifically asked. Focus on content and layout instead of visuals." },
    { q: "How do I make my resume ATS-friendly?", a: "Use simple fonts (like Arial or Calibri), avoid tables and graphics, use standard section headings, and save as PDF." },
    { q: "What kind of projects should I include?", a: "Include 2–3 well-explained academic or personal projects relevant to the job. Highlight your role, tech stack, and outcomes." },
    { q: "How should I list my skills?", a: "Separate into categories like Programming Languages, Web Technologies, Tools, etc. Be honest and only include what you can confidently explain." },
    { q: "Should I write achievements or hobbies?", a: "Mention achievements that demonstrate your skills (like hackathons, scholarships). Hobbies are optional unless they add value to your profile." },
    { q: "What’s the ideal file name for a resume?", a: "Use a professional format like YourName_Resume.pdf (e.g., KanikaChoudhary_Resume.pdf). Avoid generic names like Resume1.pdf." },
    { q: "Should I add LinkedIn or GitHub links?", a: "Yes. Only if your profiles are updated and presentable. Make sure the links work and reflect your best work." },
    { q: "Is it okay to use templates from online websites?", a: "Yes, but customize them to avoid generic designs. Use clean and readable formats. Ensure you don’t use colors or styles that look unprofessional." },
    { q: "How do I describe my internships?", a: "Use bullet points to explain your responsibilities, skills used, and impact you created. Begin with action verbs like \"Developed\", \"Collaborated\", \"Improved\" etc." },
    { q: "Should I mention soft skills in my resume?", a: "Only if backed by an example. Instead of writing 'Good communicator', show it through leadership roles or presentations." },
    { q: "What are some common mistakes in resumes?", a: "Grammatical errors, poor formatting, including false info, overly long resumes, and using buzzwords without substance." },
    { q: "How can I stand out with my resume as a fresher?", a: "Highlight unique projects, certifications, or leadership roles. Tailor your resume for each application and use impactful language." },
    { q: "How often should I update my resume?", a: "Ideally, after every new achievement – project, internship, certification, or competition. Keep a master copy and customize from there." },
    { q: "What are the best fonts and font sizes?", a: "Use professional fonts like Arial, Calibri, or Times New Roman. Ideal font size is 10–12 pt for body text and 14–16 pt for headings." },
    { q: "How to describe college projects in resume?", a: "Use a 2–3 line description mentioning project aim, tech stack used, and what you contributed. Mention achievements or outcomes if any." },
    { q: "Should I include class 10th/12th marks?", a: "Yes, along with your graduation marks. Mention board, year, and percentage/CGPA in a consistent format." },
    { q: "Can I use color in my resume?", a: "Minimal use of blue or grey for headings is acceptable, but avoid bright colors. Maintain a neat, formal tone throughout." }
  ];

  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (index) => {
    setVisibleAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="category-page">
      <h2>Resume Tips & Tricks</h2>
      {tips.map((item, index) => (
        <div key={index} className="question-card">
          <h4>Q{index + 1}: {item.q}</h4>
          <button onClick={() => toggleAnswer(index)} className="btn">
            {visibleAnswers[index] ? 'Hide Answer' : 'See Tip'}
          </button>
          {visibleAnswers[index] && (
            <p className="sample-answer" style={{ whiteSpace: 'pre-wrap' }}>💡 {item.a}</p>
          )}
        </div>
      ))}
      <Link to="/" className="back-btn">← Back to Home</Link>
    </div>
  );
}

export default ResumeTips;
