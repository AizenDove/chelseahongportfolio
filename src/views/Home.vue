<script setup>
import { ref, computed } from 'vue'
import SensorField from '../components/SensorField.vue'
import DeskPhotos from '../components/DeskPhotos.vue'
import { projects, bySlug, profile, DOMAINS } from '../data/projects'
import { vReveal } from '../composables/reveal'

// Project index: filter by domain, with a cursor-following cover preview
const domains = DOMAINS.filter((d) => projects.some((p) => p.domains?.includes(d)))
const domain = ref('All')
const shown = computed(() =>
  domain.value === 'All' ? projects : projects.filter((p) => p.domains?.includes(domain.value)),
)
const countFor = (d) => (d === 'All' ? projects.length : projects.filter((p) => p.domains?.includes(d)).length)

const hover = ref(null)
const pos = ref({ x: 0, y: 0 })
const track = (e) => (pos.value = { x: e.clientX, y: e.clientY })

const statusTone = (s) =>
  ({ Published: 'var(--sage)', Shipped: 'var(--sage)', Ongoing: 'var(--butter)', 'In progress': 'var(--butter)' })[s] ??
  'var(--rose)'

// Publication
const paperUrl = 'https://link.springer.com/chapter/10.1007/978-3-032-11043-5_27'
const doi = '10.1007/978-3-032-11043-5_27'
const copied = ref(false)
const copyDoi = async () => {
  try {
    await navigator.clipboard.writeText(`https://doi.org/${doi}`)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {}
}

// Findings: one observation at a time, steppable by click or arrow keys
const findings = profile.margins
const sel = ref(0)
const finding = computed(() => findings[sel.value])
const step = (d) => (sel.value = (sel.value + d + findings.length) % findings.length)
const onKey = (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); step(1) }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
}

