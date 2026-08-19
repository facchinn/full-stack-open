import axios from 'axios'
import type { Diagnosis, NewEntry, NewPatient, Patient, PatientSummary } from './types'
const api = '/api'
export const getPatients = () => axios.get<PatientSummary[]>(`${api}/patients`).then((response) => response.data)
export const getPatient = (id: string) => axios.get<Patient>(`${api}/patients/${id}`).then((response) => response.data)
export const getDiagnoses = () => axios.get<Diagnosis[]>(`${api}/diagnoses`).then((response) => response.data)
export const createPatient = (patient: NewPatient) => axios.post<Patient>(`${api}/patients`, patient).then((response) => response.data)
export const createEntry = (id: string, entry: NewEntry) => axios.post<Patient>(`${api}/patients/${id}/entries`, entry).then((response) => response.data)
