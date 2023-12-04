<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>

import { actionTypes } from '@/store/modules/app'
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'default'
    }
  },
  created() {
    this.$store.dispatch(actionTypes.init)
  }
}
</script>
