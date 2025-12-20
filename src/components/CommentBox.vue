<template>
  <div class="bankhangen-post bankhangen-post-row">
    <img class="bankhangen-post-avatar" :src="avatar" alt="avatar" />
    <div class="bankhangen-post-content">
      <div :class="['bankhangen-post-type', typeClass]">{{ typeLabel }}</div>
      <div class="bankhangen-post-header">
        <span class="bankhangen-post-author" :style="{ color: color}"><em>{{ author }}</em></span>
        <span class="bankhangen-post-time">{{ time }}</span>
      </div>
      <div class="bankhangen-post-meta">{{ meta }}</div>
      <div class="bankhangen-post-body">
        {{ body }}
      </div>
      <div class="bankhangen-post-actions" >
        <button class="bankhangen-action" :style="{ color: color}" @click="$emit('like')">Like</button>
        <button class="bankhangen-action" :style="{ color: color}" @click="toggleReply">
          Reageer
          <span v-if="replies.length" class="bankhangen-reply-count">({{ replies.length }})</span>
        </button>
        <button class="bankhangen-action" :style="{ color: color}" @click="$emit('report')">Melden</button>
      </div>
      <div v-if="showReply" class="bankhangen-reply-box">
        <div class="bankhangen-reply-input-row">
          <textarea
            v-model="replyText"
            class="bankhangen-reply-input"
            placeholder="Schrijf een reactie..."
          ></textarea>
          <button class="bankhangen-reply-send" @click="sendReply">Plaatsen</button>
        </div>
        <div v-if="replies.length" class="bankhangen-replies">
          <div v-for="(reply, idx) in replies" :key="idx" class="bankhangen-reply-row">
            <img class="bankhangen-reply-avatar" :src="avatar" alt="reply avatar" />
            <div class="bankhangen-reply-content">
              <div class="bankhangen-reply-author"><em>{{ author }}</em></div>
              <div class="bankhangen-reply-body">{{ reply }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showReply = ref(false)
const replyText = ref('')
const replies = ref([])

function toggleReply() {
  showReply.value = !showReply.value
}
function sendReply() {
  if (replyText.value.trim()) {
    replies.value.push(replyText.value)
  }
  replyText.value = ''
}
const props = defineProps({
  type: { type: String, default: 'success' }, // success | struggles | vraag
  typeLabel: { type: String, default: 'Succes' },
  avatar: { type: String, default: '/Icons/user (3).png' },
  author: { type: String, default: 'Loukie' },
  time: { type: String, default: '2d' },
  meta: { type: String, default: 'Houdt van wandelen na het eten' },
  body: { type: String, default: '' },
  color: { type: String, default: '#e06ca9' }
});
const typeClass = props.type;
</script>

<style scoped>
.bankhangen-post {
  background: #fff;
  border-radius: 12px;
  padding: 1.2rem 0rem;
}

.bankhangen-post-row {
  display: flex;
  align-items: start;
  gap: 1.2rem;
}

.bankhangen-post-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
  margin-top: 0.2rem;
  margin-right: 20px;

}

.bankhangen-post-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.bankhangen-post-type {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.9rem;
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
  margin-top: 0.7rem;
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

.bankhangen-reply-box {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bankhangen-reply-input-row {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.bankhangen-reply-input {
  width: 100%;
  min-height: 48px;
  border: 1.5px dashed #e06ca9;
  font-size: 1.05rem;
  color: #222;
  font-family: inherit;
  resize: none;
  outline: none;
  border-radius: 8px;
  padding: 0.5rem 0.7rem;
}

.bankhangen-reply-send {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #e06ca9;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  padding: 0.2rem 1.2rem;
  transition: color 0.2s;
  margin-left: 0.5rem;
  height: 48px;
}

.bankhangen-reply-send:hover {
  color: #da2c89;
  text-decoration: underline;
}

.bankhangen-replies {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.bankhangen-reply-row {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  border-radius: 8px;
  padding: 0.7rem 1rem;
}

.bankhangen-reply-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.bankhangen-reply-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.bankhangen-reply-author {
  color: #e06ca9;
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.bankhangen-reply-body {
  color: #b3b3b3;
  font-size: 1.05rem;
  word-break: break-word;
}

.bankhangen-reply-count {
  margin-left: 6px;
  color: #888CAB;
  font-size: 0.98em;
  font-weight: 500;
  vertical-align: middle;
}


@media (max-width: 500px) {
  .bankhangen-post {
    padding: 1rem 2rem;
  }

  .bankhangen-post-row {
    gap: 0.7rem;
  }

  .bankhangen-post-avatar {
    width: 60px;
    height: 60px;
  }

  .bankhangen-post-body {
    color: #888;
    font-size: 1rem;
    margin-bottom: 0.7rem;
    line-height: 1.6;
  }
}
</style>
