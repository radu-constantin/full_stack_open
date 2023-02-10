function Persons({ personList }) {
    return (
        <div>
            {personList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons;