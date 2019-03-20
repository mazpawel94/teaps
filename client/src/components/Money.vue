<template>
  <div class="money">
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
                <input type="number" min="0" name='one-penny' v-model="coins[0].amount" @input="emitSum">
                <input type="number" min="0" name='two-penny' v-model="coins[1].amount" @input="emitSum">
                <input type="number" min="0" name='five-penny' v-model="coins[2].amount" @input="emitSum">
                <input type="number" min="0" name='ten-penny' v-model="coins[3].amount" @input="emitSum">
                <input type="number" min="0" name='twenty-penny' v-model="coins[4].amount" @input="emitSum">
                <input type="number" min="0" name='fifty-penny' v-model="coins[5].amount" @input="emitSum">
                <input type="number" min="0" name='one-zloty' v-model="coins[6].amount" @input="emitSum">
                <input type="number" min="0" name='two-zlotys' v-model="coins[7].amount" @input="emitSum">
                <input type="number" min="0" name='five-zlotys' v-model="coins[8].amount" @input="emitSum">
                <input type="number" name='ten-zlotys' v-model="coins[9].amount" @input="emitSum">
            </div>
        </div>
        <div class="pig">
            <div class="amount">{{beautyAmount(sum())}}</div> <img src="../img/piggy-bank-1001599_640.png" alt="">
            <div class="start-amount"></div>
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
     coins: [],
     startAmount: 0,
    }
  },

  async created() {
    try {
     this.coins = await DBService.getMoneys();
     this.startAmount = this.sum();
     this.emitSum();
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
          }
          catch(err) {
            this.error = err;
          }
    },

    emitSum: function () {
        this.$emit('input', this.coins);
    },

    sum: function () {
        return this.coins[0].amount*1 + this.coins[1].amount*2 + this.coins[2].amount*5 + this.coins[3].amount*10 + this.coins[4].amount*20 + this.coins[5].amount*50 + this.coins[6].amount*100 + this.coins[7].amount*200 + this.coins[8].amount*500 + this.coins[9].amount*1000;
        },

    beautyAmount: function(amount) {
        return ` ${Math.floor(amount/100)},${amount%100 <10 ? "0" + amount%100 : amount%100} zł`;
        },
    },

    
computed: {
    newTips: function() {
        return this.sum() - this.startAmount;
        }
    }
}
</script>

<style scoped>
.money  {
  float: left;
  min-width: 40%;
  min-height: 50vh;
  display: flex;
  flex-direction: column; 
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

</style>