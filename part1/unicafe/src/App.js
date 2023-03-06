import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getCount = (scores) => {
    return scores.reduce((acc, curr) => acc + curr, 0);
  }

  const getAverage = (scores) => {
    const count = getCount(scores);
    const sum = scores[0] - scores[2];
    return sum / count;
  }

  const getPositive = (scores) => {
    return scores[0] / getCount(scores) * 100;
  }

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h1>statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      <p>all {getCount([good, neutral, bad])}</p>
      <p>average {getAverage([good, neutral, bad])}</p>
      <p>positive {getPositive([good, neutral, bad])} %</p>
    </div>
  )
};

export default App;
