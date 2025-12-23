import { defineStore } from 'pinia'
import { api } from '@/boot/axios'

export const useContentStore = defineStore('content', {
  state: () => ({
    blogs: [],
    blog: null,
    blogCategories: [], // added cache for categories
    menu: [],
    menuItem: null,
    recipes: [],
    recipe: null,
    shop: [],
    shopItem: null,
    loading: false,
    error: null,
  }),
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    // helper to handle requests
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

    // GET /api/content/blogs/  -> api_content_blogs_list
    async api_content_blogs_list(pageNumber = null, category = null, pageSize = null) {
      // if no params and cached, return cache
      if ((pageNumber === null && category === null && pageSize === null) && this.blogs && this.blogs.length) return this.blogs

      // build query string when parameters provided
      const params = new URLSearchParams()
      if (pageNumber !== null && pageNumber !== undefined) params.set('page', String(pageNumber))
      if (category !== null && category !== undefined && category !== '') params.set('category', String(category))
      if (pageSize !== null && pageSize !== undefined && pageSize !== '') params.set('page_size', String(pageSize))
      const url = params.toString() ? `/api/content/blogs/?${params.toString()}` : '/api/content/blogs/'

      return this._fetch('blogs', () => api.get(url))
    },

    // GET /api/content/blog-categories/ -> api_content_blog_categories_list
    async api_content_blog_categories_list() {
      if (this.blogCategories && this.blogCategories.length) return this.blogCategories
      return this._fetch('blogCategories', () => api.get('/api/content/blog-categories/'))
    },

    // GET /api/content/blogs/{id}/  -> api_content_blogs_read
    async api_content_blogs_read(id) {
      if (!id) throw new Error('id is required for api_content_blogs_read')
      if (this.blog && String(this.blog.id) === String(id)) return this.blog
      return this._fetch('blog', () => api.get(`/api/content/blogs/${id}/`))
    },

    // GET /api/content/menu/  -> api_content_menu_list
    async api_content_menu_list(start_date = null) {
      // If no start_date param, use cache if available
      if ((start_date === null || start_date === undefined) && this.menu && this.menu.length) return this.menu

      if (start_date !== null && start_date !== undefined && start_date !== '') {
        const params = new URLSearchParams()
        params.set('start_date', String(start_date))
        const url = `/api/content/menu/?${params.toString()}`
        const result = await this._fetch('menu', () => api.get(url))
        if (!result || (Array.isArray(result) && result.length === 0)) {
          // No data for this start_date
          return { error: 'No data for this start date.' }
        }
        return result
      } else {
        // No start_date param, fetch all
        console.log('Fetching all menu data without start_date filter.');
        return this._fetch('menu', () => api.get('/api/content/menu/'))
      }
    },

    // GET /api/content/menu/{id}/  -> api_content_menu_read
    async api_content_menu_read(id) {
      if (!id) throw new Error('id is required for api_content_menu_read')
      if (this.menuItem && String(this.menuItem.id) === String(id)) return this.menuItem
      return this._fetch('menuItem', () => api.get(`/api/content/menu/${id}/`))
    },

    // GET /api/content/recipes/  -> api_content_recipes_list
    async api_content_recipes_list() {
      if (this.recipes && this.recipes.length) return this.recipes
      return this._fetch('recipes', () => api.get('/api/content/recipes/'))
    },

    // GET /api/content/recipes/{id}/ -> api_content_recipes_single_read
    async api_content_recipes_single_read({ recipeID }) {
      if (!recipeID) throw new Error('recipeID is required for api_content_recipes_single_read')
      const url = `/api/content/recipes/${recipeID}/`
      return api.get(url)
    },

    // GET /api/content/shop/  -> api_content_shop_list
    async api_content_shop_list() {
      if (this.shop && this.shop.length) return this.shop
      return this._fetch('shop', () => api.get('/api/content/shop/'))
    },

    // GET /api/content/shop/{id}/  -> api_content_shop_read
    async api_content_shop_read(id) {
      if (!id) throw new Error('id is required for api_content_shop_read')
      if (this.shopItem && String(this.shopItem.id) === String(id)) return this.shopItem
      return this._fetch('shopItem', () => api.get(`/api/content/shop/${id}/`))
    },

    // GET /api/content/blogs/{id}/comments/ -> api_content_blogs_comments_list
    async api_content_blogs_comments_list({ blogID, page = null, page_size = null } = {}) {
      if (!blogID) throw new Error('blogID is required for api_content_blogs_comments_list')
      const params = new URLSearchParams()
      if (page !== null && page !== undefined) params.set('page', String(page))
      if (page_size !== null && page_size !== undefined) params.set('page_size', String(page_size))
      const url = params.toString()
        ? `/api/content/blogs/${blogID}/comments/?${params.toString()}`
        : `/api/content/blogs/${blogID}/comments/`
      return this._fetch('blogComments', () => api.get(url))
    },

    // POST /api/content/blogs/{id}/comments/ -> api_content_blogs_comments_create
    async api_content_blogs_comments_create({ blogID, data }) {
      if (!blogID) throw new Error('blogID is required for api_content_blogs_comments_create')
      if (!data) throw new Error('data is required for api_content_blogs_comments_create')
      const url = `/api/content/blogs/${blogID}/comments/`
      return api.post(url, data)
    },

    // POST /api/content/blog-comments/{id}/report/ -> api_content_recipe_comments_report_create
    async api_content_comments_report_create({ commentID }) {
      if (!commentID) throw new Error('commentID is required for api_content_recipe_comments_report_create')
      const url = `/api/content/comments/${commentID}/report/`
      return api.post(url)
    },
    // DELETE /api/content/blog-comments/{id}/report/ -> api_content_recipe_comments_report_delete
    async api_content_comments_report_delete({ commentID }) {
      if (!commentID) throw new Error('commentID is required for api_content_recipe_comments_report_delete')
      const url = `/api/content/comments/${commentID}/report/`
      return api.delete(url)
    },

       // POST /api/content/comments/{id}/reply/ -> api_content_comments_reply_create
    async api_content_comments_reply_create({ commentID, data }) {
      console.log('api_content_recipes_comments_reply_create called with commentID:', commentID, 'and data:', data)
      if (!commentID) throw new Error('commentID is required for api_content_comments_reply_create')
      if (!data) throw new Error('data is required for api_content_comments_reply_create')
      const url = `/api/content/comments/${commentID}/reply/`
      return api.post(url, data)
    },




      // POST /api/content/recipes/{id}/comments/ -> api_content_recipes_comments_create
    async api_content_recipes_comments_create({ recipeID, data }) {
      if (!recipeID) throw new Error('recipeID is required for api_content_recipes_comments_create')
      if (!data) throw new Error('data is required for api_content_recipes_comments_create')
      const url = `/api/content/recipes/${recipeID}/comments/`
      return api.post(url, data)
    },


       // POST /api/content/comments/{id}/reply/ -> api_content_comments_reply_create
    async api_content_recipes_comments_reply_create({ commentID, data }) {
      console.log('api_content_recipes_comments_reply_create called with commentID:', commentID, 'and data:', data)
      if (!commentID) throw new Error('commentID is required for api_content_comments_reply_create')
      if (!data) throw new Error('data is required for api_content_comments_reply_create')
      const url = `/api/content/recipe-comments/${commentID}/reply/`
      return api.post(url, data)
    },
    // POST /api/content/recipe-comments/{id}/like/ -> api_content_recipe_comments_like_create
    async api_content_comments_like_create({ commentID }) {
      if (!commentID) throw new Error('commentID is required for api_content_recipe_comments_like_create')
      const url = `/api/content/comments/${commentID}/like/`
      return api.post(url)
    },


    // GET /api/content/recipe-comments/{id}/ -> api_content_recipe_comments_read
    async api_content_recipe_comments_read({ commentID }) {
      if (!commentID) throw new Error('commentID is required for api_content_recipe_comments_read')
      const url = `/api/content/recipe-comments/${commentID}/`
      return api.get(url)
    },
    // POST /api/content/recipe-comments/{id}/like/ -> api_content_recipe_comments_like_create
    async api_content_recipe_comments_like_create({ commentID }) {
      if (!commentID) throw new Error('commentID is required for api_content_recipe_comments_like_create')
      const url = `/api/content/recipe-comments/${commentID}/like/`
      return api.post(url)
    },
    // POST /api/content/recipe-comments/{id}/report/ -> api_content_recipe_comments_report_create
    async api_content_recipe_comments_report_create({ commentID }) {
      if (!commentID) throw new Error('commentID is required for api_content_recipe_comments_report_create')
      const url = `/api/content/recipe-comments/${commentID}/report/`
      return api.post(url)
    },
    // DELETE /api/content/recipe-comments/{id}/report/ -> api_content_recipe_comments_report_delete
    async api_content_recipe_comments_report_delete({ commentID }) {
      if (!commentID) throw new Error('commentID is required for api_content_recipe_comments_report_delete')
      const url = `/api/content/recipe-comments/${commentID}/report/`
      return api.delete(url)
    },

    // GET /api/content/blogs/{id}/comments/ -> api_content_blogs_comments_list
    async api_content_recipes_comments_list({ recipeID, page = null, page_size = null } = {}) {
      if (!recipeID) throw new Error('recipeID is required for api_content_recipes_comments_list')
      const params = new URLSearchParams()
      if (page !== null && page !== undefined) params.set('page', String(page))
      if (page_size !== null && page_size !== undefined) params.set('page_size', String(page_size))
      const url = params.toString()
        ? `/api/content/recipes/${recipeID}/comments/?${params.toString()}`
        : `/api/content/recipes/${recipeID}/comments/`
      return this._fetch('recipeComments', () => api.get(url))
    },

    // GET /api/content/recipes/ -> api_content_recipes_list_with_params
    async api_content_recipes_list_with_params({ page = null, page_size = null, language = null, search = null, portions = null, labels = null, preparation_time = null } = {}) {
      const params = new URLSearchParams()
      if (page !== null && page !== undefined) params.set('page', String(page))
      if (page_size !== null && page_size !== undefined) params.set('page_size', String(page_size))
      if (language !== null && language !== undefined) params.set('language', String(language))
      if (search !== null && search !== undefined) params.set('search', String(search))
      if (portions !== null && portions !== undefined) params.set('portions', String(portions))
      if (labels !== null && labels !== undefined) params.set('labels', String(labels))
      if (preparation_time !== null && preparation_time !== undefined) params.set('preparation_time', String(preparation_time))
      const url = params.toString()
        ? `/api/content/recipes/?${params.toString()}`
        : '/api/content/recipes/'
      return this._fetch('recipes', () => api.get(url))
    },

    
  }})