// KV7 scent headset, taped to the right of the hero
const m = (f) => `${import.meta.env.BASE_URL}media/${f}`
const kv7 = [
  { src: m('home-12.webp'), cap: 'KV7, wired up', to: 'olfactory', x: 4, y: 2, r: -5, w: 50 },
  { src: m('olfactory-01.webp'), cap: 'KV7 on the face', to: 'olfactory', x: 48, y: 10, r: 4, w: 48 },
  { src: m('olfactory-04.webp'), cap: 'playtesting KV7', to: 'olfactory', x: 18, y: 50, r: -2, w: 52 },
]

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div class="home">
    <SensorField background avoid="h1, h2, h3, p, li, dl, .btn, .chip, figure, .panel" />

    <!-- HERO -->
    <section class="wrap hero">
      <div class="copy">
        <p class="eyebrow mono"><span class="dot live" /> {{ profile.role }} · {{ profile.location }}</p>
        <h1 class="display name">Multisensory design for virtual reality.</h1>
        <p class="intro">
          I design and build immersive XR experiences, with a research focus on bringing scent into virtual
          environments. Currently completing a master’s in Experience Design at Halmstad University.
        </p>
        <div class="ctas">
          <RouterLink to="/experiments" class="btn">View projects <span class="arrow">→</span></RouterLink>
          <RouterLink to="/researcher" class="btn ghost">About</RouterLink>
        </div>
        <dl class="figures">
          <div><dt class="mono">Projects</dt><dd>{{ pad(projects.length) }}</dd></div>
          <div><dt class="mono">Publications</dt><dd>01</dd></div>
          <div><dt class="mono">Years in VR</dt><dd>07</dd></div>
        </dl>
      </div>
      <DeskPhotos :items="kv7" />
    </section>

    <!-- CURRENT -->
    <section class="wrap">
      <div class="now panel" v-reveal>
        <span class="mono now-label">Current</span>
        <ul>
          <li><span class="k mono">Studying</span> Master’s in Experience Design, Halmstad University <span class="muted">2025–27</span></li>
          <li><span class="k mono">Training</span> Pole sport in VR with <RouterLink to="/experiments/vr-pole-dancers">VRPD</RouterLink></li>
          <li><span class="k mono">Writing</span> <RouterLink to="/experiments/vr-sensory-isolation">VR Sensory Isolation</RouterLink></li>
        </ul>
      </div>
    </section>

    <!-- PROJECT INDEX -->
    <section class="wrap block" @pointermove="track">
      <div class="section-head">
        <h2>Project index</h2>
        <RouterLink to="/experiments" class="all">Full archive →</RouterLink>
      </div>

      <div class="filters" role="group" aria-label="Filter by domain">
        <button
          v-for="d in ['All', ...domains]" :key="d" class="chip" :class="{ on: domain === d }"
          :aria-pressed="domain === d" @click="domain = d"
        >
          {{ d }} <span class="mono n">{{ countFor(d) }}</span>
        </button>
      </div>

      <div class="thead mono" aria-hidden="true">
        <span>Ref.</span><span>Project</span><span>Domain</span><span>Status</span><span>Year</span>
      </div>
      <TransitionGroup tag="ol" name="row" class="work" @pointerleave="hover = null">
        <li v-for="p in shown" :key="p.slug">
          <RouterLink :to="`/experiments/${p.slug}`" @pointerenter="hover = p" @focus="hover = null">
            <span class="code mono">{{ p.code }}</span>
            <span class="tw">
              <span class="t">{{ p.title }}</span>
              <span class="tl">{{ p.tagline }}</span>
            </span>
            <span class="dom mono">{{ p.domains?.join(' · ') }}</span>
            <span class="st mono"><span class="dot" :style="{ background: statusTone(p.status) }" />{{ p.status }}</span>
            <span class="yr mono">{{ p.year ?? '—' }}</span>
          </RouterLink>
        </li>
      </TransitionGroup>
      <p class="count mono">{{ shown.length }} of {{ projects.length }} entries</p>

      <Transition name="pv">
        <div
          v-if="hover && hover.cover" class="preview"
          :style="{ transform: `translate(${pos.x + 24}px, ${pos.y - 90}px)` }"
        >
          <img :src="hover.cover" alt="" />
          <span class="mono">{{ hover.code }}</span>
        </div>
      </Transition>
    </section>

    <!-- PUBLICATION -->
    <section class="wrap block">
      <div class="section-head">
        <h2>Publication</h2>
        <span class="label">Peer-reviewed · 2025</span>
      </div>
      <article v-reveal class="paper panel">
        <img :src="bySlug.olfactory.sections[1].blocks[0].img" alt="Games and Learning Alliance — GALA 2025 proceedings cover" loading="lazy" />
        <div class="pbody">
          <p class="mono venue">GALA 2025 · Games and Learning Alliance · Springer LNCS</p>
          <h3>Immersive Enhancement of Game Experience by Smell Sensing</h3>
          <p class="muted">
            Examines when scent increases presence in VR, when it distracts, and how olfactory feedback can be
            designed deliberately rather than added as a novelty.
          </p>
          <div class="pactions">
            <a class="btn" :href="paperUrl" target="_blank" rel="noopener">Read chapter <span class="arrow">↗</span></a>
            <button class="btn ghost" @click="copyDoi" aria-live="polite">
              <span class="mono">{{ copied ? 'Copied' : `DOI ${doi}` }}</span>
            </button>
          </div>
        </div>
      </article>
    </section>

    <!-- FINDINGS -->
    <section class="wrap block">
      <div class="section-head">
        <h2>Findings</h2>
        <span class="label">Observations from project work</span>
      </div>
      <div class="findings" v-reveal>
        <ol class="flist" role="listbox" aria-label="Findings" tabindex="0" @keydown="onKey"
            :aria-activedescendant="`f-${sel}`">
          <li
            v-for="(n, i) in findings" :key="i" :id="`f-${i}`" role="option" :aria-selected="sel === i"
            :class="{ on: sel === i }" @click="sel = i"
          >
            <span class="mono fi">F{{ pad(i + 1) }}</span>
            <span class="fp">{{ bySlug[n.from].title }}</span>
          </li>
        </ol>
        <div class="fdetail panel">
          <Transition name="fd" mode="out-in">
            <div :key="sel" class="fd-inner">
              <p class="mono fmeta">F{{ pad(sel + 1) }} / {{ pad(findings.length) }}</p>
              <blockquote>{{ finding.x }}</blockquote>
              <p class="muted fctx">Context: {{ finding.ctx }}</p>
              <RouterLink :to="`/experiments/${finding.from}`" class="fsrc">
                Source: {{ bySlug[finding.from].title }} <span class="arrow">→</span>
              </RouterLink>
            </div>
          </Transition>
          <div class="fnav">
            <button class="tool" @click="step(-1)" aria-label="Previous finding">←</button>
            <button class="tool" @click="step(1)" aria-label="Next finding">→</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.muted { color: var(--muted); }
