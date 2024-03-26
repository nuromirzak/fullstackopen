import { Part } from "./Part"

function Content(props) {
    return (
        <div>
            {
                props.parts.map(function (part) {
                    return <Part key={part.id} part={part} />
                })
            }
        </div>
    )
}

export { Content }