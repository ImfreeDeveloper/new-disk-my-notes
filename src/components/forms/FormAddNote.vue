<template>
  <div class="form">
    <h3>Добавление заметки</h3>
    <field-input
      label="Название заметки"
      placeholder="Введите название"
      v-model="name"
      :valid-error="$v.name"
      :valid-error-text="textError.name"
      :isShowLength="true"
      :maxLength="100"
    />
    <field-textarea
      label="Текст заметки"
      v-model="text"
      :valid-error="$v.text"
      :min-height="244"
      :isShowLength="true"
      :maxLength="500"
      placeholder="Введите текст"
    />
    <div class="form__footer">
      <button class="btn btn-main" @click="send">Добавить</button>
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


      // {
      //   "title": "Моя заметка",
      //     "content": "Сегодня эмо-сходка на Трубной"
      // }
      if (!this.$v.$invalid) {
        console.log(2222)
      }
    }

  }
}
</script>
