import { useState, type FormEvent } from 'react'
import { Gender, type NewPatient } from '../types'
export default function PatientForm({ onSubmit, onCancel }: { onSubmit: (patient: NewPatient) => Promise<void>; onCancel: () => void }) {
  const [values, setValues] = useState({ name: '', ssn: '', dateOfBirth: '', occupation: '', gender: Gender.Other })
  const change = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValues({ ...values, [key]: event.target.value })
  const submit = async (event: FormEvent) => { event.preventDefault(); await onSubmit(values) }
  return <div className="modal"><form onSubmit={submit}><h2>New patient</h2><label>Full name<input value={values.name} onChange={change('name')} required /></label><label>SSN<input value={values.ssn} onChange={change('ssn')} required /></label><label>Date of birth<input type="date" value={values.dateOfBirth} onChange={change('dateOfBirth')} required /></label><label>Occupation<input value={values.occupation} onChange={change('occupation')} required /></label><label>Gender<select value={values.gender} onChange={change('gender')}>{Object.values(Gender).map((gender) => <option key={gender}>{gender}</option>)}</select></label><div className="form-actions"><button type="button" onClick={onCancel}>Cancel</button><button className="primary">Add patient</button></div></form></div>
}
