
import React, { useState } from 'react';
import axios from 'axios';
import './gpt.css';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const ChatBox = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkType, setLinkType] = useState('');


  const sendQuestion = async () => {
    setLoading(true);
    

    const options = {
      method: 'POST',
  url: 'https://chatgpt-gpt4-5.p.rapidapi.com/ask',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '10ef930128msh25033c2ad8b1fd7p1876fajsnb2b198e0fd21',
    'X-RapidAPI-Host': 'chatgpt-gpt4-5.p.rapidapi.com'
  },
  data: {
    query: question ,
    web_access: 'true'
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
        <button className='define'  onClick={sendQuestion}>Send</button>       
        
               </Col>
        <Col>
          {loading ? (
            <div>
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
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