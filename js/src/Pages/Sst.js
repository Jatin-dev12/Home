import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import '../App.css'
import Side from './Side'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faVolumeHigh, faPlay, faPause, faStop, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const Transcribe = () => {
  const [supportedLanguages, setSupportedLanguages] = useState([
    { code: "sq", name: "Albanian" }, { code: "bn", name: "Bengali" }, { code: "fr", name: "French" },
    { code: "en", name: "English" }, { code: "de", name: "German" }, { code: "gu", name: "Gujarati" },
    { code: "ja", name: "Japanese" }, { code: "hi", name: "Hindi" }, { code: "ka", name: "Georgian" },
    { code: "ne", name: "Nepali" }, { code: "ml", name: "Malayalam" }, { code: "ta", name: "Tamil" }, { code: "pa", name: "Punjabi" },
    { code: "ru", name: "Russian" }, { code: "af", name: "Afrikaans" },
    { code: "am", name: "Amharic" }, { code: "ar", name: "Arabic" }, { code: "hy", name: "Armenian" },
    { code: "az", name: "Azerbaijani" }, { code: "eu", name: "Basque" }, { code: "bs", name: "Bosnian" },
    { code: "bg", name: "Bulgarian" }, { code: "ca", name: "Catalan" }, { code: "ceb", name: "Cebuano" },
    { code: "ny", name: "Chichewa" },
  ]);

  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { transcript, resetTranscript, listening } = useSpeechRecognition({ language: currentLanguage });
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("hi");
  const [isActive, setIsActive] = useState(false);
  const [translationPlaceholder, setTranslationPlaceholder] = useState("Translation");
  const [speechSpeed, setSpeechSpeed] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  const [timer, setTimer] = useState(0);

  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);

  const countries = {
    "am": "Amharic", "ar": "Arabic", "be": "Bielarus", "bem": "Bemba", "bi": "Bislama", "bj": "Bajan", "bn": "Bengali", "bo": "Tibetan", "br": "Breton", "bs": "Bosnian", "ca": "Catalan", "cop": "Coptic", "cs": "Czech", "cy": "Welsh", "da": "Danish", "dz": "Dzongkha", "de-DE": "German", "dv-MV": "Maldivian", "el": "Greek", "en": "English", "es": "Spanish", "et": "Estonian", "eu-ES": "Basque", "fa": "Persian", "fi": "Finnish", "fn": "Fanagalo", "fo": "Faroese", "fr": "French", "gl": "Galician", "gu": "Gujarati", "ha": "Hausa", "he": "Hebrew", "hi": "Hindi", "hr": "Croatian", "hu": "Hungarian", "id": "Indonesian", "is": "Icelandic", "it": "Italian", "ja": "Japanese", "kk": "Kazakh", "km": "Khmer", "kn": "Kannada", "ko": "Korean", "ku": "Kurdish", "ky": "Kyrgyz", "la-VA": "Latin", "lo-LA": "Lao", "lv-LV": "Latvian", "men": "Mende", "mg": "Malagasy", "mi-NZ": "Maori", "ms-MY": "Malay", "mt-MT": "Maltese", "my": "Burmese", "ne": "Nepali", "niu": "Niuean", "nl": "Dutch", "no": "Norwegian", "ny": "Nyanja", "ur": "Pakistani", "pau": "Palauan", "pa": "Panjabi", "ps": "Pashto", "pis": "Pijin", "pl": "Polish", "pt": "Portuguese", "rn-BI": "Kirundi", "ro": "Romanian", "ru": "Russian", "sg": "Sango", "si": "Sinhala", "sk": "Slovak", "sm": "Samoan", "sn": "Shona", "so": "Somali", "sq-AL": "Albanian", "sr": "Serbian", "sv": "Swedish", "sw": "Swahili", "ta": "Tamil", "te": "Telugu", "tet": "Tetum", "tg": "Tajik", "th": "Thai", "ti": "Tigriny", "tk": "Turkmen", "tl": "Tagalog", "tn": "Tswana", "to": "Tongan", "tr": "Turkish", "uk": "Ukrainian", "uz": "Uzbek", "vi": "Vietnamese", "wo": "Wolof", "xh": "Xhosa", "yi": "Yiddish", "zu": "Zulu"
  };

  useEffect(() => {
    fetchTranslation();
    setUtterance(new SpeechSynthesisUtterance());
    setVoice(speechSynthesis.getVoices().find(voice => voice.name === 'Google हिन्दी'));
  }, [transcript, translateFrom, translateTo]);

  useEffect(() => {
    let interval;
  
    const handleBeforeUnload = () => {
      clearInterval(interval);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
   
    }
  
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isActive]);
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const speakText = () => {
    if (toText) {
      utterance.text = toText;
      utterance.voice = voice;
      utterance.rate = speechSpeed;
      utterance.pitch = speechPitch;
      utterance.volume = speechVolume;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.text = toText;
      utterance.voice = voice;
      utterance.rate = speechSpeed;
      utterance.pitch = speechPitch;
      utterance.volume = speechVolume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    setIsPaused(true);
    synth.pause();
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    setIsPaused(false);
    synth.cancel();
  };


  const encodedParams = new URLSearchParams();
  encodedParams.set('texte', transcript);
  encodedParams.set('to_lang', translateTo);

  const fetchTranslation = async () => {
    setTranslationPlaceholder("Translating...");
    const options = {
      method: 'POST',
      url: 'https://google-translation-unlimited.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '5740f38f9dmsh5c757bacb2a7b61p1af54bjsnf71b8b8b411c',
        'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      const translatedText = response.data.translation_data.translation;
      setToText(translatedText);
      setTranslationPlaceholder("Translation");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error_description === 'Daily Limit Exceeded') {
        setToText('Your translation limit is over. Please try again after 24 hours.');
        setTranslationPlaceholder('Translation');
      } else {
        // console.error(error);
      }
    }
  };
   
  const handleTouchStart = () => {
    setIsActive(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage, interimResults: true });
  };

  const handleTouchEnd = () => {
    setIsActive(false);
    SpeechRecognition.stopListening()
  };

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className='container-fluid main-container'>
      <div className='row'>
        <div className="left-sidebar">
          <Side />
        </div>
        <Container className="content-container">
          <Col>
            <h2>Speech to Text Translator</h2>
          </Col> 
           {/* <Col> {formatTime(timer)}</Col>     */}
          <Row className="bb">
            <Col>
              <button 
                className={`btn-class-name ${isActive ? 'active' : ''}`}
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              ><FontAwesomeIcon icon={faMicrophone} />
                <span className="back"></span>
                <span className="front"></span>
              </button>
            </Col>
            <Col>
              <button className="sda" onClick={handleClick}>
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
            </Col>
          </Row>
          <Row>
            <select className="dsh" value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
              {supportedLanguages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
            <Col className="main-content">
              <textarea
                rows={10}
                className="from-text"
                value={transcript}
                

                placeholder="Hold On Button to start..."
              />
              <div className={`loading ${isActive ? 'active' : ''}`}>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><p className="sadd">{formatTime(timer)}</p>
              </div>
            </Col>
            <select className="kjj" value={translateTo} onChange={(e) => setTranslateTo(e.target.value)}>
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <Col className="main-content">
              <textarea rows={10} className="to-text" value={toText} readOnly placeholder={translationPlaceholder} />
              <div className="volume">
                <FontAwesomeIcon icon={faVolumeHigh} className="normal-icon" onClick={speakText} />
              </div>
            </Col>
          </Row>
          <Row className="fas">
            <Col className="hide">
              <select
                value={currentLanguage}
                onChange={(e) => {
                  setCurrentLanguage(e.target.value);
                  setTranslateFrom(e.target.value);
                }}
              >
                {supportedLanguages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col> </Col>
            <Col className="2hd">
              <select value={translateTo} onChange={(e) => setTranslateTo(e.target.value)}>
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </Col>
            {/* This Code For Speach Area */}
          </Row>
          <Col></Col>
          <Col></Col>
        
        <Row className="dssa">
          
          <Col>
            <label htmlFor="speed" className="kkkk">Speed:</label>
            <input
              type="range"
              id="speed"
              min="0.5"
              max="2"
              step="0.1"
              value={speechSpeed}
              onChange={(e) => setSpeechSpeed(e.target.value)}
            />
          </Col>

          <Col>
            <label htmlFor="pitch" className="kkkk">Pitch:</label>
            <input
              type="range"
              id="pitch"
              min="0.5"
              max="2"
              step="0.1"
              value={speechPitch}
              onChange={(e) => setSpeechPitch(e.target.value)}
            />
          </Col>

          <Col>
            <label htmlFor="volume" className="kkkk">Volume:</label>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.1"
              value={speechVolume}
              onChange={(e) => setSpeechVolume(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="xcdc">
        
          <Col>
            <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </Col>
          <Col>
            <button onClick={handlePause}>Pause
              <FontAwesomeIcon icon={faPause} />
            </button>
          </Col>
          <Col>
            <button onClick={handleStop}>Stop
              <FontAwesomeIcon icon={faStop} />
            </button>
          
          </Col>
          
        </Row></Container>
      </div>
    </div>
  );
};

export default Transcribe;


// import React, { useState, useEffect } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import axios from "axios";
// import { Container, Row, Col } from "react-bootstrap";
// import '../App.css'
// import Side from './Side'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faRotateRight ,faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

// const Transcribe = () => {
//   const [supportedLanguages, setSupportedLanguages] = useState([
//     { code: "sq", name: "Albanian" }, { code: "bn", name: "Bengali" }, { code: "fr", name: "French" },
//     { code: "en", name: "English" }, { code: "de", name: "German" }, { code: "gu", name: "Gujarati" },
//     { code: "ja", name: "Japanese" }, { code: "hi", name: "Hindi" }, { code: "ka", name: "Georgian" },
//     { code: "ne", name: "Nepali" }, { code: "ml", name: "Malayalam" }, { code: "ta", name: "Tamil" }, { code: "pa", name: "Punjabi" },
//     { code: "ru", name: "Russian" }, { code: "af", name: "Afrikaans" }, 
//     { code: "am", name: "Amharic" }, { code: "ar", name: "Arabic" }, { code: "hy", name: "Armenian" },
//     { code: "az", name: "Azerbaijani" }, { code: "eu", name: "Basque" }, { code: "bs", name: "Bosnian" },
//     { code: "bg", name: "Bulgarian" }, { code: "ca", name: "Catalan" }, { code: "ceb", name: "Cebuano" },
//     { code: "ny", name: "Chichewa" },
//   ]);

//   const [currentLanguage, setCurrentLanguage] = useState("en");
//   const { transcript, resetTranscript, listening } = useSpeechRecognition({ language: currentLanguage });
//   const [fromText, setFromText] = useState("");
//   const [toText, setToText] = useState("");
//   const [isPaused, setIsPaused] = useState(false);
//   const [translateFrom, setTranslateFrom] = useState("en-GB");
//   const [translateTo, setTranslateTo] = useState("hi");
//   const [isActive, setIsActive] = useState(false);
//   const [translationPlaceholder, setTranslationPlaceholder] = useState("Translation");
//   const [speechSpeed, setSpeechSpeed] = useState(1);
//   const [speechPitch, setSpeechPitch] = useState(1);
//   const [speechVolume, setSpeechVolume] = useState(1);
  

//   const countries = {
//     "am": "Amharic", "ar": "Arabic", "be": "Bielarus", "bem": "Bemba", "bi": "Bislama", "bj": "Bajan", "bn": "Bengali", "bo": "Tibetan", "br": "Breton", "bs": "Bosnian", "ca": "Catalan", "cop": "Coptic", "cs": "Czech", "cy": "Welsh", "da": "Danish", "dz": "Dzongkha", "de-DE": "German", "dv-MV": "Maldivian", "el": "Greek", "en": "English", "es": "Spanish", "et": "Estonian", "eu-ES": "Basque", "fa": "Persian", "fi": "Finnish", "fn": "Fanagalo", "fo": "Faroese", "fr": "French", "gl": "Galician", "gu": "Gujarati", "ha": "Hausa", "he": "Hebrew", "hi": "Hindi", "hr": "Croatian", "hu": "Hungarian", "id": "Indonesian", "is": "Icelandic", "it": "Italian", "ja": "Japanese", "kk": "Kazakh", "km": "Khmer", "kn": "Kannada", "ko": "Korean", "ku": "Kurdish", "ky": "Kyrgyz", "la-VA": "Latin", "lo-LA": "Lao", "lv-LV": "Latvian", "men": "Mende", "mg": "Malagasy", "mi-NZ": "Maori", "ms-MY": "Malay", "mt-MT": "Maltese", "my": "Burmese", "ne": "Nepali", "niu": "Niuean", "nl": "Dutch", "no": "Norwegian", "ny": "Nyanja", "ur": "Pakistani", "pau": "Palauan", "pa": "Panjabi", "ps": "Pashto", "pis": "Pijin", "pl": "Polish", "pt": "Portuguese", "rn-BI": "Kirundi", "ro": "Romanian", "ru": "Russian", "sg": "Sango", "si": "Sinhala", "sk": "Slovak", "sm": "Samoan", "sn": "Shona", "so": "Somali", "sq-AL": "Albanian", "sr": "Serbian", "sv": "Swedish", "sw": "Swahili", "ta": "Tamil", "te": "Telugu", "tet": "Tetum", "tg": "Tajik", "th": "Thai", "ti": "Tigriny", "tk": "Turkmen", "tl": "Tagalog", "tn": "Tswana", "to": "Tongan", "tr": "Turkish", "uk": "Ukrainian", "uz": "Uzbek", "vi": "Vietnamese", "wo": "Wolof", "xh": "Xhosa", "yi": "Yiddish", "zu": "Zulu"
//   };

//   useEffect(() => {
//     fetchTranslation();
//   }, [transcript, translateFrom, translateTo]);

//   const speakText = () => {
//     if (toText) {
//       const utterance = new SpeechSynthesisUtterance(toText);
//       utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google हिन्दी');
//       utterance.rate = speechSpeed;
//       utterance.pitch = speechPitch;
//       utterance.volume = speechVolume;
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const encodedParams = new URLSearchParams();
//   encodedParams.set('texte', transcript);
//   encodedParams.set('to_lang', translateTo);

//   const fetchTranslation = async () => {
//     setTranslationPlaceholder("Translating...");
//     const options = {
//       method: 'POST',
//       url: 'https://google-translation-unlimited.p.rapidapi.com/translate',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'X-RapidAPI-Key': '5740f38f9dmsh5c757bacb2a7b61p1af54bjsnf71b8b8b411c',
//         'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
//       },
//       data: encodedParams,
//     };

//     try {
//       const response = await axios.request(options);
//       const translatedText = response.data.translation_data.translation;
//       setToText(translatedText);
//       setTranslationPlaceholder("Translation");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error_description === 'Daily Limit Exceeded') {
//         setToText('Your translation limit is over. Please try again after 24 hours.');
//         setTranslationPlaceholder('Translation');
//       } else {
//         // console.error(error);
//       }
//     }
//   };

  
//   const handleMouseDown = () => {
//  setIsActive(true);
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true, language: currentLanguage, interimResults: true });
//   };
  
