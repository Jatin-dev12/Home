import React, { useState } from 'react';
import axios from 'axios';


const ChatBox = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state

  const sendQuestion = async () => {
    setLoading(true); // Set loading to true when sending the question

    const options = {
      method: 'POST',
      url: 'https://open-ai-chatgpt.p.rapidapi.com/ask',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '5740f38f9dmsh5c757bacb2a7b61p1af54bjsnf71b8b8b411c',
        'X-RapidAPI-Host': 'open-ai-chatgpt.p.rapidapi.com'
      },
      data: {
        query: question
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setResponse(response.data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after receiving the response
    }
  };

  return (
    <div>
      <div className='Short'>
        <label htmlFor="question">Enter your question:</label>
        <input type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={sendQuestion}>Send</button>
      </div>
      <div className='mt-4'>
        <label htmlFor="response">API Response:</label>
        {loading ? (
          <div>Loading...</div> // Render the loading animation when loading is true
        ) : (
          <textarea id="response" rows="5" cols="50" value={response}></textarea>
        )}
      </div>
    </div>
  );
};

export default ChatBox;