<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import Blocks from '../components/Blocks.vue'
import NotFound from './NotFound.vue'
import { projects, bySlug } from '../data/projects'
import { openLightbox } from '../composables/lightbox'

const props = defineProps({ slug: String })
const p = computed(() => bySlug[props.slug])
const idx = computed(() => projects.indexOf(p.value))
const prev = computed(() => projects[(idx.value - 1 + projects.length) % projects.length])
const next = computed(() => projects[(idx.value + 1) % projects.length])

watch(p, (v) => { if (v) document.title = `${v.title} — Chelsea Hong` }, { immediate: true })
onUnmounted(() => (document.title = 'Chelsea Hong — immersive experience designer'))

// scroll spy + reading progress
const current = ref('')
const progress = ref(0)
let io
const onScroll = () => {
  const el = document.documentElement
  progress.value = Math.min(1, el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight))
}
onMounted(async () => {
  await nextTick()
  io = new IntersectionObserver(
    (entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (vis[0]) current.value = vis[0].target.id
    },
    { rootMargin: '-20% 0px -65% 0px' },
  )
  document.querySelectorAll('.sec[id]').forEach((s) => io.observe(s))
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => { io?.disconnect(); window.removeEventListener('scroll', onScroll) })

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
</script>

<template>
  <NotFound v-if="!p" />
  <article v-else class="proj" :style="{ '--acc': p.accent }">
    <div class="progress" :style="{ transform: `scaleX(${progress})` }" />

    <header class="wrap ph">
      <nav class="crumb mono" aria-label="Breadcrumb">
        <RouterLink to="/experiments">← All work</RouterLink>
      </nav>
      <div class="hgrid">
        <div>
          <div class="chips">
            <span class="chip st"><span class="dot" />{{ p.status }}</span>
            <span v-for="d in p.domains" :key="d" class="chip">{{ d }}</span>
          </div>
          <h1 class="display title" :class="{ long: p.headline.length > 28 }">{{ p.headline }}</h1>
          <p class="tagline">{{ p.tagline }}</p>
          <p class="hand mnote">{{ p.note }}</p>
        </div>
        <aside class="sheet panel reg">
          <button v-if="p.cover" class="cover" @click="openLightbox([{ src: p.cover, cap: p.title }])" aria-label="Enlarge cover">
            <img :src="p.cover" :alt="`${p.title} — cover`" />
          </button>
          <div class="sh"><span>At a glance</span><span class="hand">{{ p.code }}</span></div>
          <dl>
            <template v-for="[k, v] in p.specs" :key="k">
              <dt>{{ k }}</dt><dd>{{ v }}</dd>
            </template>
            <template v-if="p.year"><dt>Year</dt><dd>{{ p.year }}</dd></template>
          </dl>
        </aside>
      </div>
    </header>

    <div class="wrap body">
      <nav class="toc" aria-label="Sections">
        <p class="label">On this page</p>
        <ol>
          <li v-for="(s, i) in p.sections" :key="s.id">
            <a :href="`#${s.id}`" :class="{ on: current === s.id }" @click.prevent="go(s.id)">
              {{ s.title }}
            </a>
          </li>
        </ol>
      </nav>

      <div class="content">
        <section v-for="(s, i) in p.sections" :key="s.id" :id="s.id" class="sec">
          <div class="sec-head">
            <span class="num">{{ i + 1 }}.</span>
            <h2>{{ s.title }}</h2>
          </div>
          <div class="stack"><Blocks :blocks="s.blocks" /></div>
        </section>
      </div>
    </div>

    <nav class="wrap pn" aria-label="More experiments">
      <RouterLink :to="`/experiments/${prev.slug}`" class="pnl">
        <span class="lbl">← Previous</span><b>{{ prev.title }}</b>
      </RouterLink>
      <RouterLink :to="`/experiments/${next.slug}`" class="pnl r">
        <span class="lbl">Next →</span><b>{{ next.title }}</b>
      </RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.progress { position: fixed; top: 64px; left: 0; right: 0; height: 3px; background: var(--rose); transform-origin: 0 50%; z-index: 49; }

.ph { padding-top: 40px; }
.crumb { font-size: 15px; color: var(--muted); display: flex; gap: 8px; margin-bottom: 32px; }
.crumb a { text-decoration: none; }
.crumb a:hover { color: var(--ink); text-decoration: underline; }
.hgrid { display: grid; grid-template-columns: 1fr 360px; gap: 48px; align-items: end; }
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.st .dot { color: var(--acc); }
.title { font-size: clamp(44px, 7.4vw, 108px); margin: 22px 0 18px; text-wrap: balance; }
.title.long { font-size: clamp(38px, 5.4vw, 78px); }
.tagline { font-size: clamp(18px, 1.8vw, 22px); color: var(--muted); max-width: 46ch; }

.sheet { padding: 12px; }
.cover { display: block; width: 100%; padding: 0; border: 0; cursor: zoom-in; background: var(--panel-2); aspect-ratio: 4 / 3; overflow: hidden; border-radius: 2px; }
.cover img { width: 100%; height: 100%; object-fit: cover; }
.sh { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; font-weight: 600; padding: 12px 4px 8px; border-bottom: 1px solid var(--line); }
.sh .hand { font-size: 22px; font-weight: 400; }
.mnote { font-size: 30px; margin-top: 14px; rotate: -1.5deg; display: inline-block; }
dl { display: grid; grid-template-columns: auto 1fr; margin: 0; }
dt, dd { padding: 9px 4px; border-bottom: 1px solid var(--line); margin: 0; }
dt { font-size: 13px; color: var(--muted); }
dd { font-size: 14px; text-align: right; }
dl > :nth-last-child(-n + 2) { border-bottom: 0; }

.body { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 64px; margin-top: 80px; }
.toc { position: sticky; top: 96px; align-self: start; }
.toc ol { list-style: none; margin: 12px 0 0; padding: 0; border-left: 1px solid var(--line); }
.toc a {
  display: flex; gap: 10px; padding: 7px 0 7px 14px; margin-left: -1px; border-left: 2px solid transparent;
  text-decoration: none; font-size: 14px; color: var(--muted); transition: color .15s, border-color .15s;
}
.toc a:hover { color: var(--ink); }
.toc a.on { color: var(--ink); border-left-color: var(--signal-ink); }

.content { max-width: 820px; }
.sec { padding-bottom: 72px; }
.sec-head { display: flex; align-items: baseline; gap: 16px; padding-bottom: 14px; margin-bottom: 26px; border-bottom: 1px solid var(--line); }
.sec-head .num { font: 400 30px/1 var(--f-hand); color: var(--signal-ink); }
.sec-head h2 { font-size: clamp(26px, 3vw, 36px); }
.stack { display: flex; flex-direction: column; gap: 22px; }

.pn { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--ink); margin-top: 40px; }
.pnl { display: flex; flex-direction: column; gap: 8px; padding: 28px 0; text-decoration: none; }
.pnl.r { text-align: right; border-left: 1px solid var(--line); }
.pnl .lbl { font-size: 14px; color: var(--muted); }
.pnl b { font: 750 clamp(22px, 3vw, 34px)/1.05 var(--f-display); transition: color .15s; }
.pnl:hover b { color: var(--signal-ink); }

@media (max-width: 1000px) {
  .hgrid { grid-template-columns: 1fr; align-items: start; }
  .sheet { max-width: 480px; }
  .body { grid-template-columns: 1fr; gap: 24px; margin-top: 48px; }
  .toc { position: static; }
  .toc ol { display: flex; flex-wrap: wrap; gap: 4px; border: 0; }
  .toc a { border: 1px solid var(--line); padding: 6px 10px; margin: 0; font-size: 13px; border-radius: 2px; }
  .toc a.on { border-color: var(--ink); }
}
@media (max-width: 560px) {
  .pn { grid-template-columns: 1fr; }
  .pnl.r { border-left: 0; border-top: 1px solid var(--line); }
}
</style>
