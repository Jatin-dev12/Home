import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hello: "Hello",
        switchLanguage: "Switch Language",
        startListening: "Start Listening",
        stopListening: "Stop Listening",
      },
    },
    sq: {
      translation: {
        hello: "Përshëndetje",
        switchLanguage: "Ndrysho Gjuhën",
        startListening: "Fillo Mënyrën",
        stopListening: "Ndalo Mënyrën",
      },
    },
    // Add other languages here
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const Ai = () => {
  const supportedLanguages = React.useMemo(
    () => [
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
    ],
    []
  );

  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition({
    language: currentLanguage,
  });

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

  return (
    <>
      <div className="containers">
        <h2>{i18n.t("hello")}</h2>
        <p className="sa">
          {i18n.t("startListening")}
        </p>
        <div className="main-content">
          {transcript}
        </div>
        <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
          {supportedLanguages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <button onClick={startListening}>{i18n.t("startListening")}</button>
        <button onClick={switchLanguage}>{i18n.t("switchLanguage")}</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      </div>
    </>
  );
};

export default Ai;