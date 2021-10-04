<template>
  <v-card v-if="localTask">
    <v-card-text>
      <v-text-field
        color="purple"
        v-model="$v.localTask.title.$model"
        @input="$v.localTask.title.$touch()"
        @blur="$v.localTask.title.$touch()"
        :error-messages="titleError"
        label="Name new task"
        outlined
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="localTask.deadline"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            color="purple"
            v-model="$v.localTask.deadline.$model"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            @input="$v.localTask.deadline.$touch()"
            @blur="$v.localTask.deadline.$touch()"
            :error-messages="deadlineError"
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          color="purple"
          v-model="$v.localTask.deadline.$model"
          :max="$moment(new Date).add(2, 'weeks').format($moment.HTML5_FMT.DATETIME_LOCAL)"
          :min="$moment(new Date).format($moment.HTML5_FMT.DATETIME_LOCAL)"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="purple"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="purple"
            @click="$refs.dialog.save(task.deadline)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-textarea
        color="purple"
        v-model="localTask.description"
        outlined
        no-resize
        label="Description"
      ></v-textarea>
      <v-select
        color="purple"
        label="Responsible"
        v-model="$v.localTask.responsible.$model"
        :items="getAllUser"
        @input="$v.localTask.responsible.$touch()"
        @blur="$v.localTask.responsible.$touch()"
        :error-messages="responsibleError"
        item-text="name"
        item-value="id"
        outlined
      ></v-select>
      <v-select
        label="Status"
        v-model="localTask.status"
        :items="getAllStatus"
        item-text="value"
        item-value="id"
        outlined
      ></v-select>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-around pb-5">

      <v-btn
        color="red"
        dark
        rounded
        title="Delete task"
        min-width="34px"
        width="34px"
        icon
        @click.stop="deleteTask"
      >
        <v-icon>
          mdi-delete-outline
        </v-icon>
      </v-btn>

      <v-btn
        color="orange"
        dark
        rounded
        title="Create new VPN"
        width="100px"
        @click.stop="cancel"
      >Cancel
      </v-btn>

      <v-btn
        color="purple"
        dark
        rounded
        title="Create new VPN"
        width="100px"
        @click.stop="update"
      >Update
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localTask: null,
      modal: false
    }
  },
  validations: {
    localTask: {
      title: {
        required
      },
      deadline: {
        required
      },
      responsible: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['getAllUser', 'getAllStatus']),
    titleError () {
      const errors = []
      if (!this.$v.localTask.title.$dirty) {
        return errors
      }

      !this.$v.localTask.title.required && errors.push('Field is required')
      return errors
    },
    deadlineError () {
      const errors = []
      if (!this.$v.localTask.deadline.$dirty) {
        return errors
      }

      !this.$v.localTask.deadline.required && errors.push('Field is required')
      return errors
    },
    responsibleError () {
      const errors = []
      if (!this.$v.localTask.responsible.$dirty) {
        return errors
      }

      !this.$v.localTask.responsible.required && errors.push('Field is required')
      return errors
    }
  },
  methods: {
    ...mapActions(['UPDATE_TASK', 'DELETE_TASK']),
    update () {
      this.$v.$touch()
      if (!this.$v.localTask.$error) {
        this.UPDATE_TASK(this.localTask)
        this.$emit('cancelDialog')
      }
    },
    cancel () {
      this.$emit('cancelDialog')
    },
    deleteTask () {
      this.DELETE_TASK(this.task)
      this.$emit('cancelDialog')
    },
    copyItem () {
      this.localTask = JSON.parse(JSON.stringify(this.task))
    }
  },
  mounted () {
    console.log(this.task)
    this.copyItem()
    console.log(this.localTask)
  }
}
</script>
