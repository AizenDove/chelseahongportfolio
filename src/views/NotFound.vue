<template>
  <div class="wrap nf">
    <p class="label">Error · specimen not found</p>
    <h1 class="display big">404</h1>
    <p class="muted">This sample was never catalogued — or it escaped containment.</p>
    <RouterLink to="/experiments" class="btn">Back to the experiment log <span class="arrow">→</span></RouterLink>
  </div>
</template>

<style scoped>
.nf { padding: 80px var(--gutter) 40px; display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
.big { font-size: clamp(120px, 26vw, 360px); color: transparent; -webkit-text-stroke: 2px var(--ink); }
.muted { color: var(--muted); font-size: 18px; }
</style>
