<template>
  <div class="register-bg">
    <div class="register-card">
      <div class="register-logo-row">
        <img src="/Projectlifetyle_Logo.webp" alt="Project Lifestyle Logo" class="register-logo-big" />
        <div class="register-content">
          <span class="register-logo-text center-logo-text">Project Lifestyle</span>
          <h1 class="register-title center-register-title">Registreren</h1>
          <form class="register-form">
            <div class="register-group">
              <label for="name" class="register-label">Naam</label>
              <input id="name" type="text" class="register-input" placeholder="Voer je naam in" />
            </div>
            <div class="register-group">
              <label for="email" class="register-label">E-mail</label>
              <input id="email" type="email" class="register-input" placeholder="Voer je e-mail in" />
            </div>
            <div class="register-group">
              <label for="password" class="register-label">Wachtwoord</label>
              <input id="password" type="password" class="register-input" placeholder="Voer je wachtwoord in" />
            </div>
            <div class="register-group">
              <label for="confirm" class="register-label">Bevestig wachtwoord</label>
              <input id="confirm" type="password" class="register-input" placeholder="Bevestig je wachtwoord" />
            </div>
            <button type="submit" class="register-btn">Registreren</button>
          </form>
          <div class="register-footer">
            <span>Heb je al een account?</span>
            <a href="/login" class="register-link">Inloggen</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic for now
</script>

<style scoped>
.register-bg {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-card {
  background: #ffffff;
  border-radius: 1.2rem;
  box-shadow: 0 12px 24px 0 rgba(60,60,60,0.06);
  padding: 3.5rem 2.5rem 2.5rem 2.5rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px #e0e0e0;
}

.register-logo-row {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 2.5rem;
}

.register-logo-big {
  width: 500px;
  height: 500px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #fff;
  margin-bottom: 0;
}

.register-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.register-logo-text {
  font-family: 'Indie Flower', cursive, sans-serif;
  font-size: 1.7rem;
  color: #9bb89c;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.center-logo-text {
  display: block;
  width: 100%;
  text-align: center;
}

.register-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #8ebc8b;
  font-size: 2rem;
  margin-bottom: 2.2rem;
  font-weight: 400;
}

.center-register-title {
  width: 100%;
  text-align: center;
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}

.register-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.register-label {
  font-size: 1.05rem;
  color: #757575;
  font-family: inherit;
}

.register-input {
  width: 100%;
  border: none;
  border-bottom: 2px dashed #e06ca9;
  background: transparent;
  font-size: 1.1rem;
  color: #757575;
  outline: none;
  padding: 0.3rem 0;
  border-radius: 0 0 12px 12px;
  transition: border-color 0.2s;
  font-family: inherit;
}

.register-input:focus {
  border-bottom: 2px dashed #e06ca9;
}

.register-btn {
  margin-top: 1.2rem;
  width: 100%;
  background: #e06ca9;
  border: none;
  color: #fff;
  font-size: 1.15rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  transition: color 0.2s, background 0.2s;
  font-weight: 500;
}

.register-btn:hover {
  color: #fff;
  background: #da2c89;
  border: solid 0px #e06ca9;
}


.register-footer {
  margin-top: 1.5rem;
  text-align: center;
  width: 100%;
  font-size: 1rem;
  color: #757575;
}

.register-link {
  color: #e06ca9;
  font-size: 1rem;
  text-decoration: none;
  font-family: inherit;
  margin-left: 0.5rem;
  transition: color 0.2s;
}

.register-link:hover {
  text-decoration: underline;
  color: #f2c2d7;
}

@media (max-width: 900px) {
  .register-card {
    max-width: 98vw;
    padding: 2rem 1rem 1.5rem 1rem;
  }
  .register-logo-row {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .register-logo-big {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 600px) {
  .register-card {
    max-width: 100vw;
    padding: 1rem 0.5rem 1rem 0.5rem;
    border-radius: 0.7rem;
  }
  .register-logo-big {
    width: 120px;
    height: 120px;
  }
  .register-title,
  .register-logo-text {
    font-size: 1.2rem;
  }
}

@media (max-width: 400px) {
  .register-card {
    padding: 0.5rem 0.1rem 0.5rem 0.1rem;
  }
  .register-logo-big {
    width: 70px;
    height: 70px;
  }
}
</style>
