<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="lifestyleContainer">
    <div class="lifestyle-container">
      <div class="lifestyle-header">
        <div class="lifestyle-title">Lifestyle tips</div>
        <div class="lifestyle-paragraph">Verhalen, tips en eerlijke inzichten voor jouw reis</div>
      </div>
      <div class="lifestyle-days" role="tablist">
        <span v-for="(day, idx) in days" :key="day" class="lifestyle-day"
          :class="{ 'lifestyle-day-active': lifestyle === idx }" @click="selectDay(idx)" role="tab"
          :aria-selected="lifestyle === idx" tabindex="0" @keydown.enter="selectDay(idx)">{{ day }}</span>
      </div>
      <div class="macro-squiggle">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path
            d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
            stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="lifestyle-tab-title">
        {{
          lifestyle === 0
            ? 'Zie hier alle lifestyle tips'
            : lifestyle === 1
              ? 'Eten tips'
              : lifestyle === 2
                ? 'Mindset tips'
                : lifestyle === 3
                  ? 'Bewegen tips'
                  : lifestyle === 4
                    ? 'Praktisch tips'
                    : lifestyle === 5
                      ? 'Evelinn Persoonlijk tips'
                      : ''
        }}
      </div>

      <div class="lifestyle-list">
        <template v-if="lifestyle === 0">
          <LifestyleTips v-for="item in paginatedTips" :key="item.id" v-bind="item" @click="goToDetail(item.id)"
            class="lifestyle-tip-clickable" />
        </template>
        <template v-else>
          <LifestyleTips v-for="item in paginatedTips" :key="item.id" v-bind="item" @click="goToDetail(item.id)"
            class="lifestyle-tip-clickable" />
          <div v-if="paginatedTips.length === 0" class="lifestyle-empty">
            {{ days[lifestyle] }} | Geen menu voor deze dag.
          </div>
        </template>
      </div>
      <div class="lifestyle-pagination">
        <button class="pagination-arrow" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
          <img src="/Icons/Webp/Pagination arrow.webp" alt="Vorige" class="pagination-arrow-img left" />
        </button>
        <button v-for="page in totalPages" :key="page" class="pagination-page" :class="{ active: page === currentPage }"
          @click="goToPage(page)">
          {{ page }}
        </button>
        <button class="pagination-arrow" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
          <img src="/Icons/Webp/Pagination arrow.webp" alt="Volgende" class="pagination-arrow-img right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LifestyleTips from '@/components/LifestyleTips/LifestyleTips.vue'
import { useContentStore } from '@/stores/content-store'

const contentStore = useContentStore()
const categories = ref([])
const days = computed(() => ['Alles', ...categories.value.map(c => c.name)])

const lifestyle = ref(0)
const currentPage = ref(1)
const itemsPerPage = 4

const blogs = ref([])
const blogsCount = ref(0)
const loadingBlogs = ref(false)
const blogsError = ref(null)

async function fetchCategories() {
  try {
    const data = await contentStore.api_content_blog_categories_list()
    categories.value = Array.isArray(data) ? data : []
  } catch {
    categories.value = []
  }
}

async function fetchBlogs(page , category = null) {
  loadingBlogs.value = true
  blogsError.value = null
  try {
    const data = await contentStore.api_content_blogs_list(page, category, itemsPerPage)
    blogs.value = (data && data.results) ? data.results : (data || [])
    blogsCount.value = data && typeof data.count === 'number' ? data.count : (Array.isArray(data) ? data.length : 0)
  } catch (e) {
    blogsError.value = e
    blogs.value = []
    blogsCount.value = 0
  } finally {
    loadingBlogs.value = false
  }
}

onMounted(async () => {
  await fetchCategories()
  fetchBlogs(currentPage.value)
})

function selectDay(idx) {
  lifestyle.value = idx
  currentPage.value = 1 // Reset to first page on tab change
  // If "Alles" tab, category is null; otherwise, use the category id
  const category = idx === 0 ? null : categories.value[idx - 1]?.id
  fetchBlogs(currentPage.value, category)
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // If "Alles" tab, category is null; otherwise, use the category id
    const category = lifestyle.value === 0 ? null : categories.value[lifestyle.value - 1]?.id
    fetchBlogs(currentPage.value, category)
  }
}