.faint { color: var(--faint); }

/* hero */
.hero {
  display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px; align-items: center;
  padding-top: clamp(40px, 8vh, 88px); padding-bottom: 64px;
}
.eyebrow { display: flex; align-items: center; gap: 10px; color: var(--muted); margin-bottom: 22px; }
.name { font-size: clamp(40px, 5.4vw, 76px); margin: 0 0 24px; text-wrap: balance; }
.intro { font-size: clamp(17px, 1.4vw, 19px); color: var(--muted); max-width: 48ch; line-height: 1.6; }
.ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 30px; }
.figures { display: flex; gap: 0; margin: 40px 0 0; border-top: 1px solid var(--line); }
.figures div { flex: 1; padding: 14px 16px 0 0; }
.figures div + div { padding-left: 16px; border-left: 1px solid var(--line); }
.figures dt { color: var(--faint); font-size: 11px; text-transform: uppercase; letter-spacing: .06em; }
.figures dd { margin: 4px 0 0; font: 700 30px/1 var(--f-display); font-variant-numeric: tabular-nums; }

.home { position: relative; isolation: isolate; clip-path: inset(0); }

/* current */
.now { display: flex; gap: 28px; align-items: baseline; padding: 18px 22px; }
.now-label { color: var(--faint); text-transform: uppercase; letter-spacing: .06em; font-size: 11px; flex: none; }
.now ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.now li { font-size: 15px; }
.now .k { display: inline-block; min-width: 84px; color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
.now a { color: inherit; text-decoration-color: var(--line-strong); text-underline-offset: 3px; }
.now a:hover { text-decoration-color: var(--ink); }

.block { margin-top: 110px; }
.all { font-size: 14px; color: var(--signal-ink); text-decoration: none; }
.all:hover { text-decoration: underline; }

/* project index */
.filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
.chip .n { font-size: 11px; opacity: .6; }
.thead, .work a {
  display: grid; grid-template-columns: 150px minmax(0, 2.2fr) minmax(0, 1fr) 130px 70px; gap: 20px; align-items: baseline;
}
.thead { padding: 0 6px 10px; color: var(--faint); font-size: 11px; text-transform: uppercase; letter-spacing: .06em; border-bottom: 1px solid var(--ink); }
.work { list-style: none; margin: 0; padding: 0; position: relative; }
.work a { padding: 20px 6px; border-bottom: 1px solid var(--line); text-decoration: none; transition: background .2s, padding .2s; }
.work a:hover { background: var(--panel); padding-left: 14px; }
.code { color: var(--faint); }
.tw { display: flex; flex-direction: column; gap: 4px; }
.t { font: 750 clamp(20px, 2.1vw, 26px)/1.1 var(--f-display); letter-spacing: -0.02em; }
.tl { color: var(--muted); font-size: 14px; }
.dom, .yr { color: var(--muted); }
.st { display: flex; align-items: center; gap: 8px; }
.count { margin-top: 12px; color: var(--faint); }
.row-enter-active, .row-leave-active { transition: opacity .25s, transform .25s; }
.row-enter-from, .row-leave-to { opacity: 0; transform: translateY(-6px); }
.row-leave-active { position: absolute; left: 0; right: 0; }
.row-move { transition: transform .3s; }

.preview {
  position: fixed; left: 0; top: 0; z-index: 30; width: 260px; pointer-events: none;
  background: var(--panel); border: 1px solid var(--line); box-shadow: var(--shadow);
  transition: transform .12s ease-out;
}
.preview img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.preview span { display: block; padding: 6px 10px; color: var(--muted); font-size: 11px; }
.pv-enter-active, .pv-leave-active { transition: opacity .15s; }
.pv-enter-from, .pv-leave-to { opacity: 0; }

/* publication */
.paper { display: grid; grid-template-columns: 180px 1fr; gap: 32px; align-items: center; padding: 28px; }
.paper img { width: 100%; aspect-ratio: 1; object-fit: cover; border: 1px solid var(--line); }
.pbody { display: flex; flex-direction: column; gap: 12px; }
.venue { color: var(--signal-ink); }
.pbody h3 { font-size: clamp(22px, 2.4vw, 30px); font-weight: 750; line-height: 1.15; max-width: 26ch; }
.pbody .muted { max-width: 62ch; }
.pactions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px; }
.pactions .mono { font-size: 12px; }

