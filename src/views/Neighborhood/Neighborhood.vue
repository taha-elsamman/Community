<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bankhangen-container">
    <div class="bankhangen-header">
      <!-- Replace with attachment design -->
      <div class="neighborhood-today-title">Vandaag in de buurt</div>
      <div class="neighborhood-today-desc">
        Hoe sta jij op vandaag? Eén woord is genoeg.
      </div>
      <div class="neighborhood-today-post" v-if="todayPost">
        <img class="neighborhood-avatar" :src="todayPost.author.photo || '/Icons/user (3).png'" alt="avatar" />
        <div class="neighborhood-post-content">
          <div class="neighborhood-post-header">
            <span class="neighborhood-post-author"><em>{{ todayPost.author.first_name + ' ' + todayPost.author.last_name }}</em></span>
            <span class="neighborhood-post-time">{{ formatRelativeTime(todayPost.created_at) }}</span>
          </div>
          <div class="neighborhood-post-meta">{{ todayPost.author.status }}</div>
          <div class="neighborhood-post-body">{{ todayPost.content }}</div>
          <div class="neighborhood-post-actions">
            <span class="neighborhood-action">
              <template v-if="todayPost.likes > 0">{{ todayPost.likes }} </template>Like{{ todayPost.likes !== 0 && todayPost.likes !== 1 ? 's' : '' }}
            </span>
            <span class="neighborhood-action" @click="focusWriteCommentBox">
              <template v-if="todayPost.comments_count > 0">{{ todayPost.comments_count }} </template>Reageer{{ todayPost.comments_count !== 0 && todayPost.comments_count !== 1 ? 's' : '' }}
            </span>
            <span class="neighborhood-action">Melden</span>
          </div>
        </div>
      </div>


      <div class="bankhangen-community">
        <div class="bankhangen-community-header-row" ref="communityHeaderRef">
          <div class="bankhangen-community-title">Deel iets in de buurt</div>
        </div>
        <div class="bankhangen-community-subtitle">Kleine momenten, echte verhalen.</div>
        <div class="bankhangen-community-desc">Dit is wat er vandaag leeft in de buurt.</div>
        <div class="bankhangen-community-list">

          <NeighborhoodCommentBox
            ref="writeCommentBoxRef"
            @postCreated="refreshPosts"
            :profile-photo="todayPost?.author?.photo || undefined"
          />

          <!-- Category Filter Menu -->
          <div class="category-menu">
            <span
              v-for="cat in categories"
              :key="cat.value"
              :class="['category-menu-item', { active: selectedCategory === cat.value }]"
              @click="onTabClick(cat.value)"
              tabindex="0"
              @keydown.enter="onTabClick(cat.value)"
            >
              {{ cat.label }}
            </span>
          </div>

          <!-- Use neighborhoodPosts for CommentBox -->
          <CommentBox
            v-for="comment in neighborhoodPosts"
            :key="comment.id"
            v-bind="mapNeighborhoodPostToCommentBox(comment)"
          />
         <div class="lifestyle-pagination">
           <button class="pagination-arrow" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
             <img src="/Icons/Webp/Pagination arrow.webp" alt="Vorige" class="pagination-arrow-img left" />
           </button>
           <button
             v-for="page in visiblePages"
             :key="page"
             class="pagination-page"
             :class="{ active: page === currentPage }"
             @click="changePage(page)"
           >
             {{ page }}
           </button>
           <button class="pagination-arrow" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
             <img src="/Icons/Webp/Pagination arrow.webp" alt="Volgende" class="pagination-arrow-img right" />
           </button>
         </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import CommentBox from '@/components/CommentBox.vue'
import NeighborhoodCommentBox from '@/components/NeighborhoodCommentBox.vue'
import { useSocialStore } from '@/stores/social-store'

const socialStore = useSocialStore()

const writeCommentBoxRef = ref(null)
const communityHeaderRef = ref(null)
const todayPost = ref(null)

// Tabs/categories
const categories = [
  { label: 'Alles', value: 'all' },
  { label: 'Buurtgesprekken', value: 'conversation' },
  { label: 'Succes', value: 'success' },
  { label: 'Struggles', value: 'struggles' },
  { label: 'Vraag', value: 'question' }
]
const selectedCategory = ref('all')

// Store posts per tab
const postsByCategory = ref({
  all: []
})

const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 10

const neighborhoodPosts = computed(() => {
  if (selectedCategory.value === 'all') {
    return postsByCategory.value.all
  }
  return postsByCategory.value[selectedCategory.value] || []
})

onMounted(async () => {
  await socialStore.fetchPosts({ page: 1, page_size: 1, type: 'neighborhood', user_id: 3 })
  todayPost.value = socialStore.posts[0] || null

  // Only fetch 'all' tab initially
  await fetchNeighborhoodPosts('all', 1)
})

function onTabClick(tabValue) {
  if (selectedCategory.value !== tabValue) {
    selectedCategory.value = tabValue
    currentPage.value = 1
    fetchNeighborhoodPosts(tabValue, 1)
  }
}

