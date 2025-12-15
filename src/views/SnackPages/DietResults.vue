<template>
  <div class="dietresult-container">
    <div class="snack-card">
      <h1 class="dietresult-title">Dit is jouw startpunt</h1>
      <div class="dietresult-desc">
        Zoveel heeft jouw lijf gemiddeld nodig om in balans te blijven.<br>
        <span class="dietresult-pink">Afvallen:</span> Eet ongeveer 15–20% minder dan dit aantal.<br>
        <span class="dietresult-pink">Gewicht behouden:</span> Blijf rond dit aantal.<br>
        <span class="dietresult-pink">Spieropbouw:</span> Eet 10–15% meer dan dit aantal.
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
      <div class="dietresult-macros-row">
        <div class="dietresult-macro dietresult-macro-eiwitten">
          <div class="macro-title">Eiwitten</div>
          <div class="macro-amount">xx <span class="macro-unit">gram</span></div>
          <div class="macro-desc">voor herstel en<br>spierbehoud</div>
          <div class="macro-curve"></div>
        </div>
        <div class="dietresult-macro dietresult-macro-vetten">
          <div class="macro-title">Vetten</div>
          <div class="macro-amount">xx <span class="macro-unit">gram</span></div>
          <div class="macro-desc">voor energie en<br>hormonen</div>
          <div class="macro-curve"></div>
        </div>
        <div class="dietresult-macro dietresult-macro-koolhydraten">
          <div class="macro-title">Koolhydraten</div>
          <div class="macro-amount">xx <span class="macro-unit">gram</span></div>
          <div class="macro-desc">voor brandstof<br>en focus</div>
          <div class="macro-curve"></div>
        </div>
      </div>
      <div class="dietresult-footer">
        Gebruik dit als leidraad. Geen grammetjes-tellen-marathon.
      </div>
      <button class="dietresult-home-btn" @click="goHome">Naar Home</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
// ...existing code...
const router = useRouter();
function goHome() {
  router.push('/');
}
</script>

<style scoped>
.dietresult-container {

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

.dietresult-title {
  font-size: 2.7rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2.2rem;
}

.dietresult-desc {
  font-size: 1.35rem;
  color: #222;
  font-family: inherit;
  text-align: center;
  margin-bottom: 2.2rem;
  font-weight: 400;
  line-height: 1.5;
}

.dietresult-pink {
  color: #e06ca9;
  font-weight: 400;
}

.dietresult-squiggle {
  margin: 1.2rem 0 2.5rem 0;
  display: flex;
  justify-content: center;
}

.dietresult-macros-row {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2.5rem;
  width: 100%;
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
}

.dietresult-macro {
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
  text-align: center;
  font-family: inherit;
  background: none;
  position: relative;
  padding-bottom: 2.2rem;
  font-weight: 400;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.dietresult-macro-eiwitten .macro-title {
  color: #9bb89c;
}

.dietresult-macro-vetten .macro-title {
  color: #9bb89c;
}

.dietresult-macro-koolhydraten .macro-title {
  color: #9bb89c;
}

.macro-title {
  font-size: 1.35rem;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.macro-amount {
  font-size: 1.25rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.macro-unit {
  font-size: 1.1rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
}

.macro-desc {
  font-size: 1.1rem;
  color: #444;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.macro-curve {
  width: 100%;
  height: 18px;
  margin-top: 0.7rem;
  background: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.2rem;
}

.macro-curve::after {
  content: "";
  display: block;
  width: 90%;
  margin: 0 auto;
  height: 10px;
  border-bottom: 2px dotted #e06ca9;
  border-radius: 0 0 18px 18px;
}

.dietresult-footer {
  margin-top: 2.5rem;
  font-size: 1.35rem;
  color: #444;
  font-family: inherit;
  text-align: center;
}

.dietresult-home-btn {
  margin: 2.5rem auto 0 auto;
  display: block;
  background: #e06ca9;
  color: #fff;
  border: none;
  border-radius: 0.7rem;
  font-size: 1.1rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  padding: 0.7rem 2.2rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-weight: 500;
}

.dietresult-home-btn:hover {
  background: #da2c89;
  color: #fff;
}

@media (max-width: 900px) {
  .dietresult-container {
    max-width: 98vw;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
  }

  .dietresult-macros-row {
    gap: 1.2rem;
  }

  .dietresult-macro {
    font-size: 1.05rem;
    padding-bottom: 1.5rem;
  }
}

@media (max-width: 600px) {
  .dietresult-title {
    font-size: 1.2rem;
  }

  .dietresult-desc,
  .dietresult-footer {
    font-size: 1rem;
  }

  .dietresult-macros-row {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }

  .dietresult-macro {
    font-size: 0.95rem;
    padding-bottom: 1rem;
    width: 100%;
    max-width: 300px;
  }
}
</style>