/* findings */
.findings { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 24px; }
.flist { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ink); outline-offset: 4px; }
.flist li {
  display: flex; gap: 16px; align-items: baseline; padding: 14px 8px;
  border-bottom: 1px solid var(--line); cursor: pointer; color: var(--muted);
  transition: background .15s, color .15s;
}
.flist li:hover { color: var(--ink); background: var(--panel); }
.flist li.on { color: var(--ink); background: var(--panel-2); }
.fi { color: var(--faint); }
.flist li.on .fi { color: var(--signal-ink); }
.fp { font-size: 15px; }
.fdetail { position: relative; padding: 32px; min-height: 300px; display: flex; flex-direction: column; }
.fd-inner { display: flex; flex-direction: column; gap: 18px; flex: 1; }
.fmeta { color: var(--faint); }
blockquote { margin: 0; font: 650 clamp(22px, 2.4vw, 32px)/1.2 var(--f-display); letter-spacing: -0.015em; text-wrap: balance; }
.fctx { font-size: 15px; }
.fsrc { margin-top: auto; font-size: 14px; color: var(--signal-ink); text-decoration: none; font-weight: 600; }
.fsrc:hover { text-decoration: underline; }
.fnav { position: absolute; right: 20px; bottom: 20px; display: flex; gap: 8px; }
.tool {
  height: 34px; min-width: 34px; display: grid; place-items: center;
  border: 1px solid var(--line); border-radius: 999px; background: transparent; cursor: pointer;
}
.tool:hover { border-color: var(--ink); }
.fd-enter-active, .fd-leave-active { transition: opacity .18s, transform .18s; }
.fd-enter-from { opacity: 0; transform: translateY(6px); }
.fd-leave-to { opacity: 0; }

@media (max-width: 980px) {
  .hero { grid-template-columns: 1fr; gap: 40px; }
  .thead { display: none; }
  .work a { grid-template-columns: 1fr auto; gap: 4px 16px; }
  .code { grid-column: 1 / -1; }
  .tw { grid-column: 1 / -1; }
  .dom { grid-column: 1 / -1; }
  .yr { text-align: right; }
  .preview { display: none; }
  .findings { grid-template-columns: 1fr; }
}
@media (max-width: 620px) {
  .now { flex-direction: column; gap: 10px; }
  .paper { grid-template-columns: 1fr; }
  .paper img { max-width: 140px; }
  .fdetail { padding: 22px 22px 70px; }
}
</style>
