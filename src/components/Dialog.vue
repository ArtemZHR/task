<template>
  <v-dialog
    v-model="dialogState"
    max-width="580"
    persistent
  >
    <div class="rounded-lg white overflow-hidden">
      <div class="dialog-close d-flex align-center justify-space-between px-5 py-3">
        <span class="text-h4 purple--text">{{titleText}}</span>
        <v-btn
          @click="$emit('cancelDialog')"
          icon
          title="Close dialog window"
        >
          <v-icon
            class="tile-refresh"
            color="purple"
          >mdi-close
          </v-icon>
        </v-btn>
      </div>
      <slot></slot>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    state: {
      required: true
    },
    titleText: {
      type: String
    }
  },
  computed: {
    dialogState: {
      get () {
        return this.state
      },
      set (val) {
        this.$emit('cancelDialog')
      }
    }
  }
}
</script>

<style lang="scss">
  .dialog-close{
    width: 100%;
  }
</style>
