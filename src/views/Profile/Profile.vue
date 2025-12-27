<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="profile-page">
    <div class="welcome-container">
      <h1 class="welcome-heading">Stel je even voor</h1>
      <div class="welcome-subtext">
        Zullen we even kennismaken? Vertel ons wie jij bent en wat je hoopt te bereiken.
      </div>
      <div class="profile-form">
        <div class="profile-left">
          <div class="avatar-wrapper">
            <div class="avatar-circle">
              <img :src="profileImageUrl" alt="Logo" width="120" height="120"
                class="d-inline-block align-text-top avatar-circle-img" />
              <span class="avatar-camera" @click="isEditing && triggerFileInput()"
                :style="{ cursor: isEditing ? 'pointer' : 'not-allowed', opacity: isEditing ? 1 : 0.5 }">
                <img src="/Icons/camera (1).png" alt="Logo" width="30" height="30"
                  class="d-inline-block align-text-top" />
                <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onProfileImageChange"
                  :disabled="!isEditing" />
              </span>
            </div>
            <div class="avatar-name">Naam</div>
            <div class="avatar-label">Hoe heet je?</div>
            <input class="avatar-input" type="text" v-model="inputFirstName" :disabled="!isEditing" />
          </div>
        </div>
        <div class="profile-right">
          <div class="form-group">
            <label>Wie ben jij in het kort?</label>
            <div class="form-desc">Eén zin over jezelf</div>
            <input class="dashed-input" type="text" v-model="inputBio" :disabled="!isEditing" />
          </div>
          <div class="form-group">
            <label>Wat brengt je hier?</label>
            <div class="form-desc">
              Denk aan: “Ik wil me weer energiek voelen en leren beter te eten zonder te stressen.”
            </div>
            <input class="dashed-input" type="text" v-model="inputReason" :disabled="!isEditing" />
          </div>
          <div class="form-group">
            <label>Favoriete gezonde gewoonte:</label>
            <div class="form-desc">
              Wat helpt jou op de been? (Bijv. wandelen na het eten, dagboekje bijhouden, op tijd offline gaan)
            </div>
            <input class="dashed-input" type="text" v-model="inputFavoriteHealthyHabit" :disabled="!isEditing" />
          </div>
          <div class="form-actions">
            <button v-if="!isEditing" class="save-btn" @click="isEditing = true">Edit</button>
            <button v-else class="save-btn" @click="saveProfile">Opslaan</button>
            <div v-if="showSavedPopup" class="saved-popup">
              Je gegevens zijn opgeslagen!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const first_name = ref('Naam')
const last_name = ref('')
const user_name = ref('Naam')
const profileImageUrl = ref('/Icons/user (3).png')
const fileInput = ref(null)

const inputFirstName = ref('')
const inputBio = ref('')
const inputReason = ref('')
const inputFavoriteHealthyHabit = ref('')

const showSavedPopup = ref(false)
const isEditing = ref(true) // default true, will be set after fetch

function updateUserFields() {
  const user = authStore.user || {}
  first_name.value = user.first_name || 'Naam'
  last_name.value = user.last_name || ''
  user_name.value = (user.first_name || user.last_name)
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
    : 'Naam'
  if (user.profile_photo) {
    profileImageUrl.value = user.profile_photo
  }
  inputFirstName.value = user.first_name ?? ''
  inputBio.value = user.profile?.bio ?? ''
  inputReason.value = user.profile?.reason_for_joining ?? ''
  inputFavoriteHealthyHabit.value = user.profile?.favorite_healthy_habit ?? ''
  // Disable editing if first_name is not empty, else enable
  isEditing.value = !user.first_name
}

watch(
  () => authStore.user,
  () => updateUserFields(),
  { immediate: true, deep: true }
)

function triggerFileInput() {
  if (isEditing.value && fileInput.value) fileInput.value.click()
}

