import React, { useState } from 'react';
import axios from 'axios';

const TranslationApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const translateText = async () => {
    const getLanguagesOptions = {
      method: 'GET',
      url: 'https://google-translation-unlimited.p.rapidapi.com/get_languages',
      headers: {
        'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
        'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
      }
    };

    try {
      const languagesResponse = await axios.request(getLanguagesOptions);
      console.log(languagesResponse.data);

      const translateOptions = {
        method: 'POST',
        url: 'https://google-translation-unlimited.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
          'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
        },
        data: {
          texte: inputText,
          to_lang: 'fr'
        }
      };

      const translationResponse = await axios.request(translateOptions);
      console.log(translationResponse.data);

      setTranslatedText(translationResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={translateText}>Translate</button>
      <div>{translatedText}</div>
    </div>
  );
};

export default TranslationApp;  