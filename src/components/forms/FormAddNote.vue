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
  components: {
    fieldInput,
    FieldTextarea
  },
  data() {
    return {
      name: '',
      text: '',
      load: false,
      textError: {
        name: {
          required: 'Поле не заполнено',
          minLength: 'Минимум 4 символа'
        },
        text: {
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
    name: {
      required,
      minLength: minLength(4)
    },
    text: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    async send() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.$emit('handlerSend', {
          title: this.name,
          content: this.text
        })
      }
    }

  }
}
</script>
