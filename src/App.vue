<template>
  <div id="app">
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
  name: 'app',
  components: {
    Calendar
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');
body {
  font-family: 'Roboto', sans-serif;
  margin: 0px;
}
</style>
