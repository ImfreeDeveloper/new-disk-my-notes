<template>
  <div class="bl-notes">
    <Loader v-if="load"/>
    <div class="container">
      <div class="row">
        <Note
          v-for="item in notes"
          :key="item.id"
          :data-note="item"
          @handlerDelete="handlerDelete(item.id)"
        />
      </div>
    </div>
    <div class="btn-add-note" @click="addNote">
      <img src="/images/plus.svg" alt="add-note" />
    </div>

    <Popup v-model="modalShow">
      <template #body>
        <form-add-note @handlerSend="send" />
      </template>
    </Popup>
  </div>
</template>

<script>

import Note from '@components/Note.vue'
import appApi from '@/api/app'
import Popup from '@components/Popup.vue'
import FormAddNote from '@components/forms/FormAddNote.vue'
import Loader from '@components/Loader.vue'

export default {
  components: {
    Loader,
    Popup,
    FormAddNote,
    Note
  },
  data() {
    return {
      notes: [],
      modalShow: false,
      load: false
    }
  },
  methods: {
    addNote() {
      this.modalShow = true
    },
    async send() {
      try {
        await this.getList()

        this.modalShow = false
      } catch (e) {

      }
    },
    async getList() {
      this.load = true

      try {
        const notes = await appApi.noteList()

        setTimeout(() => {
          this.notes = notes
          this.load = false
        }, 600)
      } catch (e) {
        this.load = false
      }
    },
    async handlerDelete(id) {
      this.load = true
      try {
        await appApi.deleteNote(id)
        await this.getList()
      } catch (e) {
        this.load = false
      }
    }
  },
  async mounted() {
    await this.getList()
  }
}
</script>
