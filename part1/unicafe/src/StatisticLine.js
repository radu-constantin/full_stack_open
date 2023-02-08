function StatisticLine({ text, value }) {
  let symbol = null;
  if (text === "positive") {
    symbol = "%"
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value} {symbol}</td>
    </tr>
  )
}

export default StatisticLine;