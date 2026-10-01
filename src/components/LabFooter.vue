<script setup>
import { ref } from 'vue'
import { profile } from '../data/projects'

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const copied = ref(false)
const copy = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    location.href = `mailto:${profile.email}`
  }
}
</script>

<template>
  <footer class="ftr">
    <div class="wrap">
      <div class="cta">
        <p class="hand say">say hej ↓</p>
        <h2 class="display big">Got a project or a question?<br />I’d love to hear it.</h2>
        <p class="sub2">Email is the easiest way to reach me: <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>.</p>
        <div class="row">
          <a class="btn" :href="`mailto:${profile.email}`">Email me <span class="arrow">→</span></a>
          <button class="btn ghost" @click="copy">{{ copied ? 'Copied ✓' : 'Copy address' }}</button>
        </div>
      </div>

      <div class="grid">
        <div>
          <p class="label">Location</p>
          <p>{{ profile.location }}</p>
        </div>
        <div>
          <p class="label">Direct line</p>
          <a :href="profile.phoneHref">{{ profile.phone }}</a>
        </div>
        <div>
          <p class="label">Mail</p>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>
        <div>
          <p class="label">Elsewhere</p>
          <a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a><br />
          <a :href="profile.github" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </div>

      <div class="base">
        <span>© {{ new Date().getFullYear() }} Chelsea Hong</span>
        <span>Helsingborg, Sweden</span>
        <a href="#" @click.prevent="toTop">Back to top ↑</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ftr { margin-top: 120px; border-top: 1px solid var(--line); background: var(--panel); }
.cta { padding: 72px 0 56px; }
.say { font-size: 34px; rotate: -3deg; display: inline-block; }
.big { font-size: clamp(36px, 5.6vw, 76px); margin: 10px 0 18px; text-wrap: balance; }
.sub2 { color: var(--muted); font-size: 17px; margin-bottom: 28px; }
.sub2 a { color: var(--ink); text-decoration-color: var(--rose); text-decoration-thickness: 2px; text-underline-offset: 3px; }
.row { display: flex; gap: 12px; flex-wrap: wrap; }
.grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  padding: 32px 0; border-top: 1px solid var(--line);
}
.grid p.label { margin-bottom: 8px; }
.grid a { text-decoration: none; border-bottom: 1px solid var(--line-strong); }
.grid a:hover { border-color: var(--signal-ink); color: var(--signal-ink); }
.sub { color: var(--muted); font-size: 12px; margin-top: 2px; }
.base {
  display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  padding: 20px 0 28px; border-top: 1px solid var(--line); font: 400 13px var(--f-sans); color: var(--muted);
}
.base a { text-decoration: none; }
.base a:hover { color: var(--ink); }
@media (max-width: 800px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .grid { grid-template-columns: 1fr; } .base span:nth-child(2) { display: none; } }
</style>
