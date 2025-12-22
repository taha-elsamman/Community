import axios from 'axios'

// Determine if we're in a cross-origin environment
const isCrossOrigin = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === 'egyptenl.vercel.app'
)
console.log("Running in cross-origin environment:", isCrossOrigin)

// Configure axios defaults
axios.defaults.xsrfCookieName = 'csrftoken'  // Django's default CSRF cookie name
axios.defaults.xsrfHeaderName = 'X-CSRFToken' // Django's default CSRF header name
// Disable credentials for cross-origin environments to avoid CORS issues
axios.defaults.withCredentials = !isCrossOrigin

// Create axios instance with base URL
const api = axios.create({
  //baseURL: import.meta.env.VITE_API_BASE_URL || 'https://community.projectlifestyle.nl/'
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/'
})

// Helper function to get cookie value
function getCookie(name) {
  if (typeof window === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // For cross-origin environments, disable withCredentials
    if (isCrossOrigin) {
      config.withCredentials = false
    }

    // Only process CSRF token for mutating requests in same-origin context
    const methodsRequiringCsrf = ['post', 'put', 'patch', 'delete']

    if (
      typeof window !== 'undefined' &&
      methodsRequiringCsrf.includes(config.method?.toLowerCase()) &&
      !isCrossOrigin
    ) {
      // First try to get CSRF token from cookie (works if Django sets it)
      let csrfToken = getCookie('csrftoken')

      // If no token in cookies, you might need to fetch it from an endpoint
      if (!csrfToken) {
        try {
          // Make a GET request to Django's endpoint that ensures CSRF cookie is set
          const response = await axios.get('/api/get-csrf-token/', {
            baseURL: config.baseURL,
            withCredentials: !isCrossOrigin
          })
          console.log('CSRF token fetched:', response.data.csrfToken)
          csrfToken = response.data.csrfToken
        } catch (error) {
          console.error('Could not retrieve CSRF token:', error)
        }
      }

      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
      }
    }

    // Add authorization token if exists (this works with or without credentials)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Token ${token}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        if (window.location.pathname === '/dashboard') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export { axios, api }
