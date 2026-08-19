import type { Diagnosis, Entry } from '../types'
const assertNever = (value: never): never => { throw new Error(`Unhandled entry: ${JSON.stringify(value)}`) }
const icon = { HealthCheck: '♥', Hospital: '✚', OccupationalHealthcare: '◆' } as const
export default function EntryDetails({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) {
  let detail: React.ReactNode
  switch (entry.type) {
    case 'HealthCheck': detail = <p>Health rating <span className={`rating r${entry.healthCheckRating}`}>{['Healthy', 'Low risk', 'High risk', 'Critical'][entry.healthCheckRating]}</span></p>; break
    case 'Hospital': detail = <p>Discharged {entry.discharge.date} — {entry.discharge.criteria}</p>; break
    case 'OccupationalHealthcare': detail = <><p>Employer: {entry.employerName}</p>{entry.sickLeave && <p>Sick leave {entry.sickLeave.startDate}–{entry.sickLeave.endDate}</p>}</>; break
    default: return assertNever(entry)
  }
  return <article className="entry"><header><span className="entry-icon">{icon[entry.type]}</span><div><strong>{entry.type.replace(/([A-Z])/g, ' $1').trim()}</strong><small>{entry.date}</small></div></header><p className="description">{entry.description}</p>{detail}{entry.diagnosisCodes && <ul>{entry.diagnosisCodes.map((code) => <li key={code}><strong>{code}</strong> {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}</li>)}</ul>}<footer>Diagnosed by {entry.specialist}</footer></article>
}
