import React, { useState } from 'react';

const UndoExample = () => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);

  // Function to handle text input change
  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    // Save the current text to history
    setHistory(prevHistory => [...prevHistory, newText]);
  };

  // Function to handle undo action
  const handleUndo = () => {
    if (history.length > 1) {
      // Remove the last item from history
      const previousText = history[history.length - 2];
      setHistory(prevHistory => prevHistory.slice(0, -1));
      setText(previousText);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={handleChange} />
      <button onClick={handleUndo}>Undo</button>
    </div>
  );
};

export default UndoExample;
