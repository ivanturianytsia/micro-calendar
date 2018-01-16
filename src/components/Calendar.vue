<template lang="html">
  <div class="container">
    <table v-for="day in days">

      <tr>
        <th>{{ day.name }}</th>
      </tr>

      <tr v-for="hour in day.hours" class="item" :data-id="hour.id" @click="toggleHour(hour.id)" >
        <td @mousedown="onHourMouseDown(hour.id)" @mouseover="onHourMouseOver(hour.id)" @mouseup="onHourMouseUp(hour.id)" :class="hourClass(hour.id)">{{ hour.hour }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import DragSelect from 'vue-drag-select/src/DragSelect.vue'

export default {
  data () {
    return {
      selectedItems: {},
      hoverItems: {},
      days: this.genDays(),
      hourSelectStart: ''
    }
  },
  methods: {
    onHourMouseDown (hourId) {
      this.hourSelectStart = hourId
    },
    onHourMouseOver (hourId) {
      const s = this.hourSelectStart
      const result = {}
      if (s && s !== hourId) {
        const isPositive = !this.selectedItems[s]
        const startDay = Math.min(s.split('-')[0], hourId.split('-')[0])
        const startHour = Math.min(s.split('-')[1], hourId.split('-')[1])
        const finishDay = Math.max(s.split('-')[0], hourId.split('-')[0])
        const finishHour = Math.max(s.split('-')[1], hourId.split('-')[1])
        for (let i = startDay; i <= finishDay; i++ ) {
          for (let j = startHour; j <= finishHour; j++ ) {
            const id = `${i}-${j}`
            result[id] = true
          }
        }
      }
      this.hoverItems = result
    },
    onHourMouseUp (hourId) {
      const s = this.hourSelectStart
      if (s && s !== hourId) {
        const isPositive = !this.selectedItems[s]
        const startDay = Math.min(s.split('-')[0], hourId.split('-')[0])
        const startHour = Math.min(s.split('-')[1], hourId.split('-')[1])
        const finishDay = Math.max(s.split('-')[0], hourId.split('-')[0])
        const finishHour = Math.max(s.split('-')[1], hourId.split('-')[1])
        for (let i = startDay; i <= finishDay; i++ ) {
          for (let j = startHour; j <= finishHour; j++ ) {
            const id = `${i}-${j}`
            this.setHourSelected(id, isPositive)
          }
        }
      }
      this.hoverItems = {}
      this.hourSelectStart = ''
    },
    setHourSelected (hourId, shouldSelect) {
      if (shouldSelect) {
        this.$set(this.selectedItems, hourId,  true)
      } else {
        this.$delete(this.selectedItems, hourId)
      }

    },
    toggleHour (hourId) {
      this.setHourSelected(hourId, !this.selectedItems[hourId])
		},
    updateSelectedItems (newSelectedItems) {
      newSelectedItems.forEach(item => {
        this.setHourSelected(item.dataset.id, true)
      })
    },
    genDays () {
      return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        .map((day, dayIndex) => ({
          name: day,
          hours: Array(24)
            .fill(0)
            .map((hour, hourIndex) => ({
        			hour: `${hourIndex}:00`,
              id: `${dayIndex}-${hourIndex}`,
        		 }))
        	}))
    },
    hourClass (hourId) {
      return {
        selected: !!this.selectedItems[hourId],
        hover: !!this.hoverItems[hourId]
      }
    }
  },
  components: {
    'drag-select-container': DragSelect
  }
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.container {
  position: relative;
  width:100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

table {
  position: relative;
  width: 150px;
  border-collapse: collapse;
}
tr {
  border-top: solid whitesmoke 0.5px;
  user-select: none;
}
td, th {
  text-align: center;
  padding: 5px;
  background-color: transparent;
}
td {
  cursor: pointer;

  color: gray;
}

td:hover {
  background-color: whitesmoke;
}

td.selected {
  background-color: $blue;
  color: white;
}
td.hover {
  background-color: whitesmoke;
  color: gray;
}
</style>
