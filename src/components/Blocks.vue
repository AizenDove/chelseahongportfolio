<script setup>
// Renders one section's content blocks (see data/projects.js for the block types).
import { defineAsyncComponent } from 'vue'
import VideoEmbed from './VideoEmbed.vue'
import { openLightbox } from '../composables/lightbox'
import { vReveal } from '../composables/reveal'

defineProps({ blocks: Array })

const demos = {
  QuestionDeck: defineAsyncComponent(() => import('./demos/QuestionDeck.vue')),
  QDensity: defineAsyncComponent(() => import('./demos/QDensity.vue')),
  HolderWeight: defineAsyncComponent(() => import('./demos/HolderWeight.vue')),
  TruckCalc: defineAsyncComponent(() => import('./demos/TruckCalc.vue')),
  TeleportHub: defineAsyncComponent(() => import('./demos/TeleportHub.vue')),
  ScentArray: defineAsyncComponent(() => import('./demos/ScentArray.vue')),
}
</script>

<template>
  <template v-for="(b, i) in blocks" :key="i">
    <p v-if="b.t === 'lead'" class="lead">{{ b.x }}</p>
    <p v-else-if="b.t === 'p'" class="p">{{ b.x }}</p>
    <h3 v-else-if="b.t === 'h'" class="h">{{ b.x }}</h3>
    <ul v-else-if="b.t === 'list'" class="list">
      <li v-for="(x, j) in b.items" :key="j"><span class="mono">{{ j + 1 }}.</span>{{ x }}</li>
    </ul>
    <blockquote v-else-if="b.t === 'quote'" v-reveal class="quote">
      <p>“{{ b.x.replace(/^“|”$/g, '') }}”</p>
      <cite v-if="b.by">— {{ b.by }}</cite>
    </blockquote>
    <aside v-else-if="b.t === 'note'" class="note">
      <span class="hand k">{{ b.k.toLowerCase() }}</span>
      <p>{{ b.x }}</p>
    </aside>
    <p v-else-if="b.t === 'fine'" class="fine">{{ b.x }}</p>

    <figure v-else-if="b.t === 'img'" v-reveal class="fig">
      <button class="imgbtn" @click="openLightbox([{ src: b.src, cap: b.cap }])" :aria-label="`Enlarge: ${b.cap}`">
        <img :src="b.src" :alt="b.cap" loading="lazy" />
      </button>
      <figcaption>{{ b.cap }}</figcaption>
    </figure>

    <div v-else-if="b.t === 'gallery'" class="gallery" :class="`n${Math.min(b.items.length, 4)}`">
      <figure v-for="(g, j) in b.items" :key="g.src" v-reveal="j * 50" class="gi">
        <button class="imgbtn" @click="openLightbox(b.items, j)" :aria-label="`Enlarge: ${g.cap}`">
          <img :src="g.src" :alt="g.cap" loading="lazy" />
          <span class="zoom mono">+</span>
        </button>
        <figcaption>{{ g.cap }}</figcaption>
      </figure>
    </div>

    <VideoEmbed v-else-if="b.t === 'video'" :id="b.id" :cap="b.cap" class="blk" />

    <div v-else-if="b.t === 'grid'" class="kgrid">
      <div v-for="g in b.items" :key="g.k" class="kcell">
        <span class="k">{{ g.k }}</span>
        <p v-for="v in g.v" :key="v">{{ v }}</p>
      </div>
    </div>

    <div v-else-if="b.t === 'pillars'" class="pillars">
      <details v-for="(pl, j) in b.items" :key="pl.k" :open="j === 0">
        <summary><span class="pn">{{ j + 1 }}</span>{{ pl.k }}<span class="pm" /></summary>
        <p>{{ pl.x }}</p>
      </details>
    </div>

    <ol v-else-if="b.t === 'flow'" class="flow" :class="{ bad: b.bad }">
      <li v-for="(f, j) in b.items" :key="f">
        <span>{{ f }}</span><i v-if="j < b.items.length - 1">→</i>
      </li>
    </ol>

    <a v-else-if="b.t === 'paper'" :href="b.href" target="_blank" rel="noopener" class="paper">
      <img :src="b.img" alt="" loading="lazy" />
      <span>
        <span class="k">{{ b.venue }}</span>
        <b>{{ b.title }}</b>
        <small>{{ b.publisher }}</small>
        <span class="go">Read the paper ↗</span>
      </span>
    </a>

    <div v-else-if="b.t === 'links'" class="links">
      <a v-for="l in b.items" :key="l.href" :href="l.href" target="_blank" rel="noopener">
        <span>{{ l.label }}</span><span class="mono">↗</span>
      </a>
    </div>

    <component v-else-if="b.t === 'demo'" :is="demos[b.name]" class="blk" />
  </template>
</template>

<style scoped>
.lead { font-size: clamp(19px, 1.8vw, 23px); line-height: 1.5; letter-spacing: -0.005em; }
.p { color: color-mix(in srgb, var(--ink) 82%, var(--bg)); max-width: 70ch; }
.h { font-size: 19px; margin-top: 12px; }

