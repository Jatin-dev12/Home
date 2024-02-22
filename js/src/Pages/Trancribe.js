import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import FormData from "form-data";
import { Container, Row, Col } from "react-bootstrap";
import Spellchecker from "hunspell-spellchecker";
import '../App.css'
import Side from './Side'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faStop ,faPause , faRotateRight} from "@fortawesome/free-solid-svg-icons";



const Transcribe = () => {
  const [supportedLanguages, setSupportedLanguages] = useState([
    { code: "sq", name: "Albanian" }, { code: "bn", name: "Bengali" }, { code: "fr", name: "French" },
    { code: "en", name: "English" },    { code: "de", name: "German" },    { code: "gu", name: "Gujarati" },
    { code: "ja", name: "Japanese" },    { code: "hi", name: "Hindi" },    { code: "ka", name: "Georgian" },
    { code: "ne", name: "Nepali" },    { code: "ml", name: "Malayalam" },    { code: "ta", name: "Tamil" },    { code: "pa", name: "Punjabi" },
    { code: "ru", name: "Russian" },    { code: "af", name: "Afrikaans" },    { code: "fr", name: "French" },
    { code: "am", name: "Amharic" },    { code: "ar", name: "Arabic" },    { code: "hy", name: "Armenian" },
    { code: "az", name: "Azerbaijani" },    { code: "eu", name: "Basque" },    { code: "bs", name: "Bosnian" },
    { code: "bg", name: "Bulgarian" },   { code: "ca", name: "Catalan" },    { code: "ceb", name: "Cebuano" },
    { code: "ny", name: "Chichewa" },
    // ...
  ]);

  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { transcript, resetTranscript, listening } = useSpeechRecognition({ language: currentLanguage });
  const [correctedText, setCorrectedText] = useState("");
  const [translation, setTranslation] = useState("");
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [isPaused, setIsPaused] = useState(false); // New state variable for pause functionality

  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("hi-IN");
  const [translationPlaceholder, setTranslationPlaceholder] = useState("Translation");
  const countries = {
    "am-ET": "Amharic",    "ar-SA": "Arabic",    "be-BY": "Bielarus",    "bem-ZM": "Bemba",    "bi-VU": "Bislama",    "bjs-BB": "Bajan",    "bn-IN": "Bengali",    "bo-CN": "Tibetan",    "br-FR": "Breton",    "bs-BA": "Bosnian",    "ca-ES": "Catalan",    "cop-EG": "Coptic",    "cs-CZ": "Czech",    "cy-GB": "Welsh",    "da-DK": "Danish",    "dz-BT": "Dzongkha",    "de-DE": "German",    "dv-MV": "Maldivian",
    "el-GR": "Greek",    "en-GB": "English",    "es-ES": "Spanish",    "et-EE": "Estonian",
    "eu-ES": "Basque",    "fa-IR": "Persian",    "fi-FI": "Finnish",    "fn-FNG": "Fanagalo",    "fo-FO": "Faroese",
    "fr-FR": "French",    "gl-ES": "Galician",    "gu-IN": "Gujarati",    "ha-NE": "Hausa",
    "he-IL": "Hebrew",    "hi-IN": "Hindi",    "hr-HR": "Croatian",    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",    "is-IS": "Icelandic",    "it-IT": "Italian",    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",    "km-KM": "Khmer",    "kn-IN": "Kannada",    "ko-KR": "Korean",
    "ku-TR": "Kurdish",    "ky-KG": "Kyrgyz",    "la-VA": "Latin",    "lo-LA": "Lao",    "lv-LV": "Latvian",
    "men-SL": "Mende",    "mg-MG": "Malagasy",   "mi-NZ": "Maori",    "ms-MY": "Malay",    "mt-MT": "Maltese",
    "my-MM": "Burmese",    "ne-NP": "Nepali",    "niu-NU": "Niuean",    "nl-NL": "Dutch",
    "no-NO": "Norwegian",    "ny-MW": "Nyanja",    "ur-PK": "Pakistani",    "pau-PW": "Palauan",    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",   "pis-SB": "Pijin",    "pl-PL": "Polish",    "pt-PT": "Portuguese",    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",    "ru-RU": "Russian",    "sg-CF": "Sango",    "si-LK": "Sinhala",
    "sk-SK": "Slovak",    "sm-WS": "Samoan",    "sn-ZW": "Shona",    "so-SO": "Somali",   "sq-AL": "Albanian",
    "sr-RS": "Serbian",    "sv-SE": "Swedish",    "sw-SZ": "Swahili",    "ta-LK": "Tamil",
    "te-IN": "Telugu",    "tet-TL": "Tetum",   "tg-TJ": "Tajik",    "th-TH": "Thai",    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",    "tl-PH": "Tagalog",    "tn-BW": "Tswana",    "to-TO": "Tongan",
    "tr-TR": "Turkish",    "uk-UA": "Ukrainian",    "uz-UZ": "Uzbek",    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",    "xh-ZA": "Xhosa",    "yi-YD": "Yiddish",    "zu-ZA": "Zulu"
};
useEffect(() => {
  fetchTranslation();
}, [transcript, translateFrom, translateTo]);

const fetchTranslation = () => {
  if (!transcript) return;
  setTranslationPlaceholder("Translating...");
  const apiUrl = `https://api.mymemory.translated.net/get?q=${transcript}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => {
      const translatedText = data.responseData.translatedText;
      setToText(translatedText    );
      setTranslationPlaceholder("Translation");
  });
};
const handleExchange = () => {
  const tempText = fromText;
  const tempLang = translateFrom;
  setFromText(toText);
  setToText(tempText);
  setTranslateFrom(translateTo);
  setTranslateTo(tempLang);
};


  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
  };
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
    }
    setIsPaused(!listening);
  };
  const switchLanguage = () => {
    const index = supportedLanguages.findIndex((lang) => lang.code === currentLanguage);
    const newLanguage =
      index === supportedLanguages.length - 1
        ? supportedLanguages[0].code
        : supportedLanguages[index + 1].code;
    setCurrentLanguage(newLanguage);
  };

  const correctSpelling = (text) => {
    const spellchecker = new Spellchecker("en_US");
    const suggestions = spellchecker.getSuggestions(text);
    if (suggestions.length > 0) {
      return suggestions[0];
    }
    return text;
  };

  const handleTranscription = async () => {
    const truncatedTranscript = transcript.split(" ").slice(0, 100).join(" ");
    let correctedText = truncatedTranscript.split(" ").map(correctSpelling).join(" ");
    setCorrectedText(correctedText);

    if (correctedText.length > 0) {
      const formData = new FormData();
      formData.append("file", new Blob([Buffer.from(correctedText)], { type: "audio/mpeg-3" }));

      const options = {
        method: 'GET',
        url: 'https://text-to-speech-pro.p.rapidapi.com/api/voices',
        headers: {
          'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
          'X-RapidAPI-Host': 'text-to-speech-pro.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div className="containers">Browser does not support speech recognition</div>;
  }

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 400); // Delay for 2000 milliseconds (2 seconds)
  };

// --------------------------------------------------------------------------------------//
  return (
    <div className='container-fluid main-container'>
    <div className='row'>
    <div className="left-sidebar">
      < Side/>
    </div><Container className="content-container">
                  <Col>
                  <h2>Speech to Text Translator</h2>

  
                  </Col>
                  <Row className="bb">   
         
        <Col>
        <button onClick={toggleListening}>
                {listening ? (
                  <>
                    Pause
                    <FontAwesomeIcon icon={faPause} />
                  </>
                ) : (
                  <>
                    Start Listening
                    <FontAwesomeIcon icon={faPlay} />
                  </>
                )}
              </button>
        </Col>
        <Col>
                <button className="sda" onClick={handleClick}>Start Over
                <FontAwesomeIcon icon={faRotateRight} />
                </button>
              </Col>
        
        {/* <Col>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening
        <FontAwesomeIcon icon={faStop} />

        </button>
        </Col>    */}
       
        </Row>
                  
                  <Row>
                  <select className="dsh"   value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
                {supportedLanguages.map((language) => (
                  <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            
            value={translateFrom} onChange={(e) => setTranslateFrom(e.target.value)}
            {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                {name}
                </option>
            ))}
            
            </select>
                    <Col className="main-content">
                    <textarea
                    rows={7}
            className="from-text"
            value={transcript}
            onChange={(e) => setFromText(e.target.value)}
            placeholder="Click to start..."
            />
        {}
                    </Col>
                    
                    <Col sm="1"></Col>
                    <select className="kjj" value={translateTo} onChange={(e) => setTranslateTo(e.target.value)}>
            {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                {name}
                </option>
            ))}
            </select>
                    <Col className="main-content"> 

                    <textarea  rows={7} className="to-text" value={toText} readOnly placeholder={translationPlaceholder} />
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
  </select></Col>
            <Col> </Col>
            <Col className="2hd"><select value={translateTo} onChange={(e) => setTranslateTo(e.target.value)}>
            {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                {name}
                </option>
            ))}
            </select> </Col>
                  </Row>
                  <Col></Col>
                  <Col></Col>
      




</Container>

               </div>
               </div>



    );
  };
  
  export default Transcribe;