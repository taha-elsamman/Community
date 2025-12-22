<template>
  <div class="meal-details-container" v-if="blog">
    <h1 class="meal-title">{{ blog.title }}</h1>
    <div class="macro-squiggle">
      <svg width="240" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
        <path
          d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
          stroke="#222" stroke-width="2" fill="none" />
      </svg>
    </div>
    <div class="meal-img-section">
      <div class="meal-img-stack">
        <img class="meal-img" :src="blog.image ? ('https://community.projectlifestyle.nl' + blog.image) : ''"
          :alt="blog.title" />
        <img class="meal-img-frame" src="/borders/Frame Lifestyle tips details.webp" alt="" />
      </div>
    </div>
    <div class="meal-sections row">
      <div class="meal-preparation col-12">
        <h2 class="meal-section-title">Bereidingswijze</h2>
        <svg width="120" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path
            d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
            stroke="#222" stroke-width="2" fill="none" />
        </svg>
        <div class="meal-step">
          <div class="meal-step-desc" v-html="blog.content"></div>
        </div>
      </div>
    </div>
    <!-- Kookpraat Section Start -->
    <div class="kookpraat-section">
      <div class="kookpraat-title">Praat mee</div>
      <div class="kookpraat-squiggle">
        <svg width="120" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path
            d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
            stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="kookpraat-desc">
        Dit onderwerp roept vaak meer op dan je denkt. Hoe is dat voor jou? Laat een reactie achter en praat mee.
      </div>
      <!-- Inline WriteCommentBox code start -->
      <div class="bankhangen-form-row">
        <div>
          <img class="bankhangen-avatar"
            :src="authStore.user['profile_photo'] ? (authStore.user['profile_photo']) : '/Icons/user (3).png'"
            alt="Profile Picture" />
        </div>
        <div class="bankhangen-form bankhangen-form-row" :style="{ border: '1.5px dashed #B3C7E6' }">
          <textarea class="bankhangen-input" placeholder="Reageer op de vraag" v-model="newComment"></textarea>
          <div class="bankhangen-input-actions">
            <div class="bankhangen-comment-btns">
              <!--
              <img src="/Icons/happy.png" alt="happy btn" width="20" />
              <img src="/Icons/gallery.png" alt="gallery btn" width="25" />
              -->
            </div>
            <div class="bankhangen-send-message">
              <img src="/Icons/send-message.png" alt="send btn" width="25" @click="submitComment"
                style="cursor:pointer" />
            </div>
          </div>
        </div>
      </div>
      <!-- Inline WriteCommentBox code end -->
      <div v-for="comment in comments" :key="comment.id">
        <CommentBox type="success" typeLabel="" :avatar="comment.user?.photo || '/Icons/user (3).png'"
          :author="comment.user?.first_name + ' ' + comment.user?.last_name || comment.user?.username || 'Gebruiker'"
          :status="comment.user?.status || ''"
          :time="comment.created_at" :meta="comment.user?.meta || ''" :body="comment.content || comment.text || ''"
          :color="'#666'" :replies="(comment.replies || []).map(reply => ({
            ...reply,
            likes_count: reply.likes_count,
            is_liked: reply.is_liked
          }))" :likes-count="comment.likes_count" :is-liked="comment.is_liked" :userId="comment.user?.id || null"
          :blogId="id" :commentId="comment.id" :page="currentPage" :pageSize="pageSize" @like="onLike" @reply="onReply"
          @report="onReport" />
      </div>
      <div v-if="totalPages > 1" class="custom-pagination">
        <button class="pagination-arrow" :class="{ disabled: currentPage === 1 }" @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1">
          <img src="/Icons/Webp/Pagination arrow.webp" alt="Vorige" class="pagination-arrow-img left" />
        </button>
        <span v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
          @click="changePage(page)">{{ page }}</span>
        <button class="pagination-arrow" :class="{ disabled: currentPage === totalPages }"
          @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
          <img src="/Icons/Webp/Pagination arrow.webp" alt="Volgende" class="pagination-arrow-img right" />
        </button>
      </div>
    </div>
    <!-- Kookpraat Section End -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContentStore } from '@/stores/content-store'
import CommentBox from '@/components/CommentBox.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const route = useRoute()
const id = route.params.id
const contentStore = useContentStore()
const blog = ref(null)
const comments = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const totalCount = ref(0)
const newComment = ref('')

onMounted(async () => {

  await authStore.fetchMe()
  console.log(authStore.user['profile_photo'])

  blog.value = await contentStore.api_content_blogs_read(id)
  await fetchComments()
})

