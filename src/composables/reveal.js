// v-reveal: fade/slide elements in when they enter the viewport.
// Elements never stay hidden: without IntersectionObserver, or if it hasn't
// fired after a moment (background tabs, screenshots), they're shown anyway.
let io
const getIO = () =>
  (io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  ))

export const vReveal = {
  mounted(el, { value }) {
    if (!('IntersectionObserver' in window)) return
    el.classList.add('rv')
    if (value) el.style.transitionDelay = `${value}ms`
    getIO().observe(el)
    el._rvTimer = setTimeout(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight) el.classList.add('in')
    }, 1200)
  },
  unmounted(el) {
    clearTimeout(el._rvTimer)
    io?.unobserve(el)
  },
}
