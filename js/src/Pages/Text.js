// import React, { useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import axios from "axios";
// import FormData from "form-data";
// import "./Ai.css";
// import { Container, Row, Col } from "react-bootstrap";
// import supportedLanguages from "../Text.json";
// import Spellchecker from "hunspell-spellchecker";

// // Set AssemblyAI Axios Header
// const assembly = axios.create({
//   baseURL: "https://api.assemblyai.com/v2",
//   headers: {
//     authorization: "04663cad0aec465abe74f41e7bb40f6e",
//     "content-type": "application/json",
//     "transfer-encoding": "chunked",
//   },
  
// });

// const Ai = () => {
//   const [supportedLanguages, setSupportedLanguages] = useState([
//     { code: "sq", name: "Albanian" },
//     { code: "bn", name: "Bengali" },
//     { code: "fr", name: "French" },
//     { code: "en", name: "English" },
//     { code: "de", name: "German" },
//     { code: "gu", name: "Gujarati" },
//     { code: "ja", name: "Japanese" },
//     { code: "hi", name: "Hindi" },
//     { code: "ka", name: "Georgian" },
//     { code: "ne", name: "Nepali" },
//     { code: "ml", name: "Malayalam" },
//     { code: "ta", name: "Tamil" },
//     { code: "pa", name: "Punjabi" },
//     { code: "ru", name: "Russian" },
//     { code: "af", name: "Afrikaans" },
//     { code: "fr", name: "French" },
//     { code: "am", name: "Amharic" },
//     { code: "ar", name: "Arabic" },
//     { code: "hy", name: "Armenian" },
//     { code: "az", name: "Azerbaijani" },
//     { code: "eu", name: "Basque" },
//     { code: "bs", name: "Bosnian" },
//     { code: "bg", name: "Bulgarian" },
//     { code: "ca", name: "Catalan" },
//     { code: "ceb", name: "Cebuano" },
//     { code: "ny", name: "Chichewa" },
//     // ...
//   ]);
//   const [currentLanguage, setCurrentLanguage] = useState("en");
//   const { transcript, resetTranscript, listening } = useSpeechRecognition({ language: currentLanguage });
//   const [correctedText, setCorrectedText] = useState("");
//   const [translation, setTranslation] = useState("");

//   const startListening = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
//   };

//   const switchLanguage = () => {
//     const index = supportedLanguages.findIndex((lang) => lang.code === currentLanguage);
//     const newLanguage =
//       index === supportedLanguages.length - 1
//         ? supportedLanguages[0].code
//         : supportedLanguages[index + 1].code;
//     setCurrentLanguage(newLanguage);
//   };

//   const correctSpelling = (text) => {
//     const spellchecker = new Spellchecker("en_US");
//     const suggestions = spellchecker.getSuggestions(text);
//     if (suggestions.length > 0) {
//       return suggestions[0];
//     }
//     return text;
//   };



//   const handleTranscription = async () => {
//     const truncatedTranscript = transcript.split(" ").slice(0, 100).join(" ");
//     let correctedText = truncatedTranscript.split(" ").map(correctSpelling).join(" ");
//     setCorrectedText(correctedText);

//     if (correctedText.length > 0) {
//       // upload the audio file to AssemblyAI
//       const formData = new FormData();
//       formData.append("file", new Blob([Buffer.from(correctedText)], { type: "audio/mpeg-3" }));

//       try {
//         const response = await assembly.post("/transcript", formData, {
//           headers: {
//             ...formData.getHeaders(),
//           },
//         });

//         // do something with the response, like setting the translation state
//         setTranslation(response.data.text);
//       } catch (error) {
//         console.error("Error during transcription:", error);
//       }
//     }
//     await transcriber.connect()
//   };

//   return (
//     <>
//       <div className="containers">
//         <h2>Speech to Text Converter</h2>

//         <p className="sa">
//           What Ever You Speak It Will Write Here Let's Say Something.
//         </p>

//         <div className="main-content">
//         {transcript}
//         </div>

//         <Container>
//           <Row>
//             <Col>
//               <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
//                 {supportedLanguages.map((language) => (
//                   <option key={language.code} value={language.code}>
//                   {language.name}
//                 </option>
//               ))}
//             </select></Col></Row>
//         <Row>   
//           <Col></Col>  
//         <Col><button onClick={startListening}>Start Listening</button></Col>
//         <Col><button className="sss"   onClick={switchLanguage}>Switch Language</button></Col>
//         <Col><button onClick={SpeechRecognition.stopListening}>Stop Listening</button></Col>   
//         <Col></Col>
          
          
          

          
           
//             </Row>
//          </Container>   
//       </div>
//     </>
//   );
// };

// export default Ai;