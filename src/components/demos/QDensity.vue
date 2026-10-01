<script setup>
// How often does a question card come up in a 52-card deck?
import { ref, computed } from 'vue'
import DemoFrame from '../DemoFrame.vue'

const DECK = 52
const q = ref(12)
const every = computed(() => DECK / q.value)
// spread Q-cards evenly through the deck for the strip visualisation
const isQ = computed(() => {
  const s = new Set()
  for (let i = 0; i < q.value; i++) s.add(Math.floor((i * DECK) / q.value))
  return s
})
const verdict = computed(() => {
  if (q.value < 18) return { t: 'Too sparse — players rarely get a chance to play one.', k: 'warn' }
  if (q.value <= 28) return { t: 'Sweet spot — involved without stalling the game.', k: 'ok' }
  return { t: 'Very dense — untested territory; questions may start to stall play.', k: 'warn' }
})
const marks = [{ v: 12, l: 'test 1' }, { v: 24, l: 'final' }]
</script>

<template>
  <DemoFrame title="Q-card density" code="EXPC · TEMPO">
    <div class="row">
      <div class="big">
        <span class="display n">{{ every.toFixed(1) }}</span>
        <span class="label">turns between Q-cards</span>
      </div>
      <div class="ctrl">
        <label class="label" for="qd">Question cards in deck: <b class="mono">{{ q }} / {{ DECK }}</b></label>
        <input id="qd" type="range" min="4" max="40" v-model.number="q" />
        <div class="marks mono">
          <button v-for="m in marks" :key="m.v" @click="q = m.v" :class="{ on: q === m.v }">{{ m.v }} · {{ m.l }}</button>
        </div>
        <p class="v mono" :class="verdict.k">{{ verdict.t }}</p>
      </div>
    </div>
    <div class="strip" aria-hidden="true">
      <i v-for="n in DECK" :key="n" :class="{ q: isQ.has(n - 1) }" />
    </div>
    <template #foot>Tested: 12 Q-cards ≈ one every 4.5 turns felt too few · bumped to 24 ≈ every 2.2 turns</template>
  </DemoFrame>
</template>

<style scoped>
.row { display: grid; grid-template-columns: 180px 1fr; gap: 24px; align-items: center; }
.big { display: flex; flex-direction: column; gap: 6px; }
.n { font-size: 64px; font-variant-numeric: tabular-nums; }
.ctrl b { color: var(--ink); }
.marks { display: flex; gap: 6px; margin-top: 6px; }
.marks button { font: inherit; font-size: 10px; padding: 4px 6px; border: 1px solid var(--line); background: none; cursor: pointer; color: var(--muted); }
.marks button.on { border-color: var(--ink); color: var(--ink); }
.v { font-size: 11px; margin-top: 12px; }
.v.ok { color: var(--signal-ink); }
.v.warn { color: var(--warn); }
.strip { display: grid; grid-template-columns: repeat(52, 1fr); gap: 2px; margin-top: 18px; }
.strip i { height: 34px; border-radius: 2px; background: var(--panel-2); border: 1px solid var(--line); transition: background .2s; }
.strip i.q { background: var(--signal); border-color: color-mix(in srgb, var(--ink) 30%, transparent); }
@media (max-width: 560px) { .row { grid-template-columns: 1fr; } .strip { grid-template-columns: repeat(26, 1fr); } }
</style>
