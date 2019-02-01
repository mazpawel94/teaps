<template>
  <div class="money">
        <div class="glass"></div>
        <div class="summary">
            <div class="images">
                <img src="../img/1_grosz.png" alt="">
                <img src="../img/2_grosze_2017.png" alt="">
                <img src="../img/5_groszy_jpg.png" alt="">
                <img src="../img/10_gr_mini_1_01.png" alt="">
                <img src="../img/20_gr_mini_1_01.png" alt="">
                <img src="../img/50_gr_mini_1_01.png" alt="">
                <img src="../img/1_zl_mini_1_01.png" alt="">
                <img src="../img/2zl_mini_1_01.png" alt="">
                <img src="../img/5zl_mini_1_01.png" alt="">
                <img src="../img/4213d4154183bc179091bdbadd46.jpg" alt="">
            </div>
            <div class="inputs">
                <input type="number" name='one-penny' data-penny=1  v-model="coins[0].amount">
                <input type="number" name='two-penny' data-penny=2  v-model="coins[1].amount">
                <input type="number" name='five-penny' data-penny=5  v-model="coins[2].amount">
                <input type="number" name='ten-penny' data-penny=10  v-model="coins[3].amount">
                <input type="number" name='twenty-penny' data-penny=20  v-model="coins[4].amount">
                <input type="number" name='fifty-penny' data-penny=50  v-model="coins[5].amount">
                <input type="number" name='one-zloty' data-penny=100  v-model="coins[6].amount">
                <input type="number" name='two-zlotys' data-penny=200  v-model="coins[7].amount">
                <input type="number" name='five-zlotys' data-penny=500  v-model="coins[8].amount">
                <input type="number" name='ten-zlotys' data-penny=1000  v-model="coins[9].amount">
            </div>
            <!-- tymczasowy button do zapisu do bazy -->
            <button class = "save-changes" @click= "newCalculation">Zapisz zmiany</button>
        </div>
        <div class="pig">
            <div class="amount">{{beautyAmount(sum())}}</div> <img src="../img/piggy-bank-1001599_640.png" alt="">
            <div class="start-amount"></div>
        </div>
        <button class="actualization" @click="startPiggyValue"> aktualizuj</button>
    </div>
</template>

<script>

import DBService from '../DBService';

export default {
  data() {
    return {
      error: '',
      text: '',
     coins: [],
     startAmount: -1,
    }
  },
  async created() {
    try {
     this.coins = await DBService.getMoneys();
    // [...coinsBase].map((e,i) => {
    //   this.coins[i] = e.amount;
    }
    catch(err) {
      this.error = err;
    }
  },
  
  methods : {

    async newCalculation() {
      try {
          await DBService.saveSum(this.beautyAmount(this.sum()));
          for(let i=0; i< this.coins.length; i++)
            await DBService.saveCoins(this.coins[i].coin, this.coins[i].amount);
          // console.log("ewryfink is gud");
          }
          catch(err) {
            this.error = err;
            // console.log("samfing");
          }
    },

    sum: function () {
            const sum = this.coins[0].amount*1 + this.coins[1].amount*2 + this.coins[2].amount*5 + this.coins[3].amount*10 + this.coins[4].amount*20 + this.coins[5].amount*50 + this.coins[6].amount*100 + this.coins[7].amount*200 + this.coins[8].amount*500 + this.coins[9].amount*1000;
            return sum;
        
        },

        beautyAmount: function(amount) {
            return ` ${Math.floor(amount/100)},${amount%100 <10 ? amount%100 + "0" : amount%100} zł`;
        },
        startPiggyValue: function() {
            if(this.startAmount===-1) this.startAmount = this.sum();
            document.querySelector('.start-amount').innerHTML = 'Przed: ' + this.beautyAmount(this.startAmount);
        },
        }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money  {
    float: left;

min-width: 40%;
min-height: 50vh;
  display: flex;
  flex-direction: column;
  /* background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5%; */
}


.money input {
    width: 40px;
    height: 30px;
    text-align: center;
    margin-left: 10px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    background-color: rgb(231, 224, 224);
}

.money .summary {
    margin-top: 20px;
    flex-basis: 30%;
    text-align: center;
  } 
  .summary img {
      width: 40px;
      margin-left: 10px;
  }
.money .pig {
    /* background-color: rgba(255, 255, 255, 0.178); */
    /* flex-basis: 35%; */
    flex-grow: 1;
    text-align: center;
    position: relative;
}
.money .pig img{
    height: 200px;
}

.pig .amount {
    position: absolute;
    font-size: 35px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(208, 211, 30)
}


.money button{
    cursor: pointer;
    width: 150px;
    min-height: 50px;
    margin: 20px  70%;
    border-radius: 15px;
    background-color: rgb(32, 175, 19);
    color: white;
    letter-spacing: 1.5px;
    border: none;
    box-shadow: 0 0 25px 2px black;
    font-size: 16px;
    transition: .2s;
}

.money button:hover {
   transform: translate(-2px,-30px) scale(1.2);
   box-shadow: 0 0 35px 1px black;
}

</style>
