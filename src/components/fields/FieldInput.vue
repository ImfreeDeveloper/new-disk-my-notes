<template>
  <div class="field-input-custom"
    :class="{'field-input-custom-length': showLength}"
  >
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
          autocomplete="off"
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
      <div v-if="showLength" class="field-input__length">{{ currentLength }} / {{ maxLength }}</div>
      <div class="field-input__icons">
        <slot name="selectColor"></slot>
<!--        <slot name="icon-clear">-->
<!--          <span-->
<!--            v-if="value.length && clearable"-->
<!--            class="field-icon icon-close"-->
<!--            @click="clearInput"-->
<!--          >-->
<!--            <svg><use xlink:href="/images/sprite.svg#i-clear" /></svg>-->
<!--          </span>-->
<!--        </slot>-->
        <slot name="icon-loader"></slot>
        <slot name="icon-attach"></slot>
        <slot name="icon-check"></slot>
        <slot name="tooltip"></slot>
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

export default {
  data() {
    return {
      placeholderText: ''
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    typeField: {
      type: String,
      required: false,
      default: 'text'
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
    isShowLength: {
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
    currentLength: function () {
      return this.value.length
    },
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
    },
    showLength() {
      return this.isShowLength && this.maxLength > 0
    }
  },
  methods: {
    setFocus(isFocus) {
      this.placeholderText = isFocus ? '' : this.placeholder
    }
  },
  mounted() {
    this.placeholderText = this.placeholder
  }
}
</script>
