/*
Write a function that calculates BMI based on a given height IN CENTIMETERS and weight IN KILOGRAMS.
Return a message that suits the results.

calculateBmi(180, 74) ---> Normal (healthy weight);

BMI = weight / height ^2
< 18.5 Under Wieght
18.5 - 24.9 Normal
25-29.9 Over Weight
> 30 Obese

Input: Weight - Number
       Height - Number

Output: String - Normal (healty weight);
*/

type BMIResult = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

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

console.log(calculateBmi(180, 74));
