const Persons = (props) => {
  const { persons, currentFilter } = props;

  return (
    <div>
      <h2>Numbers</h2>

      {persons
        .filter((person) => person.name.includes(currentFilter))
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default Persons;
