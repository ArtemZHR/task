export default {
  state: {
    TASK: [],
    USER: [
      { id: 1, name: 'Jonh' },
      { id: 2, name: 'Annie' },
      { id: 3, name: 'Christoffer' },
      { id: 4, name: 'Marry' },
      { id: 5, name: 'Chloe' }
    ],
    STATUS: [
      { id: 1, value: 'TO DO' },
      { id: 2, value: 'IN PROGRESS' },
      { id: 3, value: 'READY FOR TEST' },
      { id: 4, value: 'DONE' }
    ],
    filterUser: {
      id: 0, name: 'Default'
    },
    search: ''
  },
  mutations: {
    setNewTASK: (state, newTask) => {
      newTask.id = state.TASK.length + 1
      state.TASK.push(newTask)
    },
    setUpdateTask: (state, modifiedTask) => {
      state.TASK = state.TASK.map(obj => modifiedTask.id === obj.id ? modifiedTask : obj)
    },
    deleteTask: (state, taskToDelete) => {
      state.TASK = state.TASK.filter((item) => item.id !== taskToDelete.id)
    },
    setFilterUser: (state, newUser) => {
      if (state.filterUser.id === newUser.id) {
        state.filterUser = {
          id: 0, name: 'Default'
        }
      } else {
        state.filterUser = newUser
      }
    },
    updateSearch: (state, searchText) => {
      state.search = searchText
    }
  },
  actions: {
    CREATE_TASK ({ commit }, task) {
      commit('setNewTASK', task)
    },

    UPDATE_TASK ({ commit }, task) {
      commit('setUpdateTask', task)
    },

    DELETE_TASK ({ commit }, task) {
      commit('deleteTask', task)
    },

    UPDATE_FILTER_USER ({ commit }, user) {
      commit('setFilterUser', user)
    }
  },
  getters: {
    getAllTask: state => state.TASK,
    getAllUser: state => state.USER,
    getAllStatus: state => state.STATUS,
    getUserTask: state => (id) => state.TASK.filter(item => item.userId === id),

    getToDo: state => state.TASK.filter(item => item.status === 1)
      .filter(searchFilter => searchFilter.title.toLowerCase().includes(state.search.toLowerCase()))
      .filter(userFilter => state.filterUser.id ? userFilter.responsible === state.filterUser.id : userFilter),

    getInProgress: state => state.TASK.filter(item => item.status === 2)
      .filter(searchFilter => searchFilter.title.includes(state.search))
      .filter(userFilter => state.filterUser.id ? userFilter.responsible === state.filterUser.id : userFilter),

    getTest: state => state.TASK.filter(item => item.status === 3)
      .filter(searchFilter => searchFilter.title.includes(state.search))
      .filter(userFilter => state.filterUser.id ? userFilter.responsible === state.filterUser.id : userFilter),

    getDone: state => state.TASK.filter(item => item.status === 4)
      .filter(searchFilter => searchFilter.title.includes(state.search))
      .filter(userFilter => state.filterUser.id ? userFilter.responsible === state.filterUser.id : userFilter)

  }
}
