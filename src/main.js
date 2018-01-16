import Vue from 'vue'
import App from './App.vue'
import store from './store'
import UndoRedo from './components/UndoRedo'

Vue.use(UndoRedo)

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
