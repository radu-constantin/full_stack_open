import express from 'express';
import { calculateBmi } from './bmiCalculator';

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

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});