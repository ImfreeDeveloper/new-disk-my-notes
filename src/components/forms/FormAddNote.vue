<template>
  <div class="form">
    <Loader v-if="load"/>
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
    <div class="form__error" v-if="validErrorAPI.isError">
      <p v-html="validErrorAPI.message"></p>
    </div>
  </div>
</template>

<script>
import fieldInput from '@components/fields/FieldInput.vue'
import FieldTextarea from '@components/fields/FieldTextarea.vue'
import { required, minLength } from 'vuelidate/lib/validators'
import Loader from '@components/Loader.vue'
import appApi from '@/api/app'

export default {
  components: {
    Loader,
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
        this.load = true

        try {
          await appApi.createNote({
            title: this.name,
            content: this.text
          })
          setTimeout(() => {
            this.$emit('handlerSend')

            this.validErrorAPI.isError = false
            this.validErrorAPI.message = ''

            this.load = false
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
