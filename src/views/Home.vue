<template>
  <v-container>
    <v-item-group>
      <v-container>
        <v-row class="d-flex justify-space-between">
          <v-col cols="6">
            <span>Filter by user:</span>
            <v-chip-group
              active-class="purple--text"
            >
              <v-chip
                v-for="user in getAllUser"
                :key="user.id"
                @click="updateFilterUser(user)"
              >
                {{ user.name }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field
              color="purple"
              v-model="search"
              placeholder="Search by task name..."
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="3"
          >
            <p class="text-center font-weight-bold white--text rounded-lg pa-2"
               style="background-color: plum"
            >To do</p>
            <v-item v-for="item in getToDo" :key="item.id">
              <task-tile :item="item"></task-tile>
            </v-item>
          </v-col>
          <v-col
            cols="3"
          >
            <p class="text-center font-weight-bold white--text rounded-lg pa-2"
               style="background-color: plum">In progress</p>
            <v-item v-for="item in getInProgress" :key="item.id">
              <task-tile :item="item"></task-tile>
            </v-item>
          </v-col>
          <v-col
            cols="3"
          >
            <p class="text-center font-weight-bold white--text rounded-lg pa-2"
               style="background-color: plum">Ready for test</p>
            <v-item v-for="item in getTest" :key="item.id">
              <task-tile :item="item"></task-tile>
            </v-item>
          </v-col>
          <v-col
            cols="3"
          >
            <p class="text-center font-weight-bold white--text rounded-lg pa-2"
               style="background-color: plum">getDone</p>
            <v-item v-for="item in getDone" :key="item.id">
              <task-tile :item="item"></task-tile>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-btn
      class="mx-2 add-button"
      color="purple"
      dark
      fab
      title="Add new VPN"
      @click.stop="dialogBlock = !dialogBlock"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
      <Dialog :state="dialogBlock" title-text="Add new task" @cancelDialog="dialogBlock = !dialogBlock">
        <new-task v-if="dialogBlock" @cancelDialog="dialogBlock = !dialogBlock"></new-task>
      </Dialog>
    </v-btn>
  </v-container>
</template>

<script>
import NewTask from '../components/NewTask'
import Dialog from '../components/Dialog'
import TaskTile from '../components/TaskTile'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    NewTask,
    TaskTile,
    Dialog
  },
  data () {
    return {
      dialogBlock: true
    }
  },
  computed: {
    ...mapGetters(['getToDo', 'getInProgress', 'getTest', 'getDone', 'getAllUser']),
    search: {
      get () {
        return this.$store.state.search
      },
      set (value) {
        this.$store.commit('updateSearch', value)
      }
    }
  },
  methods: {
    ...mapActions(['UPDATE_FILTER_USER']),
    updateFilterUser (user) {
      console.log(user)
      this.UPDATE_FILTER_USER(user)
    }
  }
}
</script>

<style lang="scss">
  .add-button {
    position: absolute;
    bottom: 40px;
    right: 40px;
  }
</style>
