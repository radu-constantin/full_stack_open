function PersonForm({ submitHandler, nameHandler, numberHandler, newName, newNumber }) {
    return (
        <form onSubmit={submitHandler}>
            <div>
                <p>name: <input onChange={nameHandler} value={newName} /></p>
                <p>number: <input onChange={numberHandler} value={newNumber} /></p>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;