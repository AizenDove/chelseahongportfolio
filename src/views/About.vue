<script setup>
import { profile, bySlug } from '../data/projects'
import { openLightbox } from '../composables/lightbox'
import { vReveal } from '../composables/reveal'

const timeline = [
  ...profile.education.map((e) => ({ ...e, kind: 'Study' })),
  ...profile.work.map((w) => ({ ...w, kind: 'Work' })),
].sort((a, b) => parseInt(b.years) - parseInt(a.years))

// Recurring threads across the projects, each pointing at where it shows up.
const threads = [
  { k: 'The senses', x: 'Smell is often overlooked in VR, despite how strongly it’s tied to memory and emotion.', to: ['olfactory', 'vr-sensory-isolation'], c: 'var(--rose)' },
  { k: 'Access', x: 'A reliable preview of a place, so people with accessibility needs don’t meet surprise obstacles.', to: ['vr-looking-glass'], c: 'var(--sage)' },
  { k: 'Belonging', x: 'Games that encourage people to open up, at their own comfort level.', to: ['expconnect'], c: 'var(--butter)' },
  { k: 'Safe spaces', x: 'Safe training spaces with real structure and standards, inside and outside VR.', to: ['vr-pole-dancers'], c: 'var(--rose)' },
]
</script>

<template>
  <div class="wrap page">
    <header class="ph">
      <p class="hand kick">about me</p>
      <h1 class="display title">Hi, I’m Chelsea.</h1>
    </header>

    <div class="story">
      <div class="txt" v-reveal>
        <p class="lead">
          I’ve been studying virtual reality game design for the past seven years, and I aim to see the beauty in
          creativity. Most of my work happens where <span class="hl">digital and physical reality meet</span>, and
          lately that means combining smell with VR to make it more immersive.
        </p>
        <p>

        </p>
        <p>
        </p>
      </div>
      <figure class="snap" v-reveal="100">
        <button @click="openLightbox([{ src: profile.portrait, cap: 'In-game footage' }])" aria-label="Enlarge in-game footage">
          <span class="tape" />
          <img :src="profile.portrait" alt="In-game footage from one of Chelsea’s VR environments" />
          <span class="hand cap">in-game footage, one of my scenes</span>
        </button>
      </figure>
    </div>

    <section class="block">
      <div class="section-head"><h2>What keeps coming back in my work</h2></div>
      <div class="threads">
        <div v-for="(t, i) in threads" :key="t.k" class="thread" :style="{ '--c': t.c }" v-reveal="i * 60">
          <h3>{{ t.k }}</h3>
          <p>{{ t.x }}</p>
          <div class="refs">
            <RouterLink v-for="s in t.to" :key="s" :to="`/experiments/${s}`">{{ bySlug[s].title }} →</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="block two">
      <div>
        <div class="section-head"><h2>Tools</h2></div>
        <ul class="tools">
          <li v-for="c in profile.competencies" :key="c">
            <b>{{ c }}</b>
          </li>
        </ul>
      </div>
      <div>
        <div class="section-head"><h2>Timeline</h2></div>
        <ol class="tl">
          <li v-for="t in timeline" :key="t.title" :class="{ now: t.now }">
            <span class="yr">{{ t.years }}</span>
            <div>
              <h3>{{ t.title }} <span v-if="t.now" class="hand nowtag">← now</span></h3>
              <p>{{ t.org }} · {{ t.kind }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

  </div>
</template>

<style scoped>
.page { padding-top: 56px; }
.kick { font-size: 32px; rotate: -3deg; display: inline-block; }
.title { font-size: clamp(52px, 9vw, 128px); margin: 4px 0 0; }

.story { display: grid; grid-template-columns: 1.2fr 1fr; gap: 56px; margin-top: 48px; align-items: start; }
.txt { display: flex; flex-direction: column; gap: 18px; font-size: 17px; max-width: 62ch; }
.txt .lead { font-size: clamp(20px, 2vw, 25px); line-height: 1.45; }
.txt a { color: inherit; text-decoration-color: var(--rose); text-decoration-thickness: 2px; text-underline-offset: 3px; }
.snap { margin: 12px 0 0; }
.snap button { position: relative; display: block; width: 100%; padding: 8px 8px 0; border: 0; background: #fffdf7; cursor: zoom-in; rotate: 2deg; box-shadow: 0 14px 26px -16px rgba(50,30,10,.45); transition: rotate .3s; }
.snap button:hover { rotate: 0deg; }
.snap img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.tape { position: absolute; top: -10px; left: 40%; width: 80px; height: 22px; background: var(--tape); rotate: -4deg; }
.cap { display: block; text-align: left; color: #3a332a; font-size: 22px; padding: 6px 2px 10px; }

.block { margin-top: 100px; }
.threads { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.thread { padding: 20px; border-radius: 10px; background: var(--panel); border: 1px solid var(--line); border-top: 6px solid var(--c); display: flex; flex-direction: column; gap: 8px; }
.thread h3 { font-size: 21px; }
.thread p { color: var(--muted); font-size: 15px; }
.refs { margin-top: auto; padding-top: 8px; display: flex; flex-direction: column; gap: 2px; }
.refs a { font-size: 14px; color: var(--signal-ink); text-decoration: none; }
.refs a:hover { text-decoration: underline; }

.two { display: grid; grid-template-columns: 1fr 1.3fr; gap: 56px; }
.tools { list-style: none; margin: 0; padding: 0; }
.tools li { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--line); }
.tools b { font-weight: 600; }
.tl { list-style: none; margin: 0; padding: 0; }
.tl li { display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--line); }
.yr { font-size: 14px; color: var(--muted); padding-top: 2px; font-variant-numeric: tabular-nums; }
.tl h3 { font-size: 18px; }
.tl p { color: var(--muted); font-size: 14px; }
.nowtag { font-size: 24px; font-weight: 400; margin-left: 6px; }

.contact { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; padding: 28px; border-radius: 10px; }
.say { font-size: 28px; rotate: -2deg; display: inline-block; margin-bottom: 4px; }
.em { display: block; font: 750 clamp(22px, 3vw, 36px) var(--f-display); text-decoration: none; word-break: break-all; }
.em:hover { color: var(--signal-ink); }
.cl { display: flex; gap: 8px; flex-wrap: wrap; }
.cl a { text-decoration: none; }

@media (max-width: 900px) {
  .story, .two { grid-template-columns: 1fr; gap: 40px; }
  .snap { max-width: 480px; }
}
@media (max-width: 480px) { .tl li { grid-template-columns: 1fr; gap: 2px; } }
</style>
