<script setup>
import LabHeader from './components/LabHeader.vue'
import LabFooter from './components/LabFooter.vue'
import CommandPalette from './components/CommandPalette.vue'
import Lightbox from './components/Lightbox.vue'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <LabHeader />
  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <LabFooter />
  <CommandPalette />
  <Lightbox />
</template>

<style>
.skip {
  position: absolute; left: -999px; top: 8px; z-index: 100;
  background: var(--signal); color: var(--on-signal); padding: 8px 12px;
}
.skip:focus { left: 8px; }
main { min-height: 70vh; padding-top: 64px; }
</style>
