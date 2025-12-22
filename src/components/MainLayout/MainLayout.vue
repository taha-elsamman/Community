<template>
	<!-- Hide navbar and sidebar if on login page -->
	<div v-if="!isLoginPage" class="main-layout" :class="{ 'sidebar-closed': !sidebarOpen }">
		<MainNavbar
			:sidebarOpen="sidebarOpen"
			@toggleSidebar="toggleSidebar"
			@closeSidebar="closeSidebar"
			@openSidebar="openSidebar"
			@closeNavbar="closeNavbar"
			@openNavbar="openNavbar"
		>
			<template #burger="{ onBurgerClick }">
				<button class="navbar-toggler" @click="onBurgerClick" aria-label="Toggle sidebar">
					<span class="navbar-toggler-icon"></span>
				</button>
			</template>
		</MainNavbar>
		<div class="layout-body">
			<MainSidebar :open="sidebarOpen" @item-click="handleSidebarItemClick" />
			<main class="layout-content">
				<slot />
			</main>
		</div>
	</div>
	<!-- Only show slot content on login page -->
	<div v-else>
		<slot />
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import MainNavbar from './MainNavbar.vue'
import MainSidebar from './MainSidebar.vue'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login' || route.path === '/register' || route.path === '/forget-password')

const sidebarOpen = ref(true)
const navbarOpen = ref(false)

const handleResize = () => {
	sidebarOpen.value = window.innerWidth > 900
}

function handleSidebarItemClick() {
	if (window.innerWidth < 900) {
		sidebarOpen.value = false
	}
}

function toggleSidebar() {
	sidebarOpen.value = !sidebarOpen.value
}
function closeSidebar() {
	sidebarOpen.value = false
}
function openSidebar() {
	sidebarOpen.value = true
}
function closeNavbar() {
	navbarOpen.value = false
}
function openNavbar() {
	navbarOpen.value = true
}

onMounted(() => {
	handleResize()
	window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.main-layout {
	background-color: #fff;
	width: 100%;
	min-height: 100vh;
	padding-top: 64px; /* Height of navbar */
}

.layout-body {
  font-family: 'Indie Flower', cursive;
	/* Remove flex, let sidebar be fixed */
}

.layout-content {
	min-height: calc(100vh - 64px); /* Adjust 64px if navbar height changes */
	background: #fff;
	margin-left: 220px; /* Width of sidebar */
}
body {
  font-family: 'Indie Flower', cursive;
}



@media (max-width: 900px) {
  .burger-btn {
    display: inline-block;
  }
  .main-layout.sidebar-closed .layout-content {
    margin-left: 0 !important;
  }
}
</style>
