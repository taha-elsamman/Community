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
        <span
          v-for="(day, idx) in days"
          :key="day"
          class="weekmenu-day"
          :class="{ 'weekmenu-day-active': selectedDay === idx }"
          @click="selectDay(idx)"
          role="tab"
          :aria-selected="selectedDay === idx"
          tabindex="0"
          @keydown.enter="selectDay(idx)"
        >{{ day }}</span>
      </div>
      <div class="macro-squiggle">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12" stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="weekmenu-subtitle">Het menu voor vandaag</div>
      <div class="weekmenu-list">
        <template v-if="dayData">
          <MenuCard
            v-if="dayData.breakfast_recipe"
            :id="dayData.breakfast_recipe.id"
            :img-src="dayData.breakfast_recipe.image || '/photos/default.jpg'"
            :img-alt="dayData.breakfast_recipe.name"
            :title="dayData.breakfast_recipe.name"
            type="Ontbijt"
            :time="dayData.breakfast_recipe.preparation_time + ' min'"
            user="1"
            comment="1"
            img-position="left"
          />
          <MenuCard
            v-if="dayData.lunch_recipe"
            :id="dayData.lunch_recipe.id"
            :img-src="dayData.lunch_recipe.image || '/photos/default.jpg'"
            :img-alt="dayData.lunch_recipe.name"
            :title="dayData.lunch_recipe.name"
            type="Lunch"
            :time="dayData.lunch_recipe.preparation_time + ' min'"
            user="1"
            comment="1"
            img-position="right"
          />
          <MenuCard
            v-if="dayData.midday_recipe"
            :id="dayData.midday_recipe.id"
            :img-src="dayData.midday_recipe.image || '/photos/default.jpg'"
            :img-alt="dayData.midday_recipe.name"
            :title="dayData.midday_recipe.name"
            type="Tussendoortje"
            :time="dayData.midday_recipe.preparation_time + ' min'"
            user="1"
            comment="1"
            img-position="left"
          />
          <MenuCard
            v-if="dayData.dinner_recipe"
            :id="dayData.dinner_recipe.id"
            :img-src="dayData.dinner_recipe.image || '/photos/default.jpg'"
            :img-alt="dayData.dinner_recipe.name"
            :title="dayData.dinner_recipe.name"
            type="Avondeten"
            :time="dayData.dinner_recipe.preparation_time + ' min'"
            user="1"
            comment="1"
            img-position="right"
          />
        </template>
        <template v-else>
          <div class="weekmenu-empty">{{ days[selectedDay] }} | Geen menu voor deze dag.</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import MenuCard from '@/components/WeeklyMenu/MenuCard.vue';
import { useContentStore } from '@/stores/content-store'

const contentStore = useContentStore()
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
  return week.days[selectedDay.value] || null
})
</script>

<style scoped>
.Koelkastpraat {
  padding: 5rem 2rem 2rem 2rem;
}
.weekmenu-container {
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

/* Responsive styles */
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
}

@media (max-width: 600px) {
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
