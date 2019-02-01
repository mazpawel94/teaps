<template>
  <div id="app">
    <Money/>
  </div>
</template>

<script>
import Money from './components/Money.vue'

export default {
  name: 'app',
  components: {
    Money
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
