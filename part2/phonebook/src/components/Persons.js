const Persons = (props) => {
  const { persons, currentFilter, askToDelete } = props;

  return (
    <div>
      <h2>Numbers</h2>

      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(currentFilter.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => askToDelete(person.name)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
