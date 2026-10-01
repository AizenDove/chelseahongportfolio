<script setup>
// Click-to-load YouTube embed: no third-party iframe until the visitor asks for it.
import { ref } from 'vue'
defineProps({ id: String, cap: String })
const playing = ref(false)
</script>

<template>
  <figure class="vid">
    <div class="frame">
      <iframe
        v-if="playing"
        :src="`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`"
        :title="cap || 'Video'" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen
      />
      <button v-else class="poster" @click="playing = true" :aria-label="`Play video: ${cap}`">
        <img :src="`https://i.ytimg.com/vi/${id}/hqdefault.jpg`" alt="" loading="lazy" />
        <span class="play"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 4v16l13-8z" fill="currentColor" /></svg></span>
              </button>
    </div>
    <figcaption v-if="cap">{{ cap }}</figcaption>
  </figure>
</template>

<style scoped>
.vid { margin: 0; }
.frame { position: relative; aspect-ratio: 16 / 9; background: #000; border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; }
iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.poster { position: absolute; inset: 0; padding: 0; border: 0; cursor: pointer; background: #000; }
.poster img { width: 100%; height: 100%; object-fit: cover; opacity: .8; transition: opacity .2s, transform .5s; }
.poster:hover img { opacity: 1; transform: scale(1.02); }
.play {
  position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  width: 68px; height: 68px; display: grid; place-items: center;
  background: var(--rose); color: #111; border-radius: 50%;
  transition: transform .2s; box-shadow: 0 0 0 10px rgba(232, 162, 156, .3);
}
.poster:hover .play { transform: scale(1.08); }
.rec { position: absolute; left: 12px; top: 12px; display: flex; gap: 6px; align-items: center; font-size: 10px; color: #fff; background: rgba(0,0,0,.5); padding: 4px 7px; }
.rec .dot { color: #ff3b3b; animation: b 1.2s infinite; }
@keyframes b { 50% { opacity: .2; } }
figcaption { font-size: 14px; font-style: italic; color: var(--muted); margin-top: 8px; }
</style>
