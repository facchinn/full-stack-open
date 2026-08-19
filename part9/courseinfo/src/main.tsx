import ReactDOM from 'react-dom/client'
import './style.css'

interface BasePart { name: string; exerciseCount: number }
interface BasicPart extends BasePart { kind: 'basic'; description: string }
interface GroupPart extends BasePart { kind: 'group'; groupProjectCount: number }
interface BackgroundPart extends BasePart { kind: 'background'; description: string; backgroundMaterial: string }
interface SpecialPart extends BasePart { kind: 'special'; description: string; requirements: string[] }
type CoursePart = BasicPart | GroupPart | BackgroundPart | SpecialPart

const parts: CoursePart[] = [
  { name: 'Fundamentals', exerciseCount: 10, kind: 'basic', description: 'React and TypeScript foundations' },
  { name: 'Using props to pass data', exerciseCount: 7, kind: 'group', groupProjectCount: 3 },
  { name: 'Deeper type usage', exerciseCount: 14, kind: 'background', description: 'Type narrowing', backgroundMaterial: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html' },
  { name: 'Special techniques', exerciseCount: 7, kind: 'special', description: 'Discriminated unions', requirements: ['typescript', 'react'] },
]

const assertNever = (value: never): never => { throw new Error(`Unhandled part ${JSON.stringify(value)}`) }
function Part({ part }: { part: CoursePart }) {
  let detail: React.ReactNode
  switch (part.kind) {
    case 'basic': detail = part.description; break
    case 'group': detail = `${part.groupProjectCount} group projects`; break
    case 'background': detail = <a href={part.backgroundMaterial}>{part.description}</a>; break
    case 'special': detail = `${part.description} — requires ${part.requirements.join(', ')}`; break
    default: return assertNever(part)
  }
  return <article><span>{part.kind}</span><h2>{part.name}</h2><p>{detail}</p><strong>{part.exerciseCount} exercises</strong></article>
}

function App() { return <main><p className="eyebrow">Exercise 9.14</p><h1>Typed course information</h1><div>{parts.map((part) => <Part key={part.name} part={part} />)}</div><footer>Total {parts.reduce((sum, part) => sum + part.exerciseCount, 0)} exercises</footer></main> }
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