//   const handleMouseUp = () => {
//    setIsActive(false);
//     SpeechRecognition.stopListening()
//   };

//   const handleClick = () => {
//     setTimeout(() => {
//       window.location.reload();
//     }, 400);
//   };

  
//   return (
//     <div className='container-fluid main-container'>
//       <div className='row'>
//         <div className="left-sidebar">
//           <Side />
//         </div>
//         <Container className="content-container">
//           <Col>
//             <h2>Speech to Text Translator</h2>
//           </Col>
//           <Row className="bb">
//             <Col>
//               <button 
//                 className={`btn-class-name ${isActive ? 'active' : ''}`}
//                 onMouseDown={handleMouseDown}
//                 onMouseUp={handleMouseUp}
//               >
//                 <span className="back"></span>
//                 <span className="front"></span>
//               </button>
//             </Col>
//             <Col>
//               <button className="sda" onClick={handleClick}>
//                 <FontAwesomeIcon icon={faRotateRight} />
//               </button>
//             </Col>
//           </Row>
//           <Row>
//             <select className="dsh" value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
//               {supportedLanguages.map((language) => (
//                 <option key={language.code} value={language.code}>
//                   {language.name}
//                 </option>
//               ))}
//             </select>
//             <Col className="main-content">
//               <textarea
//                 rows={10}
//                 className="from-text"
//                 value={transcript}
//                 onChange={(e) => setFromText(e.target.value)}
//                 placeholder="Hold On Button to start..."
//               />
//               <div className={`loading ${isActive ? 'active' : ''}`}>
//                 <span></span><span></span><span></span><span></span>
//                 <span></span><span></span><span></span><span></span>
//                 <span></span><span></span><span></span><span></span>
//                 <span></span><span></span><span></span><span></span>
//                 <span></span><span></span><span></span><span></span> 
//                 <span></span><span></span>
                
