<template>
  <div>
    <div class="loader" v-if="successSave>=0"></div>
    <div class="tips-form" v-if="visible && (newTips>0 || todayWorkers.length)">
      <h3 v-if="coins.length">{{beautyAmount(sum() - startAmount)}}</h3>
      <ul>
        <li v-for="worker in todayWorkers" v-bind:key="worker.name">
          <span>{{worker.name}}</span>
          <select name="hours" v-model="worker.hours">
            <option value="1">cała zmiana</option>
            <option value="0.5">pół zmiany</option>
            <option value="2">podwójna zmiana</option>
          </select>
        </li>
      </ul>
      <button class="save-changes" @click="newCalculation">Zapisz zmiany</button>
    </div>
    <div class="saved-status" v-if="successSave>=0">
      <span v-if="successSave<4">
        Trwa zapis...
        <br>
        {{(successSave/4) * 100}}%
      </span>
      <span v-else>
        Zapis danych zakończony sukcesem!
        <br>
        <button @click="successSave = -1">Zamknij</button>
      </span>
    </div>
  </div>
</template>

<script>
import DBService from "../DBService";
export default {
  data() {
    return {
      startAmount: 0,
      visible: true,
      successSave: -1,
      error: ""
    };
  },
  props: ["coins", "todayWorkers"],
  async created() {
    try {
      const a = await DBService.getSum();
      this.startAmount = a[0].sum;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    beautyAmount: function(amount) {
      let sign = "";
      if (amount < 0) sign = "-";
      amount = Math.abs(amount);
      return `${sign}${Math.floor(amount / 100)},${
        amount % 100 < 10 ? "0" + (amount % 100) : amount % 100
      } zł`;
    },

    sum: function() {
      const sum =
        this.coins[0].amount * 1 +
        this.coins[1].amount * 2 +
        this.coins[2].amount * 5 +
        this.coins[3].amount * 10 +
        this.coins[4].amount * 20 +
        this.coins[5].amount * 50 +
        this.coins[6].amount * 100 +
        this.coins[7].amount * 200 +
        this.coins[8].amount * 500 +
        this.coins[9].amount * 1000;
      return sum;
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
      if (!this.todayWorkers.length) return alert("Zaznacz pracowników");
      this.visible = false;
      this.successSave++;
      let todayWorkersSum = this.todayWorkers.reduce((e1, e2, index) => {
        if (index === 1) return parseFloat(e1.hours) + parseFloat(e2.hours);
        return e1 + parseFloat(e2.hours);
      });
      if (this.todayWorkers.length === 1)
        todayWorkersSum = this.todayWorkers[0].hours;
      const todayName = [];
      const todayMoney = [];
      this.todayWorkers.forEach(e => {
        e.money +=
          Math.floor(this.newTips / (todayWorkersSum / parseFloat(e.hours))) /
          100;
        todayName.push(e.name);
        todayMoney.push(e.money);
      });
      this.saveEmployeeToBase(todayName, todayMoney);
      let participantsTable = [];
      [...this.todayWorkers].forEach(e => {
        participantsTable.push(e.name);
      });
      this.saveSummaryToBase(
        this.currentDate(),
        participantsTable.join(", "),
        this.beautyAmount(this.newTips)
      );
      this.saveSum(this.sum());
      const coinsName = [];
      const coinsAmount = [];
      [...this.coins].forEach(e => {
        coinsName.push(e.coin);
        coinsAmount.push(e.amount);
      });
      this.saveToBaseCoin(coinsName, coinsAmount);
    },

    async saveEmployeeToBase(name, money) {
      try {
        await DBService.addEmployeeMoney(name, money);
        this.successSave++;
      } catch (error) {
        this.error = error;
      }
    },

    async saveSummaryToBase(date, participants, sum) {
      try {
        await DBService.addSummary(date, participants, sum);
        this.successSave++;
      } catch (error) {
        this.error = error;
      }
    },

    async saveSum(sum) {
      try {
        await DBService.saveSum(sum);
        this.successSave++;
      } catch (error) {
        this.error = error;
      }
    },

    async saveToBaseCoin(name, money) {
      try {
        await DBService.saveCoins(name, money);
        this.successSave++;
      } catch (error) {
        this.error = error;
      }
    }
  },

  computed: {
    newTips: function() {
      if (!this.coins.length) return 0;
      return this.sum() - this.startAmount;
    }
  }
};
</script>

<style>
.tips-form {
  position: absolute;
  background-color: rgb(199, 164, 11);
  border: 2px solid rgba(153, 126, 53, 0.616);
  border-radius: 15px;
  width: 300px;
  height: 250px;
  top: 300px;
  left: 12%;
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

.saved-status {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(199, 164, 11);
  width: 400px;
  height: 100px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  border: 3px solid rgb(100, 83, 7);
  border-radius: 10px;
  box-shadow: 5px -2px 30px 1px black;
  z-index: 100;
}
.saved-status button {
  cursor: pointer;
  background-color: #094604;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px;
}
</style>