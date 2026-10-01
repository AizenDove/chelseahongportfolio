<script setup>
import { ref } from 'vue'
import SensorField from '../components/SensorField.vue'
import DeskPhotos from '../components/DeskPhotos.vue'
import { projects, bySlug, profile } from '../data/projects'
import { vReveal } from '../composables/reveal'

// Hover preview that trails the cursor over the project list
const hover = ref(null)
const pos = ref({ x: 0, y: 0 })
const track = (e) => (pos.value = { x: e.clientX, y: e.clientY })

const noteColors = ['var(--butter)', 'var(--sage)', 'var(--rose)']
const tilt = [-2.2, 1.6, -1, 2.4, -1.8]
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero">
      <SensorField minimal />
      <div class="wrap hero-grid">
        <div class="copy">
          <p class="hej hand">hej!</p>
          <h1 class="display name">
            I’m Chelsea. I design virtual reality you can <span class="hl">smell</span>.
          </h1>
          <p class="intro">
            Immersive experience designer based in {{ profile.location.split(',')[0] }}. I’ve spent the past seven years
            studying VR game design, and these days I’m doing my master’s in Experience Design at Halmstad University.
            I aim to see the beauty in creativity.
          </p>
          <div class="ctas">
            <RouterLink to="/experiments" class="btn">See my work <span class="arrow">→</span></RouterLink>
            <RouterLink to="/researcher" class="btn ghost">More about me</RouterLink>
          </div>
          <p class="scent hand">↖ that pink trail following your cursor? that’s “scent” diffusing.<br />(real smell over the internet isn’t possible… yet)</p>
        </div>
        <DeskPhotos class="desk" />
      </div>
    </section>

    <!-- CURRENTLY -->
    <section class="wrap now-wrap">
      <div class="now panel" v-reveal>
        <span class="hand tag">right now</span>
        <ul>
          <li><b>Studying</b> Master’s in Experience Design, Halmstad University <span class="muted">2025–27</span></li>
          <li><b>Training</b> pole dancers in VR with <RouterLink to="/experiments/vr-pole-dancers">VRPD</RouterLink></li>
          <li><b>Writing up</b> <RouterLink to="/experiments/vr-sensory-isolation">VR Sensory Isolation</RouterLink></li>
        </ul>
      </div>
    </section>

    <!-- WORK LIST -->
    <section class="wrap block" @pointermove="track">
      <div class="section-head">
        <h2>Things I’ve made</h2>
        <RouterLink to="/experiments" class="all">All projects, with filters →</RouterLink>
      </div>
      <ol class="work" @pointerleave="hover = null">
        <li v-for="(p, i) in projects" :key="p.slug" v-reveal="i * 40">
          <RouterLink :to="`/experiments/${p.slug}`" @pointerenter="hover = p" @focus="hover = null">
            <span class="code mono">{{ p.code }}</span>
            <span class="t">{{ p.title }}</span>
            <span class="tl">{{ p.tagline }}</span>
            <span class="note hand">{{ p.note }}</span>
          </RouterLink>
        </li>
      </ol>
      <Transition name="pv">
        <div
          v-if="hover && hover.cover" class="preview"
          :style="{ transform: `translate(${pos.x + 24}px, ${pos.y - 90}px) rotate(${projects.indexOf(hover) % 2 ? 3 : -3}deg)` }"
        >
          <img :src="hover.cover" alt="" />
        </div>
      </Transition>
    </section>

    <!-- PAPER -->
    <section class="wrap block">
      <a
        v-reveal class="paper" href="https://link.springer.com/chapter/10.1007/978-3-032-11043-5_27"
        target="_blank" rel="noopener"
      >
        <span class="pin" aria-hidden="true" />
        <img :src="bySlug.olfactory.sections[1].blocks[0].img" alt="Games and Learning Alliance — GALA 2025 proceedings cover" loading="lazy" />
        <div class="pbody">
          <span class="hand stamp">published ✓</span>
          <p class="label">Games and Learning Alliance · GALA 2025 · Springer</p>
          <h3>Immersive Enhancement of Game Experience by Smell Sensing</h3>
          <p class="muted">
            Our research on when scent enhances presence in VR, when it distracts, and how to design it
            rather than use it as a gimmick.
          </p>
          <span class="read">Read the chapter ↗</span>
        </div>
      </a>
    </section>

    <!-- MARGINS -->
    <section class="wrap block">
      <div class="section-head">
        <h2>Notes from the margins</h2>
        <span class="label">things my projects taught me</span>
      </div>
      <div class="stickies">
        <RouterLink
          v-for="(n, i) in profile.margins" :key="i" :to="`/experiments/${n.from}`" class="sticky"
          :style="{ '--bgc': noteColors[i % 3], '--r': tilt[i % tilt.length] + 'deg' }" v-reveal="i * 70"
        >
          <p>“{{ n.x }}”</p>
          <span class="src">{{ n.ctx }} · <u>{{ bySlug[n.from].title }}</u></span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { position: relative; overflow: hidden; border-bottom: 1px solid var(--line); }
