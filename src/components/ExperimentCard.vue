<script setup>
defineProps({
  p: { type: Object, required: true },
  index: { type: Number, default: 0 },
})
</script>

<template>
  <RouterLink :to="`/experiments/${p.slug}`" class="card" :style="{ '--acc': p.accent, '--r': (index % 3 - 1) * 0.8 + 'deg' }">
    <div class="photo">
      <span class="tape" />
      <img v-if="p.cover" :src="p.cover" :alt="`${p.title} — cover`" loading="lazy" />
      <div v-else class="placeholder"><span class="hand">no photos yet</span></div>
      <span class="hand cap">{{ p.note }}</span>
    </div>
    <div class="meta">
      <div class="top">
        <span class="mono code">{{ p.code }}</span>
        <span class="status"><span class="dot" />{{ p.status }}</span>
      </div>
      <h3>{{ p.title }}</h3>
      <p class="tl">{{ p.tagline }}</p>
      <p class="domains">{{ p.domains.join(' · ') }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.card { display: flex; flex-direction: column; gap: 16px; text-decoration: none; }
.photo {
  position: relative; padding: 8px 8px 0; background: #fffdf7; rotate: var(--r);
  box-shadow: 0 1px 1px rgba(0,0,0,.06), 0 14px 26px -16px rgba(50,30,10,.45);
  transition: rotate .3s, transform .3s;
}
.card:hover .photo { rotate: 0deg; transform: translateY(-4px); }
.tape { position: absolute; top: -9px; left: 50%; width: 70px; height: 20px; translate: -50% 0; rotate: -2deg; background: var(--tape); z-index: 1; }
.photo img, .placeholder { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
.placeholder { display: grid; place-items: center; background: repeating-linear-gradient(-45deg, #f1ead9 0 10px, #ebe2cd 10px 20px); }
.placeholder .hand { color: #8a7f6b; font-size: 26px; }
.cap { display: block; padding: 6px 2px 10px; color: #3a332a; font-size: 22px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.meta { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; }
.top { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.code { font-size: 11px; color: var(--faint); }
.status { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); }
.status .dot { color: var(--acc); width: 8px; height: 8px; }
h3 { font-size: 24px; font-weight: 750; letter-spacing: -0.02em; margin-top: 2px; transition: color .15s; }
.card:hover h3 { color: var(--signal-ink); }
.tl { color: var(--muted); font-size: 15px; }
.domains { font-size: 13px; color: var(--faint); margin-top: 4px; }
</style>
