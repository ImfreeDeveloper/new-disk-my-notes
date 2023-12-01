<template>
  <div class="form">
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
      <p>У вас есть аккаунт? <a href="#" class="link">Зарегистрируйтесь</a></p>
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
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  components: { fieldInput, fieldPassword },
  data() {
    return {
      email: '',
      password: '',
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
    send() {
      this.$v.$touch()

      // this.isLoading = true

      // setTimeout(() => {
      // this.isLoading = false
      // this.$emit('saveHandler', true)
      // }, 2000)

      if (!this.$v.$invalid) {
        console.log(2222)
      }
    }

  }
}
</script>
