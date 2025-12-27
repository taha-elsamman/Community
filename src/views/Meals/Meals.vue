<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="Koelkastpraat">
    <div class="weekmenu-container">
      <div class="weekmenu-header">
        <div class="weekmenu-title">Jouw weekmenu</div>
        <div class="weekmenu-weekselect">
          <select v-model="selectedWeek" class="weekmenu-weekselect-dropdown">
            <option value="" disabled selected>Kies jouw week</option>
            <option value="current">Current week</option>
            <option value="next">Next week</option>
          </select>
          <span class="weekmenu-weekselect-arrow">&#9660;</span>
        </div>
      </div>
      <div class="weekmenu-days" role="tablist">
        <span v-for="(day, idx) in days" :key="day" class="weekmenu-day"
          :class="{ 'weekmenu-day-active': selectedDay === idx }" @click="selectDay(idx)" role="tab"
          :aria-selected="selectedDay === idx" tabindex="0" @keydown.enter="selectDay(idx)">{{ day }}</span>
      </div>
      <div class="macro-squiggle">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path
            d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
            stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="weekmenu-subtitle">Het menu voor vandaag</div>
      <div class="weekmenu-list">
        <template v-if="dayData">
          <MenuCard v-if="dayData.breakfast_recipe" :id="dayData.breakfast_recipe.id"
            :img-src="dayData.breakfast_recipe.image || '/photos/default.jpg'" :img-alt="dayData.breakfast_recipe.name"
            :title="dayData.breakfast_recipe.name" type="Ontbijt"
            :time="dayData.breakfast_recipe.preparation_time + ' min'" :user="dayData.breakfast_recipe.portions"
            :comment="dayData.breakfast_recipe.comments_count" img-position="left" />
          <MenuCard v-if="dayData.lunch_recipe" :id="dayData.lunch_recipe.id"
            :img-src="dayData.lunch_recipe.image || '/photos/default.jpg'" :img-alt="dayData.lunch_recipe.name"
            :title="dayData.lunch_recipe.name" type="Lunch" :time="dayData.lunch_recipe.preparation_time + ' min'"
            :user="dayData.lunch_recipe.portions" :comment="dayData.lunch_recipe.comments_count" img-position="right" />
          <MenuCard v-if="dayData.midday_recipe" :id="dayData.midday_recipe.id"
            :img-src="dayData.midday_recipe.image || '/photos/default.jpg'" :img-alt="dayData.midday_recipe.name"
            :title="dayData.midday_recipe.name" type="Tussendoortje"
            :time="dayData.midday_recipe.preparation_time + ' min'" :user="dayData.midday_recipe.portions"
            :comment="dayData.midday_recipe.comments_count" img-position="left" />
          <MenuCard v-if="dayData.dinner_recipe" :id="dayData.dinner_recipe.id"
            :img-src="dayData.dinner_recipe.image || '/photos/default.jpg'" :img-alt="dayData.dinner_recipe.name"
            :title="dayData.dinner_recipe.name" type="Avondeten" :time="dayData.dinner_recipe.preparation_time + ' min'"
            :user="dayData.dinner_recipe.portions" :comment="dayData.dinner_recipe.comments_count"
            img-position="right" />
        </template>
        <template v-else>
          <div class="weekmenu-empty">{{ days[selectedDay] }} | Geen menu voor deze dag.</div>
        </template>
      </div>
    </div>
  </div>
  <!-- Add the attached design at the end of the page -->
  <div class="recipes-container">
    <div class="recipes-header-row">
      <h2 class="recipes-title">Recepten</h2>
      <a class="recipes-link" href="#" style="color:#e6b7c7;" @click.prevent="goToRecipes">Bekijk alle recepten</a>
    </div>
    <div class="recipes-sub">Alle gerechten uit jouw weekmenu’s overzichtelijk bij elkaar.</div>
    <div class="recipes-list">
      <div
        v-for="item in recipesSectionItems"
        :key="item.id"
        class="recipe-card"
        @click="goToDetails(item.id)"
        role="button"
        tabindex="0"
        @keydown.enter="goToDetails(item.id)"
      >
        <div class="recipe-img-wrap stacked-imgs">
          <img class="weekmenu-layout" src="/borders/Frame Recipe archives.webp" :alt="imgAlt" />
          <img
            :src="item.image ? (item.image.startsWith('http') ? item.image : 'https://community.projectlifestyle.nl/' + item.image.replace(/^\/+/, '')) : '/photos/default.jpg'"
            alt="recipe photo"
            class="recipe-photo"
          />
        </div>

        <div class="recipe-meta">
          <div class="recipe-title-row">
            <div class="recipe-title">{{ item.name }}</div>
            <div class="recipe-fav" @click.stop="toggleFav(item.id)"
              style="position: relative; width: 28px; height: 28px; cursor: pointer;">
              <img v-show="!favStates[item.id]" src="/Icons/Webp/heart.webp" alt="favorite icon" class="fav-img"
                style="position: absolute; top: 0; left: 0; width: 28px; height: 28px; transition: opacity 0.2s;" />
              <img v-show="favStates[item.id]" src="/Icons/Webp/Heart Saved.webp" alt="favorite icon" class="fav-img"
                style="position: absolute; top: 0; left: 0; width: 28px; height: 28px; transition: opacity 0.2s;" />
            </div>
          </div>
          <div class="recipe-type">{{ item.meal_type }}</div>
          <div class="recipe-info">
            <div class="recipe-info-item">
              <img src="/Icons/time icon.png" alt="time icon" />
              <span>{{ item.preparation_time }} min</span>
            </div>
            <div class="recipe-info-item">
              <img src="/Icons/user icon.png" alt="user icon" />
              <span>{{ item.portions }}</span>
            </div>
            <div class="recipe-info-item">
              <img src="/Icons/comment icon.png" alt="comment icon" />
              <span>{{ item.comments_count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import MenuCard from '@/components/WeeklyMenu/MenuCard.vue';
import { useContentStore } from '@/stores/content-store'
import { useRouter } from 'vue-router'

const contentStore = useContentStore()
const router = useRouter()
const menu = ref([])
const selectedDay = ref(0)
const selectedWeek = ref('')
const days = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
  'Zaterdag',
  'Zondag'
]

// Helper to get Monday date for a given week offset (0 = current, 1 = next)
function getMondayOfWeek(offset = 0) {
  const now = new Date();
  // Get current day (0=Sun, 1=Mon, ..., 6=Sat)
  const day = now.getDay();
  // Calculate how many days to subtract to get to Monday
  const diff = now.getDate() - day + (day === 0 ? -6 : 1) + offset * 7;
  const monday = new Date(now.setDate(diff));
  // Format as YYYY-MM-DD
  const yyyy = monday.getFullYear();
  const mm = String(monday.getMonth() + 1).padStart(2, '0');
  const dd = String(monday.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

onMounted(async () => {
  // On mount, fetch current week (Monday)
  const monday = getMondayOfWeek(0);
  const result = await contentStore.api_content_menu_list(monday);
  menu.value = Array.isArray(result) ? result : [];

  // Fetch recipes for the last design
  const recipesRes = await contentStore.api_content_recipes_list_with_params({ page: 1, page_size: 2 })
  recipesSectionItems.value = Array.isArray(recipesRes?.results) ? recipesRes.results : []
  // Initialize favStates for each recipe
  if (Array.isArray(recipesRes?.results)) {
    for (const item of recipesRes.results) {
      favStates.value[item.id] = false
    }
  }
})

// Watch for week selection changes
watch(selectedWeek, async (val) => {
  let monday = '';
  if (val === 'current') {
    monday = getMondayOfWeek(0);
    const result = await contentStore.api_content_menu_list(monday);
    menu.value = Array.isArray(result) ? result : [];
  } else if (val === 'next') {
    monday = getMondayOfWeek(1);
    const result = await contentStore.api_content_menu_list(monday);
    menu.value = Array.isArray(result) ? result : [];
  }
  selectedDay.value = 0;
})

function selectDay(idx) {
  selectedDay.value = idx;
}

// Get the recipes for the selected day from the API data
const dayData = computed(() => {
  if (!menu.value.length) return null
  // Assume first menu (active week)
  const week = menu.value[0]
  if (!week || !week.days) return null
  console.log('Selected day data:', week.days[selectedDay.value])
  return week.days[selectedDay.value] || null
})

// Recipes for the last design
const recipesSectionItems = ref([])

// Track fav state for each recipe by id
const favStates = ref({})

function toggleFav(id) {
  favStates.value[id] = !favStates.value[id]
}

function goToDetails(id) {
  router.push(`/meal-details/${id}`)
}

function goToRecipes() {
  router.push('/recipes')
}
</script>

<style scoped>
.Koelkastpraat {
  padding: 5rem 2rem 2rem 2rem;
}

.weekmenu-container {
  border-radius: 0.5rem;
  max-width: 1100px;
  margin: 0 auto 0 2rem;
  padding: 1.5rem 0rem 2rem 2rem;

}
.recipes-container {
  border-radius: 0.5rem;
  max-width: 1100px;
  margin: 4rem auto 0rem 6rem;
  padding: 1.5rem 2rem 2rem 2rem;
  background: #fff;
}
.macro-squiggle {
  margin: 1.2rem 0 2.5rem 0;
  display: flex;
  justify-content: center;
  align-items: start;
}

.weekmenu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.weekmenu-title {
  font-size: 2rem;
  color: #9FCDEE;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.weekmenu-weekselect {
  font-size: 1rem;
  color: #888;
  font-family: inherit;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
}

.weekmenu-weekselect-dropdown {
  font-size: 1rem;
  color: #888;
  font-family: inherit;
  border-radius: 0.3rem;
  padding: 0.2rem 1.5rem 0.2rem 0.7rem;
  background: #fff;
  appearance: none;
  outline: none;
  cursor: pointer;
  margin-right: -1.2em;
}

.weekmenu-weekselect-arrow {
  font-size: 1.1em;
  margin-left: 0.4em;
  pointer-events: none;
  position: relative;
  z-index: 1;
}

.weekmenu-days {
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

.weekmenu-day {
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

.weekmenu-day-active {
  color: #e06ca9;
}

.weekmenu-squiggle {
  margin: 0.8rem 0 2.2rem 0;
  display: flex;
  justify-content: center;
}

.weekmenu-subtitle {
  font-size: 2rem;
  color: #9fc6e7;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 2.5rem;
  text-align: center;
}

.weekmenu-list {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.weekmenu-empty {
  text-align: center;
  color: #aaa;
  font-size: 1.1rem;
  margin: 2rem 0;
}

.recipes-section {
  margin-top: 4rem;
  padding: 2rem 0;
  background: #fff;
  border-radius: 18px;
  margin-left: auto;
  margin-right: auto;
}

.recipes-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.recipes-title {
  color: #9fc7e3;
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0;
}

.recipes-link {
  color: #e6b7c7;
  font-size: 1rem;
  text-decoration: none;
  font-family: inherit;
  margin-top: 0.5rem;
}

.recipes-link:hover {
  text-decoration: underline;
  color: #e06ca9;
}

.recipes-sub {
  color: #888;
  font-size: 1rem;
  margin-bottom: 2.2rem;
}

.recipes-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.recipe-card {
  background: none;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  width: 100%;
}

.recipe-img-wrap {
  width: 180px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 0.7rem;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Stack the frame and photo above each other */
.stacked-imgs {
  position: relative;
}
.stacked-imgs .weekmenu-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 130px;
  z-index: 2;
  pointer-events: none;
}
.stacked-imgs .recipe-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  background: #fff;
  z-index: 1;
}

.recipe-meta {
  width: 100%;
  text-align: left;
}

.recipe-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  margin-bottom: 0.2rem;
}

.recipe-title {
  font-size: 1.1rem;
  color: #222;
  font-weight: 400;
}

.recipe-fav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-right: 4rem;
}

.fav-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  transition: opacity 0.2s;
  z-index: 1;
}

.recipe-type {
  color: #9fb3c2;
  font-size: .92rem;
  margin-bottom: .4rem;
}

.recipe-info {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-top: 0.7rem;
}

.recipe-info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #7fa184;
  font-size: 1rem;
}

.recipe-info-item img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  vertical-align: middle;
}

