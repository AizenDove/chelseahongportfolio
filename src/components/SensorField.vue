<script setup>
// Interactive hero specimen: a grid of sensor points the visitor can perturb.
// Each sense channel switches on one behaviour of the field.
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { theme } from '../composables/theme'

// minimal: no control console, field points only show where disturbed
// background: sits behind page content and listens on the window instead
// avoid: selector for page elements (text, photos) the scent plume stays out of
const props = defineProps({ minimal: Boolean, background: Boolean, avoid: String })

const channels = reactive([
  { key: 'sight', label: 'Sight', on: true, hint: 'render the field' },
  { key: 'hearing', label: 'Hearing', on: true, hint: 'click to emit a pulse' },
  { key: 'smell', label: 'Smell', on: true, hint: 'scent plume follows cursor' },
  { key: 'touch', label: 'Touch', on: true, hint: 'cursor displaces points' },
  { key: 'taste', label: 'Taste', on: false, hint: 'warms the plume' },
])
const ch = computed(() => Object.fromEntries(channels.map((c) => [c.key, c.on])))
const active = computed(() => channels.filter((c) => c.on).length)

const canvas = ref(null)
const host = ref(null)
const stats = reactive({ particles: 0, pulses: 0, x: 0, y: 0 })

let ctx, w = 0, h = 0, dpr = 1, raf = 0, visible = true
let pts = [], plume = [], waves = []
const mouse = { x: -9999, y: -9999, inside: false, lastMove: 0 }
const auto = { t: 0 }
let colors = {}

const readColors = () => {
  const s = getComputedStyle(document.documentElement)
  colors = {
    ink: s.getPropertyValue('--ink').trim(),
    faint: s.getPropertyValue('--faint').trim(),
    signal: s.getPropertyValue('--signal').trim(),
    warn: s.getPropertyValue('--warn').trim(),
    dark: theme.value === 'dark',
  }
}

const SP = 26
function layout() {
  if (!host.value) return
  const r = host.value.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = r.width; h = r.height
  canvas.value.width = w * dpr; canvas.value.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  pts = []
  for (let y = SP / 2; y < h; y += SP)
    for (let x = SP / 2; x < w; x += SP) pts.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 })
}

// Boxes the plume stays out of, in canvas coords
let quiet = []
function readQuiet() {
  if (!props.avoid || !host.value) return
  const o = host.value.getBoundingClientRect(), P = 14
  quiet = []
  for (const el of document.querySelectorAll(props.avoid)) {
    const b = el.getBoundingClientRect()
    if (!b.width || b.bottom < o.top || b.top > o.bottom) continue
    quiet.push({ l: b.left - o.left - P, t: b.top - o.top - P, r: b.right - o.left + P, b: b.bottom - o.top + P })
  }
}
const isQuiet = (x, y) => quiet.some((q) => x > q.l && x < q.r && y > q.t && y < q.b)

// Pulses bounce off the edges: mirror images of the centre across each wall and
// corner stand in for the reflected fronts.
const WAVE_SPEED = 5 / 3, BAND = 30
const fronts = (wv) => {
  const xs = [wv.x, -wv.x, 2 * w - wv.x], ys = [wv.y, -wv.y, 2 * h - wv.y]
  return xs.flatMap((x) => ys.map((y) => ({ x, y })))
}
// each pulse fades out over this many ms, then is gone
const WAVE_MS = 5000
const fade = (wv) => Math.max(0, 1 - (performance.now() - wv.born) / WAVE_MS)

function pulse(x, y) {
  if (!ch.value.hearing) return
  waves.push({ x, y, r: 0, born: performance.now() })
  stats.pulses++
}

function emitter() {
  // When the cursor is idle the plume source wanders on its own (a Lissajous path).
  if (mouse.inside && performance.now() - mouse.lastMove < 2500) return { x: mouse.x, y: mouse.y }
  auto.t += 0.006
  return { x: w * (0.62 + 0.22 * Math.sin(auto.t * 1.3)), y: h * (0.5 + 0.3 * Math.sin(auto.t * 2.1)) }
}

