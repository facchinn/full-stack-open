import { useState, type FormEvent } from 'react'
import { HealthCheckRating, type NewEntry } from '../types'
type EntryType = NewEntry['type']
export default function EntryForm({ onSubmit }: { onSubmit: (entry: NewEntry) => Promise<void> }) {
  const [type, setType] = useState<EntryType>('HealthCheck')
  const [base, setBase] = useState({ description: '', date: '', specialist: '', diagnosisCodes: '' })
  const [extra, setExtra] = useState({ rating: '0', dischargeDate: '', criteria: '', employerName: '', sickStart: '', sickEnd: '' })
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const common = { description: base.description, date: base.date, specialist: base.specialist, diagnosisCodes: base.diagnosisCodes.split(',').map((item) => item.trim()).filter(Boolean) }
    let entry: NewEntry
    if (type === 'HealthCheck') entry = { ...common, type, healthCheckRating: Number(extra.rating) as HealthCheckRating }
    else if (type === 'Hospital') entry = { ...common, type, discharge: { date: extra.dischargeDate, criteria: extra.criteria } }
    else entry = { ...common, type, employerName: extra.employerName, ...(extra.sickStart && extra.sickEnd ? { sickLeave: { startDate: extra.sickStart, endDate: extra.sickEnd } } : {}) }
    await onSubmit(entry); setBase({ description: '', date: '', specialist: '', diagnosisCodes: '' })
  }
  const baseChange = (key: keyof typeof base) => (event: React.ChangeEvent<HTMLInputElement>) => setBase({ ...base, [key]: event.target.value })
  const extraChange = (key: keyof typeof extra) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setExtra({ ...extra, [key]: event.target.value })
  return <form className="entry-form" onSubmit={submit}><div className="entry-form-head"><h2>Add health record</h2><select value={type} onChange={(event) => setType(event.target.value as EntryType)}><option>HealthCheck</option><option>Hospital</option><option>OccupationalHealthcare</option></select></div><div className="form-grid"><label>Description<input value={base.description} onChange={baseChange('description')} required /></label><label>Date<input type="date" value={base.date} onChange={baseChange('date')} required /></label><label>Specialist<input value={base.specialist} onChange={baseChange('specialist')} required /></label><label>Diagnosis codes<input placeholder="M24.2, J10.1" value={base.diagnosisCodes} onChange={baseChange('diagnosisCodes')} /></label>{type === 'HealthCheck' && <label>Rating<select value={extra.rating} onChange={extraChange('rating')}>{Object.values(HealthCheckRating).filter((value) => typeof value === 'number').map((rating) => <option value={rating} key={rating}>{rating}</option>)}</select></label>}{type === 'Hospital' && <><label>Discharge date<input type="date" value={extra.dischargeDate} onChange={extraChange('dischargeDate')} required /></label><label>Criteria<input value={extra.criteria} onChange={extraChange('criteria')} required /></label></>}{type === 'OccupationalHealthcare' && <><label>Employer<input value={extra.employerName} onChange={extraChange('employerName')} required /></label><label>Sick leave starts<input type="date" value={extra.sickStart} onChange={extraChange('sickStart')} /></label><label>Sick leave ends<input type="date" value={extra.sickEnd} onChange={extraChange('sickEnd')} /></label></>}</div><button className="primary">Save record</button></form>
}
