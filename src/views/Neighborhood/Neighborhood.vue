<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bankhangen-container">
    <div class="bankhangen-header">
      <div class="bankhangen-title">Even eerlijk met jezelf</div>
      <div class="bankhangen-desc">
        Je zit nu toch lekker. Dan kun je dit moment net zo goed voor jezelf pakken.<br>
        Elke keer stel ik je hier een vraag die je helpt om stil te staan bij jouw lijf, energie en gewoontes.<br>
        Niet om streng te zijn, wel om eerlijk te zijn.
      </div>
      <div class="bankhangen-question">
        Welke kleine keuze kun jij vandaag maken waar je toekomstige jij blij mee is?<br>
        Eén stap is genoeg.
      </div>
      <WriteCommentBox />
    </div>
    <div class="bankhangen-community">
      <div class="bankhangen-community-header-row">
        <div class="bankhangen-community-title">Deel iets in de buurt</div>
        <div class="bankhangen-community-link">Bekijk de buurt</div>
      </div>
      <div class="bankhangen-community-subtitle">Kleine momenten, echte verhalen.</div>
      <div class="bankhangen-community-desc">Dit is wat er vandaag leeft in de buurt.</div>
      <div class="bankhangen-community-list">
        <CommentBox type="success" typeLabel="Succes" avatar="/Icons/user (3).png" author="Loukie" time="2d"
          meta="Houdt van wandelen na het eten"
          body="Bear claw liquorice brownie caramels donut cake gummies gingerbread. Chupa chups pastry bonbon donut gummi bears pastry chupa chups chocolate cake. I love dragée sesame snaps macaroon gummi bears macaroon I love." />
        <CommentBox type="struggles" typeLabel="Struggles" avatar="/Icons/user (3).png" author="Loukie" time="4h"
          meta="Houdt van wandelen na het eten"
          body="Cupcake ipsum dolor sit amet pie jelly-o candy. Tart I love I love marzipan pie pie chocolate bonbon donut. Halvah marzipan gingerbread I love I love cotton candy biscuit. Cupcake oat cake gummi bears bonbon brownie ice cream biscuit." />
        <CommentBox type="vraag" typeLabel="Vraag" avatar="/Icons/user (3).png" author="Loukie" time="1d"
          meta="Houdt van wandelen na het eten"
          body="Danish icing lemon drops cheesecake ice cream jelly-o icing I love. Sesame snaps brownie I love candy canes cotton candy. Sugar plum I love gummies gummi bears I love cookie I love chocolate." />
      </div>

    </div>
  </div>
</template>

<script setup>
import CommentBox from '@/components/CommentBox.vue'
import WriteCommentBox from '@/components/WriteCommentBox.vue'
// No logic needed for static design
</script>

<style scoped>
.bankhangen-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 5rem 2rem 2rem 2rem;
  font-family: 'Nunito', 'Indie Flower', cursive, sans-serif;
  color: #888;
  background: #fff;
}


.bankhangen-header {
  margin-bottom: 3.5rem;
}

.bankhangen-title {
  color: #e06ca9;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.7rem;
}

.bankhangen-desc {
  font-size: 1.08rem;
  margin-bottom: 1.2rem;
  color: #888;
  line-height: 1.6;
}

.bankhangen-question {
  font-size: 1.15rem;
  color: #888;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.bankhangen-form-row {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border: 1.5px dashed #e06ca9;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.bankhangen-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #eee;
  flex-shrink: 0;
  margin-bottom: 30px;
  margin-right: 20px;
}

.bankhangen-form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.bankhangen-input {
  width: 100%;
  min-height: 48px;
  border: none;
  font-size: 1.08rem;
  color: #7fa184;
  font-family: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  padding: 0.5rem 0.7rem;

}

.bankhangen-input-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.bankhangen-comment-btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.bankhangen-send-message {
  display: flex;
  align-items: center;
}

.bankhangen-send-message img,
.bankhangen-comment-btns img {
  cursor: pointer;
  transition: opacity 0.2s;
}

.bankhangen-send-message img:hover,
.bankhangen-comment-btns img:hover {
  opacity: 0.7;
}

.bankhangen-community {
  margin-top: 3.5rem;
}

.bankhangen-community-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
  gap: 1rem;
}

.bankhangen-community-title {
  color: #e06ca9;
  font-size: 2rem;
  font-weight: 400;
}

.bankhangen-community-subtitle {
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.bankhangen-community-desc {
  color: #b3b3b3;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.bankhangen-community-list {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  margin-bottom: 2.5rem;
}


.bankhangen-post-type {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  margin-left: 0.1rem;
}

.bankhangen-post-type.success {
  color: #e06ca9;
}

.bankhangen-post-type.struggles {
  color: #e06ca9;
}

.bankhangen-post-type.vraag {
  color: #e06ca9;
}

.bankhangen-post-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.2rem;
}

.bankhangen-post-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
}

.bankhangen-post-author {
  color: #e06ca9;
  font-size: 1.08rem;
  font-style: italic;
  margin-right: 0.7rem;
}

.bankhangen-post-time {
  color: #b3b3b3;
  font-size: 0.98rem;
  margin-left: 0.5rem;
}

.bankhangen-post-meta {
  color: #b3b3b3;
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
}

.bankhangen-post-body {
  color: #888;
  font-size: 1.08rem;
  margin-bottom: 0.7rem;
  line-height: 1.6;
}

.bankhangen-post-actions {
  display: flex;
  gap: 1.2rem;
  color: #e06ca9;
  font-size: 1.01rem;
}

.bankhangen-action {
  cursor: pointer;
  transition: color 0.2s;
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1.01rem;
  padding: 0;
  font-family: inherit;
}

.bankhangen-action:hover {
  color: #b3b3b3;
  text-decoration: underline;
}

.bankhangen-community-link {
  color: #e06ca9;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 400;
  margin: 0;
  text-align: right;
}
.bankhangen-community-link:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .bankhangen-container {
    padding: 4rem 2rem 1.2rem 2rem;
  }

  .bankhangen-form-row {
    padding: 1rem 0.5rem;
    gap: 0.7rem;
  }

  .bankhangen-community-list {
    gap: 1.2rem;
  }
}

@media (max-width: 600px) {

  .bankhangen-title,
  .bankhangen-community-title {
    font-size: 1.7rem;
  }

  .bankhangen-form-row {
    padding: 1rem 0.5rem;
    gap: 0.7rem;
  }

  .bankhangen-avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 40px;
    margin-right: 20px;
  }

  .bankhangen-form {
    gap: 0.3rem;
  }

  .bankhangen-input {
    font-size: 1rem;
    padding: 0.4rem 0.5rem;
  }

  .bankhangen-input-actions {
    gap: 0.3rem;
  }

  .bankhangen-comment-btns {
    gap: 0.3rem;
  }

  .bankhangen-post {
    padding: 1rem 0.7rem;
  }
}
</style>
