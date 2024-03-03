// import React, { useState } from 'react';
// import axios from 'axios';

// const ChatBox = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatLog, setChatLog] = useState([]);

//   const sendMessage = async () => {
//     const options = {
//       method: 'POST',
//       url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
//         'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
//       },
//       data: {
//         messages: [
//           {
//             role: 'user',
//             content: userInput
//           }
//         ],
//         system_prompt: '',
//         temperature: 0.9,
//         top_k: 5,
//         top_p: 0.9,
//         max_tokens: 256,
//         web_access: false
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       const botResponse = response.data.choices[0].message.content;
//       setChatLog(prevChatLog => [...prevChatLog, { role: 'bot', content: botResponse }]);
//       setUserInput('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setUserInput(event.target.value);
//   };

//   return (
//     <div>
//       <div>
//         {chatLog.map((message, index) => (
//           <div key={index}>
//             {message.role === 'user' ? (
//               <strong>User:</strong>
//             ) : (
//               <strong>Bot:</strong>
//             )}
//             {message.content}
//           </div>
//         ))}
//       </div>
//       <input type="text" value={userInput} onChange={handleInputChange} placeholder="Type your message..." />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatBox;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatBox = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatLog, setChatLog] = useState([]);

//   useEffect(() => {
//     if (userInput !== '') {
//       sendMessage();
//     }
//   }, [userInput]);

//   const sendMessage = async () => {
//     const options = {
//       method: 'POST',
//       url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
//         'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
//       },
//       data: {
//         messages: [
//           {
//             role: 'user',
//             content: userInput
//           }
//         ],
//         system_prompt: '',
//         temperature: 0.9,
//         top_k: 5,
//         top_p: 0.9,
//         max_tokens: 256,
//         web_access: false
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       const botResponse = response.data.choices[0].message.content;
//       setChatLog(prevChatLog => [...prevChatLog, { role: 'user', content: userInput }, { role: 'bot', content: botResponse }]);
//       setUserInput('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setUserInput(event.target.value);
//   };

//   return (
//     <div>
//       <div>
//         {chatLog.map((message, index) => (
//           <div key={index}>
//             {message.role === 'user' ? (
//               <strong>User:</strong>
//             ) : (
//               <strong>Bot:</strong>
//             )}
//             {message.content}
//           </div>
//         ))}
//       </div>
//       <input type="text" value={userInput} onChange={handleInputChange} placeholder="Type your message..." />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatBox;