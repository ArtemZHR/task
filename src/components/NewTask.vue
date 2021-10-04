<template>
  <v-card>
    <v-card-text>
      <v-text-field
        color="purple"
        v-model="$v.task.title.$model"
        @input="$v.task.title.$touch()"
        @blur="$v.task.title.$touch()"
        :error-messages="titleError"
        label="Name new task"
        outlined
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="task.deadline"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            color="purple"
            v-model="$v.task.deadline.$model"
            @input="$v.task.deadline.$touch()"
            @blur="$v.task.deadline.$touch()"
            :error-messages="deadlineError"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          color="purple"
          v-model="$v.task.deadline.$model"
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
        v-model="task.description"
        outlined
        no-resize
        label="Description"
      ></v-textarea>
      <v-select
        color="purple"
        label="Responsible"
        v-model="$v.task.responsible.$model"
        :items="getAllUser"
        @input="$v.task.responsible.$touch()"
        @blur="$v.task.responsible.$touch()"
        :error-messages="responsibleError"
        item-text="name"
        item-value="id"
        outlined
      ></v-select>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-around pb-5">

      <v-btn
        color="purple"
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
        @click.stop="create"
      >Create
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'NewTask',
  data () {
    return {
      task: {
        id: 0,
        title: null,
        deadline: null,
        responsible: null,
        description: null,
        status: 1
      },
      modal: false
    }
  },
  validations: {
    task: {
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
    ...mapGetters(['getAllUser']),
    titleError () {
      const errors = []
      if (!this.$v.task.title.$dirty) {
        return errors
      }

      !this.$v.task.title.required && errors.push('Field is required')
      return errors
    },
    deadlineError () {
      const errors = []
      if (!this.$v.task.deadline.$dirty) {
        return errors
      }

      !this.$v.task.deadline.required && errors.push('Field is required')
      return errors
    },
    responsibleError () {
      const errors = []
      if (!this.$v.task.responsible.$dirty) {
        return errors
      }

      !this.$v.task.responsible.required && errors.push('Field is required')
      return errors
    }
  },
  methods: {
    ...mapActions(['CREATE_TASK']),
    create () {
      this.$v.$touch()
      if (!this.$v.task.$error) {
        this.CREATE_TASK(this.task)
        this.$emit('cancelDialog')
      }
    },
    cancel () {
      this.$emit('cancelDialog')
    }
  }
}
</script>
