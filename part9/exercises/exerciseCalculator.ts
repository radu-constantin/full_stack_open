interface WeeklyResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));