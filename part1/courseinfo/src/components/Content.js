const Content = (props) => {
  const { part, exercises } = props;

  return (
    <p>
      {part} {exercises}
    </p>
  );
};

export default Content;
