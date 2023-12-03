<template>
  <div class="form">
    <Loader v-if="load"/>
    <div class="form__reg" v-if="!isSuccess">
      <h3>Регистрация</h3>
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
      <field-password
          label="Пароль ещё раз"
          type-field="password"
          placeholder="Введите пароль ещё раз"
          v-model="passwordRepeat"
          :valid-error="$v.passwordRepeat"
          :valid-error-text="textError.passwordRepeat"
      />
      <div class="form__footer">
        <p>У вас есть аккаунт? <a href="#" class="link" @click.prevent="handlerToggle">Войдите</a></p>
        <button class="btn btn-main" @click="send">Зарегистрироваться</button>
      </div>
      <div class="form__error" v-if="validErrorAPI.isError">
        <p v-html="validErrorAPI.message"></p>
      </div>
    </div>
    <div class="form__success" v-else>
      <h3>Успешная регистрация</h3>
      <div class="form__footer">
        <button class="btn btn-main" @click="handlerToggle">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import fieldInput from '@components/fields/FieldInput.vue'
import fieldPassword from '@components/fields/FieldPassword.vue'
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'
import authApi from '@/api/auth'
import Loader from '@components/Loader.vue'

export default {
  components: { Loader, fieldInput, fieldPassword },
  data() {
    return {
      load: false,
      isSuccess: false,
      email: '',
      password: '',
      passwordRepeat: '',
      textError: {
        email: {
          required: 'Поле не заполнено',
          email: 'Email некорректный'
        },
        password: {
          required: 'Поле не заполнено',
          minLength: 'Минимум 4 символа'
        },
        passwordRepeat: {
          sameAsPassword: 'Пароли не совпадают'
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
    },
    passwordRepeat: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    handlerToggle() {
      this.$emit('handlerSignInShow')
    },
    async send() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.load = true

        const payload = {
          email: this.email,
          password: this.password,
          confirm_password: this.passwordRepeat
        }

        try {
          await authApi.register(payload)

          setTimeout(() => {
            this.validErrorAPI.isError = false
            this.validErrorAPI.message = ''

            this.load = false
            this.isSuccess = true
          }, 600)
        } catch (e) {
          setTimeout(() => {
            this.validErrorAPI.isError = true

            if (e?.response?.data?.message) {
              this.validErrorAPI.message = this.getErrorMessage(e.response.data.message)
            } else {
              this.validErrorAPI.message = 'Ошибка регистрации'
            }

            this.isSuccess = false
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
