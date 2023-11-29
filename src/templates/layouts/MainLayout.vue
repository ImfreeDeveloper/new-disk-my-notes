<template>
  <div class="wrapper">
    <main-header />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>

import MainHeader from '@/templates/includes/MainHeader.vue'

export default {
  components: {
    MainHeader
  }
}
</script>
