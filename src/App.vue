<script setup>
import { RouterView, useRoute } from 'vue-router'
import MainLayout from './components/MainLayout/MainLayout.vue';

const route = useRoute();
const excludeFromLayout = [
  '/login',
  '/register',
  '/snackpages/body-types',
  '/snackpages/week-questions',
  '/snackpages/work-towards-goal',
  '/snackpages/special-diet',
  '/snackpages/diet-results',
  '/snackpages/about-you'
];
</script>

<template>
  <template v-if="excludeFromLayout.includes(route.path)">
    <RouterView />
  </template>
  <template v-else>
    <MainLayout>
      <RouterView />
    </MainLayout>
  </template>
</template>

<style scoped>
.app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
