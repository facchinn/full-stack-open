import { create } from 'zustand'
import blogService from './services/blogs'
import persistentUser from './services/persistentUser'

let notificationTimer

const useAppStore = create((set) => ({
  blogs: [],
  user: null,
  notification: null,
  actions: {
    initializeBlogs: async () => {
      const blogs = await blogService.getAll()
      set({ blogs })
    },

    initializeUser: () => {
      const user = persistentUser.getUser()
      if (user) {
        blogService.setToken(user.token)
      }
      set({ user })
    },

    notify: (message, seconds = 5) => {
      clearTimeout(notificationTimer)
      set({ notification: message })
      notificationTimer = setTimeout(() => {
        set({ notification: null })
      }, seconds * 1000)
    },

    loginUser: (user) => {
      persistentUser.saveUser(user)
      blogService.setToken(user.token)
      set({ user })
    },

    logoutUser: () => {
      persistentUser.removeUser()
      blogService.setToken(null)
      set({ user: null })
    },

    createBlog: async (blog) => {
      const createdBlog = await blogService.create(blog)
      set((state) => ({ blogs: state.blogs.concat(createdBlog) }))
      return createdBlog
    },

    likeBlog: async (blog) => {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      })

      set((state) => ({
        blogs: state.blogs.map((item) =>
          item.id === updatedBlog.id ? updatedBlog : item
        ),
      }))

      return updatedBlog
    },

    removeBlog: async (blog) => {
      await blogService.remove(blog.id)
      set((state) => ({
        blogs: state.blogs.filter((item) => item.id !== blog.id),
      }))
    },

    commentBlog: async (blog, comment) => {
      const updatedBlog = await blogService.addComment(blog.id, comment)
      set((state) => ({
        blogs: state.blogs.map((item) =>
          item.id === updatedBlog.id ? updatedBlog : item
        ),
      }))
      return updatedBlog
    },
  },
}))

export const useBlogs = () => useAppStore((state) => state.blogs)
export const useLoggedUser = () => useAppStore((state) => state.user)
export const useNotification = () => useAppStore((state) => state.notification)
export const useAppActions = () => useAppStore((state) => state.actions)

export default useAppStore
