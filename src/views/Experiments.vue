<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ExperimentCard from '../components/ExperimentCard.vue'
import { projects, DOMAINS } from '../data/projects'

const route = useRoute()
const router = useRouter()

const domain = ref(route.query.d || 'All')
const q = ref('')
const view = ref((() => { try { return localStorage.getItem('lab-view') || 'grid' } catch { return 'grid' } })())
watch(view, (v) => { try { localStorage.setItem('lab-view', v) } catch {} })
watch(domain, (d) => router.replace({ query: d === 'All' ? {} : { d } }))

const counts = computed(() =>
  Object.fromEntries(DOMAINS.map((d) => [d, projects.filter((p) => p.domains.includes(d)).length])),
)

const list = computed(() => {
  const s = q.value.trim().toLowerCase()
  return projects.filter(
    (p) =>
      (domain.value === 'All' || p.domains.includes(domain.value)) &&
      (!s || [p.title, p.tagline, p.summary, p.code, ...p.specs.flat()].join(' ').toLowerCase().includes(s)),
  )
})
const roleOf = (p) => (p.specs.find(([k]) => k === 'Role') || p.specs[0])[1]
</script>

<template>
  <div class="wrap page">
    <header class="ph">
      <p class="hand kick">everything so far ↓</p>
      <h1 class="display title">Work</h1>
      <p class="lede">
        VR research, hardware I’ve modified, a card game and an app — with my role in each.
      </p>
    </header>

    <div class="controls panel">
      <div class="filters" role="group" aria-label="Filter by domain">
        <button class="chip" :class="{ on: domain === 'All' }" @click="domain = 'All'">
          All <span class="n">{{ projects.length }}</span>
        </button>
        <button
          v-for="d in DOMAINS" :key="d" class="chip" :class="{ on: domain === d }"
          @click="domain = d" :aria-pressed="domain === d"
        >
          {{ d }} <span class="n">{{ counts[d] }}</span>
        </button>
      </div>
      <div class="right">
        <label class="search">
          <span class="mono">/</span>
          <input v-model="q" placeholder="Search…" aria-label="Search experiments" />
        </label>
        <div class="seg" role="group" aria-label="View">
          <button :class="{ on: view === 'grid' }" @click="view = 'grid'" aria-label="Grid view">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" fill="currentColor" /></svg>
          </button>
          <button :class="{ on: view === 'table' }" @click="view = 'table'" aria-label="List view">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M1 2h14v2H1zM1 7h14v2H1zM1 12h14v2H1z" fill="currentColor" /></svg>
          </button>
        </div>
      </div>
    </div>

    <p class="count">{{ list.length }} project{{ list.length === 1 ? '' : 's' }}</p>

    <TransitionGroup v-if="view === 'grid'" name="fl" tag="div" class="grid">
      <ExperimentCard v-for="p in list" :key="p.slug" :p="p" :index="projects.indexOf(p)" />
    </TransitionGroup>

    <div v-else class="table" role="table">
      <div class="tr th mono" role="row">
        <span role="columnheader">Code</span><span role="columnheader">Experiment</span>
        <span role="columnheader">Domain</span><span role="columnheader">Role</span>
        <span role="columnheader">Status</span><span role="columnheader">Year</span>
      </div>
      <TransitionGroup name="fl">
        <RouterLink
          v-for="p in list" :key="p.slug" :to="`/experiments/${p.slug}`" class="tr" role="row"
          :style="{ '--acc': p.accent }"
        >
          <span class="mono code">{{ p.code }}</span>
          <span class="t"><b>{{ p.title }}</b><small>{{ p.tagline }}</small></span>
          <span class="mono dim">{{ p.domains.join(' · ') }}</span>
          <span class="dim">{{ roleOf(p) }}</span>
          <span class="mono st"><span class="dot" />{{ p.status }}</span>
          <span class="mono dim">{{ p.year || '—' }}</span>
        </RouterLink>
      </TransitionGroup>
    </div>

    <div v-if="!list.length" class="empty panel mono">
      Nothing matches that. <button class="chip" @click="(q = ''), (domain = 'All')">Reset filters</button>
    </div>
  </div>
</template>

<style scoped>
.page { padding-top: 56px; }
.ph { max-width: 820px; margin-bottom: 40px; }
.kick { font-size: 30px; rotate: -3deg; display: inline-block; }
.title { font-size: clamp(56px, 12vw, 140px); margin: 4px 0 18px; }
.lede { color: var(--muted); font-size: 18px; max-width: 52ch; }

.controls {
  position: sticky; top: 72px; z-index: 10; border-radius: 999px; padding-left: 14px !important;
  display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
  padding: 10px; box-shadow: var(--shadow);
}
.filters { display: flex; gap: 6px; flex-wrap: wrap; }
.n { opacity: .55; margin-left: 2px; }
.right { display: flex; gap: 8px; align-items: center; }
.search { display: flex; align-items: center; gap: 8px; border: 1px solid var(--line); padding: 0 12px; height: 34px; border-radius: 999px; }
.search:focus-within { border-color: var(--ink); }
.search .mono { color: var(--faint); }
.search input { border: 0; outline: 0; background: transparent; color: var(--ink); font: 400 14px var(--f-sans); width: 160px; }
.seg { display: flex; border: 1px solid var(--line); border-radius: 999px; overflow: hidden; }
.seg button { width: 34px; height: 32px; display: grid; place-items: center; border: 0; background: transparent; cursor: pointer; color: var(--muted); }
.seg button.on { background: var(--ink); color: var(--bg); }

.count { font-size: 14px; color: var(--muted); margin: 22px 0 14px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 48px 32px; padding-top: 12px; }

.table { border-top: 1px solid var(--ink); }
.tr {
  display: grid; grid-template-columns: 150px 2.2fr 1.2fr 1.4fr 120px 80px; gap: 16px; align-items: center;
  padding: 16px 8px; border-bottom: 1px solid var(--line); text-decoration: none; transition: background .15s;
}
a.tr:hover { background: var(--panel); }
a.tr:hover .code { background: var(--butter); color: var(--on-signal); }
.th { font: 500 12px var(--f-sans); color: var(--faint); padding: 10px 8px; }
.code { font-size: 12px; padding: 3px 6px; justify-self: start; transition: background .15s; }
.t { display: flex; flex-direction: column; }
.t b { font: 700 18px/1.2 var(--f-display); font-variation-settings: 'wdth' 106; }
.t small { color: var(--muted); font-size: 13px; }
.dim { color: var(--muted); font-size: 13px; }
.mono.dim { font-size: 11px; }
.st { display: flex; align-items: center; gap: 6px; font: 400 13px var(--f-sans); }
.st .dot { color: var(--acc); }

.empty { padding: 32px; display: flex; gap: 16px; align-items: center; font-size: 13px; color: var(--muted); }

.fl-move, .fl-enter-active, .fl-leave-active { transition: all .35s ease; }
.fl-enter-from, .fl-leave-to { opacity: 0; transform: scale(.97); }
.fl-leave-active { position: absolute; visibility: hidden; }

@media (max-width: 900px) {
  .tr { grid-template-columns: 90px 1fr 110px; }
  .tr > :nth-child(3), .tr > :nth-child(4), .tr > :nth-child(6) { display: none; }
  .controls { position: static; }
}
@media (max-width: 560px) {
  .right { width: 100%; }
  .search { flex: 1; }
  .search input { width: 100%; }
  .tr { grid-template-columns: 1fr auto; }
  .tr > .code, .th > :first-child { display: none; }
}
</style>
