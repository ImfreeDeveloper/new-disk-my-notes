<template>
  <div class="form-sign">
    <form-sign-in
      v-if="signInShow"
      @handlerSignUpShow="handlerSignUpShow"
      @handlerSend="handlerSend"
    />
    <form-sign-up
      v-else
      @handlerSignInShow="handlerSignInShow"
      @handlerSend="handlerSend"
    />
  </div>
</template>

<script>
import formSignUp from '@components/forms/FormSignUp.vue'
import formSignIn from '@components/forms/FormSignIn.vue'

export default {
  components: { formSignUp, formSignIn },
  data() {
    return {
      signInShow: true
    }
  },
  methods: {
    handlerSignUpShow() {
      this.signInShow = false
    },
    handlerSignInShow() {
      this.signInShow = true
    },
    handlerSend(obj) {
      this.$emit('handlerSend', obj)
    }
  }
}
</script>
