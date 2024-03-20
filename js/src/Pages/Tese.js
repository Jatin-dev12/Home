//  Welcome //

import React, { useState, useEffect } from "react"
import './Ts.css'
import { Container, Row, Col } from "react-bootstrap";
import Side from "./Side";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faPause } from "@fortawesome/free-solid-svg-icons";

// Define //

const TextToSpeech = ({ initialText }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [text, setText] = useState(initialText);


  // SpeechSynthesisUtterance Moduel For TTS //

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    //   This Will Hnadel Voice Change Option //

    const handleVoicesChanged = () => {
      const voices = synth.getVoices();
      setVoice(voices[0]);
    };

    synth.addEventListener("voiceschanged", handleVoicesChanged);

    return () => {
      synth.cancel();
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, [text]);

  //  This Function For Play The Audio //

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };


  // This  Funtion For Pause The Audio//

  const handlePause = () => {
    const synth = window.speechSynthesis;
    setIsPaused(true);
    synth.pause();
  };

  //  Stop the audio playing //

  const handleStop = () => {
    const synth = window.speechSynthesis;
    setIsPaused(false);
    synth.cancel();
  };

  // Handel All Events //

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((v) => v.name === event.target.value);
    setVoice(selectedVoice);
    utterance.lang = selectedVoice.lang; // Set the language of the utterance

  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const handleTextChange = (event) => {
    // const newText = event.target.value;
    const newText = event.target.textContent;
    //setText(newText);
    // Reset the speech synthesis
    const newUtterance = new SpeechSynthesisUtterance(newText);
    setUtterance(newUtterance);
  };

  const inbuiltParagraph = "";

  return (
    <div className='container-fluid main-container'>
      <div className='row'>
        <div className="left-sidebarr">
          < Side />
        </div>
        <div className="content-container">
          <Row className="cc">
            <label className="hghj">
              Write Text In Box
              {/* <input type="text" value={text} onChange={handleTextChange} /> */}
            </label>
            <div contentEditable
              aria-placeholder="chahbac"
              className="editable-div"
              onInput={handleTextChange}>{text}</div>
          </Row>
          <Row className="vo" style={{ display: "none" }}>

            <label>
              Select Voice:
              <select value={voice?.name} onChange={handleVoiceChange}>
                {window.speechSynthesis.getVoices().map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </label>
          </Row>

          <Row className="dssa">
            <Col><label className="kkk">
              Pitch:
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={handlePitchChange}
              />
            </label></Col>

            <Col>
              <label className="kkk">
                Speed:
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={handleRateChange}
                />
              </label></Col>


            <Col><label className="kkk">
              Volume:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </label></Col>


          </Row>
          <br />
          <Row>
            <Col></Col>
            <Col><button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}
              <FontAwesomeIcon icon={faPlay} />
            </button></Col>
            <Col><button onClick={handlePause}>Pause
              <FontAwesomeIcon icon={faPause} /></button></Col>
            <Col><button onClick={handleStop}>Stop
              <FontAwesomeIcon icon={faStop} /></button></Col>
            <Col></Col>
          </Row>


          <p>{inbuiltParagraph}</p>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;