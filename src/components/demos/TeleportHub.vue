<script setup>
// Recreation of the Looking Glass hub: approach a pedestal to see its preview orb,
// press to teleport. Toggle "naive skybox swap" to see the original immersion bug.
import { ref, computed } from 'vue'
import DemoFrame from '../DemoFrame.vue'

const m = (f) => `${import.meta.env.BASE_URL}media/${f}`
const MAP = m('vr-looking-glass-04.webp')
const POIS = [
  { id: 'forest', name: 'Forest view', src: m('vr-looking-glass-05.webp'), x: 30, y: 62 },
  { id: 'drone', name: 'Drone shot · 120 m', src: m('vr-looking-glass-06.webp'), x: 64, y: 30 },
  { id: 'field', name: 'Countryside', src: m('vr-looking-glass-12.webp'), x: 72, y: 72 },
]

const at = ref(null)          // current destination (null = hub)
const near = ref(null)        // pedestal being approached
const naive = ref(false)
const flash = ref(false)
const pan = ref(50)
const log = ref(['> hub loaded · 6 DoF · map of Lilla Böslid'])
const push = (l) => { log.value.push(l); if (log.value.length > 5) log.value.shift() }

const dest = computed(() => POIS.find((p) => p.id === at.value))

const teleport = (p) => {
  flash.value = true
  setTimeout(() => (flash.value = false), 350)
  push(`> pedestal "${p.name}" pressed`)
  if (naive.value) push('> skybox swapped · hub geometry still rendered ✕')
  else push('> player.z += 10 000 · hub beyond render distance ✓')
  push('> mode: 3 DoF · look around')
  at.value = p.id
  near.value = null
  pan.value = 50
}
const home = () => {
  push('> home pillar · return to hub · 6 DoF')
  at.value = null
}

// drag to look around (3 DoF)
let dragging = false, sx = 0, sp = 0
const down = (e) => { dragging = true; sx = e.clientX; sp = pan.value; e.currentTarget.setPointerCapture?.(e.pointerId) }
const move = (e) => { if (dragging) pan.value = Math.max(0, Math.min(100, sp - (e.clientX - sx) / 6)) }
const up = () => (dragging = false)
const onKey = (e) => {
  if (e.key === 'ArrowLeft') pan.value = Math.max(0, pan.value - 5)
  if (e.key === 'ArrowRight') pan.value = Math.min(100, pan.value + 5)
}
</script>

<template>
  <DemoFrame title="Pedestal hub & preview orbs" code="LKG · HUB">
    <div class="opts">
      <label class="tog mono"><input type="checkbox" v-model="naive" /> <span class="sw" /> Naive skybox swap (original bug)</label>
      <span class="mono where">{{ at ? '3 DoF · ' + dest.name : '6 DoF · hub' }}</span>
    </div>

    <div class="viewport" :class="{ flash }">
      <!-- destination "skybox" -->
      <Transition name="fade">
        <div
          v-if="dest" class="sky" :style="{ backgroundImage: `url(${dest.src})`, backgroundPosition: `${pan}% 50%` }"
          tabindex="0" aria-label="Drag or use arrow keys to look around"
          @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @keydown="onKey"
        />
      </Transition>

      <!-- hub: visible when at hub, or bleeding through in naive mode -->
      <div class="hub" :class="{ ghost: dest && naive }" v-show="!dest || naive">
        <img :src="MAP" alt="Top-down map of Lilla Böslid used as the hub floor" class="map" draggable="false" />
        <div
          v-for="p in POIS" :key="p.id" class="ped" :style="{ left: p.x + '%', top: p.y + '%' }"
          @pointerenter="near = p.id" @pointerleave="near = null"
        >
          <div class="orb" :class="{ show: near === p.id }" :style="{ backgroundImage: `url(${p.src})` }" />
          <button
            class="press mono" @click="teleport(p)" @focus="near = p.id" @blur="near = null"
            :disabled="!!dest" :aria-label="`Teleport to ${p.name}`"
          >
            <span class="btnr" /> {{ p.name }}
          </button>
        </div>
      </div>

      <button v-if="dest" class="pillar mono" @click="home">
        <span class="pi" /> Home pillar
      </button>
      <span v-if="dest" class="look mono">⟵ drag to look around ⟶</span>
    </div>

    <pre class="log mono" aria-live="polite">{{ log.join('\n') }}</pre>
    <template #foot>Hover/focus a pedestal to approach it — its orb previews the destination before you commit.</template>
  </DemoFrame>
