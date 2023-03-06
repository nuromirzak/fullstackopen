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
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />

      <StatisticLine text="all" value={getCount([good, neutral, bad])} />
      <StatisticLine text="average" value={getAverage([good, neutral, bad])} />

      <StatisticLine text="positive" value={getPositive([good, neutral, bad]) + " %"} />
    </>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;

  return (
    <>
      <p>
        {text} {value}
      </p>
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
