const storageKey = 'loggedBlogappUser'

const getUser = () => {
  const savedUser = window.localStorage.getItem(storageKey)
  if (!savedUser) return null

  try {
    return JSON.parse(savedUser)
  } catch {
    window.localStorage.removeItem(storageKey)
    return null
  }
}

const saveUser = (user) => {
  window.localStorage.setItem(storageKey, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(storageKey)
}

export default { getUser, saveUser, removeUser }
