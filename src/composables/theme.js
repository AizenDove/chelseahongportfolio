import { ref } from 'vue'

const stored = (() => {
  try { return localStorage.getItem('lab-theme') } catch { return null }
})()
const media = window.matchMedia('(prefers-color-scheme: dark)')
export const theme = ref(stored || (media.matches ? 'dark' : 'light'))

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try { localStorage.setItem('lab-theme', theme.value) } catch {}
}