.hero-grid {
  position: relative; z-index: 2; display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: center;
  padding-top: clamp(40px, 8vh, 96px); padding-bottom: 72px; pointer-events: none;
}
.copy { pointer-events: none; }
.ctas, .desk { pointer-events: auto; }
.hej { font-size: 40px; rotate: -6deg; display: inline-block; margin-bottom: 4px; }
.name { font-size: clamp(42px, 6.2vw, 88px); margin: 0 0 24px; text-wrap: balance; }
.intro { font-size: clamp(17px, 1.5vw, 20px); color: var(--muted); max-width: 46ch; line-height: 1.55; }
.ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 30px; }
.scent { margin-top: 36px; font-size: 22px; color: var(--muted); max-width: 30ch; rotate: -1.5deg; }

.now-wrap { margin-top: -28px; position: relative; z-index: 3; }
.now { position: relative; padding: 20px 24px; max-width: 760px; box-shadow: var(--shadow); }
.now .tag { position: absolute; top: -18px; left: 18px; font-size: 28px; background: var(--bg); padding: 0 6px; rotate: -3deg; }
.now ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.now li { font-size: 16px; }
.now b { display: inline-block; min-width: 92px; font-weight: 600; }
.now a { color: inherit; text-decoration-color: var(--rose); text-decoration-thickness: 2px; text-underline-offset: 3px; }
.muted { color: var(--muted); }

.block { margin-top: 110px; }
.all { font-size: 14px; color: var(--signal-ink); text-decoration: none; }
.all:hover { text-decoration: underline; }

.work { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ink); }
.work a {
  display: grid; grid-template-columns: 150px minmax(0, 1.1fr) minmax(0, 1.4fr) minmax(0, 1fr); gap: 20px; align-items: baseline;
  padding: 22px 6px; border-bottom: 1px solid var(--line); text-decoration: none; transition: background .2s, padding .2s;
}
.work a:hover { background: var(--panel); padding-left: 16px; }
.code { font: 400 13px var(--f-sans); color: var(--faint); }
.t { font: 750 clamp(22px, 2.4vw, 30px)/1.1 var(--f-display); letter-spacing: -0.02em; }
.tl { color: var(--muted); font-size: 15px; }
.note { font-size: 23px; text-align: right; opacity: .0; transform: translateX(-6px); transition: opacity .2s, transform .2s; }
.work a:hover .note, .work a:focus-visible .note { opacity: 1; transform: none; }
.preview {
  position: fixed; left: 0; top: 0; z-index: 30; width: 260px; pointer-events: none;
  padding: 7px 7px 22px; background: #fffdf7; box-shadow: var(--shadow);
  transition: transform .12s ease-out;
}
.preview img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.pv-enter-active, .pv-leave-active { transition: opacity .15s; }
.pv-enter-from, .pv-leave-to { opacity: 0; }

.paper {
  position: relative; display: grid; grid-template-columns: 200px 1fr; gap: 32px; align-items: center;
  padding: 28px; background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius);
  text-decoration: none; rotate: -.6deg; box-shadow: var(--shadow); transition: rotate .3s;
}
.paper:hover { rotate: 0deg; }
.pin { position: absolute; top: -8px; left: 50%; width: 16px; height: 16px; border-radius: 50%; background: var(--rose); box-shadow: inset -3px -3px 0 rgba(0,0,0,.15), 0 3px 4px rgba(0,0,0,.2); }
.paper img { width: 100%; aspect-ratio: 1; object-fit: cover; }
.pbody { position: relative; display: flex; flex-direction: column; gap: 10px; }
.stamp { position: absolute; right: 0; top: -6px; font-size: 30px; rotate: 6deg; color: var(--signal-ink); }
.pbody h3 { font-size: clamp(24px, 2.6vw, 34px); font-weight: 750; line-height: 1.1; max-width: 22ch; }
.read { color: var(--signal-ink); font-weight: 600; }

.stickies { display: grid; grid-template-columns: repeat(5, 1fr); gap: 28px 20px; padding-top: 8px; }
.sticky {
  display: flex; flex-direction: column; gap: 14px; min-height: 220px; padding: 22px 20px;
  background: var(--bgc); color: #2a251e; text-decoration: none; rotate: var(--r);
  box-shadow: 0 1px 1px rgba(0,0,0,.06), 0 16px 24px -16px rgba(50,30,10,.5);
  transition: rotate .25s, transform .25s;
}
.sticky:hover { rotate: 0deg; transform: translateY(-4px) scale(1.02); }
.sticky p { font: 600 19px/1.25 var(--f-display); letter-spacing: -0.01em; }
.sticky .src { margin-top: auto; font-size: 13px; opacity: .75; }

@media (max-width: 1100px) { .stickies { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 700px) { .stickies { grid-template-columns: 1fr 1fr; } }
@media (max-width: 440px) { .stickies { grid-template-columns: 1fr; } }
@media (max-width: 980px) {
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .desk { max-width: 560px; }
  .scent { display: none; }
  .work a { grid-template-columns: 1fr; gap: 4px; }
  .code { order: -1; }
  .note { text-align: left; opacity: 1; transform: none; font-size: 21px; }
  .preview { display: none; }
}
@media (max-width: 620px) {
  .paper { grid-template-columns: 1fr; rotate: 0deg; }
  .paper img { max-width: 160px; }
  .stamp { position: static; }
}
</style>
