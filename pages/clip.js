// pages/index.js
import { useState } from 'react';

const HomePage = () => {
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setText(clipboardText);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedText(text);
  };

  return (
    <div>
      <h1>Paste from Clipboard and Submit Form Example</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handlePaste}>Paste from Clipboard</button>
        <br />
        <button type="submit">Submit</button>
      </form>
      {submittedText && (
        <div>
          <h2>Submitted Text:</h2>
          <p>{submittedText}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
