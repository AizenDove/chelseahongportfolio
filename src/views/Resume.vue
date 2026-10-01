<script setup>
import { ref } from 'vue'
import { profile, projects } from '../data/projects'

const showPreview = ref(false)
</script>

<template>
  <div class="wrap page">
    <header class="ph">
      <p class="hand kick">the paper version</p>
      <h1 class="display title">Résumé</h1>
      <div class="ctas">
        <a :href="profile.resume" class="btn" target="_blank" rel="noopener">Download résumé <span class="arrow">↓</span></a>
        <button class="btn ghost" @click="showPreview = !showPreview">{{ showPreview ? 'Hide' : 'Show' }} document preview</button>
      </div>
    </header>

    <div v-if="showPreview" class="preview panel">
      <iframe :src="profile.resumePreview" title="Résumé preview" loading="lazy" allow="autoplay" />
      <p class="mono fb">Preview not loading? <a :href="profile.resume" target="_blank" rel="noopener">Download the file directly ↗</a></p>
    </div>

    <div class="sheet panel reg">
      <div class="sh">
        <b>{{ profile.name }}</b>
        <span>{{ profile.role }}</span>
        <span>{{ profile.location }}</span>
      </div>

      <div class="cols">
        <section>
          <h2 class="h">Education</h2>
          <ul>
            <li v-for="e in profile.education" :key="e.title">
              <span class="mono y">{{ e.years }}</span>
              <div><b>{{ e.title }}</b><small>{{ e.org }}</small></div>
            </li>
          </ul>
          <h2 class="h">Work</h2>
          <ul>
            <li v-for="w in profile.work" :key="w.title">
              <span class="mono y">{{ w.years }}</span>
              <div><b>{{ w.title }}</b><small>{{ w.org }}</small></div>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="h">Projects</h2>
          <ul>
            <li v-for="p in projects" :key="p.slug">
              <span class="mono y">{{ p.code }}</span>
              <div>
                <RouterLink :to="`/experiments/${p.slug}`"><b>{{ p.title }}</b></RouterLink>
                <small>{{ (p.specs.find(([k]) => k === 'Role') || p.specs[0])[1] }}</small>
              </div>
            </li>
          </ul>
          <h2 class="h">Tools</h2>
          <div class="chips">
            <span v-for="c in profile.competencies" :key="c" class="chip">{{ c }}</span>
          </div>
          <h2 class="h">Publication</h2>
          <p class="pub">
            <a href="https://link.springer.com/chapter/10.1007/978-3-032-11043-5_27" target="_blank" rel="noopener">
              Immersive Enhancement of Game Experience by Smell Sensing</a>.
            Games and Learning Alliance (GALA 2025), Springer.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding-top: 56px; }
.kick { font-size: 30px; rotate: -3deg; display: inline-block; }
.title { font-size: clamp(56px, 10vw, 140px); margin: 4px 0 28px; }
.ctas { display: flex; gap: 12px; flex-wrap: wrap; }
.preview { margin-top: 32px; padding: 8px; }
.preview iframe { width: 100%; height: 80vh; border: 0; background: #fff; display: block; }
.fb { font-size: 11px; color: var(--muted); padding: 10px 4px 4px; }
.fb a { color: var(--signal-ink); }
.sheet { margin-top: 48px; padding: 0; }
.sh { display: flex; gap: 24px; flex-wrap: wrap; padding: 14px 24px; border-bottom: 1px solid var(--line); font-size: 14px; color: var(--muted); }
.sh b { color: var(--ink); }
.cols { display: grid; grid-template-columns: 1fr 1fr; }
.cols section { padding: 8px 24px 28px; }
.cols section + section { border-left: 1px solid var(--line); }
.h { font-size: 20px; margin: 26px 0 8px; }
ul { list-style: none; margin: 0; padding: 0; }
li { display: grid; grid-template-columns: 110px 1fr; gap: 14px; padding: 10px 0; border-bottom: 1px solid var(--line); }
.y { font-size: 12px; color: var(--muted); padding-top: 3px; }
li b { display: block; font-weight: 600; }
li small { color: var(--muted); font-size: 13px; }
li a { text-decoration: none; }
li a:hover b { color: var(--signal-ink); }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.pub { color: var(--muted); }
.pub a { color: var(--ink); }
@media (max-width: 800px) {
  .cols { grid-template-columns: 1fr; }
  .cols section + section { border-left: 0; border-top: 1px solid var(--line); }
}
</style>
