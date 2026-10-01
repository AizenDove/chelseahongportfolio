<script setup>
// Food trucks needed for the Halmstad lunch rush: ceil(buyers / (meals per hour × peak hours)).
import { ref, computed } from 'vue'
import DemoFrame from '../DemoFrame.vue'

const ENROLLED = 6226
const buyers = ref(1000)
const rate = ref(100)
const hours = ref(2)
const trucks = computed(() => Math.max(1, Math.ceil(buyers.value / (rate.value * hours.value))))
const util = computed(() => Math.round((buyers.value / (trucks.value * rate.value * hours.value)) * 100))
const share = computed(() => ((buyers.value / ENROLLED) * 100).toFixed(1))
const isBaseline = computed(() => buyers.value === 1000 && rate.value === 100 && hours.value === 2)
const reset = () => { buyers.value = 1000; rate.value = 100; hours.value = 2 }
</script>

<template>
  <DemoFrame title="Food truck capacity model" code="CCR · TRUCKS">
    <div class="grid">
      <div class="ctrls">
        <div>
          <label class="label" for="b">Students buying lunch <b class="mono">{{ buyers.toLocaleString('en') }}</b></label>
          <input id="b" type="range" min="100" max="3000" step="50" v-model.number="buyers" />
          <span class="mono sub">{{ share }}% of {{ ENROLLED.toLocaleString('en') }} enrolled</span>
        </div>
        <div>
          <label class="label" for="r">Meals / hour per truck <b class="mono">{{ rate }}</b></label>
          <input id="r" type="range" min="40" max="200" step="10" v-model.number="rate" />
        </div>
        <div>
          <label class="label" for="h">Peak lunch hours <b class="mono">{{ hours }}</b></label>
          <input id="h" type="range" min="1" max="4" step="1" v-model.number="hours" />
          <span class="mono sub">waves at ~11:00 and ~12:00</span>
        </div>
      </div>
      <div class="out">
        <span class="display n">{{ trucks }}</span>
        <span class="label">trucks needed</span>
        <div class="fleet" aria-hidden="true">
          <TransitionGroup name="t">
            <svg v-for="i in Math.min(trucks, 30)" :key="i" viewBox="0 0 40 24" width="40" height="24">
              <rect x="1" y="4" width="24" height="14" rx="2" fill="var(--signal)" stroke="var(--ink)" stroke-width="1.5" />
              <path d="M25 8h7l5 5v5H25z" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.5" />
              <circle cx="9" cy="19" r="3" fill="var(--ink)" /><circle cx="31" cy="19" r="3" fill="var(--ink)" />
            </svg>
          </TransitionGroup>
        </div>
        <div class="util">
          <span class="mono">Fleet utilisation</span>
          <div class="track"><div class="fill" :style="{ width: util + '%' }" /></div>
          <span class="mono">{{ util }}%</span>
        </div>
      </div>
    </div>
    <template #foot>
      <span v-if="isBaseline">Baseline from the survey: 1,000 buyers · 100 meals/h · 2 peak hours → 5 trucks</span>
      <span v-else>Modified scenario · <button class="lnk" @click="reset">reset to survey baseline</button></span>
    </template>
  </DemoFrame>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.ctrls { display: grid; gap: 16px; }
.label b { color: var(--ink); margin-left: 6px; }
.sub { font-size: 10px; color: var(--faint); }
.out { display: flex; flex-direction: column; gap: 6px; padding: 16px; background: var(--bg); border: 1px solid var(--line); }
.n { font-size: 80px; font-variant-numeric: tabular-nums; }
.fleet { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0; min-height: 24px; }
.t-enter-active, .t-leave-active { transition: all .3s; }
.t-enter-from, .t-leave-to { opacity: 0; transform: translateX(-12px); }
.util { display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: center; font-size: 10px; color: var(--muted); margin-top: auto; }
.track { height: 8px; background: var(--panel-2); border: 1px solid var(--line); }
.fill { height: 100%; background: var(--ink); transition: width .2s; }
.lnk { background: none; border: 0; padding: 0; font: inherit; color: var(--signal-ink); text-decoration: underline; cursor: pointer; }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
</style>
