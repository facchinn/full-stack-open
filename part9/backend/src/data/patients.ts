import { Gender, HealthCheckRating, type Patient } from '../types.js'
const patients: Patient[] = [
  { id: 'd2773336-f723-11e9-8f0b-362b9e155667', name: 'John McClane', dateOfBirth: '1986-07-09', ssn: '090786-122X', gender: Gender.Male, occupation: 'New York City cop', entries: [{ id: 'abcd-1', date: '2019-05-01', specialist: 'Dr. House', type: 'HealthCheck', description: 'Yearly control visit', healthCheckRating: HealthCheckRating.Healthy }] },
  { id: 'd2773598-f723-11e9-8f0b-362b9e155667', name: 'Minna Real', dateOfBirth: '1979-01-30', ssn: '300179-77A', gender: Gender.Female, occupation: 'Teacher', entries: [{ id: 'abcd-2', date: '2021-10-15', specialist: 'Dr. Quinn', type: 'OccupationalHealthcare', description: 'Repetitive strain pain', employerName: 'School District', diagnosisCodes: ['M24.2'], sickLeave: { startDate: '2021-10-16', endDate: '2021-10-20' } }] },
  { id: 'd27736ec-f723-11e9-8f0b-362b9e155667', name: 'Andy Bernard', dateOfBirth: '1971-11-15', ssn: '151171-44A', gender: Gender.Male, occupation: 'Salesperson', entries: [{ id: 'abcd-3', date: '2020-02-20', specialist: 'Dr. Cox', type: 'Hospital', description: 'Severe respiratory infection', diagnosisCodes: ['J10.1'], discharge: { date: '2020-02-25', criteria: 'Fever gone' } }] },
]
export default patients
