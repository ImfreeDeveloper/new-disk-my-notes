<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="header__wrap">
          <a href="/" class="header__logo">
            <img src="/images/logo.svg" alt="my-notes" />
          </a>
          <div class="header__right">
            <div class="header__user" v-if="isLoggedIn">
              <div class="header__user-email">{{ user.email }}</div>
              <div class="header__user-avatar" @click="isShowLogout = !isShowLogout">
                <img src="/images/user.svg" alt="Аватар" />
              </div>
              <div class="header__user-logout" v-if="isShowLogout">
                <p @click="logout">Выйти</p>
              </div>
            </div>
            <div class="header__sign-in" v-else>
              <button class="btn btn-main" @click="modalShow = true">
                <img src="/images/login.svg" alt="Вход" />
                Вход
              </button>
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
import { getterTypes, actionTypes } from '@/store/modules/auth'
export default {
  components: {
    Popup,
    formSign
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters[getterTypes.isLoggedIn]
    },
    user() {
      return this.$store.getters[getterTypes.currentUser]
    }
  },
  data() {
    return {
      modalShow: false,
      isShowLogout: false
    }
  },
  methods: {
    send(obj) {
      console.log(obj)
    },
    handleOutsideClick(e) {
      const path = e.path || (e.composedPath && e.composedPath()) || window.composedPath(e.target)
      if (!path.includes(e.target.closest('.header__user'))) {
        this.isShowLogout = false
      }
    },
    logout() {
      this.$store.dispatch(actionTypes.logout)
    }
  },
  watch: {
    isLoggedIn() {
      this.modalShow = false
    }
  },
  mounted() {
    document.body.addEventListener('click', this.handleOutsideClick)
  },
  destroyed() {
    document.body.removeEventListener('click', this.handleOutsideClick)
  }
}
</script>
