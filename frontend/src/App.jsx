
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechInput from './components/SpeechInput';
import LanguageSelector from './components/LanguageSelector';
import TranscriptDisplay from './components/TranscriptDisplay';

const App = () => {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);

  const handleTranscript = async (transcript) => {
    setOriginalText(transcript); 
    setError(null); 

    try {
      const response = await axios.post('http://localhost:8000/api/translate/', {
        text: transcript,
        source_lang: sourceLang,
        target_lang: targetLang,
      });
      setTranslatedText(response.data.translated); 
    } catch (err) {
      setError('Translation failed: ' + err.message);
    }
  };

  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 2000); 
    return () => clearInterval(bounceInterval);
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #e6f3ff, #cce5ff)', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div 
        style={{
          maxWidth: '800px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          transition: 'transform 0.5s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <h1 
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1e90ff', 
            transform: bounce ? 'translateY(-10px)' : 'translateY(0)',
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          Healthcare Translation App
        </h1>
        
        <div style={{ marginBottom: '16px' }}>
          <LanguageSelector
            label="Source Language"
            selectedLang={sourceLang}
            onChange={setSourceLang}
          />
          <LanguageSelector
            label="Target Language"
            selectedLang={targetLang}
            onChange={setTargetLang}
          />
        </div>

        <SpeechInput onTranscript={handleTranscript} sourceLang={sourceLang} />

        {error && (
          <p 
            style={{
              color: '#ff4444', 
              marginTop: '16px',
              textAlign: 'center',
              animation: 'shake 0.5s ease-in-out',
            }}
          >
            {error}
          </p>
        )}

        <TranscriptDisplay
          original={originalText}
          translated={translatedText}
          targetLang={targetLang}
        />
      </div>

      {/* JavaScript for animations */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};

export default App;