import { useState } from 'react';
import Statistics from './Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleClick(option) {
    return function() {
      if (option === "good") {
        setGood(good + 1);
      } else if (option === "neutral") {
        setNeutral(neutral + 1);
      } else if (option === "bad") {
        setBad(bad + 1);
      }
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClick("good")}>good</button>
      <button onClick={handleClick("neutral")}>neutral</button>
      <button onClick={handleClick("bad")}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App