let tick = 0
function frame() {
  raf = requestAnimationFrame(frame)
  if (!visible) return
  ctx.clearRect(0, 0, w, h)
  if (tick++ % 8 === 0) readQuiet()
  const c = ch.value
  const src = emitter()
  const hushed = isQuiet(src.x, src.y)
  stats.x = Math.round(src.x); stats.y = Math.round(src.y)

  // hearing — expanding rings that reflect off the edges
  for (const wv of waves) { wv.r += WAVE_SPEED; wv.f ??= fronts(wv) }
  waves = waves.filter((wv) => fade(wv) > 0)

  // field points
  const sightA = c.sight ? 1 : 0.12
  ctx.fillStyle = colors.ink
  for (const p of pts) {
    let fx = (p.hx - p.x) * 0.06, fy = (p.hy - p.y) * 0.06
    if (c.touch) {
      const dx = p.x - src.x, dy = p.y - src.y, d2 = dx * dx + dy * dy
      if (d2 < 140 * 140) {
        const d = Math.sqrt(d2) || 1, f = (1 - d / 140) * 3.2
        fx += (dx / d) * f; fy += (dy / d) * f
      }
    }
    for (const wv of waves) {
      for (const fr of wv.f) {
        const dx = p.hx - fr.x, dy = p.hy - fr.y, d = Math.sqrt(dx * dx + dy * dy) || 1
        const band = d - wv.r
        if (band <= -BAND || band >= BAND) continue
        const f = Math.cos((band / BAND) * Math.PI * 0.5) * 2.4 * fade(wv)
        fx += (dx / d) * f; fy += (dy / d) * f
      }
    }
    p.vx = (p.vx + fx) * 0.78; p.vy = (p.vy + fy) * 0.78
    p.x += p.vx; p.y += p.vy
    const disp = Math.min(1, Math.hypot(p.x - p.hx, p.y - p.hy) / 18)
    ctx.globalAlpha = (props.minimal ? disp * 0.55 : 0.26 + disp * 0.7) * sightA
    const s = 1.6 + disp * 1.6
    ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s)
  }

  // smell — diffusing plume particles, held back over text so reading stays calm
  if (c.smell && !hushed) {
    for (let i = 0; i < 4; i++)
      plume.push({
        x: src.x + (Math.random() - 0.5) * 6, y: src.y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.9, vy: -0.4 - Math.random() * 0.8,
        life: 1, r: 1.5 + Math.random() * 2.5,
      })
  }
  const col = c.taste ? colors.warn : colors.signal
  ctx.fillStyle = col
  for (const q of plume) {
    q.vx += (Math.random() - 0.5) * 0.18; q.vy += (Math.random() - 0.5) * 0.12 - 0.004
    q.x += q.vx; q.y += q.vy; q.life -= isQuiet(q.x, q.y) ? 0.08 : 0.008; q.r += 0.05
    ctx.globalAlpha = Math.max(0, q.life) * (colors.dark ? 0.55 : 0.85) * (c.sight ? 1 : 0.35)
    ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.fill()
  }
  plume = plume.filter((q) => q.life > 0)
  if (plume.length > 900) plume.splice(0, plume.length - 900)
  stats.particles = plume.length

  // ring outlines
  ctx.strokeStyle = colors.ink; ctx.lineWidth = 1
  for (const wv of waves) {
    ctx.globalAlpha = 0.25 * fade(wv) * sightA
    const n = Math.max(24, Math.min(360, Math.round((wv.r * Math.PI * 2) / 8)))
    ctx.beginPath()
    for (const fr of wv.f) {
      // skip fronts that don't reach the visible area yet
      if (fr.x + wv.r < 0 || fr.x - wv.r > w || fr.y + wv.r < 0 || fr.y - wv.r > h) continue
      let pen = false
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * Math.PI * 2, x = fr.x + Math.cos(a) * wv.r, y = fr.y + Math.sin(a) * wv.r
        const on = x > -2 && x < w + 2 && y > -2 && y < h + 2
        if (on) pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
        pen = on
      }
    }
    ctx.stroke()
  }

  // reticle on the emitter
  if (props.minimal || hushed) { ctx.globalAlpha = 1; return }
  ctx.globalAlpha = 0.9 * sightA
  ctx.strokeStyle = colors.ink
  ctx.beginPath()
  ctx.arc(src.x, src.y, 10, 0, Math.PI * 2)
  ctx.moveTo(src.x - 18, src.y); ctx.lineTo(src.x - 13, src.y)
  ctx.moveTo(src.x + 13, src.y); ctx.lineTo(src.x + 18, src.y)
  ctx.moveTo(src.x, src.y - 18); ctx.lineTo(src.x, src.y - 13)
  ctx.moveTo(src.x, src.y + 13); ctx.lineTo(src.x, src.y + 18)
  ctx.stroke()
  ctx.globalAlpha = 1
}

