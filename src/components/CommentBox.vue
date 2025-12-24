<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div class="bankhangen-post bankhangen-post-row">
    <img class="bankhangen-post-avatar" :src="avatar" alt="avatar" />
    <div class="bankhangen-post-content">
      <div :class="['bankhangen-post-type', typeClass]">{{ typeLabel }}</div>
      <div class="bankhangen-post-header">
        <span class="bankhangen-post-author" :style="{ color: color}"><em>{{ author }}</em></span>
        <span class="bankhangen-post-time">{{ formatRelativeTime(time) }}</span>
      </div>
      <div class="bankhangen-post-meta">{{ status }}</div>
      <div class="bankhangen-post-body">
        <span v-html="formatBody(body)"></span>
      </div>
      <div class="bankhangen-post-actions" >
        <button
          class="bankhangen-action"
          :style="{ color: isLikedByCurrentUser ? '#e06ca9' : color, fontWeight: isLikedByCurrentUser ? 'bold' : 'normal' }"
          @click="toggleLike"
        >
          <span v-if="localLikesCount" style="margin-right:4px;">{{ localLikesCount }}</span>
          Like
        </button>
        <button class="bankhangen-action" :style="{ color: color}" @click="toggleReply">
          <span v-if="replies.length" class="bankhangen-reply-count" style="margin-right:4px;">{{ replies.length }}</span>
          Reageer
        </button>
        <button class="bankhangen-action" :style="{ color: localIsReported ? '#e06ca9' : color, fontWeight: localIsReported ? 'bold' : 'normal' }" @click="toggleReport">
          Melden
        </button>
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
          <div
            v-for="(reply, idx) in replies"
            :key="reply.id || idx"
            class="bankhangen-reply-row"
          >
            <img class="bankhangen-reply-avatar" :src="reply.user?.photo || '/Icons/user (3).png'" alt="reply avatar" />
            <div class="bankhangen-reply-content">
              <div class="bankhangen-reply-author">
                <em>{{ reply.user?.first_name + ' ' + reply.user?.last_name || reply.user?.username || 'Gebruiker' }}</em>
                <span v-if="reply.created_at" style="color:#b3b3b3; font-size:0.95em; margin-left:8px;">
                  {{ formatRelativeTime(reply.created_at) }}
                </span>
              </div>
              <div class="bankhangen-post-meta">{{ reply.user?.status }}</div>
              <div class="bankhangen-reply-body">
                <span v-html="formatBody(reply.content || reply.text || '')"></span>
              </div>
              <div style="margin-top:2px; display: flex; gap: 1.2rem;">
                <button
                  class="bankhangen-action"
                  :style="{ color: isReplyLikedByCurrentUser(reply, idx) ? '#e06ca9' : color, fontWeight: isReplyLikedByCurrentUser(reply, idx) ? 'bold' : 'normal', fontSize: '0.95em' }"
                  @click="toggleReplyLike(idx, reply)"
                >
                  <span v-if="replyLocalLikesCount[idx]" style="margin-right:4px;">{{ replyLocalLikesCount[idx] }}</span>
                  Like
                </button>
                <button
                  class="bankhangen-action"
                  :style="{ color: replyLocalIsReported[idx] ? '#e06ca9' : color, fontWeight: replyLocalIsReported[idx] ? 'bold' : 'normal', fontSize: '0.95em' }"
                  @click="toggleReplyReport(idx, reply)"
                >
                  Melden
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '@/stores/content-store'
const props = defineProps({
  type: { type: String, default: 'success' },
  typeLabel: { type: String, default: 'Succes' },
  avatar: { type: String, default: '/Icons/user (3).png' },
  author: { type: String, default: '' },
  status: { type: String, default: '' },
  time: { type: String, default: '' },
  meta: { type: String, default: '' },
  body: { type: String, default: '' },
  color: { type: String, default: '#e06ca9' },
  replies: { type: Array, default: () => [] },
  likesCount: { type: [Number, String], default: 0 },
  isLiked: { type: Boolean, default: false },
  userId: { type: [Number, String], default: null },
  blogId: { type: [Number, String], default: null },
  commentId: { type: [Number, String], default: null },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 }
})
const showReply = ref(false)
const replyText = ref('')
const typeClass = props.type;
const contentStore = useContentStore()
// eslint-disable-next-line vue/no-dupe-keys
const replies = ref([])

let currentUserId = null
try {
  currentUserId = JSON.parse(localStorage.getItem('user'))?.id || null
// eslint-disable-next-line no-unused-vars
} catch { currentUserId = null }

const localIsLiked = ref(!!props.isLiked)
const localLikesCount = ref(Number(props.likesCount) || 0)
const replyLocalIsLiked = ref([])
const replyLocalLikesCount = ref([])
const localIsReported = ref(false)
const replyLocalIsReported = ref([])

onMounted(async () => {
  if (props.blogId) {
    try {
      const res = await contentStore.api_content_blogs_comments_list({
        blogID: props.blogId,
        page: props.page,
        page_size: props.pageSize
      })
      if (Array.isArray(res?.results)) {
        const comment = res.results.find(c => String(c.id) === String(props.commentId))
        if (comment && Array.isArray(comment.replies)) {
          replies.value = comment.replies
          replyLocalIsLiked.value = comment.replies.map(r => !!r.is_liked)
          replyLocalLikesCount.value = comment.replies.map(r => Number(r.likes_count) || 0)
          replyLocalIsReported.value = comment.replies.map(r => !!r.is_reported)
        }
        if (comment && typeof comment.is_reported !== 'undefined') {
          localIsReported.value = !!comment.is_reported
        }
      }
    } catch {
      replies.value = []
      replyLocalIsLiked.value = []
      replyLocalLikesCount.value = []
      replyLocalIsReported.value = []
      localIsReported.value = false
    }
  }
  localIsLiked.value = !!props.isLiked
  localLikesCount.value = Number(props.likesCount) || 0
})

