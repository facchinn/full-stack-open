const Course = ({ course }) => (
  <article className="panel course-panel">
    <p className="eyebrow">Course / {String(course.id).padStart(2, '0')}</p>
    <h2>{course.name}</h2>
    <ul>
      {course.parts.map((part) => (
        <li key={part.id}><span>{part.name}</span><strong>{part.exercises}</strong></li>
      ))}
    </ul>
    <footer>
      <span>Total</span>
      <strong>{course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
    </footer>
  </article>
)

const courses = [
  {
    name: 'Half Stack application development', id: 1,
    parts: [
      { name: 'Fundamentals of React', exercises: 10, id: 1 },
      { name: 'Using props to pass data', exercises: 7, id: 2 },
      { name: 'State of a component', exercises: 14, id: 3 },
      { name: 'Redux', exercises: 11, id: 4 },
    ],
  },
  {
    name: 'Node.js', id: 2,
    parts: [
      { name: 'Routing', exercises: 3, id: 1 },
      { name: 'Middlewares', exercises: 7, id: 2 },
    ],
  },
]

export default function CourseInfo() {
  return (
    <section>
      <div className="page-title"><p>2.1—2.5</p><h1>Course information</h1></div>
      <div className="course-grid">{courses.map((course) => <Course key={course.id} course={course} />)}</div>
    </section>
  )
}
