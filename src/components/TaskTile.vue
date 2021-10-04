<template>
  <v-card class="pa-4 ma-4 rounded-lg purple lighten-5 d-flex flex-column justify-space-between">
    <v-card-text class="pa-0">
      <p class="title font-weight-bold">{{ item.title }}</p>
      <p class="subtitle-1">Make up: <strong>{{ item.deadline }}</strong></p>
      <p class="subtitle-1">Appointed: <strong>{{ getAllUser[item.responsible - 1].name }}</strong></p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        class="font-weight-bold"
        color="purple"
        dark
        rounded
        @click.stop="dialogBlock = !dialogBlock"
      >Info
        <Dialog :state="dialogBlock" title-text="Task details" @cancelDialog="dialogBlock = !dialogBlock">
          <task-card :task="item" @cancelDialog="dialogBlock = !dialogBlock" v-if="dialogBlock"></task-card>
        </Dialog>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskCard from './TaskCard'
import Dialog from './Dialog'

export default {
  name: 'TaskTile',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    TaskCard,
    Dialog
  },
  data () {
    return {
      dialogBlock: false
    }
  },
  computed: {
    ...mapGetters(['getAllUser'])
  },
  methods: {
    updateStatus () {

    }
  }
}
</script>
