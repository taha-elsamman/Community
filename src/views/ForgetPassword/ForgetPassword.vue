<template>
  <div class="forget-password-container">
    <div class="forget-password-card">
      <h2>Wachtwoord vergeten?</h2>
      <p>Vul je e-mailadres in om een link te ontvangen waarmee je je wachtwoord kunt resetten.</p>
      <form @submit.prevent="onSubmit">
        <input
          v-model="email"
          type="email"
          placeholder="E-mailadres"
          required
          class="forget-password-input"
        />
        <button type="submit" class="forget-password-btn" :disabled="loading">
          {{ loading ? 'Verzenden...' : 'Verzend reset link' }}
        </button>
        <div v-if="success" class="forget-password-success">
          Controleer je e-mail voor verdere instructies.
        </div>
        <div v-if="error" class="forget-password-error">
          {{ errorMsg }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref(false)
const errorMsg = ref('')
const auth = useAuthStore()

async function onSubmit() {
  loading.value = true
  error.value = false
  success.value = false
  errorMsg.value = ''
  try {
    await auth.resetPassword({ email: email.value })
    success.value = true
  } catch {
    error.value = true
    errorMsg.value = 'Er is iets misgegaan. Probeer het opnieuw.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forget-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7fa;
}

.forget-password-card {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(224, 108, 169, 0.08);
  max-width: 370px;
  width: 100%;
  text-align: center;
}

.forget-password-card h2 {
  color: #e06ca9;
  margin-bottom: 0.7rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.forget-password-card p {
  color: #888;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.forget-password-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1.5px dashed #e06ca9;
  border-radius: 8px;
  font-size: 1.05rem;
  margin-bottom: 1.2rem;
  outline: none;
  color: #222;
  background: #fafafd;
  transition: border 0.2s;
}

.forget-password-input:focus {
  border-color: #da2c89;
}

.forget-password-btn {
  width: 100%;
  padding: 0.8rem 0;
  background: #e06ca9;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1rem;
}

.forget-password-btn:disabled {
  background: #f3b3d2;
  cursor: not-allowed;
}

.forget-password-success {
  color: #2ecc71;
  margin-top: 0.5rem;
  font-size: 1.01rem;
}

.forget-password-error {
  color: #e06ca9;
  margin-top: 0.5rem;
  font-size: 1.01rem;
}
</style>
