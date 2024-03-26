function Total(props) {
    function calculateSum() {
        return props.parts.reduce((sum, part) => sum + part.exercises, 0)
    }

    return (
        <b>Number of exercises {calculateSum()}</b>
    )
}

export { Total }