import React, { useState, useRef } from 'react';

function Practice() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start();
    setIsRecording(true);

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      chunks.current = [];
    };
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <h2>Practice Interview Questions</h2>
      <p>Click below to record your voice while answering a question.</p>

      {!isRecording ? (
        <button onClick={startRecording}>🎤 Start Recording</button>
      ) : (
        <button onClick={stopRecording}>🛑 Stop Recording</button>
      )}

      {audioURL && (
        <div style={{ marginTop: '20px' }}>
          <h4>Your Recording:</h4>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
}

export default Practice;
