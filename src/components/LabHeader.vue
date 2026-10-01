<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { theme, toggleTheme } from '../composables/theme'
import { paletteOpen } from '../composables/palette'

const links = [
  { to: '/', label: 'Home' },
  { to: '/experiments', label: 'Work' },
  { to: '/researcher', label: 'About' },
  { to: '/dossier', label: 'Résumé' },
]

// Live Helsingborg clock in the status bar
const time = ref('')
const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Stockholm', hour: '2-digit', minute: '2-digit',
})
const tick = () => (time.value = fmt.format(new Date()))
let timer
onMounted(() => { tick(); timer = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(timer))

const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 8)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const menu = ref(false)
const route = useRoute()
watch(() => route.path, () => (menu.value = false))

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
</script>

<template>
  <header class="hdr" :class="{ scrolled, menu }">
    <div class="bar wrap">
      <RouterLink to="/" class="logo" aria-label="Chelsea Hong — home">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <circle cx="9" cy="14" r="6" class="core" />
          <circle cx="16" cy="9" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
          <circle cx="19.5" cy="17" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <span class="name">Chelsea&nbsp;Hong</span>
      </RouterLink>

      <nav class="nav" aria-label="Primary">
        <RouterLink
          v-for="l in links" :key="l.to" :to="l.to" class="nl"
          :class="{ active: l.to === '/' ? $route.path === '/' : $route.path.startsWith(l.to) }"
        >
          {{ l.label }}
        </RouterLink>
      </nav>

      <div class="tools">
        <span class="status" title="My local time">
          {{ time }} in Helsingborg
        </span>
        <button class="tool kbd" @click="paletteOpen = true" aria-label="Open command palette">
          <span class="mono">{{ isMac ? '⌘' : 'Ctrl' }} K</span>
        </button>
        <button class="tool" @click="toggleTheme" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`">
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="1.6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.6" />
          </svg>
        </button>
        <button class="tool burger" @click="menu = !menu" :aria-expanded="menu" aria-label="Menu">
          <span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: fixed; inset: 0 0 auto; z-index: 50;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
  border-bottom: 1px solid transparent;
  transition: border-color .2s;
}
.hdr.scrolled { border-bottom-color: var(--line); }
.bar { height: 64px; display: flex; align-items: center; gap: 24px; }

.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex: none; }
.logo .core { fill: var(--rose); stroke: var(--ink); stroke-width: 1; transition: r .3s; }
.logo:hover .core { r: 7; }
.logo svg { transition: transform .6s cubic-bezier(.3,1.4,.5,1); }
.logo:hover svg { transform: rotate(-12deg) translateY(-2px); }
.name { font: 750 17px/1 var(--f-display); letter-spacing: -0.02em; }
.lab { color: var(--muted); font-size: 12px; text-transform: lowercase; }

.nav { display: flex; gap: 4px; margin-left: auto; }
.nl {
  position: relative;
  font: 500 15px/1 var(--f-sans); text-decoration: none;
  padding: 10px 12px; border-radius: 2px; color: var(--muted);
  transition: color .15s, background .15s;
}
.nl .n { font-size: 10px; margin-right: 6px; color: var(--faint); }
.nl:hover { color: var(--ink); background: var(--panel); }
.nl.active { color: var(--ink); }
.nl.active::after {
  content: ''; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 6px; z-index: -1;
  background: var(--butter); border-radius: 3px; rotate: -1deg;
}

.tools { display: flex; align-items: center; gap: 8px; }
.status { color: var(--muted); font-size: 13px; padding-right: 8px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.tool {
  height: 34px; min-width: 34px; padding: 0 10px;
  display: grid; place-items: center;
  border: 1px solid var(--line); border-radius: 999px; background: transparent; cursor: pointer;
}
.tool:hover { border-color: var(--ink); }
.tool .mono { font-size: 11px; }
.burger { display: none; }
.burger span { display: block; width: 14px; height: 1.5px; background: currentColor; transition: transform .2s; }

@media (max-width: 1060px) { .status { display: none; } }
@media (max-width: 860px) {
  .kbd { display: none; }
  .burger { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; }
  .menu .burger span:first-child { transform: translateY(3.25px) rotate(45deg); }
  .menu .burger span + span { transform: translateY(-3.25px) rotate(-45deg); }
  .nav {
    position: fixed; top: 64px; left: 0; right: 0;
    flex-direction: column; gap: 0;
    background: var(--bg); border-bottom: 1px solid var(--line);
    padding: 8px var(--gutter) 20px;
    transform: translateY(-8px); opacity: 0; pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  .menu .nav { opacity: 1; transform: none; pointer-events: auto; }
  .nl { font-size: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); }
  .nl.active::after { left: auto; right: 0; top: 50%; bottom: auto; width: 8px; height: 8px; margin-top: -4px; }
  .tools { margin-left: auto; }
}
</style>
