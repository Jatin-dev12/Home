
import React, { useState } from 'react';
import axios from 'axios';
import './gpt.css';
import Col from 'react-bootstrap/Col';
// import Spinner from 'react-bootstrap/Spinner';

const ChatBox = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkType, setLinkType] = useState('');

  const sendQuestion = async () => {
    setLoading(true);

    let maxWords = 250; // default value

  if (linkType === 'Short') {
    maxWords = 50;
  } else if (linkType === 'Medium') {
    maxWords = 200;
  }else if (linkType === 'Long') {
    maxWords = 300;
  }
    

    const options = {
      method: 'POST',
  url: 'https://chatgpt-gpt4-5.p.rapidapi.com/ask',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '5740f38f9dmsh5c757bacb2a7b61p1af54bjsnf71b8b8b411c',
    'X-RapidAPI-Host': 'chatgpt-gpt4-5.p.rapidapi.com'
  },
  data: {
    query: question ,
    web_access: 'true',
    wordLimit: maxWords
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
      <div className='row Short'>
        <Col>
          <textarea
            className='monica'
            name='postContent'
            rows={10}
            spellCheck='true'
            placeholder='Hello! How can I assist you today?'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </Col>

        <Col className='send'>
        <button  className='define' onClick={() => sendQuestion('Short')}>Short</button>   
        <button  className='define' onClick={() => sendQuestion('Medium')}>Medium</button>
        <button className='define' onClick={() => sendQuestion('Long')}>Long</button>     
               </Col>
        <Col>
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
              id='response'
              className='monica'
              rows='10'
              cols='50'
              value={response}
              readOnly // Set the response textarea as read-only
            ></textarea>
          )}
        </Col>
      </div>
    </div>
  );
};

export default ChatBox;