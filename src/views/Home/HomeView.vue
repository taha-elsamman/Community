<template>

  <div class="homepage">


    <div class="welcome-container">
      <h1 class="welcome-heading test">
        Hoi <span class="welcome-name">{{ first_name }}</span>,
      </h1>
      <div class="welcome-subtext">
        fijn dat je er bent. Klaar om vandaag een stap te zetten richting jouw doel?
      </div>
    </div>

    <Profile v-if="!first_name || first_name === 'Naam'" />


    <!-- De buurt section (added below existing content) -->
    <div class="buurt-section">
      <div class="buurt-header-row">
        <h1 class="buurt-heading">De buurt</h1>
        <a class="buurt-link" href="#">Bekijk de buurt</a>
      </div>
      <div class="buurt-form-row">
        <div class="buurt-left">
          <div class="avatar-wrapper">
            <div class="avatar-circle buurt-avatar">
              <img :src="profileImageUrl" alt="Logo" width="60" height="60" />
            </div>
            <div class="avatar-name buurt-avatar-name">{{ first_name }}</div>
            <div class="avatar-label buurt-avatar-label">{{ status }}</div>
          </div>
        </div>
        <div class="buurt-right">
          <div class="buurt-form-group">
            <label class="buurt-form-label">Wat zet jij op het bord vandaag?</label>
            <div class="buurt-form-desc">
              Deel wat jou bezighoudt, jouw bericht verschijnt meteen in de buurt.
            </div>
            <NeighborhoodCommentBox :hideVraag="true" ref="writeCommentBoxRef" />
          </div>
        </div>
      </div>
    </div>

    <!-- Macro’s berekenen section (added below all existing content) -->
    <div class="macro-section">
      <div class="macro-title mb-5">Macro’s berekenen</div>

      <AboutYou />

    </div>
  </div>
</template>


<script setup>
// ...existing code...
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AboutYou from '../SnackPages/AboutYou.vue'
import Profile from '../Profile/Profile.vue'
import NeighborhoodCommentBox from '@/components/NeighborhoodCommentBox.vue'
const authStore = useAuthStore()

const first_name = ref('Naam')
const last_name = ref('')
const user_name = ref('Naam')
const status = ref('')
const dailyStatus = ref('')
const profileImageUrl = ref('/Icons/user (3).png')

const inputFirstName = ref('')
const inputBio = ref('')
const inputReason = ref('')
const inputFavoriteHealthyHabit = ref('')


// Set initial values safely (in case user is not loaded yet)
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
  status.value = user.profile?.favorite_healthy_habit ?? ''
  dailyStatus.value = user.profile?.daily_status ?? ''
}

// Watch for changes in authStore.user (in case it's loaded async)
watch(
  () => authStore.user,
  () => updateUserFields(),
  { immediate: true, deep: true }
)

onMounted(async () => {
  await authStore.fetchMe()
  updateUserFields()
})

</script>

