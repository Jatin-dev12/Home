import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./Ai.css";
import { Container, Row, Col } from "react-bootstrap";
import supportedLanguages from '../Text.json'
import Spellchecker from "hunspell-spellchecker";

const Ai = () => {
  const [supportedLanguages, setSupportedLanguages] = useState([
    { code: "af", name: "Afrikaans" },
    { code: "sq", name: "Albanian" },
    { code: "bn", name: "Bengali" },
    { code: "fr", name: "French" },
    { code: "en", name: "English" },
    { code: "de", name: "German" },
    { code: "gu", name: "Gujarati" },
    { code: "ja", name: "Japanese" },
    { code: "hi", name: "Hindi" },
    { code: "ka", name: "Georgian" },
    { code: "ne", name: "Nepali" },
    { code: "ar", name: "Arabic" },
    { code: "ml", name: "Malayalam" },
    { code: "ta", name: "Tamil" },
    { code: "pa", name: "Punjabi" },
    { code: "ru", name: "Russian" }
  ]);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition({ language: currentLanguage });
  const [correctedText, setCorrectedText] = useState("");

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
  };

  const switchLanguage = () => {
    const index = supportedLanguages.findIndex((lang) => lang.code === currentLanguage);
    const newLanguage =
      index === supportedLanguages.length - 1
        ? supportedLanguages[0].code
        : supportedLanguages[index + 1].code;
    setCurrentLanguage(newLanguage);
  };

  if (!browserSupportsSpeechRecognition) {
    return <div className="containers">Browser does not support speech recognition</div>;
  }

  const correctSpelling = (text) => {
    const spellchecker = new Spellchecker("en_US");
    const suggestions = spellchecker.getSuggestions(text);
    if (suggestions.length > 0) {
      return suggestions[0];
    }
    return text;
  };

   const correctedTextHandler = () => {
    const truncatedTranscript = transcript.split(" ").slice(0, 100).join(" ");
    let correctedText = truncatedTranscript.split(" ").map(correctSpelling).join(" ");
    setCorrectedText(correctedText);
  };;
  return (
    <>
      <div className="containers">
        <h2>Speech to Text Converter</h2>
        
        <p className="sa">
          What Ever You Speak It Will Write Here Let's Say Something.
        </p>

        <div className="main-content">
          
          {transcript}
        </div>

        <Container>  
          <Row><Col> <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
              {supportedLanguages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select></Col></Row>
        <Row>   
          <Col></Col>  
        <Col><button onClick={startListening}>Start Listening</button></Col>
        <Col><button onClick={switchLanguage}>Switch Language</button></Col>
        <Col><button onClick={SpeechRecognition.stopListening}>Stop Listening</button></Col>   
        <Col></Col>
          
          
          

          
           
            </Row>
         </Container>   
      </div>
    </>
  );
};

export default Ai;