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

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  function calculateSum() {
    return good + neutral + bad;
  }

  function calculateAverage() {
    return (good - bad) / calculateSum();
  }

  function calculatePositive() {
    return good / calculateSum() * 100;
  }

  return (
    <>
      <h1>statistics</h1>

      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {calculateSum()}</div>
      <div>average {calculateAverage()}</div>
      <div>positive {calculatePositive()} %</div>
    </>
  );
}

export { App };
