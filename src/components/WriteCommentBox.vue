<template>
  <div class="flex align-items-center">
    <img class="bankhangen-avatar" src="/Icons/user (3).png" alt="avatar" />
    <div
      class="bankhangen-form bankhangen-form-row"
      :style="{ border: borderColor}"
    >
      <textarea class="bankhangen-input" placeholder="Reageer op de vraag"></textarea>
      <div class="bankhangen-input-actions">
        <div class="bankhangen-comment-btns">
          <!--          <img src="/Icons/happy.png" alt="happy btn" width="20" />
          <img src="/Icons/gallery.png" alt="gallery btn" width="25" />
          -->

        </div>
        <div class="bankhangen-send-message">
          <img src="/Icons/send-message.png" alt="send btn" width="25" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  borderColor: { type: String, default: '1.5px dashed #e06ca9' },
});

</script>

<style scoped>
.bankhangen-form-row {
  display: flex;
  align-items: flex-start;
  background: #fff;
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

@media (max-width: 900px) {
  .bankhangen-form-row {
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
    padding: 1rem 0.5rem;
    gap: 0.7rem;
  }
}

@media (max-width: 600px) {
  .bankhangen-form-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    width: calc(100% - 0.4rem);
    padding: 1rem 0.5rem;
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
}
</style>
