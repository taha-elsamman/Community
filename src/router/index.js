import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('../views/ForgetPassword/ForgetPassword.vue'),
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
    {
      path: '/lifestyle/:id',
      name: 'lifestyle-details',
      component: () => import('../views/LifeStyle/LifeStyleDetails[id].vue'),
    },
    {
      path: '/neighborhood',
      name: 'neighborhood',
      component: () => import('../views/Neighborhood/Neighborhood.vue'),
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/Recipes/Recipes.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const publicPages = ['login', 'register', 'forget-password']
  if (!publicPages.includes(to.name) && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

