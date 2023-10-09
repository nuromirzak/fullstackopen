import { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p><i>{part.description}</i></p>
                </div>
            );
        case "group":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p><i>{part.description}</i></p>
                    <p>Submit to {part.backgroundMaterial}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p><i>{part.description}</i></p>
                    <p>required skills: {part.requirements.join(", ")}</p>
                </div>
            );
        default:
            return assertNever(part);
    }
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

export default Part;