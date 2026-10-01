<script setup>
// Capsule array of the scent headset: early prototypes held 3 capsules, KV7 holds 8.
// Fire a capsule to release a puff through the nozzle ring.
import { ref, computed } from 'vue'
import DemoFrame from '../DemoFrame.vue'

const kv = ref(7)
const count = computed(() => (kv.value === 7 ? 8 : 3))
const puffs = ref([])
const fired = ref(0)
const last = ref(null)
let id = 0

const caps = computed(() =>
  Array.from({ length: count.value }, (_, i) => {
    const a = (i / count.value) * Math.PI * 2 - Math.PI / 2
    return { i, x: 50 + Math.cos(a) * 34, y: 50 + Math.sin(a) * 34, a }
  }),
)

const fire = (c) => {
  fired.value++
  last.value = c.i
  const n = 10
  for (let k = 0; k < n; k++) {
    const spread = (Math.random() - 0.5) * 0.9
    puffs.value.push({
      id: id++, x: c.x, y: c.y,
      dx: Math.cos(c.a + Math.PI + spread) * (50 + Math.random() * 60),
      dy: Math.sin(c.a + Math.PI + spread) * (50 + Math.random() * 60),
      s: 6 + Math.random() * 10,
    })
  }
  setTimeout(() => (puffs.value = puffs.value.slice(n)), 1300)
}
const sweep = () => caps.value.forEach((c, k) => setTimeout(() => fire(c), k * 140))
</script>

<template>
  <DemoFrame title="Scent capsule array" code="OLF · ARRAY">
    <div class="wrap2">
      <div class="dev" :class="`kv${kv}`">
        <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" stroke-dasharray="1 2" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" />
          <path d="M50 30v40M30 50h40" stroke="currentColor" stroke-width=".5" />
        </svg>
        <span
          v-for="p in puffs" :key="p.id" class="puff"
          :style="{ left: p.x + '%', top: p.y + '%', '--dx': p.dx + 'px', '--dy': p.dy + 'px', width: p.s + 'px', height: p.s + 'px' }"
        />
        <button
          v-for="c in caps" :key="kv + '-' + c.i" class="cap mono" :class="{ hit: last === c.i }"
          :style="{ left: c.x + '%', top: c.y + '%' }" @click="fire(c)" :aria-label="`Fire capsule ${c.i + 1}`"
        >{{ String(c.i + 1).padStart(2, '0') }}</button>
        <span class="core mono">nozzle</span>
      </div>

      <div class="side">
        <div class="seg" role="group" aria-label="Prototype">
          <button :class="{ on: kv === 1 }" @click="kv = 1">Early · 3 capsules</button>
          <button :class="{ on: kv === 7 }" @click="kv = 7">KV7 · 8 capsules</button>
        </div>
        <div class="read">
          <div><span class="label">Capacity</span><b class="display">{{ count }}</b></div>
          <div><span class="label">Releases</span><b class="display">{{ String(fired).padStart(2, '0') }}</b></div>
        </div>
        <button class="btn ghost" @click="sweep">Run sweep test</button>
        <p class="mono note">Click a capsule to release a puff toward the nozzle.</p>
      </div>
    </div>
    <template #foot>Upgrade path: hardware moved to the back for counter-balance · adjustable nozzles · fully 3D-printable DIY build</template>
  </DemoFrame>
</template>

<style scoped>
.wrap2 { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 24px; align-items: center; }
.dev { position: relative; aspect-ratio: 1; max-width: 360px; width: 100%; margin: 0 auto; color: var(--line-strong); }
.ring { position: absolute; inset: 0; width: 100%; height: 100%; }
.cap {
  position: absolute; translate: -50% -50%; width: 44px; height: 44px; border-radius: 50%;
  border: 1.5px solid var(--ink); background: var(--panel); color: var(--ink); font-size: 11px; cursor: pointer;
  transition: transform .15s, background .15s; animation: in .35s backwards;
}
@keyframes in { from { transform: scale(0); } }
.cap:hover { background: var(--panel-2); transform: scale(1.08); }
.cap.hit { background: var(--signal); color: #111; }
.cap:active { transform: scale(.92); }
.core { position: absolute; left: 50%; top: 50%; translate: -50% -50%; font-size: 9px; color: var(--muted); }
.puff {
  position: absolute; border-radius: 50%; background: var(--signal); translate: -50% -50%; pointer-events: none;
  animation: puff 1.2s ease-out forwards;
}
@keyframes puff {
  from { opacity: .9; transform: translate(0, 0) scale(.6); }
  to { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(2.4); }
}
.side { display: flex; flex-direction: column; gap: 16px; }
.seg { display: grid; border: 1px solid var(--line); }
.seg button { font: 500 11px var(--f-mono); padding: 10px; border: 0; background: transparent; cursor: pointer; color: var(--muted); text-align: left; }
.seg button + button { border-top: 1px solid var(--line); }
.seg button.on { background: var(--ink); color: var(--bg); }
.read { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.read div { display: flex; flex-direction: column; gap: 4px; }
.read b { font-size: 44px; font-variant-numeric: tabular-nums; }
.note { font-size: 10px; color: var(--faint); }
@media (max-width: 640px) { .wrap2 { grid-template-columns: 1fr; } }
</style>
