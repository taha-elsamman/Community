<template>

  <div class="homepage">


    <div class="welcome-container">
      <h1 class="welcome-heading test">
        Hoi <span class="welcome-name">[naam]</span>,
      </h1>
      <div class="welcome-subtext">
        fijn dat je er bent. Klaar om vandaag een stap te zetten richting jouw doel?
      </div>
    </div>


    <div class="welcome-container">
      <h1 class="welcome-heading">
        Stel je even voor <span class="yellow-text">(Na invullen vervangen door De buurt)</span>
      </h1>
      <div class="welcome-subtext">
        Zullen we even kennismaken? Vertel ons wie jij bent en wat je hoopt te bereiken.
      </div>
      <div class="profile-form">
        <div class="profile-left">
          <div class="avatar-wrapper">
            <div class="avatar-circle">
              <img src="/Icons/user (3).png" alt="Logo" width="120" height="120" class="d-inline-block align-text-top" />
              <span class="avatar-camera">
                <img src="/Icons/camera (1).png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top " />
              </span>
            </div>
            <div class="avatar-name">Naam</div>
            <div class="avatar-label">Hoe heet je?</div>
            <input class="avatar-input" type="text" />
          </div>
        </div>
        <div class="profile-right">
          <div class="form-group">
            <label>Wie ben jij in het kort?</label>
            <div class="form-desc">Eén zin over jezelf</div>
            <input class="dashed-input" type="text" />
          </div>
          <div class="form-group">
            <label>Wat brengt je hier?</label>
            <div class="form-desc">
              Denk aan: “Ik wil me weer energiek voelen en leren beter te eten zonder te stressen.”
            </div>
            <input class="dashed-input" type="text" />
          </div>
          <div class="form-group">
            <label>Favoriete gezonde gewoonte:</label>
            <div class="form-desc">
              Wat helpt jou op de been? (Bijv. wandelen na het eten, dagboekje bijhouden, op tijd offline gaan)
            </div>
            <input class="dashed-input" type="text" />
          </div>
          <div class="form-actions">
            <button class="save-btn">Opslaan</button>
          </div>
        </div>
      </div>
    </div>

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
              <img src="/Icons/user (3).png" alt="Logo" width="60" height="60" />
            </div>
            <div class="avatar-name buurt-avatar-name">Naam</div>
            <div class="avatar-label buurt-avatar-label">Houdt van wandelen na het eten</div>
          </div>
        </div>
        <div class="buurt-right">
          <div class="buurt-form-group">
            <label class="buurt-form-label">Wat zet jij op het bord vandaag?</label>
            <div class="buurt-form-desc">
              Deel wat jou bezighoudt, jouw bericht verschijnt meteen in de buurt.
            </div>
            <input class="dashed-input" type="text" />
            <div class="buurt-form-actions">
              <button class="plaats-btn">Plaatsen</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Macro’s berekenen section (added below all existing content) -->
    <div class="macro-section">
      <div class="macro-card">
      <div class="macro-title">Macro’s berekenen</div>
        <div class="macro-header">Even over jou</div>
        <div class="macro-desc">
          Geen zorgen, we slaan niks geks op.<br>
          Dit helpt alleen om een goed startpunt te berekenen.
        </div>
        <div class="macro-squiggle">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" style="display:inline-block;">
            <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12" stroke="#222" stroke-width="2" fill="none"/>
          </svg>
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" style="display:inline-block; margin-left:-4px;">
            <path d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12" stroke="#222" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div class="macro-form">
          <div class="macro-row">
            <div class="macro-col">
              <div class="macro-label macro-label-pink">Wat is jouw geslacht?</div>
              <div class="macro-gender-group">
                <button class="macro-gender-btn">Vrouw</button>
                <button class="macro-gender-btn">Man</button>
              </div>
            </div>
            <div class="macro-col">
              <div class="macro-label macro-label-pink">Wat is jouw leeftijd?</div>
              <div class="macro-input-group">
                <input class="macro-input" type="number" min="0" placeholder="" />
                <span class="macro-input-unit">jaar</span>
              </div>
            </div>
          </div>
          <div class="macro-row">
            <div class="macro-col">
              <div class="macro-label macro-label-pink">Wat is jouw gewicht?</div>
              <div class="macro-input-group">
                <input class="macro-input" type="number" min="0" placeholder="" />
                <span class="macro-input-unit">kg</span>
              </div>
            </div>
            <div class="macro-col">
              <div class="macro-label macro-label-pink">Wat is jouw lengte?</div>
              <div class="macro-input-group">
                <input class="macro-input" type="number" min="0" placeholder="" />
                <span class="macro-input-unit">cm</span>
              </div>
            </div>
          </div>
          <div class="macro-footer">
            <button class="macro-nav macro-nav-prev">Vorige</button>
            <button class="macro-nav macro-nav-next">Volgende</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
// ...existing code...
</script>



<style scoped>
.homepage {
  padding: 5rem 2rem 2rem 2rem;
}

.welcome-container {
  border-radius: 0.5rem;
  max-width: 1100px;
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
  align-items: flex-start; /* Changed from center to flex-start */
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Changed from center to flex-start */
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
  text-align: left;
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
  .avatar-wrapper
  {
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
</style>
