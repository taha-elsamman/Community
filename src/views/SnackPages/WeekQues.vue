<template>
  <div class="weekques-container">
    <div class="snack-card">
      <h1 class="weekques-title">Hoe ziet jouw week eruit?</h1>
      <div class="weekques-subtitle">Van bank tot barbell, alles telt mee.</div>
      <div class="macro-squiggle">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12" stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="weekques-section">
        <div class="weekques-question weekques-question-pink">
          Hoe actief ben je meestal, naast eventuele trainingen?
        </div>
        <div class="weekques-options">
          <div v-for="(option, idx) in activityOptions" :key="idx" class="weekques-option weekques-input-row" :class="[
            selectedActivity === idx ? 'selected' : '',
            'col-lg-3',
            'col-md-4',
            'col-sm-4',
            'col-4'
          ]" @click="selectedActivity = idx" tabindex="0" @keydown.enter="selectedActivity = idx" role="button"
            aria-pressed="selectedActivity === idx">
            <span v-html="option"></span>
          </div>
        </div>
      </div>

      <div class="weekques-section">
        <div class="weekques-question weekques-question-pink">
          Doe je aan een sport of training?
        </div>
        <div class="weekques-options weekques-options-wide">
          <div
            class="weekques-option"
            :class="{ selected: selectedSport === 0 }"
            @click="selectSport(0)"
            tabindex="0"
            @keydown.enter="selectSport(0)"
            role="button"
            aria-pressed="selectedSport === 0"
          >
            Nee<br>
            <span class="weekques-option-desc weekques-input-row Nee">ik beweeg gewoon zonder plan</span>
          </div>
          <div
            class="weekques-option"
            :class="{ selected: selectedSport === 1 }"
            @click="selectSport(1)"
            tabindex="0"
            @keydown.enter="selectSport(1)"
            role="button"
            aria-pressed="selectedSport === 1"
          >
            Ja<br>
            <span class="weekques-option-desc weekques-input-row">ik doe bijvoorbeeld cardio, kracht of iets anders</span>
          </div>
        </div>
      </div>

      <div class="weekques-section">
        <div class="weekques-question weekques-question-pink">
          Hoe vaak en hoe lang train je?
        </div>
        <div class="weekques-options weekques-options-wide">
          <div class="weekques-option">
            <span>Hoe vaak per week?</span><br>
            <div
              class="weekques-input-row"
              style="justify-content:center; border-bottom:2px dashed #e06ca9; border-radius:0 0 12px 12px; margin-top:0.5rem;"
            >
              <input class="weekques-input" type="number" min="0" style="width:60px; text-align:center;" />
              <span class="weekques-input-label">keer</span>
            </div>
          </div>
          <div class="weekques-option">
            <span>Hoe lang gemiddeld?</span><br>
            <div
              class="weekques-input-row"
              style="justify-content:center; border-bottom:2px dashed #e06ca9; border-radius:0 0 12px 12px; margin-top:0.5rem;"
            >
              <input class="weekques-input" type="number" min="0" style="width:60px; text-align:center;" />
              <span class="weekques-input-label">minuten</span>
            </div>
          </div>
        </div>
      </div>

      <div class="weekques-section">
        <div class="weekques-question weekques-question-pink">
          Hoe zou je de zwaarte omschrijven?
        </div>
        <div class="weekques-options row">
          <div
            class="weekques-option col-lg-3 col-md-4 col-sm-4"
            :class="{ selected: selectedIntensity === 0 }"
            @click="selectIntensity(0)"
            tabindex="0"
            @keydown.enter="selectIntensity(0)"
            role="button"
            aria-pressed="selectedIntensity === 0"
          >
            Licht<br>
            <span class="weekques-option-desc weekques-input-row">je praat makkelijk<br>tijdens je training</span>
          </div>
          <div
            class="weekques-option col-lg-3 col-md-4 col-sm-4"
            :class="{ selected: selectedIntensity === 1 }"
            @click="selectIntensity(1)"
            tabindex="0"
            @keydown.enter="selectIntensity(1)"
            role="button"
            aria-pressed="selectedIntensity === 1"
          >
            Gemiddeld<br>
            <span class="weekques-option-desc weekques-input-row">je merkt <br> het wel</span>
          </div>
          <div
            class="weekques-option col-lg-3 col-md-4 col-sm-4"
            :class="{ selected: selectedIntensity === 2 }"
            @click="selectIntensity(2)"
            tabindex="0"
            @keydown.enter="selectIntensity(2)"
            role="button"
            aria-pressed="selectedIntensity === 2"
          >
            Zwaar<br>
            <span class="weekques-option-desc weekques-input-row">je bent echt<br>buiten adem</span>
          </div>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToNext() {
  router.push('/snackpages/work-towards-goal');
}
function goToPrev() {
  router.push('/snackpages/body-types');
}

