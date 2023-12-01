<template>
  <div class="form">
    <h3>Добавление заметки</h3>
    <field-input
        label="Название заметки"
        placeholder="Введите название"
        v-model="name"
        :valid-error="$v.name"
        :valid-error-text="textError.name"
    />
    <field-textarea
        label="Текст заметки"
        v-model="text"
        :valid-error="$v.text"
        :min-height="75"
        placeholder="Введите текст"
    />
    <div class="form__footer">
      <p>У вас есть аккаунт? <a href="#" class="link">Зарегистрируйтесь</a></p>
      <button class="btn btn-main" @click="send">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script>
import fieldInput from '@components/fields/FieldInput.vue'
import FieldTextarea from '@components/fields/FieldTextarea.vue'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  components: { fieldInput, FieldTextarea },
  data() {
    return {
      name: '',
      text: '',
      textError: {
        name: {
          required: 'Поле не заполнено',
          minLength: 'Минимум 3 символа'
        }
      }
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    text: {
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
