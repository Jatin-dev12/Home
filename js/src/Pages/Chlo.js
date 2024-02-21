import React, { useRef } from 'react';

const Chlo= () => {
  const synth = window.speechSynthesis;
  const utterance = useRef(new SpeechSynthesisUtterance('Text-to-speech feature is ...'));

  const handleClick = () => {
    if (synth.speaking) {
      synth.cancel();
    } else {
      synth.speak(utterance.current);
    }
  };

  return (
    <button onClick={handleClick}>
      {synth.speaking ? 'Stop' : 'Speak'}
    </button>
  );
};

export default Chlo;