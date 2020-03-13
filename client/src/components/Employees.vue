<template>
  <div class="employees">
    <div class="loader" v-if="savingTime"></div>
    <div class="employee" v-for="worker in workers" v-bind:key="worker._id">
      <input type="checkbox" v-model="worker.today" @click="emitTodayWorkers(worker)" />
      <div class="name">{{worker.name}}</div>
      <div class="sum" v-if="worker.money>0" :style="{ width: worker.money * 30 + 'px' }">
        {{worker.money.toFixed(2) + ' zł'}}
        <div class="start-amount"></div>
        <button
          class="take-money"
          :class="{'show': worker.money >= 10}"
          @click="take10zlotys(worker)"
        >Weźże dychę</button>
      </div>
    </div>

    <div class="employee new">
      <input type="checkbox" name id />
      <input class="new-employee" type="text" placeholder="nowa osoba" v-model="newEmployee" />
      <button @click="addEmployee">+</button>
    </div>
  </div>
</template>

<script>
import DBService from "../DBService";

export default {
  data() {
    return {
      error: "",
      text: "",
      workers: [],
      newEmployee: "",
      savingTime: false
    };
  },
  props: ["coins"],

  async created() {
    try {
      this.workers = await DBService.getEmployees();
    } catch (error) {
      this.error = error;
    }
  },

  methods: {
    todayWorkers: function() {
      return this.workers.filter(e => e.today);
    },
    checkName: function(newName) {
      let uniqueName = true;
      [...this.workers].forEach(e => {
        if (e.name.toUpperCase() === newName.toUpperCase()) uniqueName = false;
      });
      return uniqueName;
    },

    addEmployee: function() {
      const name = this.newEmployee.trim();
      if (name.length === 0) return;
      if (this.checkName(name)) {
        this.workers.push({
          name: name,
          money: 0
        });
        this.addEmployeeToBase(name);
        this.newEmployee = "";
      } else {
        alert(
          "Istnieje osoba o takim imieniu, dodaj pierwszą literę nazwiska lub inny identyfikujący Cię element"
        );
      }
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

    take10zlotys: function(worker) {
      this.savingTime = true;
      worker.money = Math.round((worker.money - 10) * 100) / 100;
      this.coins[9].amount -= 1;
      const promises = [
        this.addEmployeeMoney(worker.name, worker.money),
        this.addPayment(worker.name, this.currentDate()),
        this.getMoneyFromPig(),
        this.refreshSum()
      ];
      Promise.all(promises).then(() => {
        this.savingTime = false;
      });
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
    emitTodayWorkers: function(worker) {
      worker.hours = 1; //domyślnie zakładamy, że pracuje całą zmianę, gdyż tak jest w 95% przypadków
      worker.today = !worker.today; //konieczne, ponieważ razie zdarzenie jest wywoływane przed aktualizacją checkboxa
      const tab = this.todayWorkers();
      this.$emit("input", tab);
    },
    async addEmployeeToBase(name) {
      try {
        await DBService.addEmployee(name);
      } catch (error) {
        this.error = error;
      }
    },

    async addEmployeeMoney(name, money) {
      try {
        await DBService.addEmployeeMoney([name], [money]);
      } catch (error) {
        this.error = error;
      }
    },

    async addPayment(name, date) {
      try {
        await DBService.addPayment(name, date);
      } catch (error) {
        this.error = error;
      }
    },

    async getMoneyFromPig() {
      try {
        await DBService.saveCoins(["10 złotych"], [this.coins[9].amount]);
      } catch (error) {
        this.error = error;
      }
    },

    async refreshSum() {
      try {
        await DBService.saveSum(this.sum());
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

  <style>
.employees {
  margin-top: 20px;
  margin-left: 10px;
  min-width: 700px;
  background-color: rgba(21, 77, 77, 0.459);
  border: rgb(21, 77, 77) 2px solid;
  border-radius: 50px;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  position: relative;
  margin-left: auto;
  margin-right: 10px;
  max-height: 60vh;
  min-height: 300px;
  overflow-y: scroll;
}

.employees::before {
  content: "10zł";
  position: absolute;
  top: 4px;
  font-size: 20px;
  left: 615px;
  transform: translateX(-50%);
  color: white;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
}
.employees::after {
  content: "";
  position: absolute;
  background-color: transparent;
  width: 1px;
  border-left: dotted 3px white;
  /* border: dotted 1px white; */
  /* height: calc(100% - 40px); */
  top: 35px;
  bottom: 0;
  left: 605px;
}
.employee {
  min-width: 60%;
  height: 31px;
  display: flex;
  margin: 7px;
  /* background-color: rgba(255, 255, 255, 0.527); */
}
.employee input {
  display: block;
  height: 25px;
  width: 25px;
  margin-top: 3px;
  margin-left: 10px;
}
.employee .name,
.employee.new .new-employee {
  background-color: rgba(198, 224, 196, 0.781);
  width: 200px;
  height: 100%;
  margin-left: 40px;
  border-radius: 50px;
  font-size: 24px;
  border: none;
  text-align: center;
}

.employee .sum {
  display: inline-block;
  height: 25px;
  width: 300px;
  background-color: rgb(199, 164, 11);
  margin-top: 3px;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 20px;
  position: relative;
}

.employee .sum .take-money {
  position: absolute;
  cursor: pointer;
  display: block;
  width: auto;
  font-size: 20px;
  right: 0;
  top: 50%;
  transform: translate(120%, -50%);
  background-color: rgb(58, 195, 17);
  border: none;
  border-radius: 10px;
  visibility: hidden;
  color: white;
  padding: 5px;
  letter-spacing: 1px;
}

.employee .sum .take-money.show {
  visibility: visible;
}

.employee.new button {
  cursor: pointer;
  border-radius: 50%;
  background-color: rgb(17, 230, 27);
  font-size: 30px;
  color: white;
  width: 35px;
  height: 35px;
  line-height: 35px;
  border: none;
  margin-left: 20px;
}

.employees::-webkit-scrollbar {
  width: 5px;
  height: 20px;
}

.employees::-webkit-scrollbar-thumb {
  background-color: rgba(238, 218, 130, 0.41);
  border-radius: 25px;
}

@media (max-width: 1024px) {
  .employee .sum {
    max-width: 310px;
  }
  .take-money {
    left: 130px;
  }
}
</style>
  