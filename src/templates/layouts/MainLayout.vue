<template>
  <div class="wrapper">
    <Loader v-if="loading"/>
    <main-header v-if="!loading" />
    <main class="content" v-if="!loading">
      <slot />
    </main>
  </div>
</template>

<script>

import MainHeader from '@/templates/includes/MainHeader.vue'
import { mapGetters } from 'vuex'
import { getterTypes } from '@/store/modules/app'
import Loader from '@components/Loader.vue'

export default {
  components: {
    Loader,
    MainHeader
  },
  computed: {
    ...mapGetters({
      loading: getterTypes.loading
    })
  }
}
</script>
