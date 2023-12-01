<template>
  <div class="note">
    <p class="note__title">{{ dataNote.title }}</p>
    <p class="note__text">{{ dataNote.text }}</p>
    <div class="note__remove">
      <img src="/images/close.svg" alt="close" />
      Удалить
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataNote: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  }
}
</script>