const onMove = (e) => {
  if (!host.value) return
  const r = host.value.getBoundingClientRect()
  mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
  mouse.inside = true; mouse.lastMove = performance.now()
}
const onLeave = () => (mouse.inside = false)
const onDown = (e) => {
  if (props.background && e.target.closest?.('a, button, input, textarea, select, label')) return
  onMove(e); pulse(mouse.x, mouse.y)
}

let ro, io, reduced
onMounted(() => {
  ctx = canvas.value.getContext('2d')
  readColors(); layout()
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ro = new ResizeObserver(layout); ro.observe(host.value)
  if (props.background) {
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    document.documentElement.addEventListener('pointerleave', onLeave)
  }
  io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(host.value)
  if (reduced) { frame(); cancelAnimationFrame(raf) } else frame()
  setTimeout(() => pulse(w * 0.62, h * 0.5), 400)
})
onUnmounted(() => {
  cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect()
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  document.documentElement.removeEventListener('pointerleave', onLeave)
})
watch(theme, () => requestAnimationFrame(readColors))
</script>

<template>
  <div class="sf" :class="{ bg: background }">
    <div v-if="background" ref="host" class="stage" aria-hidden="true">
      <canvas ref="canvas" />
    </div>
    <div
      v-else ref="host" class="stage"
      @pointermove="onMove" @pointerleave="onLeave" @pointerdown="onDown"
      aria-label="Interactive sensor field. Move the pointer to steer the scent plume, click to send a sound pulse."
      role="img"
    >
      <canvas ref="canvas" />
    </div>

    <div v-if="!minimal && !background" class="console panel reg">
      <div class="crow">
        <span class="label">Sense channels</span>
        <span class="mono act">{{ active }}/5 active</span>
      </div>
      <div class="chans">
        <button
          v-for="c in channels" :key="c.key" class="ch" :class="{ on: c.on }"
          :aria-pressed="c.on" @click="c.on = !c.on" :title="c.hint"
        >
          <span class="led" /> <span>{{ c.label }}</span>
        </button>
      </div>
      <div class="readout mono">
        <span>SRC x{{ String(stats.x).padStart(4, '0') }} y{{ String(stats.y).padStart(4, '0') }}</span>
        <span>MOL {{ String(stats.particles).padStart(3, '0') }}</span>
        <span>PULSE {{ String(stats.pulses).padStart(2, '0') }}</span>
      </div>
      <p class="hint mono">move to steer · click to pulse</p>
    </div>
  </div>
</template>

<style scoped>
.sf { position: absolute; inset: 0; }
.stage { position: absolute; inset: 0; cursor: crosshair; touch-action: pan-y; }
canvas { width: 100%; height: 100%; display: block; }
.bg { position: fixed; z-index: -1; pointer-events: none; }

.console {
  position: absolute; right: var(--gutter); bottom: 28px;
  width: 300px; padding: 14px;
  background: color-mix(in srgb, var(--panel) 88%, transparent);
  backdrop-filter: blur(6px);
  box-shadow: var(--shadow);
}
.crow { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.act { font-size: 11px; color: var(--signal-ink); }
.chans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.ch {
  display: flex; align-items: center; gap: 7px;
  font: 500 11px/1 var(--f-mono); text-transform: uppercase; letter-spacing: .04em;
  padding: 9px 8px; border: 1px solid var(--line); background: transparent; border-radius: 2px;
  color: var(--muted); cursor: pointer; transition: all .15s;
}
.ch:hover { border-color: var(--ink); color: var(--ink); }
.ch.on { color: var(--ink); border-color: var(--line-strong); background: var(--panel-2); }
.led { width: 7px; height: 7px; border-radius: 50%; background: var(--line-strong); transition: background .15s, box-shadow .15s; }
.ch.on .led { background: var(--signal); box-shadow: 0 0 0 2px color-mix(in srgb, var(--signal) 30%, transparent); }
.readout {
  display: flex; justify-content: space-between; gap: 6px; margin-top: 12px; padding-top: 10px;
  border-top: 1px dashed var(--line); font-size: 10px; color: var(--muted); font-variant-numeric: tabular-nums;
}
.hint { font-size: 10px; color: var(--faint); margin-top: 6px; text-transform: lowercase; }

@media (max-width: 760px) {
  .console { left: var(--gutter); right: var(--gutter); width: auto; bottom: 16px; }
  .hint { display: none; }
}
</style>
