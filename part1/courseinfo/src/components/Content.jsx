import { Part } from "./Part"

function Content(props) {
    console.log(props)
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

export { Content }