<script setup>
// A messy desk of taped-down photos. Drag them around; a click without dragging opens the project.
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const m = (f) => `${import.meta.env.BASE_URL}media/${f}`
const router = useRouter()

const props = defineProps({ items: Array })
const photos = reactive(props.items?.map((p) => ({ ...p })) ?? [
  { src: m('home-12.webp'), cap: 'the scent rig, mid-build', to: 'olfactory', x: 6, y: 4, r: -5, w: 46 },
  { src: m('expconnect-11.webp'), cap: 'EXP Connect, boxed!', to: 'expconnect', x: 50, y: 0, r: 4, w: 44 },
  { src: m('vr-pole-dancers-01.webp'), cap: 'live mocap, no animation', to: 'vr-pole-dancers', x: 54, y: 46, r: -3, w: 40 },
  { src: m('vr-looking-glass-03.webp'), cap: 'preview orb at Lilla Böslid', to: 'vr-looking-glass', x: 2, y: 50, r: 3, w: 50 },
])
const order = ref(photos.map((_, i) => i))
const host = ref(null)

let drag = null
const down = (e, i) => {
  const r = host.value.getBoundingClientRect()
  drag = { i, sx: e.clientX, sy: e.clientY, ox: photos[i].x, oy: photos[i].y, W: r.width, H: r.height, moved: false }
  order.value = [...order.value.filter((k) => k !== i), i]
  e.currentTarget.setPointerCapture(e.pointerId)
}
const move = (e) => {
  if (!drag) return
  const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy
  if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true
  const p = photos[drag.i]
  p.x = Math.max(-10, Math.min(80, drag.ox + (dx / drag.W) * 100))
  p.y = Math.max(-10, Math.min(75, drag.oy + (dy / drag.H) * 100))
}
const up = () => {
  if (drag && !drag.moved) router.push(`/experiments/${photos[drag.i].to}`)
  drag = null
}
</script>

<template>
  <div ref="host" class="desk">
    <figure
      v-for="(p, i) in photos" :key="p.src" class="photo"
      :style="{ left: p.x + '%', top: p.y + '%', width: p.w + '%', '--r': p.r + 'deg', zIndex: order.indexOf(i) + 1 }"
      @pointerdown.prevent="down($event, i)" @pointermove="move" @pointerup="up" @pointercancel="drag = null"
      tabindex="0" role="link" :aria-label="`${p.cap} — open project`"
      @keydown.enter="router.push(`/experiments/${p.to}`)"
    >
      <span class="tape" />
      <img :src="p.src" :alt="p.cap" draggable="false" />
      <figcaption class="hand">{{ p.cap }}</figcaption>
    </figure>
    <p class="hint hand"></p>
  </div>
</template>

<style scoped>
.desk { position: relative; aspect-ratio: 1 / 0.95; touch-action: none; }
.photo {
  position: absolute; margin: 0; padding: 8px 8px 0; background: #fffdf7;
  box-shadow: 0 1px 1px rgba(0,0,0,.08), 0 12px 24px -12px rgba(50,30,10,.45);
  transform: rotate(var(--r)); cursor: grab; user-select: none;
  transition: transform .25s cubic-bezier(.3,1.4,.5,1), box-shadow .25s;
}
.photo:hover { transform: rotate(calc(var(--r) * .4)) scale(1.02); }
.photo:active { cursor: grabbing; transform: rotate(0deg) scale(1.04); box-shadow: 0 2px 2px rgba(0,0,0,.08), 0 26px 40px -16px rgba(50,30,10,.5); }
.photo img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; pointer-events: none; }
figcaption { color: #3a332a; font-size: 22px; padding: 6px 2px 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tape {
  position: absolute; top: -10px; left: 50%; width: 76px; height: 22px; translate: -50% 0; rotate: -3deg;
  background: var(--tape); box-shadow: 0 1px 2px rgba(0,0,0,.08);
}
.photo:nth-child(2n) .tape { rotate: 4deg; left: 30%; }
.hint { position: absolute; right: 2%; bottom: -4%; font-size: 22px; color: var(--muted); rotate: -2deg; pointer-events: none; }
@media (max-width: 560px) { figcaption { font-size: 17px; } .photo { padding: 5px 5px 0; } }
</style>
