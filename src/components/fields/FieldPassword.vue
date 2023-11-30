<template>
  <div class="field-input-custom">
    <div
      class="field-input"
      :class="{
        'is-danger': validError ? validError.$error : false
      }"
    >
      <div class="field-input__wrap">
        <label :title="label" :class="{filled: value.length}">{{ label }}</label>
        <input
          :type="typeField"
          autocomplete="new-password"
          :placeholder="placeholderText"
          :value="value"
          v-on="inputListeners"
          :maxlength="maxLength"
          :disabled="isDisabled"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
          required
        />
      </div>
      <div class="field-input__icons">
        <div class="field-input__icons-eye" @click="togglePass">
          <img :src="`/images/${iconEye}`" alt="Eye" />
        </div>
      </div>
    </div>
    <div class="field-input__error"
      v-if="validError.$error"
    >
      {{ textError }}
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
const EYE_ICON = {
  SHOW: 'password-show.svg',
  HIDE: 'password-hide.svg'
}

const TYPE_FIELD = {
  PASS: 'password',
  TXT: 'text'
}

export default {
  data() {
    return {
      placeholderText: '',
      iconEye: EYE_ICON.SHOW,
      typeField: TYPE_FIELD.PASS
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    validErrorText: {
      type: [String, Object],
      required: false,
      default: 'Поле не заполнено'
    },
    validError: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    maxLength: {
      type: Number,
      required: false,
      default: 255
    }
  },
  computed: {
    inputListeners: function () {
      const vm = this
      return Object.assign({},
        this.$listeners,
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    },
    textError() {
      if (typeof this.validErrorText === 'object') {
        let errorTxt = ''
        for (const key in this.validErrorText) {
          if (!this.validError[key]) {
            errorTxt = this.validErrorText[key]
          }
        }
        return errorTxt
      } else {
        return this.validErrorText
      }
    }
  },
  methods: {
    setFocus(isFocus) {
      this.placeholderText = isFocus ? '' : this.placeholder
    },
    togglePass() {
      switch (this.iconEye) {
        case EYE_ICON.SHOW:
          this.iconEye = EYE_ICON.HIDE
          this.typeField = TYPE_FIELD.TXT
          break
        case EYE_ICON.HIDE:
          this.iconEye = EYE_ICON.SHOW
          this.typeField = TYPE_FIELD.PASS
          break
        default:
          break
      }
    }
  },
  mounted() {
    this.placeholderText = this.placeholder
  }
}
</script>
