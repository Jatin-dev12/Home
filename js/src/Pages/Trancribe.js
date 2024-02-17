import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognition from "react-speech-recognition";
import { useTranslation } from "react-i18next";
import Spellchecker from "hunspell-spellchecker";
import supportedLanguages from "../Text.json";

const Ai = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [correctedText, setCorrectedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState(currentLanguage);

  const debounce = (func, delay) => {
    const debouncedFunc = (...args) => {
      clearTimeout(debouncedFunc.timeoutId);
      debouncedFunc.timeoutId = setTimeout(() => func(...args), delay);
    };
    debouncedFunc.timeoutId = null;
    return debouncedFunc;
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
  };

  const switchLanguage = () => {
    setCurrentLanguage((prevLocale) => (prevLocale === "en" ? "es" : "en"));
  };

  const correctSpelling = (text) => {
    const spellchecker = new Spellchecker("en_US");
    const suggestions = spellchecker.getSuggestions(text);
    if (suggestions.length > 0) {
      return suggestions[0];
    }
    return text;
  };

  const correctedTextHandler = useCallback(debounce(() => {
    const truncatedTranscript = SpeechRecognition.transcript.split(' ').slice(0, 100).join(' ');
    let correctedText = truncatedTranscript.split(' ').map(correctSpelling).join(' ');
    setCorrectedText(correctedText);
    const translatedText = t(correctedText, { lng: targetLanguage });
    setTranslatedText(translatedText);
  }), [t, targetLanguage]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [currentLanguage]);

  return (
    <>
      <div className="containers">
        <h2>Speech to Text Converter</h2>
        <p className="sa">
          What Ever You Speak It Will Write Here Let's Say Something.
        </p>
        <div className="main-content">
          {correctedText}
        </div>
        <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
          {supportedLanguages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={switchLanguage}>Switch Language</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      </div>
    </>
  );
};

export default Ai;
// import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import "./Ai.css";
// import { Container, Row, Col, Form } from "react-bootstrap";
// import supportedLanguages from "../Text.json";
// import Spellchecker from "hunspell-spellchecker";
// import axios from "axios";
// import { FormattedMessage, IntlProvider, defineMessages } from "react-intl";

// const LanguageSelector = ({ locale, setLocale }) => {
//   const handleSelectChange = (e) => {
//     setLocale(e.target.value);
//   };

//   return (
//     <Form.Group controlId="languageSelector">
//       <Form.Label><FormattedMessage {...messages.selectLanguage} /></Form.Label>
//       <Form.Control as="select" value={locale} onChange={handleSelectChange}>
//         <option value="en"><FormattedMessage {...messages.english} /></option>
//         <option value="es"><FormattedMessage {...messages.spanish} /></option>
//       </Form.Control>
//     </Form.Group>
//   );
// };

// LanguageSelector.propTypes = {
//   locale: PropTypes.string.isRequired,
//   setLocale: PropTypes.func.isRequired,
// };

// const Ai = () => {
//   const [locale, setLocale] = useState("en");
//   const [correctedText, setCorrectedText] = useState("");
//   const [translation, setTranslation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const messages = defineMessages({
//     text: { id: "text", defaultMessage: "Speak here..." },
//     startListening: { id: "startListening", defaultMessage: "Start" },
//     stopListening: { id: "stopListening", defaultMessage: "Stop" },
//     translator: { id: "translator", defaultMessage: "Translator" },
//     translateText: { id: "translateText", defaultMessage: "Translate text" },
//     translation: { id: "translation", defaultMessage: "Translation:" },
//     selectLanguage: { id: "selectLanguage", defaultMessage: "Select language" },
//     spanish: { id: "spanish", defaultMessage: "Spanish" },
//     english: { id: "english", defaultMessage: "English" },
//   });

//   const currentLanguage = locale === "en" ? "es" : "en";

//   const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ language: currentLanguage });

//   useEffect(() => {
//     return () => {
//       resetTranscript();
//     };
//   }, [resetTranscript]);

//   const debounce = (func, delay) => {
//     const debouncedFunc = (...args) => {
//       clearTimeout(debouncedFunc.timeoutId);
//       debouncedFunc.timeoutId = setTimeout(() => func(...args), delay);
//     };
//     debouncedFunc.timeoutId = null;
//     return debouncedFunc;
//   };

//   const startListening = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
//   };

//   const switchLanguage = () => {
//     setLocale((prevLocale) => (prevLocale === "en" ? "es" : "en"));
//   };

//   const correctSpelling = (text) => {
//     const spellchecker = new Spellchecker("en_US");
//     const suggestions = spellchecker.getSuggestions(text);
//     if (suggestions.length > 0) {
//       return suggestions[0];
//     }
//     return text;
//   };

//   const correctedTextHandler = useCallback(debounce(() => {
//     const truncatedTranscript = transcript.split(" ").slice(0, 100).join(" ");
//     let correctedText = truncatedTranscript.split(" ").map(correctSpelling).join(" ");
//     setCorrectedText(correctedText);
//   }
//   return (
//     <>
//       <div className="containers">
//         <h2>Speech to Text Converter</h2>
        
//         <p className="sa">
//           What Ever You Speak It Will Write Here Let's Say Something.
//         </p>

//         <div className="main-content">
          
//           {correctedText}
//         </div>

//         <Container>  
//           <Row><Col> <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
//               {supportedLanguages.map((language) => (
//                 <option key={language.code} value={language.code}>
//                   {language.name}
//                 </option>
//               ))}
//             </select></Col></Row>
//         <Row>   
//           <Col></Col>  
//         <Col><button onClick={startListening}>Start Listening</button></Col>
//         <Col><button onClick={switchLanguage}>Switch Language</button></Col>
//         <Col><button onClick={SpeechRecognition.stopListening}>Stop Listening</button></Col>   
//         <Col></Col>
          
          
          

          
           
//             </Row>
//          </Container>   
//       </div>
//     </>
//   );
// };

// export default Ai;