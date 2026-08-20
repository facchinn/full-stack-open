import { Component } from 'react'
import styled from 'styled-components'

const ErrorBox = styled.div`
  padding: 24px;
  border: 1px solid #d33;
  border-radius: 8px;
  background: #fff4f4;
`

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('render error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBox>
          <h2>Something went wrong</h2>
          <p>
            The page could not be rendered. You can still use the navigation
            above.
          </p>
        </ErrorBox>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
