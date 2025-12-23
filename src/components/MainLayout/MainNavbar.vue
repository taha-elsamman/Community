<template>
  <nav class="navbar navbar-expand-lg fixed-top bg-white">
    <div class="container-fluid">
      <slot name="burger" :onBurgerClick="handleBurgerClick"></slot>
      <a class="navbar-brand" href="/">
        <img src="/Projectlifetyle_Logo.png" alt="Logo" width="70" height="70" class="d-inline-block align-text-top ms-5" />
      </a>
      <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ms-md-5" :class="{ show: navbarOpen }" id="navbarSupportedContent">
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              NL
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">EN</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <img src="/Icons/conversation (1).png" alt="" width="30" height="30" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <img src="/Icons/bell.png" alt="" width="30" height="30" />
            </a>
          </li>
          <li class="nav-item profile-dropdown">
            <a class="nav-link" href="#" @click.prevent="toggleProfileDropdown">
              <img :src="profilePhoto" alt="" width="30" height="30" class="navbar-profile-img" />
            </a>
            <div v-if="showProfileDropdown" class="profile-dropdown-menu">
              <div class="profile-dropdown-header">
                <img :src="profilePhoto" alt="profile" class="profile-dropdown-avatar" />
              </div>
              <ul class="profile-dropdown-list">
                <li @click="goTo('keukentafel')">Mijn keukentafel</li>
                <li @click="goTo('koelkast')">Mijn koelkast</li>
                <li @click="goTo('profiel')">Mijn profiel</li>
                <hr />
                <li @click.prevent="handleLogout">De voordeur uit</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const profilePhoto = ref('')
const showProfileDropdown = ref(false)
const router = useRouter()

onMounted(async () => {
  await authStore.fetchMe()
  profilePhoto.value = authStore.user['profile_photo']  || '/Icons/user (3).png'
})

function toggleProfileDropdown() {
  showProfileDropdown.value = !showProfileDropdown.value
}

function goTo(page) {
  showProfileDropdown.value = false
  // Replace with actual routes
  if (page === 'keukentafel') router.push('/keukentafel')
  else if (page === 'koelkast') router.push('/koelkast')
  else if (page === 'profiel') router.push('/profile')
  else if (page === 'voordeur') router.push('/voordeur-uit')
}

const emits = defineEmits(['toggleSidebar', 'closeSidebar', 'closeNavbar', 'openSidebar', 'openNavbar']);
const props = defineProps({
  sidebarOpen: Boolean
});

const navbarOpen = ref(false);
const auth = useAuthStore()

function toggleNavbar() {
  if (props.sidebarOpen) {
    emits('closeSidebar');
    setTimeout(() => {
      navbarOpen.value = !navbarOpen.value;
      if (navbarOpen.value) emits('openNavbar');
      else emits('closeNavbar');
    }, 200);
  } else {
    navbarOpen.value = !navbarOpen.value;
    if (navbarOpen.value) emits('openNavbar');
    else emits('closeNavbar');
  }
}

function handleBurgerClick() {
  if (navbarOpen.value) {
    navbarOpen.value = false;
    emits('closeNavbar');
    setTimeout(() => {
      emits('toggleSidebar');
    }, 200);
  } else {
    emits('toggleSidebar');
  }
}

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}
</script>

<style>
.navbar {
  font-family: 'Indie Flower', cursive;
}
.navbar-toggler {
  border: none !important;
}
.navbar-profile-img {
  border-radius: 50%;
  object-fit: cover;
  width: 30px;
  height: 30px;
  background: #eee;
}
.profile-dropdown {
  position: relative;
}
.profile-dropdown-menu {
  position: absolute;
  top: 45px;
  right: 0;
  min-width: 180px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  z-index: 999;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.profile-dropdown-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2rem;
  width: 100%;
}
.profile-dropdown-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}
.profile-dropdown-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
.profile-dropdown-list li {
  font-size: 1rem;
  color: #222;
  padding: 0.7rem 0;
  cursor: pointer;
  transition: color 0.2s;
  font-family: inherit;
}
.profile-dropdown-list li:hover {
  color: #e06ca9;
}
.profile-dropdown-list hr {
  border: none;
  border-top: 1px solid #888;
  margin: 0.2rem 0;
}

/* Responsive: adjust dropdown for small screens */
@media (max-width: 992px) {
  .profile-dropdown-menu {
    top: 40px;
    right: 0;
    left: auto;
    min-width: 90vw;
    max-width: 98vw;
    padding: 1rem 0.5rem;
    border-radius: 12px;
    font-size: 0.98rem;
    align-items: stretch;
  }
  .profile-dropdown-avatar {
    width: 48px;
    height: 48px;
  }
  .profile-dropdown-list li {
    font-size: 0.98rem;
    padding: 0.6rem 0;
  }
}
</style>
