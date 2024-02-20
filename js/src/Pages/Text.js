    import React, { useState, useEffect } from "react";
    import Container from 'react-bootstrap/Container';
    import Row from 'react-bootstrap/Row';
    import Col from 'react-bootstrap/Col';

    const TranslateApp = () => {
    const [fromText, setFromText] = useState("");
    const [toText, setToText] = useState("");
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
    }, [fromText, translateFrom, translateTo]);

    const fetchTranslation = () => {
        if (!fromText) return;
        setTranslationPlaceholder("Translating...");
        const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
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

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleSpeak = (text, lang) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    };

    return (
        <Container className="lsjd">   
            <Row>
                <Col >
                <textarea
            className="from-text"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
            placeholder="Enter text to translate"
            /></Col>

                <Col><textarea className="to-text" value={toText} readOnly placeholder={translationPlaceholder} />
    </Col>
        </Row>
        <Row>
        <Col >
            <select value={translateFrom} onChange={(e) => setTranslateFrom(e.target.value)}>
            {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                {name}
                </option>
            ))}
            
            </select>
            </Col>
            <Col><select value={translateTo} onChange={(e) => setTranslateTo(e.target.value)}>
            {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                {name}
                </option>
            ))}
            </select></Col>
            </Row> 
            <button onClick={fetchTranslation}>Translate</button>

        
        </Container>
    
    );
    };

    export default TranslateApp;