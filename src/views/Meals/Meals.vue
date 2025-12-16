<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="Koelkastpraat">
  <div class="weekmenu-container">
    <div class="weekmenu-header">
      <div class="weekmenu-title">Jouw weekmenu</div>
      <div class="weekmenu-weekselect">
        Kies jouw week <span class="weekmenu-weekselect-arrow">&#9660;</span>
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
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" style="display:inline-block;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 " stroke="#222" stroke-width="2"
            fill="none" />
        </svg>
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" style="display:inline-block; margin-left:-4px;">
          <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12" stroke="#222" stroke-width="2"
            fill="none" />
        </svg>
      </div>
    <div class="weekmenu-subtitle">Het menu voor vandaag</div>
    <div class="weekmenu-list">
      <template v-if="selectedDay === 0">
        <LeftCard
          id="1"
          layout-src="/borders/Frame Recipe archives.png"
          img-src="/photos/oats.png"
          img-alt="Overnight oats met aardbeien"
          title="Overnight oats met aardbeien"
          type="Ontbijt"
          time="20 min"
          user="1"
          comment="1"
          img-position="left"
        />
        <LeftCard
          id="2"
          layout-src="/borders/Frame Recipe archives.png"
          img-src="/photos/apple.webp"
          img-alt="Appel"
          title="Appel"
          type="Tussendoortje"
          time="1 min"
          user="1"
          comment="1"
          img-position="right"
        />
      </template>
      <template v-else-if="selectedDay === 1">
        <LeftCard
          id="3"
          img-src="/photos/tosti.jpg"
          img-alt="Tosti"
          title="Tosti"
          type="Lunch"
          time="1 min"
          user="1"
          comment="1"
          img-position="left"
        />
        <LeftCard
          id="4"
          img-src="/photos/pasta.png"
          img-alt="Pasta"
          title="Pasta"
          type="Avondeten"
          time="1 min"
          user="1"
          comment="1"
          img-position="right"
        />
      </template>
      <template v-else-if="selectedDay === 2">
        <LeftCard
          id="5"
          img-src="/photos/yogurt.jpg"
          img-alt="Yoghurt met granola"
          title="Yoghurt met granola"
          type="Ontbijt"
          time="10 min"
          user="2"
          comment="2"
          img-position="left"
        />
        <LeftCard
          id="6"
          img-src="/photos/banana.webp"
          img-alt="Banaan"
          title="Banaan"
          type="Tussendoortje"
          time="1 min"
          user="2"
          comment="2"
          img-position="right"
        />
      </template>
      <template v-else-if="selectedDay === 3">
        <LeftCard
          id="7"
          img-src="/photos/sandwich.webp"
          img-alt="Sandwich kipfilet"
          title="Sandwich kipfilet"
          type="Lunch"
          time="15 min"
          user="3"
          comment="1"
          img-position="left"
        />
        <LeftCard
          id="8"
          img-src="/photos/soup.png"
          img-alt="Tomatensoep"
          title="Tomatensoep"
          type="Avondeten"
          time="30 min"
          user="3"
          comment="1"
          img-position="right"
        />
      </template>
      <template v-else-if="selectedDay === 4">
        <LeftCard
          id="9"
          img-src="/photos/pancakes.jpg"
          img-alt="Pannenkoeken"
          title="Pannenkoeken"
          type="Ontbijt"
          time="20 min"
          user="4"
          comment="2"
          img-position="left"
        />
        <LeftCard
          id="10"
          img-src="/photos/salad.jpg"
          img-alt="Salade"
          title="Salade"
          type="Lunch"
          time="10 min"
          user="4"
          comment="2"
          img-position="right"
        />
      </template>
      <template v-else-if="selectedDay === 5">
        <LeftCard
          id="11"
          img-src="/photos/eggs.jpg"
          img-alt="Roerei"
          title="Roerei"
          type="Ontbijt"
          time="8 min"
          user="5"
          comment="1"
          img-position="left"
        />
        <LeftCard
          id="12"
          img-src="/photos/pizza.jpg"
          img-alt="Pizza"
          title="Pizza"
          type="Avondeten"
          time="20 min"
          user="5"
          comment="1"
          img-position="right"
        />
      </template>
      <template v-else-if="selectedDay === 6">
        <LeftCard
          id="13"
          img-src="/photos/croissant.jpg"
          img-alt="Croissant"
          title="Croissant"
          type="Ontbijt"
          time="5 min"
          user="6"
          comment="1"
          img-position="left"
        />
        <LeftCard
          id="14"
          img-src="/photos/lasagna.jpg"
          img-alt="Lasagne"
          title="Lasagne"
          type="Avondeten"
          time="40 min"
          user="6"
          comment="2"
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
import { ref } from 'vue';
import LeftCard from '@/components/WeeklyMenu/MenuCard.vue';
const days = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
  'Zaterdag',
  'Zondag'
];
const selectedDay = ref(0);
function selectDay(idx) {
  selectedDay.value = idx;
}
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
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.weekmenu-title {
  font-size: 2rem;
  color: #9bb89c;
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
}

.weekmenu-weekselect-arrow {
  font-size: 1.1em;
  margin-left: 0.2em;
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
