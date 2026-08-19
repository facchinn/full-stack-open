import { z } from 'zod'
import { Gender, HealthCheckRating, Visibility, Weather } from './types.js'

const isoDate = z.string().date()
export const newPatientSchema = z.object({ name: z.string().min(1), dateOfBirth: isoDate, ssn: z.string().min(5), gender: z.nativeEnum(Gender), occupation: z.string().min(1) })
const base = { date: isoDate, specialist: z.string().min(1), description: z.string().min(1), diagnosisCodes: z.array(z.string()).optional() }
export const newEntrySchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('HealthCheck'), healthCheckRating: z.nativeEnum(HealthCheckRating) }),
  z.object({ ...base, type: z.literal('Hospital'), discharge: z.object({ date: isoDate, criteria: z.string().min(1) }) }),
  z.object({ ...base, type: z.literal('OccupationalHealthcare'), employerName: z.string().min(1), sickLeave: z.object({ startDate: isoDate, endDate: isoDate }).optional() }),
])
export const newDiarySchema = z.object({ date: isoDate, weather: z.nativeEnum(Weather), visibility: z.nativeEnum(Visibility), comment: z.string() })
