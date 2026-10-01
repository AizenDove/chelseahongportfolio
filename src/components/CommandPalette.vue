<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { projects, profile } from '../data/projects'
import { paletteOpen } from '../composables/palette'
import { toggleTheme } from '../composables/theme'

const router = useRouter()
const q = ref('')
const sel = ref(0)
const input = ref(null)

const commands = computed(() => [
  { group: 'Go to', label: 'Home', hint: 'home', run: () => router.push('/') },
  { group: 'Go to', label: 'All work', hint: 'projects', run: () => router.push('/experiments') },
  { group: 'Go to', label: 'About me', hint: 'about', run: () => router.push('/researcher') },
  { group: 'Go to', label: 'Résumé', hint: 'cv', run: () => router.push('/dossier') },
  ...projects.map((p) => ({
    group: 'Projects', label: p.title, hint: p.code, run: () => router.push(`/experiments/${p.slug}`),
  })),
  { group: 'Actions', label: 'Toggle light / dark', hint: 'theme', run: toggleTheme },
  { group: 'Actions', label: 'Copy email address', hint: profile.email, run: () => navigator.clipboard?.writeText(profile.email) },
  { group: 'Actions', label: 'Download résumé', hint: 'pdf', run: () => window.open(profile.resume, '_blank', 'noopener') },
  { group: 'External', label: 'LinkedIn', hint: '↗', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
  { group: 'External', label: 'GitHub — AizenDove', hint: '↗', run: () => window.open(profile.github, '_blank', 'noopener') },
])

const results = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return commands.value
  return commands.value.filter((c) => (c.label + ' ' + c.hint + ' ' + c.group).toLowerCase().includes(s))
})
watch(q, () => (sel.value = 0))

const close = () => (paletteOpen.value = false)
const run = (c) => { close(); c?.run() }

watch(paletteOpen, async (v) => {
  if (v) { q.value = ''; sel.value = 0; await nextTick(); input.value?.focus() }
})

const onKey = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault(); paletteOpen.value = !paletteOpen.value; return
  }
  if (!paletteOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowDown') { e.preventDefault(); sel.value = Math.min(sel.value + 1, results.value.length - 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel.value = Math.max(sel.value - 1, 0) }
  else if (e.key === 'Enter') { e.preventDefault(); run(results.value[sel.value]) }
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition name="cp">
    <div v-if="paletteOpen" class="cp" @click.self="close">
      <div class="box panel reg" role="dialog" aria-label="Command palette">
        <div class="field">
          <span class="prompt">⌕</span>
          <input ref="input" v-model="q" placeholder="Jump to a project, page or action…" aria-label="Command" />
          <span class="mono esc">esc</span>
        </div>
        <ul class="list" role="listbox">
          <li
            v-for="(c, i) in results" :key="c.group + c.label"
            :class="{ on: i === sel }" role="option" :aria-selected="i === sel"
            @mousemove="sel = i" @click="run(c)"
          >
            <span class="g mono">{{ c.group }}</span>
            <span class="l">{{ c.label }}</span>
            <span class="h mono">{{ c.hint }}</span>
          </li>
          <li v-if="!results.length" class="empty mono">No match. Try “olfactory” or “theme”.</li>
        </ul>
        <div class="foot mono"><span>↑↓ select</span><span>↵ run</span></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cp {
  position: fixed; inset: 0; z-index: 80;
  background: color-mix(in srgb, var(--bg) 60%, transparent);
  backdrop-filter: blur(4px);
  display: grid; justify-items: center; align-items: start; padding: 12vh 16px 16px;
}
.box { width: min(600px, 100%); box-shadow: var(--shadow); overflow: hidden; }
.field { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-bottom: 1px solid var(--line); }
.prompt { color: var(--signal-ink); font-size: 18px; }
input { flex: 1; border: 0; outline: 0; background: transparent; font: 400 17px var(--f-sans); color: var(--ink); min-width: 0; }
.esc { font-size: 10px; color: var(--faint); border: 1px solid var(--line); padding: 3px 5px; }
.list { list-style: none; margin: 0; padding: 6px; max-height: 50vh; overflow: auto; }
li { display: grid; grid-template-columns: 92px 1fr auto; gap: 12px; align-items: center; padding: 10px; cursor: pointer; border-radius: 2px; }
li.on { background: var(--ink); color: var(--bg); }
li.on .g, li.on .h { color: inherit; opacity: .7; }
.g { font-size: 10px; color: var(--faint); }
.h { font-size: 11px; color: var(--muted); max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.empty { display: block; color: var(--muted); padding: 16px; cursor: default; }
.foot { display: flex; gap: 16px; padding: 10px 16px; border-top: 1px solid var(--line); font-size: 10px; color: var(--faint); }
.cp-enter-active, .cp-leave-active { transition: opacity .15s; }
.cp-enter-active .box { transition: transform .2s cubic-bezier(.2,1.2,.4,1); }
.cp-enter-from, .cp-leave-to { opacity: 0; }
.cp-enter-from .box { transform: translateY(-8px) scale(.98); }
@media (max-width: 500px) { li { grid-template-columns: 1fr auto; } .g { display: none; } }
</style>
