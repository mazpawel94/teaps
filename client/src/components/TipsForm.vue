<template>
  <div class="tips-form">
    <h3>+{{beautyAmount(newTips)}}</h3>

    <ul>
      <li v-for="worker in todayWorkers" v-bind:key="worker.name">
        <span>{{worker.name}}</span>
        <select name="hours" id="hours" v-model="worker.hours">
          <option value="1">cała zmiana</option>
          <option value="0.5">pół zmiany</option>
          <option value="2">podwójna zmiana</option>
        </select>
      </li>
    </ul>
    <button class="save-changes" @click="newCalculation">Zapisz zmiany</button>
  </div>
</template>

<script>
import DBService from "../DBService";

export default {
  props: ["newTips", "todayWorkers"],
  methods: {
    beautyAmount: function(amount) {
      return ` ${Math.floor(amount / 100)},${
        amount % 100 < 10 ? "0" + (amount % 100) : amount % 100
      } zł`;
    },

    currentDate: function() {
      let date = new Date();
      const leadingZero = i => (i < 10 ? "0" + i : i);
      return `${leadingZero(date.getDate())}/${leadingZero(
        date.getMonth() + 1
      )}/${leadingZero(date.getFullYear())}, ${leadingZero(
        date.getHours()
      )}:${leadingZero(date.getMinutes())}`;
    },
    newCalculation: function() {
      let todayWorkersSum = this.todayWorkers.reduce((e1, e2, index) => {
        if (index === 1) return parseFloat(e1.hours) + parseFloat(e2.hours);
        return e1 + parseFloat(e2.hours);
      });
      if (this.todayWorkers.length === 1)
        todayWorkersSum = this.todayWorkers[0].hours;
      this.todayWorkers.forEach(e => {
        e.money +=
          Math.floor(this.newTips / (todayWorkersSum / parseFloat(e.hours))) /
          100;
        console.log(this.newTips, e.money);
        this.saveToBase(e.name, e.money);
      });
      let participantsTable =[];
            [...this.todayWorkers].forEach(e => {
                participantsTable.push(e.name)});
      this.saveSummaryToBase(this.currentDate(), participantsTable.join(', '), this.beautyAmount(this.newTips));
      ;

    },
    async saveToBase(name, money) {
      try {
        await DBService.addEmployeeMoney(name, money);
        console.log(money);
      } catch (error) {
        console.log("coś się zepsło");
      }
    },

    async saveSummaryToBase(date, participants,sum) {
        try {
            await DBService.addSummary(date, participants, sum);
            console.log(date, participants, sum);
        } catch (error) {
            console.log("coś się zepsło");
        }
    }
  }
};
</script>

<style>
.tips-form {
  position: absolute;
  /* display: none; */
  background-color: rgb(199, 164, 11);
  border: 2px solid rgba(153, 126, 53, 0.616);
  border-radius: 15px;
  width: 300px;
  height: 250px;
  top: 18%;
  left: 27%;
}

.tips-form h3 {
  text-align: center;
}
.tips-form ul {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  height: 150px;
  justify-content: space-around;
}
.tips-form li {
  padding: 5px;
  list-style-type: none;
}

.tips-form span {
  display: inline-block;
  min-width: 90px;
  margin-left: 15px;
}

.tips-form select {
  background-color: rgb(196, 221, 114);
  border: none;
}

.tips-form button {
  cursor: pointer;
  position: absolute;
  left: 50%;
  bottom: 10px;
  height: 30px;
  transform: translateX(-50%);
  background-color: rgb(9, 70, 4);
  color: white;
  border: none;
  padding: 5px;
  border-radius: 10px;
  font-size: 15px;
}
</style>
