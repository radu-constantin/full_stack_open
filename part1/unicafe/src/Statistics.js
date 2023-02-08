import StatisticLine from "./StatisticLine";

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

  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={calculateTotal()} />
        <StatisticLine text="average" value={calculateAverage()} />
        <StatisticLine text="positive" value={calculatePositivePercentage()} />
      </tbody>
    </table>
  )
}

export default Statistics;