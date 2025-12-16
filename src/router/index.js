import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/RegisterPage.vue'),
    },
    {
      path: '/snackpages/body-types',
      name: 'snackpages-body-types',
      component: () => import('../views/SnackPages/BodyTypes.vue'),
    },
    {
      path: '/snackpages/week-questions',
      name: 'snackpages-week-questions',
      component: () => import('../views/SnackPages/WeekQues.vue'),
    },
    {
      path: '/snackpages/work-towards-goal',
      name: 'snackpages-work-towards-goal',
      component: () => import('../views/SnackPages/WorkTowardsGoal.vue'),
    },
    {
      path: '/snackpages/special-diet',
      name: 'snackpages-special-diet',
      component: () => import('../views/SnackPages/SpecialDiet.vue'),
    },
    {
      path: '/snackpages/diet-results',
      name: 'snackpages-diet-results',
      component: () => import('../views/SnackPages/DietResults.vue'),
    },
    {
      path: '/snackpages/about-you',
      name: 'snackpages-about-you',
      component: () => import('../views/SnackPages/AboutYou.vue'),
    },
    {
      path: '/meals',
      name: 'meals',
      component: () => import('../views/Meals/Meals.vue'),
    },
    {
      path: '/meal-details/:id',
      name: 'meal-details',
      component: () => import('../views/MealDetails/MealDetails[id].vue'),
    },
    {
      path: '/bankhangen',
      name: 'bankhangen',
      component: () => import('../views/Bankhangen/Bankhangen.vue'),
    },
    {
      path: '/life-style',
      name: 'life-style',
      component: () => import('../views/LifeStyle/LifeStyle.vue'),
    },
  ],
})

export default router