function toggleReply() {
  showReply.value = !showReply.value
}

async function sendReply() {
  console.log('Sending reply:', replyText.value, 'to comment ID:', props.commentId, 'on blog ID:', props.blogId)
  if (!replyText.value.trim()) return
  try {
    await contentStore.api_content_comments_reply_create({
      commentID: props.commentId,
      data: {
        content: replyText.value
      }
    })
    if (props.blogId) {
      const res = await contentStore.api_content_blogs_comments_list({
        blogID: props.blogId,
        page: props.page,
        page_size: props.pageSize
      })
      if (Array.isArray(res?.results)) {
        const comment = res.results.find(c => String(c.id) === String(props.commentId))
        if (comment && Array.isArray(comment.replies)) {
          replies.value = comment.replies
          replyLocalIsLiked.value = comment.replies.map(r => !!r.is_liked)
          replyLocalLikesCount.value = comment.replies.map(r => Number(r.likes_count) || 0)
        }
      }
    }
    replyText.value = ''
    showReply.value = false
  } catch  {
    alert('Reactie plaatsen mislukt')
  }
}

async function toggleLike() {
  try {
    await contentStore.api_content_comments_like_create({ commentID: props.commentId })
    // Toggle local like state and count immediately
    if (localIsLiked.value) {
      localIsLiked.value = false
      localLikesCount.value = Math.max(0, localLikesCount.value - 1)
    } else {
      localIsLiked.value = true
      localLikesCount.value += 1
    }
  } catch {
    alert('Like/unlike mislukt')
  }
}

async function toggleReplyLike(idx, reply) {
  try {
    await contentStore.api_content_comments_like_create({ commentID: reply.id })
    if (replyLocalIsLiked.value[idx]) {
      replyLocalIsLiked.value[idx] = false
      replyLocalLikesCount.value[idx] = Math.max(0, replyLocalLikesCount.value[idx] - 1)
    } else {
      replyLocalIsLiked.value[idx] = true
      replyLocalLikesCount.value[idx] += 1
    }
  } catch {
    alert('Like/unlike mislukt')
  }
}

async function toggleReplyReport(idx, reply) {
  try {
    if (!replyLocalIsReported.value[idx]) {
      const res = await contentStore.api_content_comments_report_create({ commentID: reply.id })
      if (res && typeof res.is_reported !== 'undefined') {
        replyLocalIsReported.value[idx] = !!res.is_reported
      } else {
        replyLocalIsReported.value[idx] = true
      }
    } else {
      await contentStore.api_content_comments_report_delete({ commentID: reply.id })
      replyLocalIsReported.value[idx] = false
    }
  } catch {
    alert('Melden mislukt')
  }
}

async function toggleReport() {
  try {
    if (!localIsReported.value) {
      // Report the comment
      const res = await contentStore.api_content_comments_report_create({ commentID: props.commentId })
      if (res && typeof res.is_reported !== 'undefined') {
        localIsReported.value = !!res.is_reported
      } else {
        localIsReported.value = true
      }
    } else {
      // Unreport the comment
      await contentStore.api_content_comments_report_delete({ commentID: props.commentId })
      localIsReported.value = false
    }
  } catch {
    alert('Melden mislukt')
  }
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return ''
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return `${diffSec} sec`
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin} min`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr} uur`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay} dag${diffDay > 1 ? 'en' : ''}`
  const diffWk = Math.floor(diffDay / 7)
  if (diffWk < 4) return `${diffWk} week${diffWk > 1 ? 'en' : ''}`
  const diffMo = Math.floor(diffDay / 30)
  if (diffMo < 12) return `${diffMo} maand${diffMo > 1 ? 'en' : ''}`
  const diffYr = Math.floor(diffDay / 365)
  return `${diffYr} jaar${diffYr > 1 ? 'en' : ''}`
}

const isLikedByCurrentUser = computed(() => {
  // The Like button turns pink if is_liked is true from the endpoint
  return !!localIsLiked.value
})

function isReplyLikedByCurrentUser(reply, idx) {
  // The Like button for replies turns pink if is_liked is true from the endpoint
  return !!replyLocalIsLiked.value[idx]
}

function formatBody(text) {
  if (!text) return ''
  // Replace \n or \\n with <br>
  return String(text).replace(/\\n|\n/g, '<br>')
}
</script>

<style scoped>
.bankhangen-post {
  max-width: 1200px;
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
  margin-top: 1.5rem;
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
  color: #e06ca9;
}

.bankhangen-post-type.success {
  color: #e06ca9;
}

.bankhangen-post-type.struggles {
  color: #e06ca9;
}
.bankhangen-post-type.buurtgesprekken {
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
}

.bankhangen-reply-box {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #7fa184;
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
  border: none;
  font-size: 1.08rem;
  color: #7fa184;
  font-family: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  padding: 0.5rem 0.7rem;
  border: 1.5px dashed #7fa184;
  border-radius: 12px;
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
