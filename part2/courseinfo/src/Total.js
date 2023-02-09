function Total({ parts }) {
  const total = parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, 0);

  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total;