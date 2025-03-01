
import React, { useState, useEffect } from 'react';
import SpeakButton from './SpeakButton';

const TranscriptDisplay = ({ original, translated, targetLang }) => {
  const [fadeInOriginal, setFadeInOriginal] = useState(false);
  const [fadeInTranslated, setFadeInTranslated] = useState(false);

  useEffect(() => {
    if (original) {
      setFadeInOriginal(true);
      const timeout = setTimeout(() => setFadeInOriginal(false), 500); 
      return () => clearTimeout(timeout);
    }
  }, [original]);

  useEffect(() => {
    if (translated) {
      setFadeInTranslated(true);
      const timeout = setTimeout(() => setFadeInTranslated(false), 500); 
      return () => clearTimeout(timeout);
    }
  }, [translated]);

  return (
    <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e90ff' }}>Original:</h3>
        <p 
          style={{
            padding: '12px',
            border: '1px solid #b3d9ff',
            borderRadius: '4px',
            backgroundColor: '#f5fbff', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            opacity: fadeInOriginal ? 1 : 1, 
            transition: 'opacity 0.5s ease-in',
          }}
        >
          {original || 'No transcript yet'}
        </p>
      </div>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e90ff' }}>Translated:</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p 
            style={{
              padding: '12px',
              border: '1px solid #b3d9ff',
              borderRadius: '4px',
              backgroundColor: '#f5fbff',
              flex: 1,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              opacity: fadeInTranslated ? 1 : 1, 
              transition: 'opacity 0.5s ease-in',
            }}
          >
            {translated || 'No translation yet'}
          </p>
          {translated && <SpeakButton text={translated} lang={targetLang} />}
        </div>
      </div>
    </div>
  );
};

export default TranscriptDisplay;