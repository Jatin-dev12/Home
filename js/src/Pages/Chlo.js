import React from 'react'

function Chlo() {
  return (
    <div>
      
    </div>
  )
}

export default Chlo



// This Code IS Running With A goggle Api Translater // 
// Its a backup code //


// import React, { useState, useEffect } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import axios from "axios";
// import { Container, Row, Col } from "react-bootstrap";
// import '../App.css'
// import Side from './Side'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faPlay ,faPause , faRotateRight} from "@fortawesome/free-solid-svg-icons";

// const Transcribe = () => {
//   const [supportedLanguages, setSupportedLanguages] = useState([
//     { code: "sq", name: "Albanian" }, { code: "bn", name: "Bengali" },{ code: "ny", name: "Chichewa" },
//     { code: "en", name: "English" }, { code: "de", name: "German" },{ code: "gu", name: "Gujarati" },
//     { code: "ja", name: "Japanese" },{ code: "hi", name: "Hindi" },{ code: "ka", name: "Georgian" },
//     { code: "ne", name: "Nepali" },{ code: "ml", name: "Malayalam" },{ code: "ta", name: "Tamil" }, 
//     { code: "pa", name: "Punjabi" },{ code: "ru", name: "Russian" },{ code: "af", name: "Afrikaans" }, 
//    { code: "fr", name: "French" }, { code: "am", name: "Amharic" }, { code: "ar", name: "Arabic" },    
//    { code: "hy", name: "Armenian" },{ code: "az", name: "Azerbaijani" }, { code: "eu", name: "Basque" },    { code: "bs", name: "Bosnian" },{ code: "bg", name: "Bulgarian" },   { code: "ca", name: "Catalan" },    { code: "ceb", name: "Cebuano" }, 
//   ]);

//   const [currentLanguage,  setCurrentLanguage] = useState("en");
//   const { transcript, resetTranscript, listening } = useSpeechRecognition({ language: currentLanguage });
//   const [fromText, setFromText] = useState("");
//   const [toText, setToText] = useState("");
//   const [isPaused, setIsPaused] = useState(false);
//   const [translateFrom, setTranslateFrom] = useState("en-GB");
//   const [translateTo, setTranslateTo] = useState("hi");
//   const [translationPlaceholder, setTranslationPlaceholder] = useState("Translation");

//   const countries = {
//   "am": "Amharic",    "ar": "Arabic",   "be": "Bielarus",  "bem": "Bemba",    "bi": "Bislama",    "bj": "Bajan",    "bn": "Bengali",    "bo": "Tibetan",    "br": "Breton",    "bs": "Bosnian",    "ca": "Catalan",    "cop": "Coptic",    "cs": "Czech",    "cy": "Welsh",    "da": "Danish",    "dz": "Dzongkha",    "de-DE": "German",    "dv-MV": "Maldivian",  "el": "Greek",    "en": "English",    "es": "Spanish",    "et": "Estonian",    "eu-ES": "Basque",    "fa": "Persian",    "fi": "Finnish",    "fn": "Fanagalo",    "fo": "Faroese",  "fr": "French",    "gl": "Galician",    "gu": "Gujarati",    "ha": "Hausa",    "he": "Hebrew",    "hi": "Hindi",    "hr": "Croatian",    "hu": "Hungarian",    "id": "Indonesian",    "is": "Icelandic",    "it": "Italian",    "ja": "Japanese",    "kk": "Kazakh",    "km": "Khmer",    "kn": "Kannada",    "ko": "Korean",    "ku": "Kurdish",    "ky": "Kyrgyz",    "la-VA": "Latin",    "lo-LA": "Lao",    "lv-LV": "Latvian",    "men": "Mende",    "mg": "Malagasy",   "mi-NZ": "Maori",    "ms-MY": "Malay",    "mt-MT": "Maltese",    "my": "Burmese",    "ne": "Nepali",    "niu": "Niuean",    "nl": "Dutch",    "no": "Norwegian",    "ny": "Nyanja",    "ur": "Pakistani",    "pau": "Palauan",    "pa": "Panjabi",    "ps": "Pashto",   "pis": "Pijin",    "pl": "Polish",    "pt": "Portuguese",    "rn-BI": "Kirundi",    "ro": "Romanian",    "ru": "Russian",    "sg": "Sango",    "si": "Sinhala",    "sk": "Slovak",    "sm": "Samoan",    "sn": "Shona",    "so": "Somali",   "sq-AL": "Albanian",    "sr": "Serbian",    "sv": "Swedish",    "sw": "Swahili",    "ta": "Tamil",    "te": "Telugu",    "tet": "Tetum",   "tg": "Tajik",    "th": "Thai",    "ti": "Tigriny",    "tk": "Turkmen",    "tl": "Tagalog",    "tn": "Tswana",    "to": "Tongan",    "tr": "Turkish",    "uk": "Ukrainian",    "uz": "Uzbek",    "vi": "Vietnamese",    "wo": "Wolof",    "xh": "Xhosa",    "yi": "Yiddish",    "zu": "Zulu"
//   };

//   useEffect(() => {
//     fetchTranslation();
//   }, [transcript, translateFrom, translateTo]);

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
//         'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
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
//       // console.error(error);
//     }
//   };


//   const toggleListening = () => {
//     if (listening) {
//       SpeechRecognition.stopListening();
//     } else {
//       resetTranscript();
//       SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
//     }
//     setIsPaused(!listening);
//   };

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return <div className="containers">Browser does not support speech recognition</div>;
//   }

//   const handleClick = () => {
//     setTimeout(() => {
//       window.location.reload();
//     }, 400);
//   };

//   return (
//     <div className='container-fluid main-container'>
//       <div className='row'>
//         <div className="left-sidebar">
//           <Side/>
//         </div>
//         <Container className="content-container">
//           <Col>
//             <h2>Speech to Text Translator</h2>
//           </Col>
//           <Row className="bb">   
//             <Col>
//               <button onClick={toggleListening}>
//                 {listening ? (
//                   <>
//                     Pause
//                     <FontAwesomeIcon icon={faPause} />
//                   </>
//                 ) : (
//                   <>
//                     Start Listening
//                     <FontAwesomeIcon icon={faPlay} />
//                   </>
//                 )}
//               </button>
//             </Col>
//             <Col>
//               <button className="sda" onClick={handleClick}>Start Over
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
//                 placeholder="Click to start..."
//               />
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
//           </Row>
//           <Col></Col>
//           <Col></Col>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Transcribe;