const PersonForm = (props) => {
  const {
    addPhoneNumber,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
  } = props;

  return (
    <form onSubmit={addPhoneNumber}>
      <h2>add a new</h2>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>debug:{newName}</div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>debug:{newNumber}</div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
