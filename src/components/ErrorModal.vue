<template>
  <div class="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger">Error</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="dismissError"></button>
        </div>
        <div class="modal-body">An error occurred while communicating with the API.</div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal.js'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ErrorModal',
  methods: {
    ...mapMutations({
      setDataError: 'setDataError'
    }),
    dismissError() {
      this.setDataError(false)
    }
  },
  computed: {
    ...mapState({
      dataError: state => state.dataError
    }),
    modal() {
      let modal = new Modal(document.querySelector('.modal'))
      return modal
    }
  },
  watch: {
    dataError(newVal) {
      if (newVal) {
        this.modal.show()
      }
      else {
        this.modal.hide()
      }
    }
  }
}
</script>