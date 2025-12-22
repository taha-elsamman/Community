import { defineStore } from 'pinia'
import { api } from '@/boot/axios'

export const useAuthStore = defineStore('auth', {
  getters
: {
    isAuthenticated: (state) => !!state.token,
  },
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),
  actions: {
    async login(data) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/auth/token/login/', data)
        this.token = res.data.auth_token
        localStorage.setItem('token', this.token)
        await this.fetchMe()
        if (this.user && this.user.id) {
          localStorage.setItem('user', JSON.stringify({ id: this.user.id }))
        }
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/token/logout/', {}, {
          headers: { Authorization: `Token ${this.token}` }
        })
      } catch {
        // ignore error
      }
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.loading = false
    },
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/auth/users/', {
          headers: { Authorization: `Token ${this.token}` }
        })
        return res.data
      } catch (e) {
        this.error = e
        return []
      } finally {
        this.loading = false
      }
    },
    async createUser(data) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/auth/users/', data)
        return res.data
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async getUser(id) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`/auth/users/${id}/`, {
          headers: { Authorization: `Token ${this.token}` }
        })
        return res.data
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async updateUser(id, data) {
      this.loading = true
      this.error = null
      try {
        const res = await api.put(`/auth/users/${id}/`, data, {
          headers: { Authorization: `Token ${this.token}` }
        })
        return res.data
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async partialUpdateUser(id, data) {
      this.loading = true
      this.error = null
      try {
        const res = await api.patch(`/auth/users/${id}/`, data, {
          headers: { Authorization: `Token ${this.token}` }
        })
        return res.data
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async deleteUser(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/auth/users/${id}/`, {
          headers: { Authorization: `Token ${this.token}` }
        })
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async activateUser(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/activation/', data)
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async fetchMe() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/auth/users/me/', {
          headers: { Authorization: `Token ${this.token}` }
        })
        this.user = res.data
        return res.data
      } catch (e) {
        this.user = null
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async updateMe(data) {
      this.loading = true
      this.error = null
      try {
        const res = await api.put('/auth/users/me/', data, {
          headers: { Authorization: `Token ${this.token}` }
        })
        this.user = res.data
        return res.data
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async partialUpdateMe(data) {
      this.loading = true
      this.error = null
      try {
        console.log('Sending partial update data:', data)
        const res = await api.patch('/auth/users/me/', data, {
          headers: { Authorization: `Token ${this.token}` }
        })
        console.log('Partial update response:', res.data)
        this.user = res.data
        return res.data
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async deleteMe() {
      this.loading = true
      this.error = null
      try {
        await api.delete('/auth/users/me/', {
          headers: { Authorization: `Token ${this.token}` }
        })
        this.user = null
        this.token = null
        localStorage.removeItem('token')
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async resendActivation(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/resend_activation/', data)
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async resetEmailConfirm(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/reset_email_confirm/', data)
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async resetEmail(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/reset_email/', data)
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async resetPasswordConfirm(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/reset_password_confirm/', data)
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async resetPassword(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/reset_password/', data)
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async setEmail(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/set_email/', data, {
          headers: { Authorization: `Token ${this.token}` }
        })
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },
    async setPassword(data) {
      this.loading = true
      this.error = null
      try {
        await api.post('/auth/users/set_password/', data, {
          headers: { Authorization: `Token ${this.token}` }
        })
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    }
  }
})
