export enum Gender { Male = 'male', Female = 'female', Other = 'other' }
export enum HealthCheckRating { Healthy = 0, LowRisk = 1, HighRisk = 2, CriticalRisk = 3 }
export interface Diagnosis { code: string; name: string; latin?: string }
interface BaseEntry { id: string; date: string; specialist: string; description: string; diagnosisCodes?: string[] }
export interface HealthCheckEntry extends BaseEntry { type: 'HealthCheck'; healthCheckRating: HealthCheckRating }
export interface HospitalEntry extends BaseEntry { type: 'Hospital'; discharge: { date: string; criteria: string } }
export interface OccupationalHealthcareEntry extends BaseEntry { type: 'OccupationalHealthcare'; employerName: string; sickLeave?: { startDate: string; endDate: string } }
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry
export interface Patient { id: string; name: string; dateOfBirth: string; ssn: string; gender: Gender; occupation: string; entries: Entry[] }
export type PatientSummary = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id' | 'entries'>
export type NewEntry = Entry extends infer Item ? Item extends Entry ? Omit<Item, 'id'> : never : never
