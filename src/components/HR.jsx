import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

function HR() {
  const questions = [
    {
    q: "Tell me about yourself.",
    a: "I’m currently pursuing a degree in Computer Science, and over the past few years, I’ve developed a strong interest in problem-solving and team-based learning. I enjoy working on real-life projects, exploring new technologies, and I'm always excited about opportunities that help me grow both personally and professionally."
  },
  {
    q: "What are your strengths?",
    a: "I’d say one of my biggest strengths is my communication — I can connect with people easily and work well in team environments. I’m also quite adaptive and can quickly adjust to new tools, people, or challenges without hesitation."
  },
  {
    q: "What is your biggest weakness?",
    a: "I tend to overthink small things sometimes — whether it's double-checking emails or project details. While this comes from a place of wanting to get things right, I’m learning to balance perfectionism with being more action-oriented and trusting my instincts."
  },
  {
    q: "Why should we hire you?",
    a: "I believe I bring a mix of enthusiasm, learning mindset, and a genuine interest in making a positive contribution. I’m not only technically sound but also emotionally intelligent — I listen, I learn, and I take feedback seriously, which helps me improve continuously."
  },
  {
    q: "Where do you see yourself in 5 years?",
    a: "In five years, I see myself growing within a company that values learning and innovation. Ideally, I’d be in a leadership position, mentoring new team members and working on meaningful projects that have real impact."
  },
  {
    q: "Describe a challenging situation and how you handled it.",
    a: "During a college group project, one of our team members stopped responding midway. Instead of panicking, I initiated one-on-one communication, realigned tasks with the rest of the team, and ensured that we still delivered on time. It taught me a lot about handling uncertainty and taking initiative under pressure."
  },
  {
    q: "What motivates you?",
    a: "Knowing that what I do makes a difference — even in small ways — really motivates me. I get a lot of satisfaction from solving problems, completing goals, and being appreciated for consistent effort. Learning something new or pushing my limits also energizes me."
  },
  {
    q: "Are you a team player?",
    a: "Yes, absolutely. I believe in collaboration and have always enjoyed working in teams. In fact, some of my best learning experiences have come from discussions with peers and working together on projects where everyone brings something unique to the table."
  },
  {
    q: "How do you handle criticism?",
    a: "I try to see criticism as a tool for growth. Initially, it might sting a bit — because we all care about our work — but I’ve learned to pause, reflect, and find the lesson in the feedback. It’s helped me improve many times over."
  },
  {
    q: "What are your hobbies?",
    a: "I really enjoy cooking and trying new recipes — it's like meditation for me. I also love traveling and exploring new cultures. Lately, I’ve been getting into reading self-growth books and watching tech talks to stay inspired."
  },
    {
  q: "Do you prefer working alone or in a team?",
  a: "I’m comfortable with both, but I genuinely enjoy being part of a team. Working together brings fresh perspectives, and I feel that teamwork often leads to better solutions. At the same time, I’m self-driven enough to stay focused when working independently."
},
{
  q: "Tell me about a time you failed.",
  a: "During my second-year project, I underestimated the time required for integration and we missed the demo deadline. It was frustrating, but it taught me the value of realistic planning and buffer time. Now I always account for unexpected delays when planning any task."
},
{
  q: "What does success mean to you?",
  a: "Success for me is about growth — not just reaching big goals, but also learning something every step of the way. It means being better today than I was yesterday, feeling proud of my work, and having a positive impact on the people around me."
},
{
  q: "Describe yourself in three words.",
  a: "Curious, dependable, and adaptable. I love asking questions, I stay committed to my responsibilities, and I’m always open to learning and changing when needed."
},
{
  q: "How do you prioritize tasks?",
  a: "I usually start by listing all my tasks and identifying which ones are time-sensitive or high-impact. I use planners or digital to-do lists to break big tasks into smaller steps and review priorities daily so I stay on track."
},
{
  q: "How do you handle stress?",
  a: "I try to stay calm and organized under stress. I usually break down tasks, take small breaks, and talk to someone I trust if needed. I’ve realized that most stressful situations feel less overwhelming when we tackle them step by step."
},
{
  q: "Have you ever led a team?",
  a: "Yes, I led my mini-project team in college. I coordinated task distribution, set up regular check-ins, and ensured everyone felt heard. It was a great experience where I learned to balance leadership with empathy."
},
{
  q: "Why do you want to work here?",
  a: "I’ve read a lot about your company’s growth and focus on innovation, and I feel aligned with your values. I’m looking for a place where I can learn, contribute meaningfully, and grow long-term — and your company seems like the right place for that."
},
{
  q: "Do you have any questions for us?",
  a: "Yes, I’d love to know how your company defines success for someone in this role. Also, what kind of growth opportunities are available for freshers?"
},
{
  q: "What are your salary expectations?",
  a: "As a fresher, I’m open and flexible. My focus is on gaining experience and contributing to the team. I’m confident your offer will be fair as per industry standards."
},
{
  q: "How do you stay organized?",
  a: "I rely on digital tools like Trello and Notion, along with simple to-do lists. I also use time-blocking to ensure I dedicate focused time to important tasks, and I always review my plan the night before."
},
{
  q: "What are your career goals?",
  a: "In the short term, I want to become confident in my technical and communication skills by working on challenging projects. In the long term, I see myself growing into leadership roles and mentoring others, while staying grounded in continuous learning."
},
{
  q: "What do you know about our company?",
  a: "You’re known for building impactful products and maintaining a supportive work culture. I’ve seen positive employee reviews, and your focus on innovation and customer experience really stood out to me during my research."
},
{
  q: "What values are important to you?",
  a: "Honesty, empathy, and continuous improvement are the values I live by. I believe that when we stay authentic, care about others, and always strive to improve — we grow not just professionally, but as individuals too."
},
{
  q: "Are you willing to relocate?",
  a: "Yes, I’m open to relocation if the opportunity supports my growth and aligns with my career goals. I see it as a chance to explore new environments and step out of my comfort zone."
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
      <h2>Top 25 HR Interview Questions</h2>

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

      <Link to="/" className="back-btn">← Back to Home</Link>
    </div>
  );
}

export default HR;
