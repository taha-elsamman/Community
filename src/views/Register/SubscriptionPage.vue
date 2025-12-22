<template>
  <div class="register-bg">
    <div class="register-card">
      <h1 class="register-title">Kies jouw abonnement</h1>
      <div class="register-desc">
        Je kiest eerst je abonnement.<br>
        Daarna maak je een account aan en rond je de betaling af.
      </div>
      <div class="register-content-row">
        <div class="register-left">
          <img src="/Icons/Webp/Snack.webp" alt="Snack Icon" class="register-snack-icon" />
          <div class="register-snack-title">Snack</div>
          <div class="register-snack-subtitle">
            Voor als je hoofd druk is<br>
            en je even steun nodig hebt.
          </div>
          <div class="register-snack-desc px-5">
            Dit is je instap.<br>
            Je hoeft niets te bewijzen. Je hoeft nergens in te stappen. Je leest mee. Je herkent jezelf. Dat alleen al geeft rust.
          </div>
          <button class="register-snack-btn">Kies snack</button>
        </div>
        <div class="register-right">
          <div class="register-what-title">Wat je krijgt</div>
          <ul class="register-what-list">
            <li> • Toegang tot de community</li>
            <li> • Gesprekken over trek, snaaibuien en onrust</li>
            <li> • Herkenbare situaties die je denkt: dit ben ik</li>
            <li> • Kleine tips die helpen om even pas op de plaats te maken</li>
            <li> • Een deel van de boodschappenlijst voor tussendoor</li>
          </ul>
          <div class="register-forwho-title">Voor wie</div>
          <ul class="register-forwho-list">
            <li>Je wilt eerst voelen of dit bij je past</li>
            <li>Je wilt minder alleen zijn met je gedachten</li>
            <li>Je wilt klein beginnen</li>
          </ul>
        </div>
      </div>
        <div class="macro-squiggle">
          <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
            <path
              d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
              stroke="#222" stroke-width="2" fill="none" />
          </svg>
        </div>
      <!-- Bord vol section start -->
      <div class="bordvol-content-row">
        <div class="bordvol-left">
          <img src="/Icons/Webp/Bord vol.webp" alt="Bord vol Icon" class="bordvol-icon" />
          <div class="bordvol-title">Bord vol</div>
          <div class="bordvol-subtitle">
            Voor als je meer overzicht wilt<br>
            en minder twijfel.
          </div>
          <div class="bordvol-desc">
            Je wilt niet alleen reageren op momenten.<br>
            Je wilt vooraf al weten wat handig is.
          </div>
          <button class="bordvol-btn">Kies bord vol</button>
        </div>
        <div class="bordvol-right">
          <div class="bordvol-what-title">Wat je krijgt</div>
          <ul class="bordvol-what-list">
            <li> • Alles van snack</li>
            <li class="bordvol-plus">+</li>
            <li> • Extra gesprekken over maaltijden en dagelijkse keuzes</li>
            <li> • De volledige boodschappenlijst</li>
            <li> • Meer houvast in wat je in huis haalt</li>
            <li> • Korting op trajecten</li>
          </ul>
          <div class="bordvol-forwho-title">Voor wie</div>
          <ul class="bordvol-forwho-list">
            <li> • Je wilt gerichter bezig zijn</li>
            <li> • Je wilt minder beslissen op wilskracht</li>
            <li> • Je wilt overzicht en voordeel</li>
          </ul>
        </div>
      </div>
        <div class="macro-squiggle">
          <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
            <path
              d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
              stroke="#222" stroke-width="2" fill="none" />
          </svg>
        </div>
      <!-- Bord vol section end -->
      <!-- Kers op de taart section start -->
      <div class="kers-content-row">
        <div class="kers-left">
          <img src="/Icons/Webp/Kers op de taart.webp" alt="Kers op de taart Icon" class="kers-icon" />
          <div class="kers-title">Kers op de taart</div>
          <div class="kers-subtitle">
            Voor wie verdieping zoekt<br>
            en extra begeleiding wil.
          </div>
          <div class="kers-desc">
            Dit is de meest complete vorm.<br>
            Je krijgt extra inhoud, extra aandacht en meer contact met mij.
          </div>
          <button class="kers-btn">Kies kers op de taart</button>
        </div>
        <div class="kers-right">
          <div class="kers-what-title">Wat je krijgt</div>
          <ul class="kers-what-list">
            <li> • Alles van bord vol</li>
            <li class="kers-plus">+</li>
            <li> • Extra communityruimtes met verdieping</li>
            <li> • Exclusieve content</li>
            <li>die alleen hier te vinden is</li>
            <li> • Challenges die je helpen volhouden</li>
            <li> • Extra aanbiedingen en specials</li>
            <li> • Direct contact met mij</li>
          </ul>
          <div class="kers-forwho-title">Voor wie</div>
          <ul class="kers-forwho-list">
            <li>Je wilt alles eruit halen</li>
            <li>Je wilt verdieping en begeleiding</li>
            <li>Je vindt persoonlijk contact belangrijk</li>
          </ul>
        </div>
      </div>

      <div class="kers-footer">
        Je kiest eerst je abonnement.<br>
        Daarna regelen we de rest.
      </div>
      <div class="kers-login-link">
        Heb je al een account? <a href="/login">Log hier in.</a>
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
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.macro-squiggle {
  margin: 0.8rem 0 2.2rem 0;
  display: flex;
  justify-content: center;
}
.register-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: none;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  width: 100%;
  max-width: 900px;
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

