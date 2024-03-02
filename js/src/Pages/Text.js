import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./Ai.css";
import { Row, Col } from "react-bootstrap";
import Side from "./Side";

const Ai = () => {
  const [supportedLanguages] = useState([
    { code: "sq", name: "Albanian" }, { code: "bn", name: "Bengali" }, { code: "fr", name: "French" },
    { code: "en", name: "English" },    { code: "de", name: "German" },    { code: "gu", name: "Gujarati" },
    { code: "ja", name: "Japanese" },    { code: "hi", name: "Hindi" },    { code: "ka", name: "Georgian" },
    { code: "ne", name: "Nepali" },    { code: "ml", name: "Malayalam" },    { code: "ta", name: "Tamil" },    { code: "pa", name: "Punjabi" },
    { code: "ru", name: "Russian" },    { code: "af", name: "Afrikaans" },    { code: "fr", name: "French" },
    { code: "am", name: "Amharic" },    { code: "ar", name: "Arabic" },    { code: "hy", name: "Armenian" },
    { code: "az", name: "Azerbaijani" },    { code: "eu", name: "Basque" },    { code: "bs", name: "Bosnian" },
    { code: "bg", name: "Bulgarian" },   { code: "ca", name: "Catalan" },    { code: "ceb", name: "Cebuano" },
    { code: "ny", name: "Chichewa" },
  ]);

  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { transcript, resetTranscript, listening } = useSpeechRecognition({ language: currentLanguage });

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
  };

  const switchLanguage = () => {
    const index = supportedLanguages.findIndex((lang) => lang.code === currentLanguage);
    const newLanguage =
      index === supportedLanguages.length - 1 ? supportedLanguages[0].code : supportedLanguages[index + 1].code;
    setCurrentLanguage(newLanguage);
  };



  useEffect(() => {
    const accessMicrophone = async () => {
      try {
        await SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
      } catch (error) {
        console.error(error);
      }
    };

    const handleSpeechStart = () => {
      startListening();
    };

    if (listening) {
      handleSpeechStart();
    } else {
      accessMicrophone();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div className="containers">Browser does not support speech recognition</div>;
  }

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 400); // Delay for 400 milliseconds (0.4 seconds)
  }

  return (
    <>
      <div className='container-fluid main-container'>
      <div className='row'>
      <div className="left-sidebar">
        < Side/>
      </div>
        <div className="content-container">
          <h2>Speech to Text Converter</h2>

          <p className="sa">
            What Ever You Speak It Will Write Here Let's Say Something.
          </p>
          <Row className="bb">   
            
          <Col><button onClick={startListening}>Start Listening</button></Col>
          <Col><button className="sss"   onClick={switchLanguage}>Switch Language</button></Col>
          <Col><button onClick={handleClick}>Start Over</button></Col>   
        
            
            
            

            
            
              </Row>
              <Row className="sls">
              <Col>
                <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
                  {supportedLanguages.map((language) => (
                    <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select></Col></Row>
        
          <div className="main-content">
          {transcript}
          </div>

            </div>
        </div>
        </div>
    </>
  );
};

export default Ai;