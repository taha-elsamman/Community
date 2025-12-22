<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="recipes-page">
    <!-- moved header out of the sidebar so it spans 100% -->
    <div class="page-header">
      <h2>Recepten</h2>
      <p class="sub">Alle gerechten uit jouw weekmenu’s overzichtelijk bij elkaar.</p>
    </div>

    <div class="page-inner">
      <aside class="filters">
        <div class="reset-filters">Reset filters</div>
        <div class="filter-card">
          <label class="search">
            <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 21l-4.35-4.35" stroke="#9aa6b3" stroke-width="2" stroke-linecap="round"/>
              <circle cx="11" cy="11" r="6" stroke="#9aa6b3" stroke-width="2"></circle>
            </svg>
            <input v-model="search" placeholder="Zoek iets lekkers" />
          </label>

          <details class="filter-section">
            <summary class="filter-title">Soort gerecht</summary>
            <div class="checkbox-list">
              <label v-for="opt in types" :key="opt" class="checkbox">
                <input type="checkbox" v-model="selectedTypes" :value="opt" />
                <span class="checkmark" aria-hidden></span>
                <span class="label-text">{{ opt }}</span>
              </label>
            </div>
          </details>

          <details class="filter-section">
            <summary class="filter-title">Aantal personen</summary>
            <select v-model="selectedPeople" class="people-select" aria-label="Aantal personen">
              <option v-for="n in [1,2,3,4,5]" :key="n" :value="n">{{ n }}</option>
            </select>
          </details>

          <details class="filter-section">
            <summary class="filter-title">Voorkeuren</summary>
            <div class="checkbox-list">
              <label v-for="opt in extendedPrefs" :key="opt" class="checkbox">
                <input type="checkbox" v-model="selectedPrefs" :value="opt" />
                <span class="checkmark" aria-hidden></span>
                <span class="label-text">{{ opt }}</span>
              </label>
            </div>
          </details>

          <details class="filter-section">
            <summary class="filter-title">Kooktijd</summary>
            <div class="checkbox-list">
              <label v-for="opt in times" :key="opt" class="checkbox">
                <input type="checkbox" v-model="selectedTimes" :value="opt" />
                <span class="checkmark" aria-hidden></span>
                <span class="label-text">{{ opt }}</span>
              </label>
            </div>
          </details>

        </div>
      </aside>

      <main class="results">
        <div class="grid">
          <article v-for="item in filtered" :key="item.id" class="recipe-card">
            <div class="img-wrap">
              <img class="photo" :src="item.image" :alt="item.title" />
              <img class="frame" src="/borders/Frame Recipe archives.webp" alt="" />
            </div>

            <div class="meta">
              <div class="title-row">
                <h3 class="title">{{ item.title }}</h3>
                <button class="fav-btn fav-inline" @click="toggleFav(item.id)" :aria-pressed="isFav(item.id)">
                  <img v-if="!isFav(item.id)" src="/Icons/Webp/heart.webp" alt="fav" />
                  <img v-else src="/Icons/Webp/Heart Saved.webp" alt="saved" />
                </button>
              </div>
               <div class="subtitle">Ontbijt</div>

               <div class="info">
                 <span class="time">20 min</span>
                 <span class="people">1</span>
                 <span class="comments">1</span>
               </div>
             </div>

            <!-- fav button moved into .meta title-row -->
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const search = ref('')
const selectedTypes = ref([])
const selectedPrefs = ref([])
const selectedPeople = ref(1)
const selectedTimes = ref([])

const types = ['Ontbijt', 'Lunch', 'Avondeten', 'Tussendoortje']
const extendedPrefs = [
  'Vegetarisch',
  'Vegan',
  'Glutenvrij',
  'Lactosevrij',
  'Koolhydraatarm',
  'Pescotarisch',
  'Suikervrij',
  'Notenvrij'
]
const times = ['Tot 10 min', '10-20 min', '20-30 min', '30+ min']

// sample repeated items to mirror the design
const recipes = ref(
  Array.from({ length: 10 }).map((_, i) => ({
    id: String(i + 1),
    title: 'Overnight oats met aardbeien',
    image: '/photos/oats.png',
    type: 'Ontbijt'
  }))
)

const favs = ref(new Set())

function toggleFav(id) {
  if (favs.value.has(id)) favs.value.delete(id)
  else favs.value.add(id)
  // force reactivity for Set
  favs.value = new Set(favs.value)
}
function isFav(id) {
  return favs.value.has(id)
}

const filtered = computed(() => {
  const s = search.value.trim().toLowerCase()
  return recipes.value.filter(r => {
    if (s && !r.title.toLowerCase().includes(s)) return false
    if (selectedTypes.value.length && !selectedTypes.value.includes(r.type)) return false
    // prefs not implemented against data, kept for UI
    return true
  })
})


// ensure details elements are open on wide screens and collapsed on small screens
onMounted(async () => {
  if (typeof window === 'undefined') return
  const mq = window.matchMedia('(min-width: 900px)')
  const setOpen = (isWide) => {
    // wait for DOM
    nextTick(() => {
      document.querySelectorAll('.filter-section').forEach((d) => {
        if (d instanceof HTMLDetailsElement) d.open = !!isWide
      })
    })
  }
  const handler = (e) => setOpen(e.matches)
  setOpen(mq.matches)
  mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler)
  onBeforeUnmount(() => {
    mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler)
  })
})
</script>

