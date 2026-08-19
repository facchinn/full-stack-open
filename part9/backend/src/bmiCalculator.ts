export type BmiCategory = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese'
export const calculateBmi = (heightCm: number, weightKg: number): BmiCategory => {
  if (heightCm <= 0 || weightKg <= 0) throw new Error('height and weight must be positive numbers')
  const bmi = weightKg / (heightCm / 100) ** 2
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal range'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}
if (process.argv[1]?.endsWith('bmiCalculator.ts') && process.argv.length === 4) console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))
