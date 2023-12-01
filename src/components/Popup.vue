<template>
  <div class="modal-popup">
    <div class="modal-popup-wrapper">
      <div class="modal-popup-container">
        <div class="modal-popup-body">
<!--          <form-sign-up />-->
          <form-add-note />
        </div>
        <span class="modal-popup-close"></span>
      </div>
    </div>
  </div>
</template>

<script>

import formSignUp from '@components/forms/FormSignUp.vue'
import formSignIn from '@components/forms/FormSignIn.vue'
import formAddNote from '@components/forms/FormAddNote.vue'
export default {
  components: {
    formSignUp,
    formAddNote,
    formSignIn
  },
  data() {
    return {

    }
  }
}
</script>
