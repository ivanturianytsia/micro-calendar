import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedItems: {}
  },
  getters: {
    selectedItems (state) {
      return state.selectedItems
    }
  },
  mutations: {
    emptyState (state) {
      this.replaceState({ selectedItems: {} });
    },
    selectItems (state, payload) {
      for (let i in payload) {
        Vue.set(state.selectedItems, payload[i], true)
      }
    },
    unselectItems (state, payload) {
      for (let i in payload) {
        Vue.delete(state.selectedItems, payload[i])
      }
    }
  }
})