// map API items to the props expected by LifestyleTips
const mappedItems = computed(() => {
  return blogs.value.map((b, i) => ({
    id: b.id,
    imgSrc: b.image
      ? (b.image.startsWith('http')
          ? b.image
          : `https://community.projectlifestyle.nl${b.image}`)
      : (b.image_url || ''),
    imgAlt: b.title || '',
    title: b.title || '',
    type: b.category?.name || '',
    imgPosition: i % 2 === 0 ? 'left' : 'right',
  }))
})

// When using backend pagination, just use the mappedItems directly for the current page
const totalPages = computed(() => {
  if (blogsCount.value && itemsPerPage) {
    return Math.max(1, Math.ceil(blogsCount.value / itemsPerPage))
  }
  return 1
})
const paginatedTips = computed(() => mappedItems.value)

const router = useRouter()

function goToDetail(id) {
  router.push(`/lifestyle/${id}`)
}
</script>

<style scoped>
.lifestyleContainer {
  padding: 5rem 2rem 2rem 2rem;
}

.lifestyle-container {
  border-radius: 0.5rem;
  max-width: 1100px;
  margin: 0 auto 0 2rem;
}

.macro-squiggle {
  margin: 1.2rem 0 2.5rem 0;
  display: flex;
  justify-content: center;
  align-items: start;
}

.lifestyle-header {
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.lifestyle-title {
  font-size: 3rem;
  color: #e06ca9;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.lifestyle-weekselect {
  font-size: 1rem;
  color: #888;
  font-family: inherit;
  cursor: pointer;
  user-select: none;
}

.lifestyle-weekselect-arrow {
  font-size: 1.1em;
  margin-left: 0.2em;
}

.lifestyle-days {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.7rem;
  font-size: 1.15rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  flex-wrap: wrap;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #e06ca9 #f8f8f8;
}

.lifestyle-day {
  color: #222;
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
  padding: 0.3rem 1.2rem 0.3rem 1.2rem;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid transparent;
  font-family: inherit;
  font-size: inherit;
  font-weight: 400;
  white-space: nowrap;
}

.lifestyle-day-active {
  color: #e06ca9;
}

.lifestyle-squiggle {
  margin: 0.8rem 0 2.2rem 0;
  display: flex;
  justify-content: center;
}

.lifestyle-subtitle {
  font-size: 2rem;
  color: #e06ca9;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 2.5rem;
  text-align: center;
}

.lifestyle-paragraph {
  font-size: 1.2rem;
  color: #888;
  font-family: inherit;
  margin-top: 0.2rem;
  margin-bottom: 50px;
}

.lifestyle-list {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.lifestyle-empty {
  text-align: center;
  color: #aaa;
  font-size: 1.1rem;
  margin: 2rem 0;
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






.lifestyle-tab-title {
  font-size: 1.35rem;
  color: #e06ca9;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 1.5rem;
  text-align: center;
}

.lifestyle-tip-clickable {
  cursor: pointer;
  transition: box-shadow 0.2s;
}


@media (max-width: 1100px) {
  .lifestyle-container {
    max-width: 100vw;
    margin: 0;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }
}

@media (max-width: 900px) {
  .lifestyle-list {
    gap: 1.2rem;
  }

  .lifestyle-container {
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }
}

@media (max-width: 600px) {
  .lifestyle-title {
    font-size: 1.2rem;
  }

  .lifestyle-subtitle {
    font-size: 1.1rem;
  }

  .lifestyle-list {
    gap: 0.7rem;
  }

  .lifestyle-container {
    padding: 0.5rem 0.1rem 0.5rem 0.1rem;
    border-radius: 0.7rem;
  }

  .lifestyle-pagination {
    gap: 0.3rem;
    font-size: 1rem;
  }

  .pagination-page,
  .pagination-arrow {
    font-size: 1rem;
    padding: 0 0.3rem;
  }

  .lifestyle-tab-title {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 400px) {
  .lifestyle-title {
    font-size: 1rem;
  }

  .lifestyle-list {
    gap: 0.3rem;
    padding: 0;
  }

  .lifestyle-container {
    padding: 0.2rem 0.05rem 0.2rem 0.05rem;
  }
}

/* Optional: Hide scrollbar for Webkit browsers */
.lifestyle-days::-webkit-scrollbar {
  height: 4px;
  background: #f8f8f8;
}

.lifestyle-days::-webkit-scrollbar-thumb {
  background: #e06ca9;
  border-radius: 2px;
}
</style>
