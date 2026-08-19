import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculateBmi } from './bmiCalculator.js'
import { calculateExercises } from './exerciseCalculator.js'
test('BMI returns normal range', () => assert.equal(calculateBmi(180, 74), 'Normal range'))
test('exercise calculator reports period and target', () => { const result = calculateExercises([1, 0, 2], 1); assert.equal(result.periodLength, 3); assert.equal(result.success, true) })
