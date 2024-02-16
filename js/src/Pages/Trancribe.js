import React from 'react'

function Trancribe() {
  return (
    <div>
      
    </div>
  )
}

export default Trancribe


// import React, { useState } from 'react';
// import { useIntl } from 'react-intl';

// const Translation = ({ messages }) => {
//   const intl = useIntl();
//   const [inputValue, setInputValue] = useState('');
//   const [selectedLanguage, setSelectedLanguage] = useState('es');

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };

//   const translatedText = intl.formatMessage({ id: inputValue }, { language: selectedLanguage });

//   return (
//     <div>
//       <h2>{intl.formatMessage({ id: 'translation.title' })}</h2>
//       <div>
//         <input type="text" value={inputValue} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>
//           <input type="radio" value="es" checked={selectedLanguage === 'es'} onChange={handleLanguageChange} />
//           Spanish
//         </label>
//         <label>
//           <input type="radio" value="fr" checked={selectedLanguage === 'fr'} onChange={handleLanguageChange} />
//           French
//         </label>
//       </div>
//       <div>{translatedText}</div>
//     </div>
//   );
// };

// Translation.defaultProps = {
//   messages: {
//     es: {
//       translation: {
//         title: 'Ejemplo de traducción',
//       },
//     },
//     fr: {
//       translation: {
//         title: 'Exemple de traduction',
//       },
//     },
//   },
// };

// export default Translation;


// // // Translator.js 
// // import React, { useState } from 'react'
// // import languageList from '../Text.json'; 

// //  function Trancribe() { 
// // 	const [inputFormat, setInputFormat] = useState('en'); 
// // 	const [outputFormat, setOutputFormat] = useState('hi'); 
// // 	const [translatedText, setTranslatedText] = useState('Translation'); 
// // 	const [inputText, setInputText] = useState(''); 

// // 	const handleReverseLanguage = () => { 
// // 		const value = inputFormat; 
// // 		setInputFormat(outputFormat); 
// // 		setOutputFormat(value); 
// // 		setInputText(''); 
// // 		setTranslatedText('Translation'); 
// // 	} 

// // 	const handleRemoveInputText = () => { 
// // 		setInputText(''); 
// // 		setTranslatedText('Translation'); 
// // 	} 

// // 	const handleTranslate = async () => { 
// // 		if (!inputText || !inputFormat || !outputFormat) return; 
// // 		document.querySelector('.fa.fa-spinner.fa-spin').style.display = "block"; 
// // 		document.querySelector('.translate').style.display = 'none'; 

// // 		const url = 'https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Cit&q=Hello%20World!&mt=1&onlyprivate=0&de=a%40b.c';
// // const options = {
// // 	method: 'GET',
// // 	headers: {
// // 		'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
// // 		'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
// // 	}
// // };

// // try {
// // 	const response = await fetch(url, options);
// // 	const result = await response.text();
// // 	console.log(result);
// // } catch (error) {
// // 	console.error(error);
// // }
// // 		try { 
// // 			const response = await fetch(url, options); 
// // 			const result = await response.text(); 
// // 			const responseObject = JSON.parse(result); 
// // 			const translation = responseObject[0].translations[0].text; 
// // 			setTranslatedText(translation); 
// // 		} catch (error) { 
// // 			console.log(error); 
// // 			alert("Please Try Again! Some Error Occurred at your side"); 
// // 		} 
// // 		document.querySelector('.fa.fa-spinner.fa-spin').style.display = "none"; 
// // 		document.querySelector('.translate').style.display = 'block'; 
// // 	} 
// // 	return ( 
// // 		<div className="container"> 
// // 			<div className="row1"> 
// // 				<select value={inputFormat} 
// // 						onChange={(e) => setInputFormat(e.target.value)}> 
// // 					{Object.keys(languageList).map((key, index) => { 
// // 						const language = languageList[key]; 
// // 						return ( 
// // 							<option key={index} value={key}>{language.name}</option> 
// // 						); 
// // 					})} 
// // 				</select> 
// // 				<svg className='reversesvg'
// // 					onClick={handleReverseLanguage} 
// // 					focusable="false"
// // 					xmlns="http://www.w3.org/2000/svg"
// // 					viewBox="0 0 24 24"> 
// // 				<path d= 
// // "M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"> 
// // 				</path> 
// // 				</svg> 
// // 				<select value={outputFormat} onChange={(e) => { 
// // 					setOutputFormat(e.target.value); 
// // 					setTranslatedText('Translation'); 
// // 				}}> 
// // 					{Object.keys(languageList).map((key, index) => { 
// // 						const language = languageList[key]; 
// // 						return ( 
// // 							<option key={index + 118} value={key}>{language.name}</option> 
// // 						); 
// // 					})} 
// // 				</select> 
// // 			</div> 
// // 			<div className="row2"> 
// // 				<div className="inputText"> 
// // 					<svg className='removeinput'
// // 						style={{ display: (inputText.length) ? "block" : "none" }} 
// // 						onClick={handleRemoveInputText} 
// // 						focusable="false"
// // 						xmlns="http://www.w3.org/2000/svg"
// // 						viewBox="0 0 24 24"> 
// // 						<path d= 
// // "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"> 
// // 						</path> 
// // 					</svg> 
// // 					<textarea type="text"
// // 							value={inputText} 
// // 							placeholder='Enter Text'
// // 							onChange={(e) => setInputText(e.target.value)} /> 
// // 				</div> 
// // 				<div className="outputText">{translatedText}</div> 
// // 			</div> 
// // 			<div className="row3"> 
// // 				<button className='btn'
// // 						onClick={handleTranslate}> 
// // 						<i className="fa fa-spinner fa-spin"></i> 
// // 						<span className='translate'>Translate</span> 
// // 				</button> 
// // 			</div> 
// // 		</div> 
// // 	) 
// // }
// // export default Trancribe;
