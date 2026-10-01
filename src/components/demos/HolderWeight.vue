<script setup>
// Custom cardholder vs. off-the-shelf printable holders.
// Source figures: < 1 g per custom holder; 52 off-the-shelf holders weigh 700+ g.
import { ref, computed } from 'vue'
import DemoFrame from '../DemoFrame.vue'

const n = ref(52)
const CUSTOM = 1
const STOCK = 700 / 52
const custom = computed(() => n.value * CUSTOM)
const stock = computed(() => n.value * STOCK)
const saved = computed(() => Math.round(stock.value - custom.value))
const max = 104 * STOCK
</script>

<template>
  <DemoFrame title="Holder weight per box" code="EXPC · HOLDER">
    <label class="label" for="hw">Holders in the box: <b class="mono">{{ n }}</b></label>
    <input id="hw" type="range" min="1" max="104" v-model.number="n" />
    <div class="bars">
      <div class="bar">
        <span class="mono k">Custom · 20×15×10 mm</span>
        <div class="track"><div class="fill sig" :style="{ width: (custom / max) * 100 + '%' }" /></div>
        <span class="mono v">≤ {{ Math.round(custom) }} g</span>
      </div>
      <div class="bar">
        <span class="mono k">Off-the-shelf · ~25 cm</span>
        <div class="track"><div class="fill" :style="{ width: (stock / max) * 100 + '%' }" /></div>
        <span class="mono v">≈ {{ Math.round(stock) }} g</span>
      </div>
    </div>
    <p class="save"><span class="display">−{{ saved }} g</span> <span class="label">lighter box</span></p>
    <template #foot>Printed on a Bambu Lab P1S · Polymaker PLA · slot to shrink from 1 mm → 0.2 mm for 200 gsm cards</template>
  </DemoFrame>
</template>

<style scoped>
.label b { color: var(--ink); }
.bars { display: grid; gap: 12px; margin-top: 14px; }
.bar { display: grid; grid-template-columns: 170px 1fr 70px; gap: 12px; align-items: center; }
.k { font-size: 10px; color: var(--muted); }
.track { height: 18px; background: var(--panel-2); border: 1px solid var(--line); }
.fill { height: 100%; background: var(--ink); transition: width .2s; min-width: 2px; }
.fill.sig { background: var(--signal); }
.v { font-size: 12px; text-align: right; font-variant-numeric: tabular-nums; }
.save { margin-top: 16px; display: flex; align-items: baseline; gap: 10px; }
.save .display { font-size: 40px; font-variant-numeric: tabular-nums; }
@media (max-width: 560px) { .bar { grid-template-columns: 1fr 60px; } .k { grid-column: 1 / -1; } }
</style>
