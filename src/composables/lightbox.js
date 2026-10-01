import { reactive } from 'vue'

// Global lightbox state: any gallery can open a set of images at an index.
export const lightbox = reactive({ items: [], index: -1 })

export function openLightbox(items, index = 0) {
  lightbox.items = items
  lightbox.index = index
}
export function closeLightbox() {
  lightbox.index = -1
}
