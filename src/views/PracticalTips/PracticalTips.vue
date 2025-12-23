<template>
  <div class="practical-tips-container">
    <h1 class="tips-title">Praktische tips</h1>
    <div class="tips-desc">
      Hier vind je praktische tips die je helpen bij boodschappen doen, koken en plannen.<br>
      Geen theorie. Gewoon toepassen.
    </div>
    <div class="tips-tabs">
      <span class="tips-tab" :class="{ active: selectedCategory === null }" @click="selectCategory(null)">Alles</span>
      <span
        v-for="cat in categories"
        :key="cat.id"
        class="tips-tab"
        :class="{ active: selectedCategory === cat.name }"
        @click="selectCategory(cat.name)"
      >
        {{ cat.name }}
      </span>
    </div>
    <div class="tips-grid">
      <div
        class="tips-col"
        v-for="tip in tips"
        :key="tip.id"
      >
        <img
          class="tips-icon"
          :src="tip.category?.icon ? (tip.category.icon.startsWith('http') ? tip.category.icon : 'https://community.projectlifestyle.nl' + tip.category.icon) : '/Icons/tips-bag.png'"
          :alt="tip.category?.name || 'Tip'"
        />
        <div class="tips-heading pink">{{ tip.category?.name || 'Tip' }}</div>
        <div class="tips-text">{{ tip.content }}</div>
      </div>
    </div>
    <div v-if="totalPages > 1" class="custom-pagination">
      <button class="pagination-arrow" :class="{ disabled: currentPage === 1 }" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        <img src="/Icons/Webp/Pagination arrow.webp" alt="Vorige" class="pagination-arrow-img left" />
      </button>
      <span v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]" @click="changePage(page)">
        {{ page }}
      </span>
      <button class="pagination-arrow" :class="{ disabled: currentPage === totalPages }" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
        <img src="/Icons/Webp/Pagination arrow.webp" alt="Volgende" class="pagination-arrow-img right" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useTipsStore } from '@/stores/tips-store'

const tipsStore = useTipsStore()
const categories = ref([])
const tips = ref([])
const selectedCategory = ref(null)
const currentPage = ref(1)
const pageSize = ref(20)
const totalPages = ref(1)
const totalCount = ref(0)

onMounted(async () => {
  categories.value = await tipsStore.api_content_tip_categories_list()
  await fetchTips()
})

watch(selectedCategory, async () => {
  currentPage.value = 1
  await fetchTips()
})

async function fetchTips() {
  const params = {
    page: currentPage.value,
    page_size: pageSize.value,
    category: selectedCategory.value,
  }
  const res = await tipsStore.api_content_tips_list(params)
  tips.value = Array.isArray(res?.results) ? res.results : []
  totalCount.value = res?.count || tips.value.length
  totalPages.value = Math.ceil(totalCount.value / pageSize.value)
}

function selectCategory(categoryName) {
  selectedCategory.value = categoryName
}

function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchTips()
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
</script>

<style scoped>
.practical-tips-container {
  margin: 0 auto;
  padding: 4.5rem 1.5rem 2rem 2.5rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  background: #fff;
  float: left;
}

.tips-title {
  color: #f7c948;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.tips-desc {
  color: #757575;
  font-size: 1.08rem;
  margin-bottom: 1.5rem;
  margin-top: 0.2rem;
}

.tips-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
  font-size: 1.08rem;
  color: #e06ca9;
  font-family: inherit;
  display: flex;
  justify-content: center;
}

.tips-tab {
  cursor: pointer;
  color: #b3b3b3;
  border-bottom: 2px solid transparent;
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}

.tips-tab.active {
  color: #e06ca9;
  font-weight: 600;
}

.tips-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem 2.5rem;
  justify-content: flex-start;
}

.tips-col {
  flex: 1 1 220px;
  max-width: 260px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.tips-icon {
  width: 70px;
  height: 70px;
  margin-bottom: 1.2rem;
}

.tips-heading {
  font-size: 1.18rem;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #e06ca9;
  text-align: center;
}

.tips-heading.pink {
  color: #e06ca9;
}

.tips-text {
  color: #757575;
  font-size: 1.05rem;
  text-align: center;
  line-height: 1.5;
}

.custom-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 2rem;
  font-family: inherit;
}

.custom-pagination .pagination-arrow {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  padding: 0;
}

.custom-pagination .pagination-arrow.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.custom-pagination .page-number {
  font-size: 1rem;
  color: #888;
  margin: 0 0.2rem;
  cursor: pointer;
  padding: 0 6px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  font-weight: 400;
}

.custom-pagination .page-number.active {
  color: #e06ca9;
  font-weight: 700;
}

.pagination-arrow-img.left {
  transform: rotate(180deg);
}

@media (max-width: 900px) {
  .practical-tips-container {
    padding: 1.5rem 0.5rem;
  }
  .tips-grid {
    gap: 1.2rem 0.7rem;
  }
  .tips-col {
    max-width: 48vw;
    min-width: 140px;
  }
}

@media (max-width: 600px) {
  .tips-title {
    font-size: 1.2rem;
  }
  .tips-col {
    max-width: 100vw;
    min-width: 120px;
  }
  .tips-grid {
    gap: 0.7rem 0.2rem;
  }
}
</style>
