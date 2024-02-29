import React, {useEffect, useState} from "react";

function TypeWritter({ text, delay, infinite }){
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      let timeout;
  
      if (currentIndex <= text.length) {
        timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);
  
      } else if (infinite) {
        setCurrentIndex(0);
        setCurrentText('');
      }
  
      return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);
  
    return  <span
    className="type-writter-text"
    style={{ color: "#1163fb", borderRight: "0.06em solid #fff" }}
  >
    {currentText}
  </span>;
}

export default TypeWritter;