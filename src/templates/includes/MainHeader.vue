<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="header__wrap">
          <a href="/" class="header__logo">
            <img src="/images/logo.svg" alt="my-notes" />
          </a>
          <div class="header__">
            <div class="header__sign-in">
              <button class="btn btn-main" @click="modalShow = true">
                <img src="/images/login.svg" alt="Вход" />
                Вход
              </button>
            </div>
            <div class="header__user">
              <div class="header__user-email">e-mail@mail.mail</div>
              <div class="header__user-avatar">
                <img src="/images/user.svg" alt="Аватар" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup v-model="modalShow">
      <template #body>
        <form-sign @handlerSend="send" />
      </template>
    </Popup>
  </div>
</template>

<script>
import Popup from '@components/Popup.vue'
import formSign from '@components/forms/FormSign.vue'
export default {
  components: {
    Popup,
    formSign
  },
  data() {
    return {
      modalShow: false
    }
  },
  methods: {
    send(obj) {
      console.log(obj)
    }
  }
}
</script>