<style scoped>
.homepage {
  padding: 5rem 2rem 2rem 2rem;
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

.yellow-text {
  color: #f7c948;
  font-size: 2rem;
  font-family: inherit;
  font-weight: 400;
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
  /* Changed from center to flex-start */
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Changed from center to flex-start */
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
.avatar-input,
.buurt-dashed-input {
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
.avatar-input:focus,
.buurt-dashed-input:focus {
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

.buurt-section {
  background: #fff;
  border-radius: 0.5rem;
  max-width: 1100px;
  margin: 4rem auto 0 2rem;
  padding: 2.5rem 2rem 2rem 2rem;
  box-shadow: none;
}

.buurt-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.buurt-heading {
  font-size: 2.1rem;
  font-weight: 400;
  color: #8ebc8b;
  font-family: 'Indie Flower', cursive, sans-serif;
}

.buurt-link {
  color: #e06ca9;
  font-size: 1rem;
  text-decoration: none;
  font-family: 'Indie Flower', cursive, sans-serif;
  transition: color 0.2s;
  margin-top: 0.5rem;
}

.buurt-link:hover {
  text-decoration: underline;
  color: #f2c2d7;
}

.buurt-form-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 1.5rem;
}

.buurt-left {
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.buurt-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #f2c2d7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.buurt-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.buurt-avatar-name {
  margin-top: 0.2rem;
  font-size: 1rem;
  color: #757575;
  font-family: 'Indie Flower', cursive, sans-serif;
  letter-spacing: 0.5px;
  text-align: left;
}

.buurt-avatar-label {
  margin-top: 0.1rem;
  font-size: 0.95rem;
  color: #757575;
  text-align: center;
  max-width: 90px;
  word-break: break-word;
}

.buurt-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.buurt-form-group {
  width: 100%;
}

.buurt-form-label {
  font-size: 1.25rem;
  color: #444;
  font-weight: 400;
  margin-bottom: 0.2rem;
  display: block;
  font-family: inherit;
}

.buurt-form-desc {
  font-size: 1rem;
  color: #757575;
  margin-bottom: 1.2rem;
  margin-top: 0.1rem;
  font-family: inherit;
}

.buurt-dashed-input {
  width: 100%;
  border: none;
  border-bottom: 2px dashed #f2c2d7;
  background: transparent;
  font-size: 1.1rem;
  color: #757575;
  outline: none;
  padding: 0.3rem 0;
  margin-bottom: 0.5rem;
  border-radius: 8px 8px 0 0;
  transition: border-color 0.2s;
}

.buurt-dashed-input:focus {
  border-bottom: 2px dashed #e06ca9;
}

.buurt-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.plaats-btn {
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.05rem;
  font-family: inherit;
  cursor: pointer;
  padding: 0.2rem 0.7rem;
  transition: color 0.2s;
}

.plaats-btn:hover {
  color: #f2c2d7;
  text-decoration: underline;
}

.macro-section {
  margin: 4rem auto 0 2rem;
  max-width: 1100px;
  padding-bottom: 4rem;
}

.macro-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #8ebc8b;
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
  margin-left: 0;
  text-align: left;
  /* Remove extra spacing if any */
}

.macro-card {
  background: #fff;
  border-radius: 0.5rem;
  padding: 2.5rem 2rem 2rem 2rem;
  box-shadow: none;
  text-align: center;
}

.macro-header {
  font-size: 2.2rem;
  color: #222;
  font-family: inherit;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.macro-desc {
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.macro-squiggle {
  margin: 0.8rem 0 2.2rem 0;
  display: flex;
  justify-content: center;
}

.macro-form {
  width: 100%;
  margin: 0 auto;
}

.macro-row {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-bottom: 2.2rem;
}

.macro-col {
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.macro-label {
  font-size: 1.15rem;
  margin-bottom: 1.2rem;
  font-family: inherit;
  font-weight: 400;
}

.macro-label-pink {
  color: #e06ca9;
}

.macro-gender-group {
  display: flex;
  gap: 2.5rem;
}

.macro-gender-btn {
  background: none;
  border: none;
  color: #222;
  font-size: 1.2rem;
  font-family: inherit;
  cursor: pointer;
  border-bottom: 2px dashed #f2c2d7;
  padding: 0.2rem 2.2rem 0.2rem 2.2rem;
  margin-bottom: 0.5rem;
  border-radius: 0 0 12px 12px;
  transition: background 0.2s, color 0.2s;
}

.macro-gender-btn:hover,
.macro-gender-btn.active {
  background: #f9e6f1;
  color: #e06ca9;
}

.macro-input-group {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.macro-input {
  border: none;
  border-bottom: 2px dashed #f2c2d7;
  background: transparent;
  font-size: 1.2rem;
  color: #222;
  outline: none;
  width: 90px;
  text-align: center;
  padding: 0.2rem 0;
  border-radius: 0 0 12px 12px;
  transition: border-color 0.2s;
}

.macro-input:focus {
  border-bottom: 2px dashed #e06ca9;
}

.macro-input-unit {
  color: black;
  font-size: 1.1rem;
  margin-left: 0.2rem;
}

.macro-footer {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2.5rem;
  padding: 0 2rem;
}

.macro-nav {
  background: none;
  border: none;
  font-family: 'Indie Flower', cursive, sans-serif;
  font-size: 1rem;
  color: #e06ca9;
  cursor: pointer;
  transition: color 0.2s;
}

.macro-nav:hover {
  color: #f2c2d7;
  text-decoration: underline;
}

.welcome-container,
.buurt-section,
.macro-section {
  /* Add responsive max-width and margin */
  max-width: 1100px;
  margin-left: 2rem;
  margin-right: auto;
  box-sizing: border-box;
}

@media (max-width: 900px) {

  .welcome-container,
  .buurt-section,
  .macro-section {
    margin: 0 1rem;
    max-width: 100%;
    padding: 2rem 1rem 1.5rem 1rem;
  }

  .profile-form,
  .buurt-form-row,
  .macro-row {
    flex-direction: column;
    gap: 1.5rem;
  }

  .profile-left,
  .buurt-left,
  .macro-col {
    align-items: center !important;
    width: 100%;
    min-width: 0;
  }

  .profile-right,
  .buurt-right {
    width: 100%;
  }

  .avatar-circle,
  .buurt-avatar {
    margin: 0 auto;
  }

  .yellow-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .homepage {
    padding-top: 1rem;
  }

  .welcome-container,
  .buurt-section,
  .macro-section {
    padding: 2rem 0.5rem 1rem 0.5rem;
    margin: 0 0.2rem;
    border-radius: 0.5rem;
  }

  .welcome-heading,
  .buurt-heading,
  .macro-title {
    font-size: 1.2rem;
  }

  .macro-header {
    font-size: 1.1rem;
  }

  .profile-form,
  .buurt-form-row,
  .macro-row {
    flex-direction: column;
    gap: 1rem;
  }

  .profile-left,
  .buurt-left,
  .macro-col {
    align-items: center !important;
    width: 100%;
    min-width: 0;
  }

  .profile-right,
  .buurt-right {
    width: 100%;
  }

  .avatar-circle,
  .buurt-avatar {
    margin: 0 auto;
  }

  .macro-card {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
  }

  .macro-squiggle svg {
    width: 80px !important;
    height: 16px !important;
  }

  .yellow-text {
    font-size: 1rem;
  }

  .avatar-wrapper {
    width: 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 400px) {

  .welcome-container,
  .buurt-section,
  .macro-section {
    padding: 0.5rem 0.1rem 0.5rem 0.1rem;
    margin: 0;
  }

  .macro-title {
    font-size: 1rem;
  }
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
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  z-index: 9999;
  animation: fadeInOut 2s linear;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}

.avatar-circle-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
</style>
