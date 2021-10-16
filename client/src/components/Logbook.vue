<template>
    <div class="logbook">
        <h2>dziennik </h2>
        <div class="table">
            <div class="nav">
                <div class="date">Data</div>
                <div class="stuff">Czarkownicy</div>
                <div class="amount">Kwota</div>
            </div>
            <div class="day" v-for='summary in summaries.slice().reverse()' v-bind:key="summary.date">
                <div class="date">{{summary.date}}</div>
                <div class="stuff">{{summary.participants}}</div>
                <div class="amount">{{summary.sum}}</div>
            </div>
        </div>
    </div>
</template>

<script>

import DBService from '../DBService';

export default {
    data() {
    return {
      error: '',
      text: '',
     summaries: []
    }
  },
async created() {
    try {
       this.summaries = await DBService.getSummaries();
    } catch (error) {
        this.error = error;
    }
    },
}

</script>

<style scoped>
.logbook {
    width: 800px;
    padding: 15px;
    text-align: center;
    float: left;
}
.table {
    background-color: rgba(224, 223, 207, 0.548);
    margin: auto;
    width: 100%;
    height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
}
h2 {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 15px;
}

.nav, .day {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 5px;
}

.nav{
    font-weight: bold;
    background-color: rgb(27, 151, 11);
    color: white;
    letter-spacing: 1.5px;
    padding: 15px;
}
.date {
    width: 20%;
}

.stuff {
    width: 65%;
}

.amount {
    width: 20%;
}


.day:nth-of-type(2n) {
    background-color: rgba(119, 97, 97, 0.342);
}


.table::-webkit-scrollbar {
width: 5px;
height: 20px;
}

.table::-webkit-scrollbar-thumb {
background-color: rgba(13, 71, 5, 0.692);
border-radius: 25px;
}
@media (max-width:1024px) {
  .logbook {
   width: 99vw;
   padding: 0;
  }
}
</style>
