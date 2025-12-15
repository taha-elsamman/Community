<template>
	<aside class="main-sidebar" :class="{ closed: !open }">
		<ul class="sidebar-nav">
			<li>
				<router-link to="/" class="sidebar-link">De voordeur</router-link>
			</li>
			<li>
				<router-link to="/koelkastpraat" class="sidebar-link">Koelkastpraat</router-link>
			</li>
			<li><a href="#">Bankhangen</a></li>
			<li><a href="#">De keukentafel</a></li>
			<li><a href="#">De wasmand</a></li>
			<li><a href="#">De boodschappenlijst</a></li>
			<li><a href="#">Lifestyle tips</a></li>
		</ul>
	</aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  open: {
    type: Boolean,
    default: true
  }
});
// Sidebar logic (if needed)
</script>

<style scoped>
.main-sidebar {
	position: fixed;
	top: 90px; /* Height of the navbar */
	left: 0;
	width: 220px;
	height: calc(100vh - 64px); /* Adjust if navbar height changes */
	border-right: 1px solid #e0e0e0;
	padding-top: 1rem;
	display: flex;
	flex-direction: column;
  background-color: #fff;
  padding-top: 50px;
  transition: transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
  z-index: 2000;
}
.main-sidebar.closed {
  transform: translateX(-100%);
  box-shadow: none;
}
@media (max-width: 900px) {
  .main-sidebar {
    box-shadow: 2px 0 16px 0 rgba(60,60,60,0.08);
  }
}

.sidebar-nav {
	list-style: none;
	padding: 0;
	margin: 0;
  padding-left: 20px;
}

.sidebar-nav li {
	margin-bottom: 1rem;
}

.sidebar-nav a {
	text-decoration: none;
	color: #333;
	font-weight: 500;
	padding: 0.5rem 1rem;
	display: block;
	border-radius: 4px;
	transition: background 0.2s;
}

.sidebar-nav a:hover {
  background: #f0f0f0;
}

.sidebar-link {
	text-decoration: none;
	color: #333;
	font-weight: 500;
	padding: 0.5rem 1rem;
	display: block;
	border-radius: 4px;
	transition: background 0.2s;
}
.sidebar-link:hover {
	background: #f0f0f0;
}

</style>
