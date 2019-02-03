<template>
  <div id="app">
     <money v-model='coins'/>
    <employees v-model='todayWorkers' :coins='coins'/>
    <logbook/>
    <payments/>
    <tips-form :coins='coins' :todayWorkers='todayWorkers'/>
  </div>
</template>

<script>
import Money from './components/Money.vue'
import Employees from './components/Employees.vue'
import Logbook from './components/Logbook.vue'
import Payments from './components/Payments.vue'
import TipsForm from './components/TipsForm.vue'

export default {
  name: 'app',
  data() {
    return{
      todayWorkers: [],
      coins: [],
      }
  },
  components: {
    Money,
    Employees,
    Logbook,
    Payments,
    TipsForm
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}
#app {
    background-image: url(img/money-case-163495_1280.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    height: 100vh;
     font-family: 'Montserrat', sans-serif;
}
</style>
