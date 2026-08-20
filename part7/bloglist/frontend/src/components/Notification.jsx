import styled from 'styled-components'

const Message = styled.div`
  padding: 12px 16px;
  margin-bottom: 18px;
  border: 1px solid #888;
  border-radius: 7px;
  background: #f5f5f5;
  font-weight: 600;
`

const Notification = ({ message }) => {
  if (!message) return null
  return <Message>{message}</Message>
}

export default Notification
