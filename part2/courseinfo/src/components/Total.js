const Total = (props) => {
  const { parts } = props;

  const getSum = (parts) => {
    const exercises = parts.map((part) => part.exercises);  
    return exercises.reduce((acc, curr) => acc + curr, 0);
  };

  return <p><b>total of {getSum(parts)} exercises</b></p>;
};

export default Total;
