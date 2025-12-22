<template>
  <div class="register-bg">
    <div class="register-card">
      <h1 class="register-title">Registreren</h1>
      <div class="register-welcome">Welkom! Maak je account aan.</div>
      <form class="register-form" @submit.prevent="onSubmit">
        <div class="register-group">
          <label for="firstName" class="register-label">Voornaam</label>
          <input id="firstName" type="text" class="register-input" v-model="firstName" required />
        </div>
        <div class="register-group">
          <label for="lastName" class="register-label">Achternaam</label>
          <input id="lastName" type="text" class="register-input" v-model="lastName" required />
        </div>
        <div class="register-group">
          <label for="email" class="register-label">E-mailadres</label>
          <input id="email" type="email" class="register-input" v-model="email" required />
        </div>
        <div class="register-group">
          <label for="password" class="register-label">Wachtwoord</label>
          <input id="password" type="password" class="register-input" v-model="password" required autocomplete="new-password" />
        </div>
        <div class="register-group">
          <label for="repassword" class="register-label">Herhaal wachtwoord</label>
          <input id="repassword" type="password" class="register-input" v-model="repassword" required autocomplete="new-password" />
        </div>
        <button type="submit" class="register-btn-handwritten" :disabled="loading">
          {{ loading ? 'Even geduld...' : 'Registreren' }}
        </button>
        <div v-if="error" class="register-error">{{ errorMsg.substring(0, 100) }}</div>
        <div v-if="success" class="register-success">Registratie gelukt! Je kunt nu inloggen.</div>
      </form>
      <div class="register-footer">
        Al een account?
        <span
          class="register-login-label"
          @click="$router.push('/login')"
          style="cursor:pointer;"
        >Log hier in.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const repassword = ref('')
const loading = ref(false)
const error = ref(false)
const errorMsg = ref('')
const success = ref(false)
const auth = useAuthStore()

async function onSubmit() {
  error.value = false
  errorMsg.value = ''
  success.value = false

  if (password.value !== repassword.value) {
    error.value = true
    errorMsg.value = 'Wachtwoorden komen niet overeen.'
    return
  }

  loading.value = true
  try {
    await auth.createUser({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      re_password: repassword.value
    })
    success.value = true
  } catch (e) {
    error.value = true
    // Try to extract error message from API response
    if (e?.response?.data) {
      const data = e.response.data
      errorMsg.value = Object.values(data).flat().join(' ') || 'Registratie mislukt.'
    } else {
      errorMsg.value = 'Registratie mislukt.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-bg {
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-card {
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

.register-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #97b89b;
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  font-weight: 400;
  text-align: center;
}

.register-welcome {
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  margin-bottom: 2.2rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.register-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.register-label {
  font-size: 1rem;
  color: #757575;
  font-family: inherit;
  margin-bottom: 0.1rem;
}

.register-input {
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

.register-input:focus {
  border-color: #b3c7e6;
}

.register-btn-handwritten {
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

.register-btn-handwritten:disabled {
  color: #f3b3d2;
  cursor: not-allowed;
}

.register-btn-handwritten:hover:enabled {
  color: #da2c89;
  text-decoration: underline;
}

.register-footer {
  margin-top: 2.5rem;
  text-align: center;
  width: 100%;
  color: #888;
}

.register-login-label {
  color: #888;
  font-size: 1rem;
  font-family: inherit;
}
.register-login-label:hover {
  color: #da2c89;
  text-decoration: underline;
}

.register-error {
  color: #e06ca9;
  text-align: center;
  margin-top: 0.7rem;
  font-size: 1.05rem;
}

.register-success {
  color: #2ecc71;
  text-align: center;
  margin-top: 0.7rem;
  font-size: 1.05rem;
}

@media (max-width: 600px) {
  .register-card {
    max-width: 98vw;
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    border-radius: 0.7rem;
  }
  .register-title {
    font-size: 1.3rem;
  }
  .register-btn-handwritten {
    font-size: 1.3rem;
  }
}
</style>
