function Filter({ inputHandler, inputValue }) {
    return (
        <p>Filter: <input onChange={inputHandler} value={inputValue} /></p>
    )
}

export default Filter;