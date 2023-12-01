<template>
  <div class="field-input-custom"
    :class="{'field-input-custom-textarea-length': showLength}"
  >
    <div
      class="field-textarea"
      :class="{
        'is-danger': validError ? validError.$error : false,
      }"
    >
      <div :title="label" v-if="label" class="field-textarea__label">{{ label }}</div>
      <textarea
        :style="computedStyles"
        v-model="val"
        v-on="inputListeners"
        @focus="resize"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxLength="maxLength"
      />
      <div v-if="showLength" class="field-textarea__length">{{ currentLength }} / {{ maxLength }}</div>
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
  name: 'TextareaAutosize',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    isShowLength: {
      type: Boolean,
      required: false,
      default: false
    },
    autosize: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [Number],
      default: null
    },
    maxHeight: {
      type: [Number],
      default: null
    },
    maxLength: {
      type: [Number],
      default: null
    },
    validError: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    validErrorText: {
      type: String,
      required: false,
      default: 'Поле не заполнено'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    /*
     * Force !important for style properties
     */
    important: {
      type: [Boolean, Array],
      default: false
    }
  },
  data() {
    return {
      // data property for v-model binding with real textarea tag
      val: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      height: 'auto',
      isFocus: false,
      isHover: false
    }
  },
  computed: {
    currentLength: function () {
      return this.value.length
    },
    inputListeners: function () {
      const vm = this
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          vm.$emit('input', event.target.value)
        }
      })
    },
    computedStyles() {
      if (!this.autosize) return {}
      return {
        resize: !this.isResizeImportant ? 'none' : 'none !important',
        height: this.height,
        overflow: this.maxHeightScroll
          ? 'auto'
          : !this.isOverflowImportant ? 'hidden' : 'hidden !important'
      }
    },
    isResizeImportant() {
      const imp = this.important
      return imp === true || (Array.isArray(imp) && imp.includes('resize'))
    },
    isOverflowImportant() {
      const imp = this.important
      return imp === true || (Array.isArray(imp) && imp.includes('overflow'))
    },
    isHeightImportant() {
      const imp = this.important
      return imp === true || (Array.isArray(imp) && imp.includes('height'))
    },
    showLength() {
      return this.isShowLength && this.maxLength > 0
    }
  },
  watch: {
    value(val) {
      this.val = val
    },
    val(val) {
      this.$nextTick(this.resize)
      this.$emit('input', val)
    },
    minHeight() {
      this.$nextTick(this.resize)
    },
    maxHeight() {
      this.$nextTick(this.resize)
    },
    autosize(val) {
      if (val) this.resize()
    }
  },
  methods: {
    setFocus(isFocus) {
      this.isFocus = isFocus

      if (isFocus) {
        this.$emit('handlerFocus', isFocus)
      }
    },
    resize() {
      const important = this.isHeightImportant ? 'important' : ''
      this.height = `auto${important ? ' !important' : ''}`
      this.$nextTick(() => {
        let contentHeight = this.$el.querySelector('textarea').scrollHeight + 1

        if (this.minHeight) {
          contentHeight =
            contentHeight < this.minHeight ? this.minHeight : contentHeight
        }

        if (this.maxHeight) {
          if (contentHeight > this.maxHeight) {
            contentHeight = this.maxHeight
            this.maxHeightScroll = true
          } else {
            this.maxHeightScroll = false
          }
        }

        const heightVal = contentHeight + 'px'
        this.height = `${heightVal}${important ? ' !important' : ''}`
      })

      return this
    }
  },
  created() {
    this.val = this.value
  },
  mounted() {
    this.resize()
  }
}
</script>
