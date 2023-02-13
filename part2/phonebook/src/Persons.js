function Persons({ personList, deletePerson }) {
    return (
        <div>
            {personList.map(person =>
                <p key={person.name} id={person.id}>{person.name} {person.number}
                    <button onClick={deletePerson(person)}>delete</button>
                </p>
            )}
        </div>
    )
}

export default Persons;