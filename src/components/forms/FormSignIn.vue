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
    <div class="form__error">
      Пользователь с таким логином не найден
    </div>
  </div>
</template>

<script>
import fieldInput from '@components/fields/FieldInput.vue'
import fieldPassword from '@components/fields/FieldPassword.vue'
import Loader from '@components/Loader.vue'
import { required, minLength, email } from 'vuelidate/lib/validators'

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
          minLength: 'Минимум 3 символа'
        }
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
      minLength: minLength(3)
    }
  },
  methods: {
    handlerToggle() {
      this.$emit('handlerSignUpShow')
    },
    send() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.load = true

        setTimeout(() => {
          this.load = false
          this.$emit('handlerSend', {
            typeForm: 'signIn',
            email: this.email,
            password: this.password
          })
          // this.$emit('saveHandler', true)
        }, 2000)
      }
    }

  }
}
</script>
