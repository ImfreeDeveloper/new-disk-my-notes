<template>
  <div class="modal-popup">
    <div class="modal-popup-wrapper">
      <div class="modal-popup-container">
        <div class="modal-popup-body">
          <form-sign-up />
        </div>
        <span class="modal-popup-close"></span>
      </div>
    </div>
  </div>
</template>

<script>

import formSignUp from '@components/forms/FormSignUp.vue'
export default {
  components: {
    formSignUp
  },
  data() {
    return {

    }
  }
}
</script>
