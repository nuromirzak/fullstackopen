const Total = (props) => {
  const { exercises } = props;

  const getSum = (exercises) => {
    return exercises.reduce((acc, curr) => acc + curr, 0);
  };

  return <p>Number of exercises {getSum(exercises)}</p>;
};

export default Total;