async function fetchComments(page = 1) {
  try {
    //console.log('Fetching comments for blog ID:', id, 'page:', page, 'pageSize:', pageSize.value)
    const res = await contentStore.api_content_blogs_comments_list({
      blogID: id,
      page,
      page_size: pageSize.value
    })
    // Ensure replies are always present for each comment (even if empty)
    comments.value = (Array.isArray(res?.results) ? res.results : (Array.isArray(res) ? res : [])).map(comment => ({
      ...comment,
      replies: Array.isArray(comment.replies) ? comment.replies : []
    }))
    totalCount.value = res?.count || comments.value.length
    totalPages.value = Math.ceil(totalCount.value / pageSize.value)
    currentPage.value = page
  } catch {
    comments.value = []
    totalPages.value = 1
    totalCount.value = 0
    currentPage.value = 1
  }
}

function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  fetchComments(currentPage.value = page)
}

const visiblePages = computed(() => {
  // Show max 5 pages, center current page if possible
  const pages = []
  let start = Math.max(1, currentPage.value - 1)
  let end = Math.min(totalPages.value, start + 2)
  if (end - start < 2) start = Math.max(1, end - 2)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

async function submitComment() {
  if (!newComment.value || !newComment.value.trim()) {
    alert('Reactie mag niet leeg zijn')
    return
  }
  try {
    await contentStore.api_content_blogs_comments_create({
      blogID: id,
      data: { content: newComment.value }
    })
    newComment.value = ''
    await fetchComments(1)
  } catch (e) {
    alert('Reactie plaatsen mislukt' + (e?.message ? ': ' + e.message : ''))
  }
}

function onLike() {
  // TODO: Implement like functionality
  alert('Like clicked');
}
function onReply() {
  // TODO: Implement reply functionality
  alert('Reageer clicked');
}
function onReport() {
  // TODO: Implement report functionality
  alert('Melden clicked');
}
</script>

<style scoped>
.meal-details-container {
  margin: auto;
  max-width: 1200px;
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #7fa184;
  padding: 2rem;
}

.meal-title {
  text-align: center;
  font-size: 2.2rem;
  color: #7fa184;
  margin-bottom: 0.2rem;
  font-weight: 400;
}

/* Responsive font size for meal-title */
@media (max-width: 900px) {
  .meal-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 600px) {
  .meal-title {
    font-size: 1.2rem;
  }
}

.meal-intro {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.meal-img-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.macro-squiggle {
  display: flex;
  justify-content: center;
  margin: 0.6rem 0 1rem 0;
}

.macro-squiggle svg {
  width: 240px;
  height: 24px;
}

@media (max-width: 600px) {
  .macro-squiggle svg {
    width: 120px;
    height: 12px;
  }

  .macro-squiggle svg path {
    stroke-width: 1;
  }
}

.meal-img-stack {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 540px;
  height: 400px;
  max-width: 100%;
  margin-bottom: 50px;
}

.meal-img {
  width: 500px;
  height: 360px;
  object-fit: cover;
  position: relative;
  z-index: 1;
  background: #f8f8f8;
}

.meal-img-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 540px;
  height: 400px;
  z-index: 2;
  pointer-events: none;
}

.meal-fav-btn {
  position: absolute;
  top: 42px;
  right: 18px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 3;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fav-icon-abs {
  position: absolute;
  top: 0;
  left: 0;
}

.meal-fav-btn img {
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  display: block;
}

/* Responsive adjustments */
@media (max-width: 900px) {

  .meal-img-stack {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  .meal-img {
    object-fit: cover;
    position: relative;
    z-index: 1;
    background: #f8f8f8;
  }

  .meal-img-frame {
    width: 120px;
    height: 410px !important;
  }
}

@media (max-width: 600px) {
  .meal-img-stack {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  .meal-img {
    object-fit: cover;
    position: relative;
    z-index: 1;
    background: #f8f8f8;
  }

  .meal-img-frame {
    width: 120px;
    height: 410px !important;
  }
}

.meal-sections {
  margin-top: 2.5rem;
}

.meal-ingredients {
  /* Bootstrap col-3 will handle width */
  min-width: 0;
  max-width: 100%;
}

.meal-preparation {
  /* Bootstrap col-9 will handle width */
  min-width: 0;
  max-width: 100%;
}

.meal-section-title {
  font-size: 1.3rem;
  color: #a3b1c6;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.meal-portion-select {
  margin-bottom: 1.2rem;
}

.meal-portion-select label {
  color: #b3b3b3;
  font-size: 1.05rem;
  margin-right: 0.5rem;
}

.meal-portion-select select {
  font-size: 1rem;
  border: 1px solid #b3d6f6;
  border-radius: 0.4rem;
  padding: 0.2rem 0.7rem;
  color: #7fa184;
  background: #f8f8f8;
}

.meal-checkbox-group {
  margin-bottom: 1.2rem;
}

.meal-checkbox-label {
  color: #b3b3b3;
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
}

.meal-checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.meal-checkbox-list label {
  color: #7fa184;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
}

.meal-checkbox-list input[type="checkbox"] {
  accent-color: #7fd6c2;
  margin-right: 0.5rem;
}

.meal-preparation {
  margin-left: 1.5rem;
}

.meal-step {
  margin-bottom: 1.5rem;
}

.meal-step-title {
  color: #a3b1c6;
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.meal-step-desc {
  color: #888;
  font-size: 1rem;
  line-height: 1.6;
}

.kookpraat-comment {
  display: flex;
  align-items: flex-start;
  margin: 0 2.5rem 2.5rem 2.5rem;
  box-sizing: border-box;
  gap: 1.2rem;
}

@media (max-width: 899px) {
  .meal-sections {
    flex-direction: column;
    gap: 1.5rem;
  }

  .meal-preparation {
    margin-left: 0;
  }

  .meal-img-stack {

    position: relative;
    display: flex;
    width: 90%;
    max-width: none;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  .meal-img-frame {
    width: 100%;
    min-width: 0;
    height: auto;
  }

  .meal-img {
    width: 95%;
  }

  .kookpraat-comment {
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 600px) {
  .meal-details-container {
    padding: 2rem;
  }

  .meal-img-stack {

    position: relative;
    display: flex;
    width: 100%;
    max-width: none;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }


  .meal-img-frame {
    width: 100%;
    max-width: 90vw;
    min-width: 0;
    height: auto;
    margin-top: 10px;
  }

  .meal-sections {
    gap: 0.7rem;
  }
}

/* Kookpraat Section Styles */
.kookpraat-section {
  width: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  background: #fff;
  margin-top: 3rem;
  padding: 2.5rem 0 3rem 0;
  border-radius: 0;
  box-sizing: border-box;
  border-top: 1px solid #eaeaea;
}

.kookpraat-title {
  color: #e06ca9;
  font-size: 2rem;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.kookpraat-squiggle {
  margin-bottom: 1.2rem;
}

.kookpraat-desc {
  color: #888;
  font-size: 1.08rem;
  margin-bottom: 2.2rem;
  word-break: break-word;
}

.kookpraat-comment-header {
  color: #7fa184;
  font-size: 1.08rem;
}

.kookpraat-action {
  color: #7fa184 !important;
  font-size: 1.08rem;
}

.kookpraat-comment-body {
  color: #888;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Responsive styles for kookpraat_desc */


@media (max-width: 600px) {
  .kookpraat-desc {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    max-width: 100vw;
    font-size: 0.97rem;
    line-height: 1.5;
  }
}

.kookpraat-form-row {
  display: flex;
  align-items: flex-start;
  margin: 0 2.5rem 2.5rem 2.5rem;
  width: calc(100% - 5rem);
  box-sizing: border-box;
  gap: 1.2rem;
}

.kookpraat-form {
  display: flex;
  flex: 1 1 auto;
  align-items: flex-start;
  background: #fcfcfc;
  border: 1px dashed #b3c7e6;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  gap: 1.2rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
}

.kookpraat-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
}

/* Responsive styles for Kookpraat form row */
@media (max-width: 900px) {
  .kookpraat-form-row {
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
  }
}

@media (max-width: 600px) {
  .kookpraat-form-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    width: calc(100% - 0.4rem);
  }

  .kookpraat-avatar {
    width: 38px;
    height: 38px;
    margin-bottom: 0.5rem;
  }

  .kookpraat-form {
    padding: 1rem 0.5rem;
  }
}

.kookpraat-action {
  cursor: pointer;
  transition: color 0.2s;
  background: none;
  border: none;
  color: #7fa184;
  font-size: 0.9rem;
  padding-right: 10px;
  font-family: inherit;
}

.kookpraat-action:hover {
  color: #b3b3b3;
  text-decoration: underline;
}

.kookpraat-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kookpraat-input {
  width: 100%;
  min-height: 48px;
  border: none;
  background: transparent;
  font-size: 1.08rem;
  color: #7fa184;
  font-family: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  padding: 0.5rem 0.7rem;
}

.kookpraat-input-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 0;
  justify-content: space-between;
  gap: 0.5rem;
}

.comment-btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.send-message {
  display: flex;
  align-items: center;
}

.send-message img {
  cursor: pointer;
  transition: opacity 0.2s;
}

.comment-btns img {
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-message img:hover {
  opacity: 0.7;
}

.comment-btns img:hover {
  opacity: 0.7;
}


/* Responsive adjustments */
@media (max-width: 600px) {
  .kookpraat-input-actions {
    gap: 0.3rem;
  }

  .comment-btns {
    gap: 0.3rem;
  }
}

.bankhangen-form-row {
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  padding: 10px 0px;
  gap: 1.2rem;
}

.bankhangen-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #eee;
  flex-shrink: 0;
}

.bankhangen-form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1rem;
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

@media (max-width: 499px) {
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


.custom-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 2rem;
  font-family: inherit;
}

.custom-pagination .arrow {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
}

.custom-pagination .arrow.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.custom-pagination .page-number {
  font-size: 1rem;
  color: #888;
  margin: 0 0.2rem;
  cursor: pointer;
  padding: 0 6px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  font-weight: 400;
}

.custom-pagination .page-number.active {
  color: #e06ca9;
  font-weight: 700;

}
</style>