async function fetchNeighborhoodPosts(tabValue, page = 1) {
  // For 'all', do NOT send category param at all
  const params = {
    page,
    page_size: pageSize,
    type: 'neighborhood'
  }
  if (tabValue !== 'all') {
    params.category = tabValue
  }
  await socialStore.fetchPosts(params)
  postsByCategory.value[tabValue] = socialStore.posts
  totalPages.value = Math.max(1, Math.ceil((socialStore.totalCount || 0) / pageSize))
}

function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchNeighborhoodPosts(selectedCategory.value, page)
}

const visiblePages = computed(() => {
  // Show max 5 pages, center current page if possible
  const pages = []
  let start = Math.max(1, currentPage.value - 1)
  let end = Math.min(totalPages.value, start + 2)
  if (end - start < 2) start = Math.max(1, end - 2)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})



// Map API post to CommentBox props
function mapNeighborhoodPostToCommentBox(post) {
  return {
    id: post.id,
    type: post.type || '',
    typeLabel: post.category === 'success' ? 'Succes'
      : post.category === 'struggles' ? 'Struggles'
      : post.category === 'vraag' ? 'Vraag'
      : post.category === 'buurtgesprekken' ? 'Buurtgesprekken'
      : post.category === 'conversation' ? 'Buurtgesprekken'
      : post.category === 'question' ? 'Vraag'
      : post.type || '',
    avatar: post.author?.photo || '/Icons/user (3).png',
    author: (post.author?.first_name && post.author?.last_name)
      ? `${post.author.first_name} ${post.author.last_name}`
      : post.author?.username || post.author?.id || '',
    status: post.author?.status || '',
    time: post.created_at,
    meta: post.category || '',
    body: post.content || '',
    color: '#e06ca9',
    replies: post.replies || [],
    likesCount: post.likes || 0,
    isLiked: post.is_liked || false,
    userId: post.author?.id || '',
    commentId: post.id,
    // Add other props as needed
  }
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return ''
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return `${diffSec} sec`
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin} min`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr} uur`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay} dag${diffDay > 1 ? 'en' : ''}`
  const diffWk = Math.floor(diffDay / 7)
  if (diffWk < 4) return `${diffWk} week${diffWk > 1 ? 'en' : ''}`
  const diffMo = Math.floor(diffDay / 30)
  if (diffMo < 12) return `${diffMo} maand${diffMo > 1 ? 'en' : ''}`
  const diffYr = Math.floor(diffDay / 365)
  return `${diffYr} jaar${diffYr > 1 ? 'en' : ''}`
}

function refreshPosts() {
  fetchNeighborhoodPosts(selectedCategory.value, currentPage.value)
  socialStore.fetchPosts({ page: 1, page_size: 1, type: 'neighborhood', user_id: 3 }).then(() => {
    todayPost.value = socialStore.posts[0] || null
  })
}

function focusWriteCommentBox() {
  // Pure JavaScript, no jQuery
  nextTick(() => {
    const refComp = writeCommentBoxRef.value
    let el = null
    if (refComp && refComp.$el) {
      el = refComp.$el
    }
    // Scroll into view using native JS
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    // Set dropdown to "Vraag" using v-model
    if (refComp && typeof refComp.selectedOption !== 'undefined') {
      refComp.selectedOption = 'vraag'
    }
    // Focus textarea using native JS
    if (el) {
      const textarea = el.querySelector && el.querySelector('textarea')
      if (textarea) textarea.focus()
    }
  })
}
</script>

<style scoped>
.bankhangen-container {
padding: 5rem 2rem 2rem 5rem;
}


.bankhangen-header {
  margin-bottom: 3.5rem;
}

.bankhangen-title {
  color: #e06ca9;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.7rem;
}

.bankhangen-desc {
  font-size: 1.08rem;
  margin-bottom: 1.2rem;
  color: #888;
  line-height: 1.6;
}

.bankhangen-question {
  font-size: 1.15rem;
  color: #888;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.bankhangen-form-row {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border: 1.5px dashed #e06ca9;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.bankhangen-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #eee;
  flex-shrink: 0;
  margin-bottom: 30px;
  margin-right: 20px;
}

.bankhangen-form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.bankhangen-input {
  width: 100%;
  min-height: 48px;
  border: none;
  font-size: 1.08rem;
  color: #7fa184;
  font-family: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  padding: 0.5rem 0.7rem;

}

.bankhangen-input-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.bankhangen-comment-btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.bankhangen-send-message {
  display: flex;
  align-items: center;
}

.bankhangen-send-message img,
.bankhangen-comment-btns img {
  cursor: pointer;
  transition: opacity 0.2s;
}

.bankhangen-send-message img:hover,
.bankhangen-comment-btns img:hover {
  opacity: 0.7;
}

.bankhangen-community {
  margin-top: 3.5rem;
}

.bankhangen-community-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
  gap: 1rem;
}

.bankhangen-community-title {
  color: #e06ca9;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.8rem;
  margin-top: 5rem;
}

.bankhangen-community-subtitle {
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;

}

.bankhangen-community-desc {
  color: #b3b3b3;
  font-size: 0.9rem;
  margin-bottom: 2.5rem;
}

.bankhangen-community-list {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}


.bankhangen-post-type {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  margin-left: 0.1rem;
}

.bankhangen-post-type.success {
  color: #e06ca9;
}

.bankhangen-post-type.struggles {
  color: #e06ca9;
}

.bankhangen-post-type.vraag {
  color: #e06ca9;
}

.bankhangen-post-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.2rem;
}

.bankhangen-post-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
}

.bankhangen-post-author {
  color: #e06ca9;
  font-size: 1.08rem;
  font-style: italic;
  margin-right: 0.7rem;
}

.bankhangen-post-time {
  color: #b3b3b3;
  font-size: 0.98rem;
  margin-left: 0.5rem;
}

.bankhangen-post-meta {
  color: #b3b3b3;
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
}

.bankhangen-post-body {
  color: #888;
  font-size: 1.08rem;
  margin-bottom: 0.7rem;
  line-height: 1.6;
}

.bankhangen-post-actions {
  display: flex;
  gap: 1.2rem;
  color: #e06ca9;
  font-size: 1.01rem;
}

.bankhangen-action {
  cursor: pointer;
  transition: color 0.2s;
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.01rem;
  padding: 0;
  font-family: inherit;
}

.bankhangen-action:hover {
  color: #b3b3b3;
  text-decoration: underline;
}

.bankhangen-community-link {
  color: #e06ca9;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 400;
  margin: 0;
  text-align: right;
}

.bankhangen-community-link:hover {
  text-decoration: underline;
}

.neighborhood-today-title {
  color: #e06ca9;
  font-size: 2.2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
  font-family: inherit;
}

.neighborhood-today-desc {
  color: #888;
  font-size: 1.18rem;
  margin-bottom: 2.2rem;
  font-family: inherit;
}

.neighborhood-today-post {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  margin-top: 4rem;
}

.neighborhood-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
  margin-top: 0.2rem;
  margin-right: 20px;
}

.neighborhood-post-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.neighborhood-post-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.2rem;
}

.neighborhood-post-author {
  color: #e06ca9;
  font-size: 1.08rem;
  font-style: italic;
  margin-right: 0.7rem;
}

.neighborhood-post-time {
  color: #b3b3b3;
  font-size: 0.98rem;
  margin-left: 0.5rem;
}

.neighborhood-post-meta {
  color: #b3b3b3;
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
}

.neighborhood-post-body {
  color: #888;
  font-size: 1.08rem;
  margin-bottom: 0.7rem;
  margin-top: 0.7rem;
  line-height: 1.6;
}

.neighborhood-post-actions {
  display: flex;
  gap: 1.2rem;
  color: #e06ca9;
  font-size: 1.01rem;
  margin-top: 0.2rem;
}

.neighborhood-action {
  cursor: pointer;
  transition: color 0.2s;
  color: #888;
  font-size: 1.01rem;
  font-family: inherit;
}



.category-menu {
  display: flex;
  gap: 2.5rem;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  font-size: 1.2rem;
  user-select: none;
  margin-left: 5rem;
  flex-wrap: wrap;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.category-menu-item {
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  font-weight: 400;
  outline: none;
}

.category-menu-item.active {
  color: #e06ca9;
  font-weight: 400;
  text-decoration: none;
}



@media (max-width: 900px) {
  .bankhangen-container {
    padding: 4rem 2rem 1.2rem 2rem;
  }

  .bankhangen-form-row {
    padding: 1rem 0.5rem;
    gap: 0.7rem;
  }

  .bankhangen-community-list {
    gap: 1.2rem;
  }
}

@media (max-width: 600px) {

  .bankhangen-title,
  .bankhangen-community-title {
    font-size: 1.7rem;
  }

  .bankhangen-form-row {
    padding: 1rem 0.5rem;
    gap: 0.7rem;
  }

  .bankhangen-avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 40px;
    margin-right: 20px;
  }

  .bankhangen-form {
    gap: 0.3rem;
  }

  .bankhangen-input {
    font-size: 1rem;
    padding: 0.4rem 0.5rem;
  }

  .bankhangen-input-actions {
    gap: 0.3rem;
  }

  .bankhangen-comment-btns {
    gap: 0.3rem;
  }

  .bankhangen-post {
    padding: 1rem 0.7rem;
  }
}

@media (max-width: 1100px) {
  .category-menu {
    margin-left: 5rem;
    gap: 1.5rem;
    font-size: 1.05rem;
  }
}

@media (max-width: 900px) {
  .category-menu {
    margin-left: 6rem;
    gap: 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 499px) {
  .category-menu {
    margin-left: 0;
    gap: 0.5rem;
    font-size: 0.95rem;
    padding: 0.3rem 0;
  }
}

.lifestyle-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  margin: 2rem 0 1rem 0;
  font-family: 'Indie Flower', cursive, sans-serif;
  font-size: 0.8rem;
}



</style>
