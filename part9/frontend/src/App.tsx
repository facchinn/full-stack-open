import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import EntryDetails from './components/EntryDetails'
import EntryForm from './components/EntryForm'
import PatientForm from './components/PatientForm'
import * as service from './services'
import type { Diagnosis, NewEntry, NewPatient, Patient, PatientSummary } from './types'

export default function App() {
  const [patients, setPatients] = useState<PatientSummary[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [modal, setModal] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => { Promise.all([service.getPatients(), service.getDiagnoses()]).then(([people, codes]) => { setPatients(people); setDiagnoses(codes) }) }, [])
  const handleError = (caught: unknown) => { setError(axios.isAxiosError(caught) ? caught.response?.data?.error || caught.message : 'Unexpected error'); window.setTimeout(() => setError(''), 5000) }
  const addPatient = async (values: NewPatient) => { try { const patient = await service.createPatient(values); setPatients(patients.concat(patient)); setModal(false); navigate(`/patients/${patient.id}`) } catch (caught) { handleError(caught) } }
  return <div className="shell"><header><Link to="/">Patientor<span>09</span></Link><button onClick={() => setModal(true)}>+ New patient</button></header>{error && <div className="error">{error}</div>}<main><Routes><Route path="/" element={<PatientList patients={patients} />} /><Route path="/patients/:id" element={<PatientView diagnoses={diagnoses} onError={handleError} />} /><Route path="*" element={<Navigate to="/" />} /></Routes></main>{modal && <PatientForm onSubmit={addPatient} onCancel={() => setModal(false)} />}<footer><span>Clinical records, clearly typed.</span><span>Full Stack Open · Part 09</span></footer></div>
}

function PatientList({ patients }: { patients: PatientSummary[] }) {
  return <section><header className="page-title"><p>Patient registry</p><h1>Care begins<br />with <em>context.</em></h1></header><div className="patient-table"><div className="patient-head"><span>Name</span><span>Gender</span><span>Occupation</span><span>Born</span></div>{patients.map((patient) => <Link to={`/patients/${patient.id}`} key={patient.id}><strong>{patient.name}</strong><span>{patient.gender}</span><span>{patient.occupation}</span><span>{patient.dateOfBirth} →</span></Link>)}</div></section>
}

function PatientView({ diagnoses, onError }: { diagnoses: Diagnosis[]; onError: (error: unknown) => void }) {
  const { id = '' } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)
  useEffect(() => { service.getPatient(id).then(setPatient).catch(onError) }, [id, onError])
  if (!patient) return <p>Loading patient…</p>
  const addEntry = async (entry: NewEntry) => { try { setPatient(await service.createEntry(id, entry)) } catch (error) { onError(error) } }
  return <section className="patient"><Link className="back" to="/">← Patient registry</Link><header><div className="patient-avatar">{patient.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><p>{patient.gender} · born {patient.dateOfBirth}</p><h1>{patient.name}</h1><span>{patient.occupation} · SSN {patient.ssn}</span></div></header><EntryForm onSubmit={addEntry} /><h2 className="records-title">Health records <span>{patient.entries.length}</span></h2><div className="entries">{patient.entries.map((entry) => <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />)}</div></section>
}
