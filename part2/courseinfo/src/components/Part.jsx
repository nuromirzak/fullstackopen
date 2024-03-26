function Part(props) {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )

}

export { Part }