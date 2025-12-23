<template>
  <div class="specialdiet-container">
    <div class="snack-card">
      <h1 class="specialdiet-title">
        Volg je op dit moment<br />een speciaal eetpatroon?
      </h1>
      <div class="macro-squiggle">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12" stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="specialdiet-options-row">
        <div class="specialdiet-option" :class="{ selected: selectedDiet === 0 }" @click="toggleDiet(0)" tabindex="0"
          @keydown.enter="toggleDiet(0)" role="button" aria-pressed="selectedDiet === 0">
          <div class="specialdiet-option-main">Nee</div>
          <div class="specialdiet-option-desc">ik eet gewoon gevarieerd</div>
          <div class="specialdiet-curve"></div>
        </div>
        <div class="specialdiet-option" :class="{ selected: selectedDiet === 1 }" @click="toggleDiet(1)" tabindex="0"
          @keydown.enter="toggleDiet(1)" role="button" aria-pressed="selectedDiet === 1">
          <div class="specialdiet-option-main">Ja</div>
          <div class="specialdiet-option-desc">Vegetarisch</div>
          <div class="specialdiet-curve"></div>
        </div>
        <div class="specialdiet-option" :class="{ selected: selectedDiet === 2 }" @click="toggleDiet(2)" tabindex="0"
          @keydown.enter="toggleDiet(2)" role="button" aria-pressed="selectedDiet === 2">
          <div class="specialdiet-option-main">Ja</div>
          <div class="specialdiet-option-desc">Veganistisch</div>
          <div class="specialdiet-curve"></div>
        </div>
        <div class="specialdiet-option specialdiet-other-option"
          :class="{ selected: selectedDiet === null && otherDiet }">
          <label class="specialdiet-other-label" for="otherDiet">Anders, namelijk:</label>
          <input id="otherDiet" class="specialdiet-other-input" type="text" v-model="otherDiet"
            :disabled="selectedDiet !== null" placeholder="Vul je eetpatroon in" @focus="selectedDiet = null" />
        </div>
      </div>

      <div class="specialdiet-results-link">
        <a href="#" class="specialdiet-link" @click.prevent="goToNext">Zie jouw resultaten</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const selectedDiet = ref(null);
const otherDiet = ref('');

function toggleDiet(idx) {
  if (selectedDiet.value === idx) {
    selectedDiet.value = null;
  } else {
    selectedDiet.value = idx;
    otherDiet.value = '';
  }
}

function goToNext() {
  router.push('/snackpages/diet-results');
}
</script>

<style scoped>
.specialdiet-container {
  font-family: 'Indie Flower', cursive, sans-serif;
}
.specialdiet-container {
  margin: 0;
  padding: 6rem 1rem 2rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Center vertically */
  background: #fff;
  box-sizing: border-box;
}


.specialdiet-title {
  font-size: 2.3rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0.5rem;
}

.specialdiet-squiggle {
  margin: 1.2rem 0 2.5rem 0;
  display: flex;
  justify-content: center;
}

.specialdiet-options-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.specialdiet-option {
  flex: 1 1 30%;
  min-width: 250px;
  max-width: 33.33%;
  text-align: center;
  font-size: 1.35rem;
  color: #222;
  font-family: inherit;
  background: none;
  position: relative;
  padding-bottom: 2.2rem;
  font-weight: 400;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
  cursor: pointer;
  border: 2px solid transparent;
  outline: none;
  border-radius: 0 0 18px 18px;
}

.specialdiet-option.selected {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca933;
  background: #faf4f8;
}

.specialdiet-option:focus {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca966;
}

.specialdiet-option-main {
  font-size: 1.35rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.specialdiet-option-desc {
  font-size: 1.1rem;
  color: #888;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.specialdiet-curve {
  width: 100%;
  height: 18px;
  margin-top: 0.7rem;
  background: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.2rem;
}

.specialdiet-curve::after {
  content: "";
  display: block;
  width: 90%;
  margin: 0 auto;
  height: 10px;
  border-bottom: 2px dotted #e06ca9;
  border-radius: 0 0 18px 18px;
}

.specialdiet-other-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.specialdiet-other-label {
  font-size: 1.3rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.specialdiet-other-option {
  cursor: default;
  border: 2px solid transparent;
  background: none;
  box-shadow: none;

}

.specialdiet-other-input {
  width: 90%;
  font-size: 1.1rem;
  color: #222;
  border: none;
  border-bottom: 2px dashed #e06ca9;
  background: transparent;
  outline: none;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.2rem 0.1rem;
  text-align: center;
  border-radius: 0 0 12px 12px;
  font-family: inherit;
}

.specialdiet-other-input:disabled {
  background: #f5f5f5;
  color: #bbb;
  cursor: not-allowed;

}

.specialdiet-results-link {
  margin-top: 1.5rem;
  text-align: center;
  width: 100%;
}

.specialdiet-link {
  color: #e06ca9;
  font-size: 1.15rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  text-decoration: none;
  transition: color 0.2s;
}

.specialdiet-link:hover {
  color: #da2c89;
  text-decoration: underline;
}


@media (max-width: 900px) {
  .specialdiet-container {
    max-width: 98vw;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }

  .specialdiet-options-row {
    gap: 1.2rem;
  }

  .specialdiet-option {
    font-size: 1.05rem;
    padding-bottom: 1.5rem;
    flex: 1 1 45%;
    max-width: 48%;
    min-width: 160px;
  }

  .specialdiet-other-curve {
    width: 90%;
  }
}

@media (max-width: 600px) {
  .specialdiet-title {
    font-size: 1.2rem;
  }

  .specialdiet-options-row {
    gap: 0.5rem;
  }

  .specialdiet-option {
    font-size: 0.95rem;
    padding-bottom: 1rem;
    flex: 1 1 100%;
    max-width: 100%;
    min-width: 120px;
  }

  .specialdiet-other-label {
    font-size: 1rem;
  }

  .specialdiet-other-curve {
    width: 100%;
  }
}
</style>