<style scoped>
.recipes-page {
  padding: 2.4rem;
  box-sizing: border-box;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: #222;
}

.page-header {
  width: 100%;
  box-sizing: border-box;
  max-width: 1200px;
  margin-top: 2rem;
  margin-bottom: 5rem;
  padding: 0 2.4rem;
  text-align: left;
}
.page-header h2 {
  color: #9fc7e3;
  font-weight: 400;
  margin: 0 0 0.25rem;
  font-size: 1.6rem;
}
.page-header .sub {
  color: #888;
  margin: 0;
  font-size: 1rem;
}

.page-inner {
  display: flex;
  margin: 0 auto;
  padding: 0 2.4rem;
}

/* Sidebar */
.filters {
  width: 260px;
  flex: 0 0 260px;
}

.reset-filters {
  cursor: pointer;
  color: #f49fc8;
  font-size: .95rem;
  margin-bottom: 8px;
  text-align: right;
  font-weight: 600;
  margin-right: 1rem;
  display: block; /* Ensure reset is visible on small screens (override previous hide) */
}

/* Show reset only on larger screens (optional) */


.filter-card {
  background: #fff;
  padding: 1.2rem;
  border-radius: 12px;
}

/* Search with icon */
.search {
  display: block;
  position: relative;
  margin-bottom: 12px;
}
.search .icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.9;
}
.search input {
  width: 100%;
  padding: 12px 14px 12px 44px;
  border-radius: 12px;
  border: 1px solid #eef4fb;
  background: #fff;
  outline: none;
  font-size: 0.95rem;
  color: #6b7a86;
}

.filter-section {
  margin-top: 1rem;
}
.filter-title {
  font-weight: 600;
  color: #9fc7e3;
  margin-bottom: .5rem;
}
.checkbox-list { display: flex; flex-direction: column; gap: 8px; }
.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #7fa184;
  font-size: 0.98rem;
}
.checkbox input[type="checkbox"] { display: none; }
.checkmark {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid #e6f0fb;
  background: #fff;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
}
.checkbox input[type="checkbox"]:checked + .checkmark {
  background: #eaf7ee;
  border-color: #cdebd3;
}
.checkbox input[type="checkbox"]:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid #2f9b57;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* label text spacing */
.label-text { color: #222; }

.people-select {
  width: 72px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px dashed #e6eef3;
  background: transparent;
  color: #7fa184;
  margin-top: 6px;
}

/* Results area */
.results { flex: 1 1 auto; margin-left: 1rem; }

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* keep two columns */
  gap: 1.6rem;
}

/* switch to one column when viewport is less than 1100px */
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* ensure no 3-column breakpoint (override/remove previous 3-column rule) */
@media (min-width: 1100px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Card */
.recipe-card {
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  background: transparent;
  padding: 0.4rem 0.4rem;
  border-radius: 8px;
}

.img-wrap {
  position: relative;
  width: 96px;
  height: 96px;
  flex: 0 0 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.photo {
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  z-index: 1;
  background: #fff;
}
.frame {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  top: 0;
  left: 0;
  pointer-events: none;
}

/* Meta */
.meta { flex: 1 1 auto; }
.title { margin: 0; font-size: 1.05rem; color: #555; font-weight: 600; }
.subtitle { color: #9fb3c2; font-size: .92rem; margin-top: .2rem; }
.info { color: #83a78f; margin-top: .4rem; font-size: .9rem; display: flex; gap: .8rem; align-items: center; }

/* Favorite button (inline next to title) - force fixed size */
.fav-btn {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.fav-btn img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ensure inline modifier also fixed (prevents overrides) */
.fav-inline {
  margin-left: 8px;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  /* make filters wrap instead of scrolling */
  .page-inner { flex-direction: column; }
  .filters {
    width: 100%;
    flex: 0 0 auto;
    order: 0;
    margin-bottom: 12px;
  }
  .filter-card {
    display: flex;
    gap: 12px;
    padding: 12px;
    overflow-x: visible; /* allow wrapping instead of horizontal scroll */
    flex-wrap: wrap;
    align-items: flex-start;
    background: transparent;
    border-radius: 8px;
  }

  /* ensure search input sits alone on its own line */
  .filter-card > .search {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 8px;
  }
  .filter-card > .search input {
    width: 100%;
    box-sizing: border-box;
  }

  .filter-section {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    /* two columns layout: roughly half width minus gap */
    flex: 0 0 calc(50% - 12px);
    max-width: calc(50% - 12px);
    box-shadow: none;
    border: 1px solid #f0f6fb;
    box-sizing: border-box;
  }
   /* summary as the dropdown header */
   .filter-section > summary {
     list-style: none;
     cursor: pointer;
     margin: 0 0 8px 0;
     font-weight: 600;
     color: #9fc7e3;
     outline: none;
   }
   /* hide details content when closed (native behavior), keep visible when open */
   .filter-section > summary::-webkit-details-marker { display: none; }

}

/* On very small screens make filter sections stack */
@media (max-width: 600px) {
  .filter-card { gap: 8px; padding: 10px; }
  .filter-section {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

/* On wide screens ensure details appear expanded (script also manages open) */
@media (min-width: 900px) {
  .filter-card { display: block; }
  .filter-section { padding: 0; background: transparent; border: none; min-width: auto; }
  .filter-section > summary { display: none; }
  .filter-section .checkbox-list, .filter-section select { display: block; margin-top: 6px; }
}
</style>
