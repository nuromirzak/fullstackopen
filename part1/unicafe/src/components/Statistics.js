const StatisticsBlock = (props) => {
  const { good, neutral, bad } = props;

  const getCount = (scores) => {
    return scores.reduce((acc, curr) => acc + curr, 0);
  };

  const getAverage = (scores) => {
    const count = getCount(scores);
    const sum = scores[0] - scores[2];
    return sum / count;
  };

  const getPositive = (scores) => {
    return (scores[0] / getCount(scores)) * 100;
  };

  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      <p>all {getCount([good, neutral, bad])}</p>
      <p>average {getAverage([good, neutral, bad])}</p>
      <p>positive {getPositive([good, neutral, bad])} %</p>
    </>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>

        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>

        <StatisticsBlock good={good} neutral={neutral} bad={bad} />
      </>
    );
  }
};

export default Statistics;
