<script setup>
defineProps({ title: String, code: String })
</script>

<template>
  <section class="demo">
    <header class="dh">
      <span class="hand tag">try it ↓</span>
      <span class="t">{{ title }}</span>
    </header>
    <div class="db"><slot /></div>
    <footer v-if="$slots.foot" class="df"><slot name="foot" /></footer>
  </section>
</template>

<style scoped>
.demo { position: relative; border: 1.5px dashed var(--line-strong); background: var(--panel); border-radius: 10px; margin: 18px 0 8px; }
.dh { display: flex; align-items: baseline; gap: 12px; padding: 14px 18px 0; }
.tag { position: absolute; top: -20px; left: 14px; font-size: 30px; background: var(--bg); padding: 0 6px; rotate: -3deg; }
.t { font: 650 17px var(--f-display); letter-spacing: -0.01em; padding-top: 6px; }
.db { padding: 16px 18px 18px; }
.df { border-top: 1px dashed var(--line); padding: 10px 18px; font-size: 13px; color: var(--muted); }
@media (max-width: 500px) { .db { padding: 14px; } }
</style>
