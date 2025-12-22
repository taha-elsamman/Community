// ...existing code...
<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import MainLayout from './components/MainLayout/MainLayout.vue'

const router = useRouter()
const ready = ref(false)

onMounted(async () => {
  await router.isReady()
  ready.value = true
})
</script>

<template>
  <div v-if="!ready"></div>
  <div v-else>
    <MainLayout>
      <RouterView />
    </MainLayout>
  </div>
</template>
