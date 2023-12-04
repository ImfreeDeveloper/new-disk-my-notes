<template>
  <div class="form">
    <Loader v-if="load"/>
    <h3>Вход в ваш аккаунт</h3>
    <field-input
        label="Email"
        placeholder="Введите Email"
        v-model="email"
        :valid-error="$v.email"
        :valid-error-text="textError.email"
    />
    <field-password
        label="Пароль"
        type-field="password"
        placeholder="Введите пароль"
        v-model="password"
        :valid-error="$v.password"
        :valid-error-text="textError.password"
    />
    <div class="form__footer">
      <p>У вас нет аккаунта? <a href="#" class="link" @click.prevent="handlerToggle">Зарегистрируйтесь</a></p>
      <button class="btn btn-main" @click="send">Войти</button>
    </div>
    <div class="form__error" v-if="validErrorAPI.isError">
      <p v-html="validErrorAPI.message"></p>
    </div>
  </div>
</template>

<script>
import fieldInput from '@components/fields/FieldInput.vue'
import fieldPassword from '@components/fields/FieldPassword.vue'
import Loader from '@components/Loader.vue'
import { required, minLength, email } from 'vuelidate/lib/validators'
import authApi from '@/api/auth'
import { mutationTypes as mutationTypesAuth } from '@/store/modules/auth'
export default {
  components: { fieldInput, fieldPassword, Loader },
  data() {
    return {
      email: '',
      password: '',
      load: false,
      textError: {
        email: {
          required: 'Поле не заполнено',
          email: 'Email некорректный'
        },
        password: {
          required: 'Поле не заполнено',
          minLength: 'Минимум 4 символа'
        }
      },
      validErrorAPI: {
        isError: false,
        message: ''
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    handlerToggle() {
      this.$emit('handlerSignUpShow')
    },
    async send() {
      this.$v.$touch()

      // if (!this.$v.$invalid) {
      //   this.load = true
      //
      //   setTimeout(() => {
      //     this.load = false
      //     this.$emit('handlerSend', {
      //       typeForm: 'signIn',
      //       email: this.email,
      //       password: this.password
      //     })
      //     // this.$emit('saveHandler', true)
      //   }, 2000)
      //
      //
      //
      //
      //
      //   this.$store.dispatch(actionTypes.login, objParams)
      // }
      if (!this.$v.$invalid) {
        this.load = true

        const payload = {
          email: this.email,
          password: this.password
        }

        try {
          const data = await authApi.login(payload)

          setTimeout(() => {
            this.$store.commit(mutationTypesAuth.loginSuccess, {
              email: payload.email,
              accessToken: data?.accessToken
            })

            this.validErrorAPI.isError = false
            this.validErrorAPI.message = ''

            this.load = false

            this.$router.push({ name: 'notes' })
          }, 600)
        } catch (e) {
          setTimeout(() => {
            this.validErrorAPI.isError = true

            if (e?.response?.data?.message) {
              this.validErrorAPI.message = this.getErrorMessage(e.response.data.message)
            } else {
              this.validErrorAPI.message = 'Ошибка входа'
            }
            this.load = false
          }, 600)
        }
      }
    },
    getErrorMessage(message) {
      return Array.isArray(message) ? message.join('<br />') : message
    }

  }
}
</script>
