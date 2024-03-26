function Total(props) {
    function calculateSum() {
        return props.parts.reduce((sum, part) => sum + part.exercises, 0)
    }

    return (
        <p>Number of exercises {calculateSum()}</p>
    )
}

export { Total }