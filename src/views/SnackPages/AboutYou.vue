<template>
  <div class="aboutyou-container">
    <div class="snack-card">
      <h1 class="aboutyou-title">Even over jou</h1>
      <div class="aboutyou-desc">
        Geen zorgen, we slaan niks geks op.<br>
        Dit helpt alleen om een goed startpunt te berekenen.
      </div>
      <div class="macro-squiggle">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" style="display:inline-block;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 " stroke="#222" stroke-width="2"
            fill="none" />
        </svg>
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" style="display:inline-block; margin-left:-4px;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12" stroke="#222" stroke-width="2"
            fill="none" />
        </svg>
      </div>
      <div class="aboutyou-form">
        <div class="aboutyou-row">
          <div class="aboutyou-col">
            <div class="aboutyou-label aboutyou-label-pink">Wat is jouw geslacht?</div>
            <div class="aboutyou-gender-group">
              <button
                class="aboutyou-gender-btn"
                :class="{ active: selectedGender === 'vrouw' }"
                @click="selectGender('vrouw')"
                type="button"
              >Vrouw</button>
              <button
                class="aboutyou-gender-btn"
                :class="{ active: selectedGender === 'man' }"
                @click="selectGender('man')"
                type="button"
              >Man</button>
            </div>
          </div>
          <div class="aboutyou-col">
            <div class="aboutyou-label aboutyou-label-pink">Wat is jouw leeftijd?</div>
            <div class="aboutyou-input-group">
              <input class="aboutyou-input" type="number" min="0" />
              <span class="aboutyou-input-unit">jaar</span>
            </div>
          </div>
        </div>
        <div class="aboutyou-row">
          <div class="aboutyou-col">
            <div class="aboutyou-label aboutyou-label-pink">Wat is jouw gewicht?</div>
            <div class="aboutyou-input-group">
              <input class="aboutyou-input" type="number" min="0" />
              <span class="aboutyou-input-unit">kg</span>
            </div>
          </div>
          <div class="aboutyou-col">
            <div class="aboutyou-label aboutyou-label-pink">Wat is jouw lengte?</div>
            <div class="aboutyou-input-group">
              <input class="aboutyou-input" type="number" min="0" />
              <span class="aboutyou-input-unit">cm</span>
            </div>
          </div>
        </div>
      </div>
      <div class="aboutyou-footer">
        <button class="aboutyou-nav aboutyou-nav-prev" @click="goToPrev">Vorige</button>
        <button class="aboutyou-nav aboutyou-nav-next" @click="goToNext">Volgende</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const selectedGender = ref(null);

function selectGender(gender) {
  selectedGender.value = gender;
}

function goToNext() {
  router.push('/snackpages/body-types');
}
function goToPrev() {
  router.push('/home');
}
</script>

<style scoped>
.aboutyou-container {
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 3rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Center vertically */
  background: #fff;
  box-sizing: border-box;
}

.aboutyou-title {
  font-size: 2.7rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  margin-bottom: 1.2rem;
}

.aboutyou-desc {
  font-size: 1.35rem;
  color: #222;
  font-family: inherit;
  text-align: center;
  margin-bottom: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
}

.aboutyou-squiggle {
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;
}

.aboutyou-form {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 2.5rem;
}

.aboutyou-row {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 3rem;
  margin-bottom: 2.5rem;
}

.aboutyou-col {
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aboutyou-label {
  font-size: 1.35rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 1.2rem;
  text-align: center;
}

.aboutyou-label-pink {
  color: #e06ca9;
}

.aboutyou-gender-group {
  display: flex;
  gap: 3rem;
  width: 100%;
  justify-content: center;
}

.aboutyou-gender-btn {
  background: none;
  border: none;
  color: #222;
  font-size: 1.35rem;
  font-family: inherit;
  cursor: pointer;
  border-bottom: 2px dotted #e06ca9;
  border-radius: 0 0 18px 18px;
  padding: 0.2rem 2.2rem 0.2rem 2.2rem;
  margin-bottom: 0.5rem;
  transition: background 0.2s, color 0.2s;
}

.aboutyou-gender-btn:hover {
  background: #faf4f8;
  color: #e06ca9;
}

/* highlight selected */
.aboutyou-gender-btn.active {
  background: #faf4f8;
  color: #e06ca9;
}

.aboutyou-input-group {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px dotted #e06ca9;
  border-radius: 0 0 18px 18px;
  padding-bottom: 0.3rem;
  width: 180px;
  justify-content: center;
}

.aboutyou-input {
  border: none;
  background: transparent;
  font-size: 1.35rem;
  color: #222;
  outline: none;
  width: 90px;
  text-align: center;
  font-family: inherit;
}

.aboutyou-input-unit {
  color: #bdbdbd;
  font-size: 1.1rem;
  margin-left: 0.2rem;
}

.aboutyou-footer {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 2.5rem;
  max-width: 900px;
}

.aboutyou-nav {
  background: none;
  border: none;
  font-family: 'Indie Flower', cursive, sans-serif;
  font-size: 1.1rem;
  color: #e06ca9;
  cursor: pointer;
  transition: color 0.2s;
}

.aboutyou-nav:hover {
  color: #da2c89;
  text-decoration: underline;
}

@media (max-width: 900px) {
  .aboutyou-container {
    max-width: 98vw;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }

  .aboutyou-form {
    max-width: 100vw;
  }

  .aboutyou-row {
    gap: 1.2rem;
  }

  .aboutyou-label,
  .aboutyou-gender-btn,
  .aboutyou-input {
    font-size: 1.05rem;
  }

  .aboutyou-input-group {
    width: 120px;
  }
}

@media (max-width: 600px) {
  .aboutyou-title {
    font-size: 1.2rem;
  }

  .aboutyou-desc {
    font-size: 1rem;
  }

  .aboutyou-row {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }

  .aboutyou-footer {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .aboutyou-label,
  .aboutyou-gender-btn,
  .aboutyou-input {
    font-size: 0.95rem;
  }

  .aboutyou-input-group {
    width: 80px;
  }
}
</style>
