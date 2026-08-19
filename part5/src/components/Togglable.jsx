import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(function Togglable({ buttonLabel, children }, reference) {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(reference, () => ({ toggleVisibility }))

  return (
    <div>
      {!visible && <button className="new-blog" onClick={toggleVisibility}>{buttonLabel}</button>}
      {visible && <div className="toggle-content">{children}<button className="cancel" onClick={toggleVisibility}>Cancel</button></div>}
    </div>
  )
})

export default Togglable