</template>

<style scoped>
.opts { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.tog { display: flex; align-items: center; gap: 8px; font-size: 11px; cursor: pointer; }
.tog input { position: absolute; opacity: 0; }
.sw { width: 30px; height: 16px; border: 1px solid var(--line-strong); border-radius: 10px; position: relative; transition: background .2s; }
.sw::after { content: ''; position: absolute; top: 2px; left: 2px; width: 10px; height: 10px; border-radius: 50%; background: var(--ink); transition: transform .2s; }
.tog input:checked + .sw { background: var(--warn); border-color: var(--warn); }
.tog input:checked + .sw::after { transform: translateX(14px); }
.tog input:focus-visible + .sw { outline: 2px solid var(--signal-ink); outline-offset: 2px; }
.where { font-size: 11px; color: var(--signal-ink); }

.viewport { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border: 1px solid var(--line); background: #111; border-radius: 2px; user-select: none; }
.viewport::after { content: ''; position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; transition: opacity .35s; }
.viewport.flash::after { opacity: .7; transition: none; }
.sky { position: absolute; inset: 0; background-size: auto 130%; cursor: grab; touch-action: pan-y; }
.sky:active { cursor: grabbing; }
.hub { position: absolute; inset: 0; transition: opacity .3s; }
.hub.ghost { opacity: .75; pointer-events: none; }
.hub.ghost .map { opacity: .5; }
.map { width: 100%; height: 100%; object-fit: cover; filter: saturate(.8) brightness(.85); }
.ped { position: absolute; translate: -50% -100%; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.orb {
  width: 84px; height: 84px; border-radius: 50%; background-size: cover; background-position: center;
  border: 2px solid rgba(255,255,255,.9); box-shadow: 0 0 0 4px rgba(232,162,156,.45), 0 10px 30px rgba(0,0,0,.5);
  transform: scale(.35); opacity: .6; transition: transform .3s cubic-bezier(.3,1.4,.5,1), opacity .3s;
}
.orb.show { transform: scale(1); opacity: 1; }
.press {
  display: flex; align-items: center; gap: 6px; font-size: 10px; padding: 6px 8px;
  background: rgba(12,12,12,.85); color: #fff; border: 1px solid rgba(255,255,255,.25); cursor: pointer; white-space: nowrap;
}
.press:hover { border-color: #e8a29c; }
.btnr { width: 9px; height: 9px; border-radius: 50%; background: #ff3b3b; box-shadow: 0 0 0 2px rgba(255,59,59,.3); }
.pillar {
  position: absolute; left: 50%; bottom: 14px; translate: -50% 0; display: flex; align-items: center; gap: 8px;
  padding: 9px 14px; font-size: 12px; background: #f2dfb0; color: #111; border: 0; border-radius: 999px; cursor: pointer;
}
.pi { width: 8px; height: 16px; background: #111; }
.look { position: absolute; top: 12px; left: 50%; translate: -50% 0; font-size: 10px; color: #fff; background: rgba(0,0,0,.45); padding: 4px 8px; pointer-events: none; }
.log { margin: 12px 0 0; padding: 10px 12px; background: #1f1c18; color: #f2dfb0; font-size: 11px; line-height: 1.6; min-height: 92px; border-radius: 2px; white-space: pre-wrap; }
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (max-width: 560px) {
  .viewport { aspect-ratio: 4 / 5; }
  .orb { width: 64px; height: 64px; }
}
</style>
