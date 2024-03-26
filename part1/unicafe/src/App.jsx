import { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClick = () => {
    setGood(good + 1);
  }

  const onNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const onBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <>
      <h1>give feedback</h1>
      <div style={{ display: 'flex' }}>
        <button onClick={onGoodClick}>good</button>
        <button onClick={onNeutralClick}>neutral</button>
        <button onClick={onBadClick}>bad</button>
      </div>

      <h1>statistics</h1>

      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {(good - bad) / (good + neutral + bad)}</div>
      <div>positive {good / (good + neutral + bad) * 100} %</div>
    </>
  );
}

export { App };
