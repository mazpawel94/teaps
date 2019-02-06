<template>
       <div class="latest-payouts">
        <h2>ostatnie wypłaty</h2>
        <div class="table">
            <div class="nav">
                <div class="date">Data</div>
                <div class="stuff">Osoba wypłacająca</div>
            </div>
            <div class="day" v-for='payment in payments.slice().reverse()' v-bind:key="payment.date">
                <div class="date">{{payment.date}}</div>
                <div class="stuff">{{payment.name}}</div>
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
     payments: [],
        }
    },
    async created() {
        try {
            this.payments = await DBService.getPayments();
        } catch (error) {
            this.error = error;
        }
    }
}
</script>

<style scoped>

h2 {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 15px;

}

.table .nav, .table .day {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 5px;
}

.latest-payouts .nav {
    font-weight: bold;
    background-color: rgb(27, 151, 11);
    color: white;
    letter-spacing: 1.5px;
    padding: 15px;
}

.latest-payouts .date {
width: 40%;
}
.latest-payouts .stuff {
width: 70%;
}

.latest-payouts .table {
width: 400px;
margin: auto;
max-height: 305px;
overflow: hidden;
background-color: rgba(224, 223, 207, 0.548);
}

</style>
