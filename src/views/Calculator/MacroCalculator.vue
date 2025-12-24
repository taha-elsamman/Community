<template>
  <div class="page">
    <div class="card">
      <h2>Macro Calculator</h2>
      <p class="sub">Enter your data, get calories + protein/fat/carbs instantly.</p>

      <div class="grid">
        <div class="field">
          <label>Gender</label>
          <select v-model="form.gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div class="field">
          <label>Age (years)</label>
          <input type="number" v-model.number="form.age" min="10" max="100" />
        </div>

        <div class="field">
          <label>Weight (kg)</label>
          <input type="number" v-model.number="form.weightKg" min="30" max="300" step="0.1" />
        </div>

        <div class="field">
          <label>Height (cm)</label>
          <input type="number" v-model.number="form.heightCm" min="120" max="230" />
        </div>

        <div class="field">
          <label>Body type</label>
          <select v-model="form.bodyType">
            <option value="underweight">Underweight</option>
            <option value="normal">Normal</option>
            <option value="overweight">Overweight</option>
            <option value="obesity">Obesity</option>
            <option value="severe_obesity">Severe obesity</option>
          </select>
        </div>

        <div class="field">
          <label>What does your week look like?</label>
          <select v-model="form.weekActivity">
            <option value="mostly_sitting">Mostly sitting, little movement</option>
            <option value="light_things">You get up and do light things</option>
            <option value="quite_active">You are quite active</option>
            <option value="heavy_work">You are often active / heavy work</option>
          </select>
        </div>

        <div class="field">
          <label>Training sessions per week</label>
          <input type="number" v-model.number="form.trainSessionsPerWeek" min="0" max="14" />
        </div>

        <div class="field">
          <label>Average training duration (minutes)</label>
          <input type="number" v-model.number="form.trainMinutesAvg" min="0" max="300" />
        </div>

        <div class="field">
          <label>Training heaviness</label>
          <select v-model="form.trainIntensity">
            <option value="light">Light</option>
            <option value="average">Average</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>

        <div class="field">
          <label>Goal</label>
          <select v-model="form.goal">
            <option value="lose">I want to lose weight</option>
            <option value="maintain">I want to maintain my weight</option>
            <option value="build">I want to build (more) muscle mass</option>
          </select>
        </div>

        <div class="field">
          <label>Goal speed</label>
          <select v-model="form.goalSpeed">
            <option value="easy">Take it easy</option>
            <option value="normal">Normal pace</option>
            <option value="aggressive">I'm going for it</option>
          </select>
        </div>

        <div class="field">
          <label>Special diet</label>
          <select v-model="form.dietType">
            <option value="none">No (varied diet)</option>
            <option value="vegetarian">Yes, vegetarian</option>
            <option value="vegan">Yes, vegan</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="field" v-if="form.dietType === 'other'">
          <label>Other diet type</label>
          <input type="text" v-model.trim="form.dietOther" placeholder="e.g., keto, low carb..." />
        </div>
      </div>

      <div class="divider"></div>

      <h3>This is your starting point</h3>

      <div class="kpis">
        <div class="kpi">
          <div class="kpi-label">BMR</div>
          <div class="kpi-value">{{ fmt(bmrKcal) }} kcal/day</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">Maintenance calories</div>
          <div class="kpi-value">{{ fmt(maintenanceKcal) }} kcal/day</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">Target calories</div>
          <div class="kpi-value">{{ fmt(targetKcal) }} kcal/day</div>
        </div>
      </div>

      <p class="note">
        This is how much your body needs on average to maintain a healthy weight.<br />
        <b>Lose weight:</b> Eat about 15–20% less than this amount.<br />
        <b>Maintain weight:</b> Stay around this amount.<br />
        <b>Build muscle:</b> Eat 10–15% more than this amount.
      </p>

      <div class="macros">
        <div class="macro">
          <div class="macro-title">Protein</div>
          <div class="macro-big">{{ macros.proteinG }} g</div>
        </div>
        <div class="macro">
          <div class="macro-title">Fats</div>
          <div class="macro-big">{{ macros.fatG }} g</div>
        </div>
        <div class="macro">
          <div class="macro-title">Carbohydrates</div>
          <div class="macro-big">{{ macros.carbsG }} g</div>
        </div>
      </div>

      <details class="debug">
        <summary>Debug details</summary>
        <ul>
          <li>PAL factor: {{ palFactor.toFixed(2) }}</li>
          <li>Training kcal/day: {{ fmt(trainingKcalPerDay) }}</li>
          <li>Training MET: {{ trainingMet.toFixed(1) }}</li>
        </ul>
      </details>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";

const form = reactive({
  gender: "male",
  age: 28,
  weightKg: 80,
  heightCm: 175,
  bodyType: "normal",
  weekActivity: "light_things",
  trainSessionsPerWeek: 3,
  trainMinutesAvg: 60,
  trainIntensity: "average",
  goal: "maintain",
  goalSpeed: "normal",
  dietType: "none",
  dietOther: "",
});

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const palFactor = computed(() => {
  const map = {
    mostly_sitting: 1.4,
    light_things: 1.6,
    quite_active: 1.8,
    heavy_work: 2.0,
  };
  return map[form.weekActivity] ?? 1.6;
});