.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0; border-top: 1px solid var(--line); }
.list li { display: grid; grid-template-columns: 40px 1fr; gap: 8px; padding: 12px 0; border-bottom: 1px solid var(--line); }
.list .mono { font: 400 24px/1 var(--f-hand); color: var(--signal-ink); }

.quote { margin: 8px 0; padding: 4px 0 4px 24px; border-left: 4px solid var(--rose); }
.quote p { font: 700 clamp(26px, 3.2vw, 40px)/1.1 var(--f-display); letter-spacing: -0.02em; }
.quote cite { display: block; font-style: normal; font-size: 14px; color: var(--muted); margin-top: 10px; }

.note { display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 16px 18px; border-radius: 4px; background: var(--butter); color: #2a251e; rotate: -.4deg; box-shadow: 0 10px 20px -14px rgba(50,30,10,.45); }
.note .k { font-size: 28px; color: #a2402f; line-height: 1; }
.fine { font-size: 12px; color: var(--faint); max-width: 80ch; }

.fig { margin: 0; }
.imgbtn { display: block; width: 100%; padding: 0; border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; background: var(--panel-2); cursor: zoom-in; position: relative; }
.imgbtn img { width: 100%; height: auto; transition: transform .5s; }
.imgbtn:hover img { transform: scale(1.015); }
figcaption { font-size: 14px; font-style: italic; color: var(--muted); margin-top: 8px; }

.gallery { display: grid; gap: 12px; }
.gallery.n2 { grid-template-columns: repeat(2, 1fr); }
.gallery.n3 { grid-template-columns: repeat(3, 1fr); }
.gallery.n4 { grid-template-columns: repeat(4, 1fr); }
.gi { margin: 0; min-width: 0; }
.gi .imgbtn { aspect-ratio: 1; }
.gi .imgbtn img { height: 100%; object-fit: cover; }
.gi figcaption { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.zoom { position: absolute; right: 8px; bottom: 8px; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: var(--butter); color: #111; font-size: 15px; opacity: 0; transition: opacity .2s; }
.imgbtn:hover .zoom { opacity: 1; }

.kgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); border: 1px solid var(--line); border-radius: var(--radius); background: var(--panel); }
.kcell { padding: 16px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); margin: 0 -1px -1px 0; }
.kcell .k { display: block; font-size: 15px; font-weight: 600; margin-bottom: 6px; }
.kcell p { font-size: 14px; color: var(--muted); }
.kcell p::before { content: '+ '; color: var(--faint); }

.pillars { border-top: 1px solid var(--ink); }
details { border-bottom: 1px solid var(--line); }
summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 14px; padding: 16px 0; font: 700 20px var(--f-display); }
summary::-webkit-details-marker { display: none; }
summary .pn { font: 400 28px/1 var(--f-hand); color: var(--signal-ink); width: 28px; }
summary:hover { color: var(--signal-ink); }
.pm { margin-left: auto; width: 12px; height: 12px; position: relative; }
.pm::before, .pm::after { content: ''; position: absolute; background: currentColor; left: 0; right: 0; top: 50%; height: 1.5px; transition: transform .2s; }
.pm::after { transform: rotate(90deg); }
details[open] .pm::after { transform: rotate(0); }
details p { padding: 0 0 18px 42px; color: var(--muted); max-width: 68ch; }

.flow { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.flow li { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.flow li span { padding: 9px 14px; border: 1px solid var(--line-strong); background: var(--panel); border-radius: 999px; }
.flow li:last-child span { background: var(--sage); color: var(--on-signal); border-color: var(--sage); }
.flow.bad li:last-child span { background: var(--warn); color: #111; border-color: var(--warn); }
.flow i { font-style: normal; color: var(--muted); }

.paper { display: grid; grid-template-columns: 120px 1fr; gap: 20px; padding: 16px; border: 1px solid var(--line); background: var(--panel); border-radius: var(--radius); text-decoration: none; transition: border-color .2s; }
.paper:hover { border-color: var(--ink); }
.paper img { width: 120px; aspect-ratio: 1; object-fit: cover; }
.paper > span { display: flex; flex-direction: column; gap: 6px; }
.paper .k { font-size: 13px; color: var(--muted); }
.paper b { font: 700 22px/1.15 var(--f-display); }
.paper small { color: var(--muted); }
.paper .go { font-size: 14px; font-weight: 600; color: var(--signal-ink); margin-top: auto; }

.links { display: grid; border-top: 1px solid var(--line); }
.links a { display: flex; justify-content: space-between; gap: 16px; padding: 14px 4px; border-bottom: 1px solid var(--line); text-decoration: none; transition: padding .2s, background .2s; }
.links a:hover { background: var(--panel); padding-left: 12px; color: var(--signal-ink); }

@media (max-width: 760px) {
  .gallery.n3, .gallery.n4 { grid-template-columns: repeat(2, 1fr); }
  .note { grid-template-columns: 1fr; gap: 6px; }
  .paper { grid-template-columns: 80px 1fr; }
  .paper img { width: 80px; }
}
</style>
