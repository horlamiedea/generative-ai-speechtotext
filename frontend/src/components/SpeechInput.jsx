
import React, { useState, useEffect } from 'react';

const SpeechInput = ({ onTranscript, sourceLang }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleStartRecording = () => {
    setShowPopup(true); 
  };

  const confirmRecording = () => {
    setShowPopup(false);
    setIsListening(true);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech Recognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = sourceLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript); 
      setIsListening(false);
      setError(null); 
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech') { 
        setError('Speech recognition error: ' + event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
      // Stop after 30 seconds
      const timeout = setTimeout(() => {
        recognition.stop();
      }, 30000); // 30 seconds

      return () => clearTimeout(timeout); 
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, sourceLang, onTranscript]);

  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    let animation;
    if (isListening) {
      animation = setInterval(() => {
        setPulse((prev) => !prev);
      }, 1000); 
    }
    return () => clearInterval(animation);
  }, [isListening]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000, 
          }}
          onClick={(e) => e.stopPropagation()} 
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '18px', color: '#333333', marginBottom: '16px' }}>
              This recording will last for 30 seconds. Continue?
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button
                onClick={confirmRecording}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#1e90ff', 
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4169e1'} 
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
              >
                Yes
              </button>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ff4444', // Red
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#cc0000'} 
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff4444'}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {!showPopup && ( 
        <button
          onClick={handleStartRecording}
          style={{
            padding: '12px 24px',
            borderRadius: '24px',
            backgroundColor: isListening ? '#ff4444' : '#1e90ff', 
            color: '#ffffff',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-color 0.3s',
            transform: pulse ? 'scale(1.1)' : 'scale(1)', 
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isListening ? '#cc0000' : '#4169e1'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isListening ? '#ff4444' : '#1e90ff'}
        >
          {isListening ? (
            <>
              <span style={{ marginRight: '8px' }}>Recording...</span>
              <span style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
            </>
          ) : (
            <>
              <span style={{ marginRight: '8px' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </span>
              Start Speaking
            </>
          )}
        </button>
      )}
      {error && <p style={{ color: '#ff4444', marginTop: '8px' }}>{error}</p>}

      {/* JavaScript for animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SpeechInput;