const bmrKcal = computed(() => {
  const w = clamp(Number(form.weightKg) || 0, 30, 300);
  const h = clamp(Number(form.heightCm) || 0, 120, 230);
  const a = clamp(Number(form.age) || 0, 10, 100);

  // Harris-Benedict style constants
  return form.gender === "male"
    ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
    : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
});

const trainingMet = computed(() => {
  const map = { light: 4, average: 6, heavy: 8 };
  return map[form.trainIntensity] ?? 6;
});

const trainingKcalPerDay = computed(() => {
  const sessions = clamp(Number(form.trainSessionsPerWeek) || 0, 0, 14);
  const minutes = clamp(Number(form.trainMinutesAvg) || 0, 0, 300);
  const w = clamp(Number(form.weightKg) || 0, 30, 300);
  if (sessions === 0 || minutes === 0) return 0;

  // kcal/min = (MET * 3.5 * kg) / 200
  const kcalPerMin = (trainingMet.value * 3.5 * w) / 200;
  return (kcalPerMin * minutes * sessions) / 7;
});

const maintenanceKcal = computed(() => {
  return bmrKcal.value * palFactor.value + trainingKcalPerDay.value;
});

const targetKcal = computed(() => {
  const tdee = maintenanceKcal.value;

  if (form.goal === "maintain") return tdee;

  const lose = { easy: 0.15, normal: 0.2, aggressive: 0.25 };
  const build = { easy: 0.1, normal: 0.12, aggressive: 0.15 };

  return form.goal === "lose"
    ? tdee * (1 - (lose[form.goalSpeed] ?? 0.2))
    : tdee * (1 + (build[form.goalSpeed] ?? 0.12));
});

const macros = computed(() => {
  const kcal = Math.max(0, targetKcal.value);
  const weight = clamp(Number(form.weightKg) || 0, 30, 300);

  // Protein (g/kg) business rules
  let proteinPerKg = 1.6;
  if (form.goal === "lose") proteinPerKg = 1.8;
  if (form.goal === "build") proteinPerKg = 2.0;

  if (form.bodyType === "overweight") proteinPerKg += 0.1;
  if (form.bodyType === "obesity" || form.bodyType === "severe_obesity") proteinPerKg += 0.2;

  if (form.trainIntensity === "heavy") proteinPerKg += 0.2;
  if (form.trainIntensity === "light") proteinPerKg -= 0.1;

  // Diet buffer
  let proteinG = proteinPerKg * weight;
  if (form.dietType === "vegan") proteinG *= 1.08;
  if (form.dietType === "vegetarian") proteinG *= 1.04;

  // Fat: 25% calories or min 0.6g/kg
  const fatMinG = 0.6 * weight;
  let fatG = Math.max(fatMinG, (kcal * 0.25) / 9);

  // Remaining carbs
  let carbsKcal = kcal - proteinG * 4 - fatG * 9;
  if (carbsKcal < 0) {
    fatG = fatMinG;
    carbsKcal = kcal - proteinG * 4 - fatG * 9;
  }
  if (carbsKcal < 0) {
    proteinG = Math.max(0, (kcal - fatG * 9) / 4);
    carbsKcal = kcal - proteinG * 4 - fatG * 9;
  }

  const carbsG = Math.max(0, carbsKcal / 4);

  return {
    proteinG: Math.round(proteinG),
    fatG: Math.round(fatG),
    carbsG: Math.round(carbsG),
  };
});

const fmt = (n) => (Number.isFinite(n) ? Math.round(n).toLocaleString() : "0");
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 22px;
  background: #0b1220;
  color: #eaf0ff;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
}
.card {
  width: min(980px, 100%);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 20px;
}
.sub { opacity: 0.8; margin-top: 4px; }
.grid {
  margin-top: 14px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
.field label { display: block; font-size: 12px; opacity: 0.85; margin-bottom: 6px; }
.field input, .field select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(0,0,0,0.25);
  color: #eaf0ff;
}
.divider { height: 1px; background: rgba(255,255,255,0.12); margin: 16px 0; }
.kpis {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
@media (max-width: 760px) { .kpis { grid-template-columns: 1fr; } }
.kpi { padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); }
.kpi-label { font-size: 12px; opacity: 0.8; margin-bottom: 6px; }
.kpi-value { font-size: 18px; font-weight: 800; }
.note { line-height: 1.5; opacity: 0.95; margin: 12px 0 14px; }
.macros { display: grid; gap: 10px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 760px) { .macros { grid-template-columns: 1fr; } }
.macro { padding: 14px; border-radius: 14px; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.12); }
.macro-title { font-size: 12px; opacity: 0.8; }
.macro-big { font-size: 26px; font-weight: 900; margin-top: 6px; }
.debug { margin-top: 12px; opacity: 0.9; }
</style>
