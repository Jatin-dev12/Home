//--Welcome--//
import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./Ai.css";
import { Container, Row, Col } from "react-bootstrap";
import Side from "./Side";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faRotateRight  ,faArrowRightArrowLeft} from "@fortawesome/free-solid-svg-icons";

// --Languages for Speaking --//

const Ai = () => {
  const [supportedLanguages, setSupportedLanguages] = useState([
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
    { code: "ml", name: "Malayalam" },
    { code: "ta", name: "Tamil" },
    { code: "pa", name: "Punjabi" },
    { code: "ru", name: "Russian" },
    { code: "af", name: "Afrikaans" },
    { code: "am", name: "Amharic" },
    { code: "ar", name: "Arabic" },
    { code: "hy", name: "Armenian" },
    { code: "az", name: "Azerbaijani" },
    { code: "eu", name: "Basque" },
    { code: "bs", name: "Bosnian" },
    { code: "bg", name: "Bulgarian" },
    { code: "ca", name: "Catalan" },
    { code: "ceb", name: "Cebuano" },
    { code: "ny", name: "Chichewa" },
    // ...
  ]);

  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { transcript, resetTranscript, listening } = useSpeechRecognition({ language: currentLanguage });
  const [isPaused, setIsPaused] = useState(false); // New state variable for pause functionality
 
    // This Function Will Show Play/Stop Button When Startlistening is Running.//
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: currentLanguage , interimResults: true });
    }
    setIsPaused(!listening);
  };
// This is Switch  Language Functionality //
  const switchLanguage = () => {
    const index = supportedLanguages.findIndex((lang) => lang.code === currentLanguage);
    const newLanguage =
      index === supportedLanguages.length - 1
        ? supportedLanguages[0].code
        : supportedLanguages[index + 1].code;
    setCurrentLanguage(newLanguage);
  };

   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    SpeechRecognition.startListening({ continuous: true })
    return <div className="containers">Browser does not support speech recognition</div>;
  }


  // This Function Help to Start over a speech  recognition session //
  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 300); 
  };

  return (
    <>
    {/* This Div Is For Showing Side Bar */}
      <div className="container-fluid main-container">
        <div className="row">
          <div className="left-sidebar">
            <Side />
          </div>
          <div className="content-container">

            <h2>Speech to Text Converter</h2>
            

            <p className="sa">What Ever You Speak It Will Write Here Let's Say Something.</p>
            <Row className="bbs">
              {/* Button For Start / Stop Listening */}
              {/* <Col>
              <button onClick={toggleListening}>
                {listening ? (
                  <>
                   <a onClick={handleClick}>Start Over </a> 
                    <FontAwesomeIcon icon={faRotateRight} />
                  </>
                ) : (
                  <>
                    Start Listening
                    <FontAwesomeIcon icon={faPlay} />
                  </>
                )}
              </button>
              </Col> */}
              <Col>
              {/* This Button For Switch language */}
                <button className="sss" onClick={switchLanguage}>
                  Switch Language
                  <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                </button>
              </Col>
              <Col>
              {/* This Button For Start Over Speech */}
                <button className='as'  onClick={handleClick}>Start Over
                <FontAwesomeIcon icon={faRotateRight} />
                </button>
              </Col>
            </Row>
            <Row className="sls">
              <Col>
              {/* This Will Select language and Write in The Selected language */}
                <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
                  {supportedLanguages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
                  {/* Speech To Text Result */}
            <div className="main-content">{transcript}
            </div>
            <Row className="dasdad">
            <Col>
              <button onClick={toggleListening}>
                {listening ? (
                  <>
                   <a onClick={handleClick}>Start Over </a> 
                    <FontAwesomeIcon icon={faRotateRight} onClick={handleClick} />
                  </>
                ) : (
                  <>
                    Start Listening
                    <FontAwesomeIcon icon={faPlay} />
                  </>
                )}
              </button>
              </Col>
              <Col sm={1}></Col>
              <Col sm={5}><h5 className="on" style={{margin : "15px"}}>Microphone: {listening ? "on":"off"}</h5>
              </Col></Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ai;