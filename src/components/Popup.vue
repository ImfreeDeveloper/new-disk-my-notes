<template>
  <div class="modal-popup" v-if="value" @click="closeModal($event)">
    <div class="modal-popup-wrapper">
      <div class="modal-popup-container">
        <div class="modal-popup-body" @click.stop>
          <slot name="body"></slot>
<!--          <form-add-note />-->
          <span class="modal-popup-close" @click="$emit('input', false)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import formAddNote from '@components/forms/FormAddNote.vue'
export default {
  components: {
    formAddNote
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {}
  },
  watch: {
    value(isVisible) {
      this.setHiddenBody(isVisible)
    }
  },
  methods: {
    closeModal() {
      this.$emit('input', false)
    },
    setHiddenBody(value) {
      if (value) {
        document.body.classList.add('hidden')
      } else {
        document.body.classList.remove('hidden')
      }
    }
  }
}
</script>
