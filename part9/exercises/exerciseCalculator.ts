interface WeeklyResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseData {
  target: number,
  log: number[]
}

function parseArguments(args: string[]): ExerciseData {
  if (args.length > 10) throw new Error("Too many arguments were given!");
  if (args.length < 4)  throw new Error("Not enough arguments were given!");

  for (let arg of args.slice(2)) {
    if (isNaN(Number(arg))) throw new Error("All arguments must be numbers!");
  }

  return {
    target: Number(args[2]),
    log: args.slice(3).map(arg => Number(arg)),
  }
}

function calculateRating(trainingAverage: number, targetAverage: number) {
  if (trainingAverage >= targetAverage) {
    console.log(trainingAverage, targetAverage);
    return {
      rating: 3,
      ratingDescription: 'Perfect'
    }
  } else if (trainingAverage >= targetAverage / 2) {
    return {
      rating: 2,
      ratingDescription: 'Could be better'
    }
  } else {
    return {
      rating: 1, 
      ratingDescription: 'Bad'
    }
  }
};

function calculateExercises(trainingLog: number[], dailyTarget: number): WeeklyResult {
  const trainingAverage = trainingLog.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0) / trainingLog.length;
  
  const trainingDays = trainingLog.filter(day => day > 0).length;
  const ratingObj = calculateRating(trainingAverage, dailyTarget);

  return {
    periodLength: trainingLog.length,
    trainingDays,
    success: trainingAverage >= dailyTarget,
    rating: ratingObj.rating,
    ratingDescription: ratingObj.ratingDescription,
    target: dailyTarget,
    average: trainingAverage
  }
}

try {
  console.log(process.argv)
  const {target, log} = parseArguments(process.argv);
  
  console.log(calculateExercises(log, target));
} catch(error) {
  let errorMessage = 'Something bad happened!'
  if (error instanceof Error) errorMessage += ` Error: ${error.message}`
  console.log(errorMessage);
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));