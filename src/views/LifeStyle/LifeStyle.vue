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
          <LifestyleTips v-for="item in paginatedTips" :key="item.id" v-bind="item" />
        </template>
        <template v-else>
          <LifestyleTips v-for="item in paginatedTips" :key="item.id" v-bind="item" />
          <div v-if="filteredTips.length === 0" class="lifestyle-empty">
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
import { ref, computed } from 'vue';
import LifestyleTips from '@/components/LifestyleTips/LifestyleTips.vue';
const days = [
  'Alles',
  'Eten',
  'Mindset',
  'Bewegen',
  'Praktisch',
  'Evelinn Persoonlijk',
];
const lifestyle = ref(0);
const currentPage = ref(1);
const itemsPerPage = 3;

const lifestyleTips = [
  {
    id: 1,
    imgSrc: "/photos/oats.png",
    imgAlt: "Overnight oats met aardbeien",
    title: "Lifestyle tip 1",
    type: "Eten",
    imgPosition: "left",
  },
  {
    id: 2,
    imgSrc: "/photos/apple.webp",
    imgAlt: "Appel",
    title: "Lifestyle tip 2",
    type: "Eten",
    imgPosition: "right",
  },
  {
    id: 3,
    imgSrc: "/photos/tosti.jpg",
    imgAlt: "Tosti",
    title: "Lifestyle tip 3",
    type: "Mindset",
    imgPosition: "left",
  },
  {
    id: 4,
    imgSrc: "/photos/pasta.png",
    imgAlt: "Pasta",
    title: "Lifestyle tip 4",
    type: "Mindset",
    imgPosition: "right",
  },
  {
    id: 5,
    imgSrc: "/photos/yogurt.jpg",
    imgAlt: "Yoghurt met granola",
    title: "Lifestyle tip 5",
    type: "Bewegen",
    imgPosition: "left",
  },
  {
    id: 6,
    imgSrc: "/photos/banana.webp",
    imgAlt: "Banaan",
    title: "Lifestyle tip 6",
    type: "Bewegen",
    imgPosition: "right",
  },
  {
    id: 7,
    imgSrc: "/photos/sandwich.webp",
    imgAlt: "Sandwich kipfilet",
    title: "Lifestyle tip 7",
    type: "Praktisch",
    imgPosition: "left",
  },
  {
    id: 8,
    imgSrc: "/photos/soup.png",
    imgAlt: "Tomatensoep",
    title: "Lifestyle tip 8",
    type: "Praktisch",
    imgPosition: "right",
  },
  {
    id: 9,
    imgSrc: "/photos/pancakes.jpg",
    imgAlt: "Pannenkoeken",
    title: "Lifestyle tip 9",
    type: "Evelinn Persoonlijk",
    imgPosition: "left",
  },
  {
    id: 10,
    imgSrc: "/photos/salad.jpg",
    imgAlt: "Salade",
    title: "Lifestyle tip 10",
    type: "Evelinn Persoonlijk",
    imgPosition: "right",
  }
];

function selectDay(idx) {
  lifestyle.value = idx;
  currentPage.value = 1; // Reset to first page on tab change
}

const filteredTips = computed(() => {
  if (lifestyle.value === 0) return lifestyleTips;
  const type = days[lifestyle.value];
  return lifestyleTips.filter(item => item.type === type);
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredTips.value.length / itemsPerPage));
});

const paginatedTips = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTips.value.slice(start, start + itemsPerPage);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
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

.pagination-arrow {
  background: none;
  border: none;
  color: #888;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0 0.3rem;
  transition: color 0.2s;
  outline: none;
}

.pagination-arrow:disabled {
  color: #ccc;
  cursor: default;
}

.pagination-page {
  background: none;
  border: none;
  color: #888;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0 0.3rem;
  transition: color 0.2s;
  outline: none;
  position: relative;
}

.pagination-page.active {
  color: #e06ca9;
  font-weight: bold;
  font-size: 1rem;
}

.pagination-page:not(.active):hover {
  color: #e06ca9;
}

.pagination-arrow-img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  filter: grayscale(0.5);
  transition: filter 0.2s;
}

.pagination-arrow-img.left {
  transform: rotate(180deg);
}

.pagination-arrow:disabled .pagination-arrow-img {
  filter: grayscale(1) opacity(0.4);
}

.pagination-arrow-img.right {
  /* No rotation needed */
}

.lifestyle-tab-title {
  font-size: 1.35rem;
  color: #e06ca9;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 1.5rem;
  text-align: center;
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
