<template>
  <div class="employees">
    <div class="loader" v-if="savingTime"></div>
    <div
      class="employee"
      v-for="worker in filteredWorkers"
      v-bind:key="worker._id"
    >
      <input
        type="checkbox"
        v-model="worker.today"
        @click="emitTodayWorkers(worker)"
      />
      <div class="name">{{ worker.name }}</div>
      <div
        class="sum"
        v-if="worker.money > 0"
        :style="{ width: worker.money * 30 + 'px' }"
      >
        {{ worker.money.toFixed(2) + " zł" }}
        <div class="start-amount"></div>
        <button
          class="take-money"
          :class="{ show: worker.money >= 10 }"
          @click="take10zlotys(worker)"
        >
          Weźże dychę
        </button>
      </div>
    </div>

    <div class="employee new">
      <input type="checkbox" name id />
      <input
        class="new-employee"
        type="text"
        placeholder="nowa osoba"
        v-model="newEmployee"
      />
      <button @click="addEmployee">+</button>
    </div>
    <div class="ex-employee-toggle">
      <input type="checkbox" v-model="showExEmployees" id="showExEmployees" />
      <label for="showExEmployees">Pokaż byłych pracowników</label>
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
      savingTime: false,
      showExEmployees: false,
    };
  },
  props: ["coins"],
  computed: {
    filteredWorkers() {
      return this.showExEmployees
        ? this.workers
        : this.workers.filter((worker) => !worker.isExEmployee);
    },
  },
  async created() {
    try {
      this.workers = await DBService.getEmployees();
    } catch (error) {
      this.error = error;
    }
  },

  methods: {
    todayWorkers: function () {
      return this.workers.filter((e) => e.today);
    },
    checkName: function (newName) {
      let uniqueName = true;
      [...this.workers].forEach((e) => {
        if (e.name.toUpperCase() === newName.toUpperCase()) uniqueName = false;
      });
      return uniqueName;
    },

    addEmployee: function () {
      const name = this.newEmployee.trim();
      if (name.length === 0) return;
      if (this.checkName(name)) {
        this.workers.push({
          name: name,
          money: 0,
        });
        this.addEmployeeToBase(name);
        this.newEmployee = "";
      } else {
        alert(
          "Istnieje osoba o takim imieniu, dodaj pierwszą literę nazwiska lub inny identyfikujący Cię element"
        );
      }
    },

    currentDate: function () {
      let date = new Date();
      const leadingZero = (i) => (i < 10 ? "0" + i : i);
      return `${leadingZero(date.getDate())}/${leadingZero(
        date.getMonth() + 1
      )}/${leadingZero(date.getFullYear())}, ${leadingZero(
        date.getHours()
      )}:${leadingZero(date.getMinutes())}`;
    },

    take10zlotys: function (worker) {
      this.savingTime = true;
      worker.money = Math.round((worker.money - 10) * 100) / 100;

      this.coins[9].amount -= 1;
      const promises = [
        this.addEmployeeMoney(worker.name, worker.money),
        this.addPayment(worker.name, this.currentDate()),
        this.getMoneyFromPig(),
        this.refreshSum(),
      ];
      Promise.all(promises).then(() => {
        this.$root.$refs.TipsForm.subtract10zl();
        this.savingTime = false;
      });
    },

    sum: function () {
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
    emitTodayWorkers: function (worker) {
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
    },
  },
};
</script>

<style>
.employees {
  margin-top: 20px;
  margin-left: 10px;
  min-width: 700px;
  background-color: rgba(21, 77, 77, 0.459);
  border: rgb(21, 77, 77) 2px solid;
  border-radius: 10px;
  padding: 15px;
  padding-top: 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* justify-content: space-around; */
  position: relative;
  margin-left: auto;
  margin-right: 10px;
  max-height: 60vh;
  min-height: 300px;
  overflow-y: scroll;

  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    white 3px,
    white 6px
  );
  /* 537: padding 15 + gap 2*10 + name 180 + checkbox 22 + money 30 * 10 */
  background-position: 535px 35px;
  background-size: 3px 100%;
  background-repeat: repeat-y;
  background-attachment: local;
}

.employee {
  min-width: 60%;
  height: 22px;
  display: flex;
  gap: 10px;
}

.employee input {
  display: block;
  min-height: 22px;
  min-width: 22px;
}
.employee .name,
.employee.new .new-employee {
  background-color: rgba(198, 224, 196, 0.781);
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 15px;
  min-width: 180px;
  line-height: 22px;
}

.employee .sum {
  display: inline-block;
  width: 300px;
  background-color: rgb(199, 164, 11);
  border-radius: 5px;
  font-size: 15px;
  position: relative;
  line-height: 22px;
}

.employee .sum .take-money {
  position: absolute;
  cursor: pointer;
  display: block;
  width: auto;
  font-size: 20px;
  right: 0;
  top: 0;
  transform: translate(120%, 0);
  background-color: rgb(58, 195, 17);
  border: none;
  border-radius: 3px;
  visibility: hidden;
  color: white;
  padding: 0 7px;
  letter-spacing: 1px;
  font-size: 16px;
  line-height: 22px;
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
  width: 25px;
  height: 25px;
  line-height: 25px;
  border: none;
}

.employees::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.employees::-webkit-scrollbar-thumb {
  background-color: rgba(238, 218, 130, 0.41);
  border-radius: 25px;
}

.ex-employee-toggle {
  color: white;
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
