import cors from 'cors'
import express from 'express'
import diagnoses from './data/diagnoses.js'
import diaries from './data/diaries.js'
import { calculateBmi } from './bmiCalculator.js'
import { calculateExercises } from './exerciseCalculator.js'
import { newDiarySchema, newEntrySchema, newPatientSchema } from './schemas.js'
import * as patientService from './services/patientService.js'

const app = express()
app.use(cors())
app.use(express.json())
app.get('/api/ping', (_request, response) => response.send('pong'))
app.get('/api/diagnoses', (_request, response) => response.json(diagnoses))
app.get('/api/patients', (_request, response) => response.json(patientService.getPublic()))
app.get('/api/patients/:id', (request, response) => { const patient = patientService.findById(request.params.id); return patient ? response.json(patient) : response.status(404).json({ error: 'patient not found' }) })
app.post('/api/patients', (request, response) => { const parsed = newPatientSchema.safeParse(request.body); return parsed.success ? response.status(201).json(patientService.addPatient(parsed.data)) : response.status(400).json({ error: parsed.error.issues.map((issue) => issue.message).join(', ') }) })
app.post('/api/patients/:id/entries', (request, response) => { const parsed = newEntrySchema.safeParse(request.body); if (!parsed.success) return response.status(400).json({ error: parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ') }); const patient = patientService.addEntry(request.params.id, parsed.data); return patient ? response.status(201).json(patient) : response.status(404).json({ error: 'patient not found' }) })
app.get('/api/diaries', (_request, response) => response.json(diaries))
app.get('/api/diaries/:id', (request, response) => { const diary = diaries.find((item) => item.id === Number(request.params.id)); return diary ? response.json(diary) : response.status(404).end() })
app.post('/api/diaries', (request, response) => { const parsed = newDiarySchema.safeParse(request.body); if (!parsed.success) return response.status(400).json({ error: parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ') }); const created = { ...parsed.data, id: Math.max(0, ...diaries.map((item) => item.id)) + 1 }; diaries.push(created); return response.status(201).json(created) })
app.get('/bmi', (request, response) => { try { response.json({ height: Number(request.query.height), weight: Number(request.query.weight), bmi: calculateBmi(Number(request.query.height), Number(request.query.weight)) }) } catch (error) { response.status(400).json({ error: error instanceof Error ? error.message : 'invalid parameters' }) } })
app.post('/exercises', (request, response) => { try { response.json(calculateExercises(request.body.daily_exercises, request.body.target)) } catch (error) { response.status(400).json({ error: error instanceof Error ? error.message : 'invalid parameters' }) } })

const port = Number(process.env.PORT || 3002)
app.listen(port, () => console.log(`Patientor backend running on port ${port}`))
