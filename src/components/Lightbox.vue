<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { lightbox, closeLightbox } from '../composables/lightbox'

const open = computed(() => lightbox.index >= 0)
const item = computed(() => lightbox.items[lightbox.index])
const step = (d) => {
  const n = lightbox.items.length
  lightbox.index = (lightbox.index + d + n) % n
}
const onKey = (e) => {
  if (!open.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
watch(open, (v) => (document.documentElement.style.overflow = v ? 'hidden' : ''))
</script>

<template>
  <Transition name="lb">
    <div v-if="open" class="lb" role="dialog" aria-modal="true" @click.self="closeLightbox">
      <div class="top mono">
        <span>{{ lightbox.index + 1 }} / {{ lightbox.items.length }}</span>
        <button class="x" @click="closeLightbox" aria-label="Close">ESC ✕</button>
      </div>
      <figure @click.self="closeLightbox">
        <img :src="item.src" :alt="item.cap || ''" :key="item.src" />
        <figcaption v-if="item.cap" class="mono">{{ item.cap }}</figcaption>
      </figure>
      <template v-if="lightbox.items.length > 1">
        <button class="nav prev" @click="step(-1)" aria-label="Previous">←</button>
        <button class="nav next" @click="step(1)" aria-label="Next">→</button>
      </template>
    </div>
  </Transition>
</template>

<style scoped>
.lb {
  position: fixed; inset: 0; z-index: 90;
  background: rgba(8, 9, 8, 0.94);
  color: #e8e9e3;
  display: grid; grid-template-rows: auto 1fr; padding: 16px var(--gutter) 24px;
}
.top { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #9a9d95; }
.x { background: none; border: 1px solid rgba(255,255,255,.2); padding: 8px 10px; cursor: pointer; color: inherit; font: inherit; }
.x:hover { border-color: #fff; color: #fff; }
figure { margin: 0; display: grid; place-items: center; min-height: 0; gap: 12px; padding: 12px 40px; }
img { max-height: calc(100vh - 140px); max-width: 100%; object-fit: contain; animation: zin .25s ease; }
@keyframes zin { from { opacity: 0; transform: scale(.98); } }
figcaption { font-size: 12px; color: #9a9d95; text-align: center; }
.nav {
  position: absolute; top: 50%; translate: 0 -50%;
  width: 44px; height: 44px; border: 1px solid rgba(255,255,255,.2); background: rgba(0,0,0,.4);
  color: #fff; cursor: pointer; font-size: 18px;
}
.nav:hover { background: #e8a29c; color: #111; border-color: #e8a29c; }
.prev { left: 12px; } .next { right: 12px; }
.lb-enter-active, .lb-leave-active { transition: opacity .2s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }
@media (max-width: 600px) { figure { padding: 12px 0; } .nav { top: auto; bottom: 16px; translate: none; } }
</style>
