import { defineStore } from 'pinia'
import { api } from '@/boot/axios'

export const useTipsStore = defineStore('tips', {
  state: () => ({
    tipCategories: [],
    loading: false,
    error: null,
  }),
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    async _fetch(getterName, request) {
      this.loading = true
      this.error = null
      try {
        const res = await request()
        this[getterName] = res.data ?? res
        return this[getterName]
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // GET /api/content/tip-categories/ -> api_content_tip_categories_list
    async api_content_tip_categories_list() {
      if (this.tipCategories && this.tipCategories.length) return this.tipCategories
      return this._fetch('tipCategories', () => api.get('/api/content/tip-categories/'))
    },

    // GET /api/content/tips/ -> api_content_tips_list
    async api_content_tips_list({ page = null, page_size = null, category = null, search = null } = {}) {
      const params = new URLSearchParams()
      if (page !== null && page !== undefined) params.set('page', String(page))
      if (page_size !== null && page_size !== undefined) params.set('page_size', String(page_size))
      if (category !== null && category !== undefined) params.set('category', String(category))
      if (search !== null && search !== undefined) params.set('search', String(search))
      const url = params.toString()
        ? `/api/content/tips/?${params.toString()}`
        : '/api/content/tips/'
      return this._fetch('tips', () => api.get(url))
    },
  }
})