.register-desc {
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  margin-bottom: 2.2rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
}

.register-content-row {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
}

.register-left {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  max-width: 350px;
}

.register-snack-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 1.2rem;
}

.register-snack-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #97b89b;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.7rem;
  text-align: center;
}

.register-snack-subtitle {
  color: #888;
  font-size: 1.15rem;
  text-align: center;
  margin-bottom: 1.2rem;
}

.register-snack-desc {
  color: #888;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}

.register-snack-btn {
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.3rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.2rem 0.7rem;
  transition: color 0.2s;
  margin-top: 0.7rem;
}

.register-snack-btn:hover {
  color: #da2c89;
  text-decoration: underline;
}

.register-right {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  max-width: 350px;
}

.register-what-title,
.register-forwho-title {
  color: #888;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 500;
  margin-bottom: 0.7rem;
  margin-top: 1.2rem;
}

.register-what-title {
  margin-top: 0;
}

.register-what-list,
.register-forwho-list {
  color: #888;
  font-size: 1rem;
  font-family: inherit;
  margin: 0 0 0.7rem 0;
  padding-left: 1.2rem;
  text-align: center;
  display: inline-block;
}

.register-what-list li,
.register-forwho-list li {
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.register-squiggle {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

/* Bord vol section styles */
.bordvol-content-row {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin: 3rem 0 2.5rem 0;
}

.bordvol-left {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  max-width: 350px;
}

.bordvol-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 1.2rem;
}

.bordvol-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #97b89b;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.7rem;
  text-align: center;
}

.bordvol-subtitle {
  color: #888;
  font-size: 1.15rem;
  text-align: center;
  margin-bottom: 1.2rem;
}

.bordvol-desc {
  color: #888;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}

.bordvol-btn {
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.3rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.2rem 0.7rem;
  transition: color 0.2s;
  margin-top: 0.7rem;
}

.bordvol-btn:hover {
  color: #da2c89;
  text-decoration: underline;
}

.bordvol-right {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  max-width: 350px;
}

.bordvol-what-title,
.bordvol-forwho-title {
  color: #888;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 500;
  margin-bottom: 0.7rem;
  margin-top: 1.2rem;
  text-align: center;
}

.bordvol-what-title {
  margin-top: 0;
}

.bordvol-what-list,
.bordvol-forwho-list {
  color: #888;
  font-size: 1rem;
  font-family: inherit;
  margin: 0 0 0.7rem 0;
  text-align: center;
  display: inline-block;
  list-style: none;
  padding-left: 0;
}

.bordvol-what-list li {
  margin-bottom: 0.4rem;
  line-height: 1.5;
  /* Remove dot styling */
  position: static;
  padding-left: 0;
  display: block;
}

.bordvol-what-list li:not(.bordvol-plus)::before {
  content: none;
}

.bordvol-forwho-list li {
  margin-bottom: 0.4rem;
  line-height: 1.5;
  /* Remove dot styling */
  position: static;
  padding-left: 0;
  display: block;
}

.bordvol-forwho-list li::before {
  content: none;
}

.bordvol-squiggle {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

/* Kers op de taart section styles */
.kers-content-row {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin: 3rem 0 2.5rem 0;
}

.kers-left {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  max-width: 350px;
}

.kers-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 1.2rem;
}

.kers-title {
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #97b89b;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.7rem;
  text-align: center;
}

.kers-subtitle {
  color: #888;
  font-size: 1.15rem;
  text-align: center;
  margin-bottom: 1.2rem;
}

.kers-desc {
  color: #888;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}

.kers-btn {
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.3rem;
  font-family: 'Indie Flower', cursive, sans-serif;
  cursor: pointer;
  padding: 0.2rem 0.7rem;
  transition: color 0.2s;
  margin-top: 0.7rem;
}

.kers-btn:hover {
  color: #da2c89;
  text-decoration: underline;
}

.kers-right {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  max-width: 350px;
}

.kers-what-title,
.kers-forwho-title {
  color: #888;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 500;
  margin-bottom: 0.7rem;
  margin-top: 1.2rem;
  text-align: center;
}

.kers-what-title {
  margin-top: 0;
}

.kers-what-list,
.kers-forwho-list {
  color: #888;
  font-size: 1rem;
  font-family: inherit;
  margin: 0 0 0.7rem 0;
  text-align: center;
  display: inline-block;
  list-style: none;
  padding-left: 0;
}

.kers-what-list li {
  margin-bottom: 0.4rem;
  line-height: 1.5;
  position: static;
  padding-left: 0;
  display: block;
}

.kers-what-list li:not(.kers-plus)::before {
  content: none;
}

.kers-what-list .kers-plus {
  color: #888;
  font-size: 1.2em;
  font-weight: bold;
  background: none;
  padding-left: 0;
  margin: 0.2em 0;
  display: block;
}

.kers-small {
  font-size: 0.95em;
  color: #bdbdbd;
  display: block;
  margin-top: 0.2em;
}

.kers-forwho-list li {
  margin-bottom: 0.4rem;
  line-height: 1.5;
  position: static;
  padding-left: 0;
  display: block;
}

.kers-forwho-list li::before {
  content: none;
}

.kers-squiggle {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.kers-footer {
  margin-top: 2.5rem;
  color: #888;
  font-size: 1rem;
  text-align: center;
  font-family: inherit;
}

.kers-login-link {
  margin-top: 2.5rem;
  color: #888;
  font-size: 1.1rem;
  text-align: center;
  font-family: inherit;
}
.kers-login-link a {
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
}
.kers-login-link a:hover {
  text-decoration: underline;
  color: #da2c89;
}

@media (max-width: 900px) {
  .register-card {
    max-width: 98vw;
    padding: 1.5rem 0.5rem 1.5rem 0.5rem;
    border-radius: 0.7rem;
  }
  .register-content-row {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  .register-left,
  .register-right {
    max-width: 100vw;
    min-width: 0;
    width: 100%;
  }
  .register-snack-title {
    font-size: 1.3rem;
  }
  .bordvol-content-row {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  .bordvol-title {
    font-size: 1.3rem;
  }
  .kers-content-row {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  .kers-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 600px) {
  .register-title {
    font-size: 1.3rem;
  }
    .macro-squiggle svg {
    width: 80px !important;
    height: 16px !important;
  }
  .register-snack-title {
    font-size: 1.1rem;
  }
  .register-snack-btn {
    font-size: 1rem;
  }
  .register-desc {
    font-size: 1rem;
  }
  .register-content-row {
    gap: 1rem;
  }
  .bordvol-title {
    font-size: 1.1rem;
  }
  .bordvol-btn {
    font-size: 1rem;
  }
  .bordvol-content-row {
    gap: 1rem;
  }
  .kers-title {
    font-size: 1.1rem;
  }
  .kers-btn {
    font-size: 1rem;
  }
  .kers-content-row {
    gap: 1rem;
  }
}

@media (max-width: 400px) {
  .register-title {
    font-size: 1rem;
  }
  .register-snack-title {
    font-size: 0.9rem;
  }
  .register-snack-btn {
    font-size: 0.9rem;
  }
  .bordvol-title {
    font-size: 0.9rem;
  }
  .bordvol-btn {
    font-size: 0.9rem;
  }
  .kers-title {
    font-size: 0.9rem;
  }
  .kers-btn {
    font-size: 0.9rem;
  }
}
</style>
