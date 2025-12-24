import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    gender: 'vrouw', // 'man' | 'vrouw' (mapped from 'female'/'male' logic if needed, but UI uses Dutch)
    age: 30,
    weightKg: 70,
    heightCm: 170,
    bodyType: 'normaal', // 'ondergewicht', 'normaal', 'overgewicht', 'obesitas', 'zwaar-obesitas'

    // Activity
    weekActivity: 1, // index 0-3 corresponding to 'mostly_sitting' etc.
    // Training
    hasTraining: 0, // 0 = No, 1 = Yes
    trainSessionsPerWeek: 0,
    trainMinutesAvg: 0,
    trainIntensity: 1, // 0=Light, 1=Average, 2=Heavy

    // Goal
    goal: 1, // 0=Lose, 1=Maintain, 2=Build
    goalSpeed: 1, // 0=Easy, 1=Normal, 2=Aggressive

    // Diet
    dietType: 0, // 0=None, 1=Vegetarian, 2=Vegan
    dietOther: '', // Text if dietType is null/custom (handled slightly differently in UI, but we can standardize)
  }),

  getters: {
    // Helpers
    safeWeight: (state) => Math.max(30, Math.min(300, Number(state.weightKg) || 0)),
    safeHeight: (state) => Math.max(120, Math.min(230, Number(state.heightCm) || 0)),
    safeAge: (state) => Math.max(10, Math.min(100, Number(state.age) || 0)),

    bmrKcal(state) {
      const w = this.safeWeight;
      const h = this.safeHeight;
      const a = this.safeAge;

      // Note: 'man' vs 'vrouw' matching the UI strings
      if (state.gender === 'man') {
        return 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
      } else {
        return 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
      }
    },

    palFactor(state) {
      // Mapping index 0-3 to factors
      // 0: Mostly sitting (1.4)
      // 1: Light things (1.6)
      // 2: Quite active (1.8)
      // 3: Heavy work (2.0)
      const factors = [1.4, 1.6, 1.8, 2.0];
      return factors[state.weekActivity] || 1.6;
    },

    trainingMet(state) {
      // Mapping index 0-2 to MET
      // 0: Light (4)
      // 1: Average (6)
      // 2: Heavy (8)
      const metValues = [4, 6, 8];
      return metValues[state.trainIntensity] || 6;
    },

    trainingKcalPerDay(state) {
      if (!state.hasTraining) return 0;

      const sessions = Math.max(0, Math.min(14, Number(state.trainSessionsPerWeek) || 0));
      const minutes = Math.max(0, Math.min(300, Number(state.trainMinutesAvg) || 0));
      const w = this.safeWeight;

      if (sessions === 0 || minutes === 0) return 0;

      // kcal/min = (MET * 3.5 * kg) / 200
      const kcalPerMin = (this.trainingMet * 3.5 * w) / 200;
      // Daily average
      return (kcalPerMin * minutes * sessions) / 7;
    },

    maintenanceKcal(state) {
      return this.bmrKcal * this.palFactor + this.trainingKcalPerDay;
    },

    targetKcal(state) {
      const tdee = this.maintenanceKcal;

      // Goal: 0=Lose, 1=Maintain, 2=Build
      if (state.goal === 1) return tdee;

      // Speed: 0=Easy, 1=Normal, 2=Aggressive
      const loseFactors = [0.15, 0.2, 0.25];
      const buildFactors = [0.1, 0.12, 0.15];

      if (state.goal === 0) {
        // Lose
        const factor = loseFactors[state.goalSpeed] || 0.2;
        return tdee * (1 - factor);
      } else {
        // Build
        const factor = buildFactors[state.goalSpeed] || 0.12;
        return tdee * (1 + factor);
      }
    },

    macros(state) {
      const kcal = Math.max(0, this.targetKcal);
      const w = this.safeWeight;

      // Protein Rules
      let proteinPerKg = 1.6;
      if (state.goal === 0) proteinPerKg = 1.8; // Lose
      if (state.goal === 2) proteinPerKg = 2.0; // Build

      // Body Type adjustments
      // 'ondergewicht', 'normaal', 'overgewicht', 'obesitas', 'zwaar-obesitas'
      if (state.bodyType === 'overgewicht') proteinPerKg += 0.1;
      if (['obesitas', 'zwaar-obesitas'].includes(state.bodyType)) proteinPerKg += 0.2;

      // Training Intensity adjustments
      // 0=Light, 1=Average, 2=Heavy
      if (state.trainIntensity === 2) proteinPerKg += 0.2;
      if (state.trainIntensity === 0) proteinPerKg -= 0.1;

      // Diet buffer
      let proteinG = proteinPerKg * w;
      // 1=Vegetarian, 2=Vegan
      if (state.dietType === 2) proteinG *= 1.08;
      if (state.dietType === 1) proteinG *= 1.04;

      // Fat: 25% calories or min 0.6g/kg
      const fatMinG = 0.6 * w;
      let fatG = Math.max(fatMinG, (kcal * 0.25) / 9);

      // Remaining carbs
      let carbsKcal = kcal - (proteinG * 4) - (fatG * 9);

      // Balancing
      if (carbsKcal < 0) {
        fatG = fatMinG;
        carbsKcal = kcal - (proteinG * 4) - (fatG * 9);
      }
      if (carbsKcal < 0) {
        proteinG = Math.max(0, (kcal - (fatG * 9)) / 4);
        carbsKcal = kcal - (proteinG * 4) - (fatG * 9);
      }

      const carbsG = Math.max(0, carbsKcal / 4);

      return {
        proteinG: Math.round(proteinG),
        fatG: Math.round(fatG),
        carbsG: Math.round(carbsG)
      };
    }
  },

  actions: {
    // Helper to batch update or set single fields
    updateState(payload) {
      Object.assign(this, payload);
      // Persist to localStorage if desired, or let component handle it
      localStorage.setItem('calculator_state', JSON.stringify(this.$state));
    },
    loadState() {
      const stored = localStorage.getItem('calculator_state');
      if (stored) {
        try {
          this.$patch(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load calculator state', e);
        }
      }
    }
  }
});