function onProfileImageChange(event) {
  const file = event.target.files && event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      profileImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

async function saveProfile() {
  try {
    const payload = {
      first_name: inputFirstName.value,
      profile: {
        bio: inputBio.value,
        reason_for_joining: inputReason.value,
        favorite_healthy_habit: inputFavoriteHealthyHabit.value
      }
    }
    if (fileInput.value && fileInput.value.files && fileInput.value.files[0]) {
      const formData = new FormData()
      formData.append('first_name', inputFirstName.value)
      formData.append('bio', inputBio.value)
      formData.append('reason_for_joining', inputReason.value)
      formData.append('favorite_healthy_habit', inputFavoriteHealthyHabit.value)
      formData.append('profile_photo', fileInput.value.files[0])
      await authStore.partialUpdateMe(formData)
    } else {
      await authStore.partialUpdateMe(payload)
    }
    await authStore.fetchMe()
    updateUserFields()
    showSavedPopup.value = true
    isEditing.value = false
    setTimeout(() => {
      showSavedPopup.value = false
    }, 2000)
  } catch {
    alert('Opslaan mislukt')
  }
}

onMounted(async () => {
  await authStore.fetchMe()
  updateUserFields()
})
</script>

<style scoped>
.profile-page {
  padding: 5rem 4rem 2rem 2rem;
  max-width: 1200px;
}

.welcome-container {
  border-radius: 0.5rem;
  margin: 0 auto 0 2rem;
}

.welcome-heading {
  font-size: 2.1rem;
  font-weight: 400;
  color: #8ebc8b;
  margin-bottom: 0.2rem;
  font-family: 'Indie Flower', cursive, sans-serif;
}

.welcome-subtext {
  font-size: 1.15rem;
  color: #757575;
  margin-bottom: 2.5rem;
  margin-top: 0.2rem;
}

.profile-form {
  display: flex;
  gap: 2.5rem;
  margin-top: 1.5rem;
}

.profile-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-camera {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #fff;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 0 4px #f2c2d7;
}

.avatar-name {
  margin-top: 1.2rem;
  font-size: 1.1rem;
  color: #757575;
  font-family: 'Indie Flower', cursive, sans-serif;
  letter-spacing: 0.5px;
}

.avatar-label {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #bdbdbd;
  margin-bottom: 0.2rem;
}

.avatar-input {
  width: 180px;
  border: none;
  border-bottom: 2px dashed #f2c2d7;
  background: transparent;
  font-size: 1.1rem;
  color: #757575;
  outline: none;
  margin-top: 0.2rem;
  padding: 0.3rem 0;
  text-align: center;
}

.avatar-input:disabled,
.dashed-input:disabled {
  color: #bdbdbd !important;
  background: #fafafa;
  cursor: not-allowed;
}

.profile-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}

.form-group label {
  font-size: 1.1rem;
  color: #757575;
  font-weight: 400;
  margin-bottom: 0.2rem;
  display: block;
}

.form-desc {
  font-size: 0.97rem;
  color: #bdbdbd;
  margin-bottom: 0.4rem;
  margin-top: 0.1rem;
}

.dashed-input,
.avatar-input {
  width: 100%;
  border: none;
  border-bottom: 2px dashed #f2c2d7;
  background: transparent;
  font-size: 1.1rem;
  color: #757575;
  outline: none;
  padding: 0.3rem 0;
  border-radius: 0 0 12px 12px;
  transition: border-color 0.2s;
}

.dashed-input:focus,
.avatar-input:focus {
  border-bottom: 2px dashed #e06ca9;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.save-btn {
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.05rem;
  font-family: inherit;
  cursor: pointer;
  padding: 0.2rem 0.7rem;
  transition: color 0.2s;
}

.save-btn:hover {
  color: #f2c2d7;
  text-decoration: underline;
}

.saved-popup {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #e06ca9;
  color: #fff;
  padding: 0.7rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-family: inherit;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  animation: fadeInOut 2s linear;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.avatar-circle-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

@media (max-width: 900px) {
  .profile-page {
    padding: 2rem 1rem 1.5rem 1rem;
  }

  .welcome-container {
    margin: 0 1rem;
    max-width: 100%;
    padding: 2rem 1rem 1.5rem 1rem;
  }

  .profile-form {
    flex-direction: column;
    gap: 1.5rem;
  }

  .profile-left {
    align-items: center !important;
    width: 100%;
    min-width: 0;
  }

  .profile-right {
    width: 100%;
  }

  .avatar-circle {
    margin: 0 auto;
  }

  .yellow-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .profile-page {
    padding-top: 1rem;
  }

  .welcome-container {
    padding: 2rem 0.5rem 1rem 0.5rem;
    margin: 0 0.2rem;
    border-radius: 0.5rem;
  }

  .welcome-heading {
    font-size: 1.2rem;
  }

  .profile-form {
    flex-direction: column;
    gap: 1rem;
  }

  .profile-left {
    align-items: center !important;
    width: 100%;
    min-width: 0;
  }

  .profile-right {
    width: 100%;
  }

  .avatar-circle {
    margin: 0 auto;
  }

  .avatar-wrapper {
    width: 100%;
    margin-bottom: 20px;
  }

  .avatar-circle-img {
    width: 90px;
    height: 90px;
  }

  .yellow-text {
    font-size: 1rem;
  }
}

@media (max-width: 400px) {
  .welcome-container {
    padding: 0.5rem 0.1rem 0.5rem 0.1rem;
    margin: 0;
  }

  .welcome-heading {
    font-size: 1rem;
  }
}
</style>