const activityOptions = [
  'Meestal zitten, weinig bewegen',
  'Je staat wel op, doet lichte dingen',
  'Je bent redelijk in beweging',
  'Je bent vaak actief of hebt zwaar werk'
];
const selectedActivity = ref(null);

const selectedSport = ref(null);
function selectSport(idx) {
  selectedSport.value = idx;
}

const selectedIntensity = ref(null);
function selectIntensity(idx) {
  selectedIntensity.value = idx;
}
</script>

<style scoped>
.weekques-container {
  font-family: 'Indie Flower', cursive, sans-serif;
}
.weekques-container {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0 auto;
  padding: 6rem 3rem 6rem 3rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Center vertically */
}



.Nee {
  margin-top: 35px !important;
}

.weekques-title {
  font-size: 2rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0.5rem;
}

.weekques-subtitle {
  color: #444;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.weekques-squiggle {
  margin-bottom: 2.2rem;
}

.weekques-section {
  width: 100%;
  margin-bottom: 2.2rem;
  margin-top: 2.2rem;
}

.weekques-question {
  font-size: 1.15rem;
  color: #222;
  font-family: inherit;
  text-align: center;
  margin-bottom: 1.2rem;
  font-weight: 400;
}

.weekques-question-pink {
  color: #e06ca9;
}

.weekques-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.weekques-options-wide {
  gap: 5rem;
}

.weekques-option {
  padding: 1.1rem 0.5rem 0.7rem 0.5rem;
  border-bottom: 2px dashed #e06ca9;
  border-radius: 0 0 18px 18px;
  text-align: center;
  font-size: 1.05rem;
  color: #222;
  font-family: inherit;
  background: none;
  margin-bottom: 0.2rem;
  margin-left: 20px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
  /* Remove min-width so Bootstrap grid controls width */
  max-width: 200px;
}

.weekques-option.selected {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca933;
  background: #faf4f8;
}

.weekques-option:focus {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca966;
}

.weekques-option-desc {
  color: #bdbdbd;
  font-size: 0.97rem;
  font-family: inherit;
}

.weekques-section-row {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 2.2rem;
}

.weekques-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weekques-input-row {
  display: flex;
  align-items: flex-end;
  margin-top: 0.7rem;
  border-bottom: 2px dashed #e06ca9;
  border-radius: 0 0 12px 12px;
  padding-bottom: 0.3rem;
  justify-content: center;
}

.weekques-input {
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #222;
  outline: none;
  width: 140px;
  text-align: center;
  font-family: inherit;
}

.weekques-input-label {
  color: #bdbdbd;
  font-size: 1.05rem;
  margin-left: 0.2rem;
}

.weekques-nav {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
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

@media (max-width: 900px) {
  .weekques-container {
    max-width: 98vw;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }

  .weekques-options,
  .weekques-options-wide {
    gap: 1rem;
  }

  .weekques-section-row {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
}
</style>
