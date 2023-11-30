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
          :autocomplete="typeField === 'password' ? 'new-password': 'off'"
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
      {{ validErrorText }}
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
      type: String,
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
