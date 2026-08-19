export interface ExerciseResult { periodLength: number; trainingDays: number; success: boolean; rating: 1 | 2 | 3; ratingDescription: string; target: number; average: number }
export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  if (!dailyHours.length || dailyHours.some((hour) => hour < 0) || target <= 0) throw new Error('invalid exercise data')
  const average = dailyHours.reduce((sum, hour) => sum + hour, 0) / dailyHours.length
  const ratio = average / target
  const rating: 1 | 2 | 3 = ratio >= 1 ? 3 : ratio >= 0.6 ? 2 : 1
  return { periodLength: dailyHours.length, trainingDays: dailyHours.filter(Boolean).length, success: average >= target, rating, ratingDescription: rating === 3 ? 'excellent work' : rating === 2 ? 'not too bad but could be better' : 'more consistency is needed', target, average }
}
if (process.argv[1]?.endsWith('exerciseCalculator.ts') && process.argv.length > 3) console.log(calculateExercises(process.argv.slice(3).map(Number), Number(process.argv[2])))
