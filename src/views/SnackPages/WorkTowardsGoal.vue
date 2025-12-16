<template>
  <div class="worktowards-container">
    <div class="snack-card">
      <h1 class="worktowards-title">Waar werk je naartoe?</h1>
      <div class="macro-squiggle">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12" stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>

      <div class="worktowards-section">
        <div class="worktowards-question">Wat is je doel?</div>
        <div class="worktowards-options">
          <div
            class="worktowards-option"
            :class="{ selected: selectedGoal === 0 }"
            @click="selectGoal(0)"
            tabindex="0"
            @keydown.enter="selectGoal(0)"
            role="button"
            aria-pressed="selectedGoal === 0"
          >
            Ik wil afvallen
            <div class="worktowards-curve"></div>
          </div>
          <div
            class="worktowards-option"
            :class="{ selected: selectedGoal === 1 }"
            @click="selectGoal(1)"
            tabindex="0"
            @keydown.enter="selectGoal(1)"
            role="button"
            aria-pressed="selectedGoal === 1"
          >
            Ik wil mijn<br>gewicht behouden
            <div class="worktowards-curve"></div>
          </div>
          <div
            class="worktowards-option"
            :class="{ selected: selectedGoal === 2 }"
            @click="selectGoal(2)"
            tabindex="0"
            @keydown.enter="selectGoal(2)"
            role="button"
            aria-pressed="selectedGoal === 2"
          >
            Ik wil (meer)<br>spiermassa opbouwen
            <div class="worktowards-curve"></div>
          </div>
        </div>
      </div>

      <div class="worktowards-section">
        <div class="worktowards-question">Hoe snel wil je je doel behalen?</div>
        <div class="worktowards-options">
          <div
            class="worktowards-option"
            :class="{ selected: selectedSpeed === 0 }"
            @click="selectSpeed(0)"
            tabindex="0"
            @keydown.enter="selectSpeed(0)"
            role="button"
            aria-pressed="selectedSpeed === 0"
          >
            Rustig aan
            <div class="worktowards-curve"></div>
          </div>
          <div
            class="worktowards-option"
            :class="{ selected: selectedSpeed === 1 }"
            @click="selectSpeed(1)"
            tabindex="0"
            @keydown.enter="selectSpeed(1)"
            role="button"
            aria-pressed="selectedSpeed === 1"
          >
            Normaal tempo
            <div class="worktowards-curve"></div>
          </div>
          <div
            class="worktowards-option"
            :class="{ selected: selectedSpeed === 2 }"
            @click="selectSpeed(2)"
            tabindex="0"
            @keydown.enter="selectSpeed(2)"
            role="button"
            aria-pressed="selectedSpeed === 2"
          >
            Ik ga ervoor
            <div class="worktowards-curve"></div>
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
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const selectedGoal = ref(null);
const selectedSpeed = ref(null);

function selectGoal(idx) {
  selectedGoal.value = idx;
}
function selectSpeed(idx) {
  selectedSpeed.value = idx;
}

function goToNext() {
  router.push('/snackpages/special-diet');
}
function goToPrev() {
  router.push('/snackpages/week-questions');
}
</script>

<style scoped>
.worktowards-container {
  font-family: 'Indie Flower', cursive, sans-serif;
}
.worktowards-container {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 3rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-sizing: border-box;
}

.worktowards-title {
  font-size: 2.3rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0.5rem;
}

.worktowards-squiggle,
.macro-squiggle {
  margin: 1.2rem 0 2.5rem 0;
  display: flex;
  justify-content: center;
}

.worktowards-section {
  width: 100%;
  margin-bottom: 2.5rem;
}

.worktowards-question {
  font-size: 1.35rem;
  color: #e06ca9;
  font-family: inherit;
  text-align: center;
  margin-bottom: 2.2rem;
  font-weight: 400;
}

.worktowards-options {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

}

.worktowards-option {
  flex: 1 1 0;
  min-width: 180px;
  max-width: 100%;
  text-align: center;
  font-size: 1.25rem;
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
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  border-radius: 0 0 18px 18px;
}

.worktowards-option.selected {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca933;
  background: #faf4f8;
}

.worktowards-option:focus {
  border-color: #e06ca9;
  box-shadow: 0 0 0 2px #e06ca966;
}

.worktowards-curve {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 0.2rem;
  height: 18px;
  pointer-events: none;
  background: none;
}

.worktowards-curve::after {
  content: "";
  display: block;
  width: 100%;
  height: 10px;
  border-bottom: 2px dotted #e06ca9;
  border-radius: 0 0 18px 18px;
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

/* Responsive: 3 in a row on large, 2 on medium, 1 on small */
@media (max-width: 900px) {
  .worktowards-options {
    gap: 1.2rem;
  }
  .worktowards-option {
    font-size: 1.05rem;
    padding-bottom: 1.5rem;
    min-width: 45%;
    max-width: 48%;
  }
}

@media (max-width: 600px) {
  .worktowards-title {
    font-size: 1.2rem;
  }
  .goal-card {
    padding: 1rem 0.3rem 1rem 0.3rem;
    border-radius: 0.7rem;
  }
  .worktowards-section {
    margin-bottom: 1.2rem;
  }
  .worktowards-options {
    gap: 0.5rem;
  }
  .worktowards-option {
    font-size: 0.95rem;
    padding-bottom: 1rem;
    min-width: 90vw;
    max-width: 100vw;
  }
}
</style>
