import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Side from './Side'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faPlay, faPause, faStop, faMicrophone, faTrash, faArrowRotateLeft, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";


const Transcribe = () => {
  const [supportedLanguages] = useState([
    { code: "sq", name: "Albanian" }, { code: "bn", name: "Bengali" }, { code: "fr", name: "French" }, { code: "en", name: "English" }, { code: "de", name: "German" }, { code: "gu", name: "Gujarati" }, { code: "ja", name: "Japanese" }, { code: "hi", name: "Hindi" }, { code: "ka", name: "Georgian" }, { code: "ne", name: "Nepali" }, { code: "ml", name: "Malayalam" }, { code: "ta", name: "Tamil" }, { code: "pa", name: "Punjabi" }, { code: "ru", name: "Russian" }, { code: "af", name: "Afrikaans" }, { code: "am", name: "Amharic" }, { code: "ar", name: "Arabic" }, { code: "hy", name: "Armenian" }, { code: "az", name: "Azerbaijani" }, { code: "eu", name: "Basque" }, { code: "bs", name: "Bosnian" }, { code: "bg", name: "Bulgarian" }, { code: "ca", name: "Catalan" }, { code: "ceb", name: "Cebuano" }, { code: "ny", name: "Chichewa" },
  ]);


  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { transcript, resetTranscript } = useSpeechRecognition({ language: currentLanguage });
  const [fromText, setFromText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("hi");
  const [isActive, setIsActive] = useState(false);
  const [translationPlaceholder, setTranslationPlaceholder] = useState("Translation");
  const [speechSpeed, setSpeechSpeed] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  const [timer, setTimer] = useState(0);
  const [anime, setAnime] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  var [showLoader, setShowLoader] = useState('d-none');

  //---------This Is One Is For Undo to text ----------//

  const [history, setHistory] = useState([]);
  const [toText, setToText] = useState("");

  //-------This Is One Is For Undo Transcript ---------//

  const [newTranscript, setNewTranscript] = useState("");
  const [transcriptHistory, setTranscriptHistory] = useState([]);

  // ----------This One Is For Ai Moduels--------------//
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkType, setLinkType] = useState('');

  //---------This Things For Voice Commands------------//
  const [recording, setRecording] = useState(false);
  const [startTranscript, setStartTranscript] = useState(false);
  // ----------This Things For Redo --------------------------//
  const [redoHistory, setRedoHistory] = useState([]);
  //------------------------------------------------//


  const countries = {
    "am": "Amharic", "be": "Bielarus", "bem": "Bemba", "bi": "Bislama", "bj": "Bajan", "bn": "Bengali", "bo": "Tibetan", "br": "Breton", "bs": "Bosnian", "ca": "Catalan", "cop": "Coptic", "cs": "Czech", "cy": "Welsh", "da": "Danish", "dz": "Dzongkha", "de-DE": "German", "dv-MV": "Maldivian", "el": "Greek", "en": "English", "es": "Spanish", "et": "Estonian", "eu-ES": "Basque", "fa": "Persian", "fi": "Finnish", "fn": "Fanagalo", "fo": "Faroese", "fr": "French", "gl": "Galician", "gu": "Gujarati", "ha": "Hausa", "he": "Hebrew", "hi": "Hindi", "hr": "Croatian", "hu": "Hungarian", "id": "Indonesian", "is": "Icelandic", "it": "Italian", "ja": "Japanese", "kk": "Kazakh", "km": "Khmer", "kn": "Kannada", "ko": "Korean", "ku": "Kurdish", "ky": "Kyrgyz", "la-VA": "Latin", "lo-LA": "Lao", "lv-LV": "Latvian", "men": "Mende", "mg": "Malagasy", "mi-NZ": "Maori", "ms-MY": "Malay", "mt-MT": "Maltese", "my": "Burmese", "ne": "Nepali", "niu": "Niuean", "nl": "Dutch", "no": "Norwegian", "ny": "Nyanja", "pau": "Palauan", "pa": "Panjabi", "ps": "Pashto", "pis": "Pijin", "pl": "Polish", "pt": "Portuguese", "rn-BI": "Kirundi", "ro": "Romanian", "ru": "Russian", "sg": "Sango", "si": "Sinhala", "sk": "Slovak", "sm": "Samoan", "sn": "Shona", "so": "Somali", "sq-AL": "Albanian", "sr": "Serbian", "sv": "Swedish", "sw": "Swahili", "ta": "Tamil", "te": "Telugu", "tet": "Tetum", "tg": "Tajik", "th": "Thai", "ti": "Tigriny", "tk": "Turkmen", "tl": "Tagalog", "tn": "Tswana", "to": "Tongan", "tr": "Turkish", "uk": "Ukrainian", "uz": "Uzbek", "vi": "Vietnamese", "xh": "Xhosa", "zu": "Zulu"
  };

   const startListening = () => {
    setFromText(transcript);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
    if (startTranscript) {
      resetTranscript();
    }
  };

  const commands = [
    {
      command: 'alexa clear',
      callback: () => {
        resetTranscript();
        setFromText("");
        setNewTranscript("");
        setTranscriptHistory(prevHistory => [...prevHistory, newTranscript]);
      },
    },
    {
      command: 'alexa start',
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setRecording(true);

      },
    },
    {
      command: 'Start transcript',
      callback: () => {
        setStartTranscript(true);
      },
    },
    {
      command: 'alexa stop',
      callback: () => {
        setStartTranscript(false);
        SpeechRecognition.stopListening()
        // SpeechRecognition.abortListening()

        setNewTranscript(transcript);
        
      },
    }
  ];


  const {
    transcript: recordingTranscript,
  } = useSpeechRecognition({ commands });


  

  useEffect(() => {
    fetchTranslation();
    setUtterance(new SpeechSynthesisUtterance());
    setVoice(speechSynthesis.getVoices().find(voice => voice.name === 'Google हिन्दी'));
    setNewTranscript(transcript);
    console.log(newTranscript);
  }, [transcript, translateFrom, translateTo]);



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

    if (recording) {
      handleSpeechStart();
    } else {
      accessMicrophone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording, currentLanguage]);

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

  const handleClearTextarea = () => {
    resetTranscript();
    setFromText("");
    setNewTranscript("");
    setTranscriptHistory(prevHistory => [...prevHistory, newTranscript]);
  };

  const handleClearTranslatedText = () => {
    setToText("");
    setHistory(prevHistory => [...prevHistory, toText]);
  };

  const speakText = () => {
    if (toText) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(toText);
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google हिन्दी');
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
      console.log(error.response.status);

      if (error.response.status === 429) {
        setToText('Your translation limit is over. Please try again after 24 hours.');
        setTranslationPlaceholder('Translation');

      }
      else {
        setToText(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTouchStart = () => {
    setRecording(true);
    setIsActive(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: currentLanguage, interimResults: true });
    setAnime(true)
    setShowLoader('d-flex');
  };

  const handleTouchEnd = () => {

    setIsActive(false);
    setAnime(false);
    SpeechRecognition.stopListening()
  };

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previoustranscript = history[history.length - 1];
      setHistory(prevHistory => prevHistory.slice(0, -1));
      setRedoHistory(prevRedoHistory => [...prevRedoHistory, toText]);
      setToText(previoustranscript);
    }
  };

  const handleRedo = () => {
    if (history.length > 0) {
      const previoustranscript = history[history.length + 1];
      setHistory(prevHistory => prevHistory.slice(0, +1));
      setRedoHistory(prevRedoHistory => [...prevRedoHistory, toText]);
      setToText(previoustranscript);
    }
  };

  const handleInputChange = (e) => {
    setNewTranscript(e.target.value);
  };


  const handleUndoTranscript = () => {
    if (transcriptHistory.length > 0) {
      const previousTranscript = transcriptHistory[transcriptHistory.length - 1];
      setTranscriptHistory(prevHistory => prevHistory.slice(0, -1));
      setNewTranscript(previousTranscript);
    }
  };
  const handleRedoTranscript = () => {
    if (transcriptHistory.length > 0) {
      const previousTranscript = transcriptHistory[transcriptHistory.length + 1];
      setTranscriptHistory(prevHistory => prevHistory.slice(0, +1));
      setNewTranscript(previousTranscript);

    }
  };
  const sendQuestion = async () => {
    setLoading(true);

    let maxWords = 250; // default value

    if (linkType === 'Short') {
      maxWords = 50;
    } else if (linkType === 'Medium') {
      maxWords = 200;
    } else if (linkType === 'Long') {
      maxWords = 300;
    }
    const options = {


      method: 'POST',
      url: 'https://chatgpt-gpt4-5.p.rapidapi.com/ask',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'efb8ac5c63mshf1248b4b5999b95p1f5126jsne4ae6b673996',
        'X-RapidAPI-Host': 'chatgpt-gpt4-5.p.rapidapi.com'
      },
      data: {
        query: toText,
        web_access: 'true',
        wordLimit: maxWords
      }
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setToText(response.data.response);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false); // Set loading to false after receiving the response
    }
  };

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  }
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
          <Row className="bb">
            <Col></Col>
            <Col md={2} className="re">
              <button className="ad" onClick={handleClick}>Reset
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
            </Col>
          </Row>
          <Row>
            <div className="delete-content">
              <Col className="ma">
                <span>
                  <select
                    className="tt"
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
                </span>
                <span>
                  <button
                    className={`btn-class-name ${isActive ? 'active' : ''}`}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}

                  >
                    <span className="back"></span>
                    <span className="front">
                      <FontAwesomeIcon icon={faMicrophone} />
                    </span>
                  </button>
                </span>
                <span className="ddsfs">
                  <FontAwesomeIcon
                    icon={faArrowRotateLeft}
                    onClick={handleUndoTranscript}
                  />
                  <FontAwesomeIcon
                    className="redo"
                    icon={faArrowRotateRight}
                    onClick={handleRedoTranscript}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={handleClearTextarea}
                  />
                </span>
              </Col>
            </div>
            <div className="delet">
              <select
                className="tr"
                value={translateTo}
                onChange={(e) => setTranslateTo(e.target.value)}>
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                className="undo"
                icon={faArrowRotateLeft}
                onClick={handleUndo}
              />
              <FontAwesomeIcon
                className="redo"
                icon={faArrowRotateRight}
                onClick={handleRedo}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleClearTranslatedText}
              />
            </div>
          </Row>
          <Row>
            <Col className="main-content">

              {/* This is textarea with condition */}
              {recording ? (
                <>
                  <textarea
                    rows={10}
                    className="from-text tt"
                    value={newTranscript}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <textarea
                  rows={10}
                  className="from-text tt"
                  placeholder="Write text or give command alexa start or press button"
                ></textarea>
              )}

              {/* This is textarea without condition */}
              {/* <textarea
                    rows={10}
                    className="from-text"
                    value={newTranscript}
                    placeholder="Hold On Button to start..."
                    onChange={handleInputChange}
                
                  /> */}

              <div
                className={`loading ${showLoader} ${anime ? 'run' : 'notrun'
                  } ${isActive && transcript ? 'active' : 'inactive'} `} >
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span>
                <span></span><span></span><span></span>
                <p className="sadd">{formatTime(timer)}</p>
              </div>
            </Col>
            <span className="fsdfsdcds">
              <select
                className="kjj"
                value={translateTo}
                onChange={(e) => setTranslateTo(e.target.value)}
              >
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                className="undo"
                icon={faArrowRotateLeft}
                onClick={handleUndo}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleClearTranslatedText}
              />
            </span>
            <Col className="col md 6">
              {loading ? (
                <div>
                  <section class="dots-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </section>
                </div>
              ) : (
                <textarea
                  rows={10}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="to-text"
                  value={toText}
                  readOnly
                  placeholder={translationPlaceholder}
                />
              )}

              <div className="volume">
                <input
                  type="checkbox"
                  class="volume-input"
                  onClick={speakText}
                />
                <div class="volume-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="volume-svg"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="dssa">
            <Col xl={7}></Col>
            <Col>
              <button
                className="define"
                onClick={() => sendQuestion('Short')}
              >
                Short
              </button>
              <button
                className="define"
                onClick={() => sendQuestion('Medium')}
              >
                Medium
              </button>
              <button
                className="define"
                onClick={() => sendQuestion('Long')}
              >
                Long
              </button>
              <label htmlFor="speed" className="kkkk">
                Speed:
                <input
                  type="range"
                  id="speed"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechSpeed}
                  onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                />
              </label>
              <label htmlFor="pitch" className="kkkk">
                Pitch:
                <input
                  type="range"
                  id="pitch"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                />
              </label>
              <label htmlFor="volume" className="kkkk">
                Volume:
                <input
                  type="range"
                  id="volume"
                  min="0"
                  max="1"
                  step="0.1"
                  value={speechVolume}
                  onChange={(e) => setSpeechVolume(parseFloat(e.target.value))}
                />
              </label>
              <Col className="last">
                <button className="pl" onClick={handlePlay}>
                  {isPaused ? "Resume" : "Play"}
                  <FontAwesomeIcon
                    className="play"
                    icon={faPlay}
                    onClick={handlePlay}
                  />
                </button>
                <button className="pl" onClick={handlePause}>
                  <FontAwesomeIcon
                    className="pause"
                    icon={faPause}
                    onClick={handlePause}
                  />
                </button>
                <button className="pl" onClick={handleStop}>
                  Stop
                  <FontAwesomeIcon
                    className="stop"
                    icon={faStop}
                    onClick={handleStop}
                  />
                </button>
              </Col>
              
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Transcribe;


{/* {recording && recordingTranscript && (
                <textarea
                  rows={10}
                  className="from-text"
                  value={recordingTranscript}
                  placeholder="Hold On Button to start..."
                  onChange={handleInputChange}
                />
              )}
              {!recording && (
                <textarea
                  rows={10}
                  className="from-text"
                  value={newTranscript}
                  placeholder="Hold On Button to start..."
                  onChange={handleInputChange}
                />
              )} */}
