<template>
  <div class="login-bg">
    <div class="login-card">
      <h1 class="login-title">Login</h1>
      <div class="login-welcome">Hey jij,<br />welkom terug!</div>
      <form class="login-form" @submit.prevent="onSubmit">
        <div class="login-group">
          <label for="username" class="login-label">Gebruikersnaam</label>
          <input id="username" type="text" class="login-input" v-model="username" autocomplete="username" />
        </div>
        <div class="login-group">
          <label for="password" class="login-label">Wachtwoord</label>
          <input id="password" type="password" class="login-input" v-model="password" autocomplete="current-password" />
        </div>
        <div class="login-forgot-row">
          <span class="login-forgot-label">Wachtwoord vergeten?</span>
        </div>
        <button type="submit" class="login-btn-handwritten" :disabled="loading">
          {{ loading ? 'Even geduld...' : 'Inloggen' }}
        </button>
        <div v-if="error" class="login-error">{{ errorMsg }}</div>
      </form>
      <div class="login-footer">Nog geen account?
        <span
          class="login-register-label"
          @click="$router.push('/register')"
          style="cursor:pointer;"
        > Meld je hier aan.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(false)
const errorMsg = ref('')
const auth = useAuthStore()
const router = useRouter()

async function onSubmit() {
  loading.value = true
  error.value = false
  errorMsg.value = ''
  try {
    await auth.login({ username: username.value, password: password.value })
    router.push('/')
  } catch  {
    error.value = true
    errorMsg.value = 'Ongeldige gebruikersnaam of wachtwoord.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: none;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
}

.login-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #97b89b;
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  font-weight: 400;
  text-align: center;
}

.login-welcome {
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  margin-bottom: 2.2rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.login-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login-label {
  font-size: 1rem;
  color: #757575;
  font-family: inherit;
  margin-bottom: 0.1rem;
}

.login-input {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  font-size: 1.05rem;
  color: #757575;
  outline: none;
  padding: 0.7rem 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.login-input:focus {
  border-color: #b3c7e6;
}

.login-forgot-row {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 0.7rem;
}

.login-forgot-label {
  color: #888;
  font-size: 1rem;
  font-family: inherit;
}

.login-btn-handwritten {
  margin: 1.2rem auto 0 auto;
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 2rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.2rem 0.7rem;
  transition: color 0.2s;
  display: block;
  text-align: center;
}

.login-btn-handwritten:hover {
  color: #da2c89;
  text-decoration: underline;
}

.login-footer {
  margin-top: 2.5rem;
  text-align: center;
  width: 100%;
  color: #888;
}

.login-register-label {
  color: #888;
  font-size: 1rem;
  font-family: inherit;
}
.login-register-label:hover
{
  color: #da2c89;
  text-decoration:underline;
}

.login-error {
  color: #e06ca9;
  text-align: center;
  margin-top: 0.7rem;
  font-size: 1.05rem;
}

@media (max-width: 600px) {
  .login-card {
    max-width: 98vw;
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    border-radius: 0.7rem;
  }
  .login-title {
    font-size: 1.3rem;
  }
  .login-btn-handwritten {
    font-size: 1.3rem;
  }
}
</style>
