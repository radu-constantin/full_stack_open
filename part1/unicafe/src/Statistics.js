function Statistics({ good, neutral, bad }) {
  function calculateTotal() {
    return good + neutral + bad
  }

  function calculateAverage() {
    const average = (good - bad) / calculateTotal();
    return isNaN(average) ? 0 : average;
  }

  function calculatePositivePercentage() {
    const percentage = good / calculateTotal() * 100;
    return isNaN(percentage) ? 0 : percentage;
  }

  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {calculateTotal()}</p>
      <p>average {calculateAverage()}</p>
      <p>positive {calculatePositivePercentage()}</p>
    </>
  )
}

export default Statistics;