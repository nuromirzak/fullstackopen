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
        <Button onClick={onGoodClick} text="good" />
        <Button onClick={onNeutralClick} text="neutral" />
        <Button onClick={onBadClick} text="bad" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  function hasFeedback() {
    return good + neutral + bad > 0;
  }

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

      {
        hasFeedback() ? (
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={calculateSum()} />
              <StatisticLine text="average" value={calculateAverage()} />
              <StatisticLine text="positive" value={`${calculatePositive()} %`} />
            </tbody>
          </table>
        ) : (
          <div>No feedback given</div>
        )
      }
    </>
  );
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export { App };
