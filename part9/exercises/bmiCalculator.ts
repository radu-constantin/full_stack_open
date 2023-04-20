type BMIResult = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

interface BMIData {
  height: number,
  weight: number
}

function parseArguments(args: string[]): BMIData {
  if (args.length < 4) throw new Error('Not enough arguments were given!')
  if (args.length > 4) throw new Error('Too many arguments were given!');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Provided values are not numbers!");
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

function calculateBmi(height: number, weight: number) : BMIResult {
  const BMI = Number((weight / Math.pow(height / 100, 2)).toFixed(2));
  if (BMI >= 30) {
    return "Obese";
  } else if (BMI >= 25) {
    return "Overweight";
  } else if (BMI >= 18.5) {
    return "Normal";
  } else {
    return "Underweight";
  }
}



try {
  console.log(process.argv)
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}


