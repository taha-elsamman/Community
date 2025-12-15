<template>
  <div class="weekmenu-item">
    <div class="weekmenu-img-stack" :class="{ 'reverse': imgPosition === 'right' }">
      <img class="weekmenu-layout" :src="layoutSrc" :alt="imgAlt" />
      <img class="weekmenu-img" :src="imgSrc" :alt="imgAlt" />
    </div>
    <div class="weekmenu-info" :class="{ 'info-right': imgPosition === 'right' }">
      <div class="weekmenu-item-title">{{ title }}</div>
      <div class="weekmenu-item-type">{{ type }}</div>
      <div class="weekmenu-item-meta">
        <span class="weekmenu-meta">
          <i>
            <img :src="iconTime" alt="clock icon" width="25" />
          </i> {{ time }}
        </span>
        <span class="weekmenu-meta">
          <i>
            <img :src="iconUser" alt="user icon" width="25" />
          </i> {{ user }}
        </span>
        <span class="weekmenu-meta">
          <i>
            <img :src="iconComment" alt="comment icon" width="25" />
          </i> {{ comment }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  layoutSrc: { type: String, required: true },
  imgSrc: { type: String, required: true },
  imgAlt: { type: String, default: '' },
  title: { type: String, required: true },
  type: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: [String, Number], required: true },
  comment: { type: [String, Number], required: true },
  imgPosition: { type: String, default: 'left' }
});

const iconTime = props.iconTime || '/public/Icons/time icon.png';
const iconUser = props.iconUser || '/public/Icons/user icon.png';
const iconComment = props.iconComment || '/public/Icons/comment icon.png';
</script>

<style scoped>
.weekmenu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 0.5rem;
  flex-direction: row;
  width: 100%;
  min-width: 0;
}

.weekmenu-img-stack {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  min-height: 150px;
}

.weekmenu-img-stack.reverse {
  order: 2;
}

.weekmenu-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  z-index: 2;
  object-fit: contain;
  pointer-events: none;
}

.weekmenu-img {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 120px;
  height: 120px;
  z-index: 1;
  object-fit: cover;
  border-radius: 50%;
  background: #fff;
}

.weekmenu-info {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: auto;
  min-width: 400px;
  max-width: 400px;
  box-sizing: border-box;
}

.weekmenu-info.info-right {
  align-items: flex-end;
  text-align: right;
  order: 1;
}

.weekmenu-item-title {
  font-size: 1.25rem;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
  word-break: break-word;
}

.weekmenu-item-type {
  font-size: 1rem;
  color: #888;
  font-family: inherit;
  margin-bottom: 0.7rem;
  word-break: break-word;
}

.weekmenu-item-meta {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-size: 1rem;
  color: #9bb89c;
  flex-wrap: wrap;
}

.weekmenu-meta {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}



@media (max-width: 900px) {
  .weekmenu-item {
    gap: 1.2rem;
    width: 100%;
    margin-bottom: 30px;
  }
  .weekmenu-img-stack {
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
  }
  .weekmenu-layout {
    width: 100px;
    height: 100px;
  }
  .weekmenu-img {
    width: 80px;
    height: 80px;
    top: 9px;
    left: 9px;
  }
  .weekmenu-info {
    max-width: 300px;
  }

}

@media (max-width: 600px) {
  .weekmenu-item {
    flex-direction: row; /* Keep image and info side by side */
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    width: 100%;
    margin-bottom: 30px;
    padding: 10px;
  }
  .weekmenu-img-stack {
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
    margin: 0;
  }
  .weekmenu-layout {
    width: 100px;
    height: 100px;
  }
  .weekmenu-img {
    width: 85px;
    height: 80px;
    top: 9px;
    left: 9px;
  }
  .weekmenu-info,
  .weekmenu-info.info-right {
    max-width: 100vw;
    min-width: 0;
    align-items: flex-start !important;
    text-align: left !important;
    order: unset;
    width: auto;
  }
  .weekmenu-item-title {
    font-size: 1rem;
  }
  .weekmenu-item-type {
    font-size: 0.9rem;
  }
  .weekmenu-item-meta {
    font-size: 0.9rem;
    gap: 0.7rem;
    flex-wrap: wrap;
  }
}
</style>
