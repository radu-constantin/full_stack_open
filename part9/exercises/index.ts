import express, { json } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3003;

interface bmiQuery {
  height: string,
  weight: string
}

function parseQuery(query: bmiQuery) {
  if (!query.height || !query.weight) {
    throw new Error("Missing height or weight input!");
  }

  if (isNaN(Number(query.height)) || isNaN(Number(query.weight))) {
    throw new Error("Invalid input data. Input must be a number!");
  }

  return {
    height: Number(query.height),
    weight: Number(query.weight)
  };
}

app.use(json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    // @ts-ignore
    const {height, weight} = parseQuery(req.query);
    const result = calculateBmi(height, weight);

    res.send(result);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` ${error.message}`;
    }
    
    res.send(errorMessage);
  }
});

app.post('/exercises', (req, res) => {
  const data = req.body;
  if (!data.daily_exercises || !data.target) {
    res.status(400).send({error: 'parameters missing'});
  }
  const result = calculateExercises(data.daily_exercises, data.target);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});