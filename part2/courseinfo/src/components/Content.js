import Part from "./Part";

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
