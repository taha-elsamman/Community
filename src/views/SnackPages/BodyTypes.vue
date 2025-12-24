<template>
  <div class="bodytype-container">
    <div class="snack-card">
      <h1 class="bodytype-title">Jouw lichaamstype</h1>
      <div class="macro-squiggle">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12" stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="bodytype-list row">
        <div v-for="item in bodytypes" :key="item.value" class=" col-lg-2 col-md-6 bodytype-item"
          :class="{ selected: bodyType === item.value }" @click="selectType(item.value)" tabindex="0"
          @keydown.enter="selectType(item.value)" role="button" :aria-pressed="bodyType === item.value">
          <img :src="item.img" :alt="item.label" class="bodytype-img" />
          <div class="bodytype-label">{{ item.label }}</div>
        </div>
      </div>

      <div class="weekques-nav">
        <button class="weekques-btn weekques-btn-prev" @click="goToPrev">Vorige</button>
        <button class="weekques-btn weekques-btn-next" @click="goToNext">Volgende</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCalculatorStore } from '@/stores/calculatorStats';
import { storeToRefs } from 'pinia';

const router = useRouter();
const store = useCalculatorStore();
const { bodyType } = storeToRefs(store);

function goToNext() {
  store.updateState();
  router.push('/snackpages/week-questions');
}
function goToPrev() {
  router.push('/snackpages/about-you');
}

const bodytypes = [
  { value: 'ondergewicht', label: 'Ondergewicht', img: '/photos/bodytypes/ondergewicht.webp' },
  { value: 'normaal', label: 'Normaal', img: '/photos/bodytypes/normal.webp' },
  { value: 'overgewicht', label: 'Overgewicht', img: '/photos/bodytypes/overgewicht.webp' },
  { value: 'obesitas', label: 'Obesitas', img: '/photos/bodytypes/obesitas.webp' },
  { value: 'zwaar-obesitas', label: 'Zwaar obesitas', img: '/photos/bodytypes/zwaar-obesitas.webp' }
];

function selectType(val) {
  bodyType.value = val;
}

onMounted(() => {
  store.loadState();
});
</script>

<style scoped>
.bodytype-container {
  font-family: 'Indie Flower', cursive, sans-serif;
}
.bodytype-container {
  margin: 0;
  padding: 6rem 3rem 6rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Center vertically */
  background: #fff;
  box-sizing: border-box;
}

.bodytype-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  font-size: 2.2rem;
  color: #222;
  font-weight: 400;
  margin-bottom: 1.2rem;
  text-align: center;
}

.bodytype-squiggle {
  margin-bottom: 2.5rem;
}

.bodytype-list {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.bodytype-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.bodytype-item.selected {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca933;
}

.bodytype-item:focus {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca966;
}

.bodytype-img {
  width: 140px;
  height: 260px;
  object-fit: contain;
  margin-bottom: 1.2rem;
}

.bodytype-label {
  font-size: 1.25rem;
  color: #222;
  font-family: inherit;
  margin-top: 0.2rem;
  text-align: center;
}

.bodytype-nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
}

.bodytype-btn {
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.1rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.2rem 1.2rem;
  transition: color 0.2s;
}

.bodytype-btn:hover {
  color: #da2c89;
  text-decoration: underline;
}

.weekques-nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 2.5rem;
}

.weekques-btn {
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.2rem 1.2rem;
  transition: color 0.2s;
}

.weekques-btn:hover {
  color: #da2c89;
  text-decoration: underline;
}

/* Responsive styles */
@media (max-width: 900px) {
  .bodytype-container {
    max-width: 70vw;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }

  .bodytype-list {
    gap: 1.2rem;
  }

  .bodytype-item {
    width: 120px;
  }

  .bodytype-img {
    width: 90px;
    height: 160px;
  }
    .bodytype-label {
    font-size: 0.85rem;
  }

}

@media (max-width: 499px) {
  .bodytype-title {
    font-size: 1.2rem;
  }

  .bodytype-list {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .bodytype-item {
    width: 45vw;
    max-width: 110px;
    min-width: 60px;
    margin-bottom: 1rem;
  }

  .bodytype-img {
    width: 40vw;
    max-width: 110px;
    min-width: 40px;
    height: 60vw;
    max-height: 110px;
    min-height: 50px;
  }

  .bodytype-label {
    font-size: 0.85rem;
  }

  .bodytype-squiggle svg {
    width: 100px !important;
    height: 18px !important;
  }
}
</style>
