import crypto from 'node:crypto'
import patients from '../data/patients.js'
import type { NewEntry, NewPatient, Patient, PublicPatient } from '../types.js'

export const getPublic = (): PublicPatient[] => patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }))
export const getAll = (): Patient[] => patients
export const findById = (id: string): Patient | undefined => patients.find((patient) => patient.id === id)
export const addPatient = (patient: NewPatient): Patient => { const created = { ...patient, id: crypto.randomUUID(), entries: [] }; patients.push(created); return created }
export const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => { const patient = findById(patientId); if (!patient) return undefined; patient.entries.push({ ...entry, id: crypto.randomUUID() } as typeof patient.entries[number]); return patient }
