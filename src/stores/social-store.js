import { defineStore } from 'pinia'
import { api } from '@/boot/axios'

export const useSocialStore = defineStore('social', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
    page: 1,
    page_size: 10,
    totalCount: 0,
    next: null,
    previous: null
  }),
  actions: {
    async fetchPosts({ page = null, page_size = null, type = null, user_id = null, category = null } = {}) {
      this.loading = true
      this.error = null
      try {
        const finalPage = page !== null && page !== undefined ? page : this.page
        const finalPageSize = page_size !== null && page_size !== undefined ? page_size : this.page_size

        const params = new URLSearchParams()
        params.set('page', String(finalPage))
        params.set('page_size', String(finalPageSize))
        if (type !== null && type !== undefined) params.set('type', String(type))
        if (user_id !== null && user_id !== undefined) params.set('user_id', String(user_id))
        if (category !== null && category !== undefined) params.set('category', String(category))
        const url = params.toString()
          ? `/api/social/posts/?${params.toString()}`
          : '/api/social/posts/'
        const response = await api.get(url)
        this.posts = response.data?.results || []
        this.totalCount = response.data?.count || 0
        this.next = response.data?.next || null
        this.previous = response.data?.previous || null
        this.page = finalPage
        this.page_size = finalPageSize
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async createPost({ author, category, type, content, video_url = '' }) {
      this.loading = true
      this.error = null
      try {

        const response = await api.post('/api/social/posts/', {
          author: {
            first_name: author.first_name,
            last_name: author.last_name
          },
          category,
          type,
          content,
          video_url
        })
        return response.data
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
