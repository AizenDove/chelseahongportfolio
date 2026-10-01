import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'

export default createRouter({
  // Hash history so the build works on any static host (GitHub Pages etc.)
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/experiments', name: 'experiments', component: () => import('./views/Experiments.vue') },
    { path: '/experiments/:slug', name: 'project', component: () => import('./views/Project.vue'), props: true },
    { path: '/researcher', name: 'about', component: () => import('./views/About.vue') },
    { path: '/dossier', name: 'resume', component: () => import('./views/Resume.vue') },
    { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('./views/NotFound.vue') },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 90, behavior: 'smooth' }
    return { top: 0 }
  },
})