@media (max-width: 1100px) {
  .weekmenu-container {
    max-width: 100vw;
    margin: 0;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }
}

@media (max-width: 900px) {
  .weekmenu-list {
    gap: 1.2rem;
  }

  .weekmenu-container {
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }

  .recipes-list {
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .recipes-section {
    padding: 1.2rem 0.5rem;
    margin-top: 2rem;
  }
}

@media (max-width: 600px) {

  .recipes-container {
  margin: 4rem auto 0rem 0rem;
}


  .weekmenu-title {
    font-size: 1.2rem;
  }

  .weekmenu-subtitle {
    font-size: 1.1rem;
  }

  .weekmenu-list {
    gap: 0.7rem;
  }

  .weekmenu-container {
    padding: 0.5rem 0.1rem 0.5rem 0.1rem;
    border-radius: 0.7rem;
  }

  .recipes-list {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }

  .recipes-section {
    padding: 1rem 0.2rem;
    margin-top: 1rem;
  }

  .recipe-card {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
}

@media (max-width: 400px) {
  .weekmenu-title {
    font-size: 1rem;
  }

  .weekmenu-list {
    gap: 0.3rem;
    padding: 0;
  }

  .weekmenu-container {
    padding: 0.2rem 0.05rem 0.2rem 0.05rem;
  }
}

/* Optional: Hide scrollbar for Webkit browsers */
.weekmenu-days::-webkit-scrollbar {
  height: 4px;
  background: #f8f8f8;
}

.weekmenu-days::-webkit-scrollbar-thumb {
  background: #e06ca9;
  border-radius: 2px;
}
</style>