//               </div>
//             </Col>
//             <select className="kjj" value={translateTo} onChange={(e) => setTranslateTo(e.target.value)}>
//               {Object.entries(countries).map(([code, name]) => (
//                 <option key={code} value={code}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//             <Col className="main-content">
//               <textarea rows={10} className="to-text" value={toText} readOnly placeholder={translationPlaceholder} />
//               <div className="volume">
//                 <FontAwesomeIcon icon={faVolumeHigh} className="normal-icon" onClick={speakText} />
//               </div>
            
//             </Col>
//           </Row>
//           <Row className="fas">
//             <Col className="hide">
//               <select
//                 value={currentLanguage}
//                 onChange={(e) => {
//                   setCurrentLanguage(e.target.value);
//                   setTranslateFrom(e.target.value);
//                 }}
//               >
//                 {supportedLanguages.map((language) => (
//                   <option key={language.code} value={language.code}>
//                     {language.name}
//                   </option>
//                 ))}
//               </select>
//             </Col>
//             <Col> </Col>
//             <Col className="2hd">
//               <select value={translateTo} onChange={(e) => setTranslateTo(e.target.value)}>
//                 {Object.entries(countries).map(([code, name]) => (
//                   <option key={code} value={code}>
//                     {name}
//                   </option>
//                 ))}
//               </select>
//             </Col>
//             {/* This Code For Speach Area */}
//           </Row>
//           <Col></Col>
//           <Col></Col>
//         </Container>
//        <Row className="dssa">
//         <Col></Col>
//         <Col><label htmlFor="speed" className="kkkk" >Speed:</label>
//                 <input 
//                   type="range"
//                   id="speed"
//                   min="0.5"
//                   max="2"
//                   step="0.1"
//                   value={speechSpeed}
//                   onChange={(e) => setSpeechSpeed(e.target.value)}
//                 /></Col>

//         <Col><label htmlFor="pitch" className="kkkk" >Pitch:</label>
//                 <input
//                   type="range"
//                   id="pitch"
//                   min="0.5"
//                   max="2"
//                   step="0.1"
//                   value={speechPitch}
//                   onChange={(e) => setSpeechPitch(e.target.value)}
//                 /></Col>

//         <Col> <label htmlFor="volume" className="kkkk">Volume:</label>
//                 <input
//                   type="range"
//                   id="volume"
//                   min="0"
//                   max="1"
//                   step="0.1"
//                   value={speechVolume}
//                   onChange={(e) => setSpeechVolume(e.target.value)}
//                 /></Col></Row>
          
                
//               </div>
          
//       </div>

    
//   );
// };

// export default Transcribe;