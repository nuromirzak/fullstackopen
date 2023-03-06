import Part from "./Part";

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {parts.map((part, i) => (
        <Part key={i} part={part.part} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
