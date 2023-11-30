<template>
  <div class="form">
    <h3>Вход в ваш аккаунт</h3>
    <field-input
        label="Email"
        placeholder="Введите Email"
        v-model="lastname"
        validErrorText="Сообщение об ошибке"
        clearable
    />
    <field-input
        label="Пароль"
        placeholder="Введите пароль"
        v-model="password"
        clearable
    />
    <field-input
        label="Пароль ещё раз"
        placeholder="Введите пароль ещё раз"
        v-model="passwordRepeat"
        clearable
    />
    <div class="form__footer">
      <p>У вас есть аккаунт? <a href="#" class="link">Зарегистрируйтесь</a></p>
      <button class="btn btn-main">Войти</button>
    </div>
  </div>
</template>

<script>
import fieldInput from '@components/fields/FieldInput.vue'

export default {
  components: { fieldInput },
  data() {
    return {
      lastname: '',
      password: '',
      passwordRepeat: ''
    }
  }
}
</script>
