<template>
	<div class="main-layout" :class="{ 'sidebar-closed': !sidebarOpen }">
		<MainNavbar>
			<template #burger>
				<button class="navbar-toggler" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle sidebar">
					<span class="navbar-toggler-icon"></span>
				</button>
			</template>
		</MainNavbar>
		<div class="layout-body">
			<MainSidebar :open="sidebarOpen" />
			<main class="layout-content">
				<slot />
			</main>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainNavbar from './MainNavbar.vue';
import MainSidebar from './MainSidebar.vue';

const sidebarOpen = ref(true);

const handleResize = () => {
	sidebarOpen.value = window.innerWidth > 900;
};

onMounted(() => {
	handleResize();
	window.addEventListener('resize', handleResize);
});
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
