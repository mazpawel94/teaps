
const data = {
    czarka: [{
    name: 'Ela S',
    money: 5.50,
    today: false
},
{
    name: 'Ela D',
    money: 10
},
{
    name: 'Kinga',
    money: 4.50,
    today: false
},
{
    name: 'Zuza',
    money: 8.35,
    today: false
},
{
    name: 'Patrycja',
    money: 11.55,
    today: false
},
{
    name: 'Olga',
    money: 3,
    today: false
},
{
    name: 'Przemek',
    money: 6.50,
    today: false
},
{
    name: 'Paweł',
    money: 4.11,
    today: false
}],

summaries: [
    {
    participants: ['Ela D.', 'Patrycja', 'Przemek'],
    date: '20/01/2019',
    sum: 13
    },
    {
    participants: ['Ela S.', 'Zuza', 'Paweł'],
    date: '19/01/2019',
    sum: 8.24
    },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek', 'Olga'],
    // date: '18/01/2019',
    // sum: 15.50
    // },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek'],
    // date: '20/01/2019',
    // sum: 13
    // },
    // {
    // participants: ['Ela S.', 'Zuza', 'Paweł'],
    // date: '19/01/2019',
    // sum: 8.24
    // },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek', 'Olga'],
    // date: '18/01/2019',
    // sum: 15.50
    // },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek'],
    // date: '20/01/2019',
    // sum: 13
    // },
    // {
    // participants: ['Ela S.', 'Zuza', 'Paweł'],
    // date: '19/01/2019',
    // sum: 8.24
    // },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek', 'Olga'],
    // date: '18/01/2019',
    // sum: 15.50
    // },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek'],
    // date: '20/01/2019',
    // sum: 13
    // },
    // {
    // participants: ['Ela S.', 'Zuza', 'Paweł'],
    // date: '19/01/2019',
    // sum: 8.24
    // },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek', 'Olga'],
    // date: '18/01/2019',
    // sum: 15.50
    // },
    // {
    // participants: ['Ela D.', 'Patrycja', 'Przemek'],
    // date: '20/01/2019',
    // sum: 13
    // },
    {
    participants: ['Ela S.', 'Zuza', 'Paweł'],
    date: '19/01/2019',
    sum: 8.24
    },
    {
    participants: ['Ela D.', 'Patrycja', 'Przemek', 'Olga'],
    date: '18/01/2019',
    sum: 15.50
    },
    {
    participants: ['Ela D.', 'Patrycja', 'Przemek'],
    date: '20/01/2019',
    sum: 13
    },
    {
    participants: ['Ela S.', 'Zuza', 'Paweł'],
    date: '19/01/2019',
    sum: 8.24
    },
    {
    participants: ['Ela D.', 'Patrycja', 'Przemek', 'Olga'],
    date: '18/01/2019',
    sum: 15.50
    },
],
payments: [
    {
        name: 'Przemek',
        date: '19/01/2019'
    },
    {
        name: 'Zuza',
        date: '15/01/2019'
    },
    {
        name: 'Zuza',
        date: '14/01/2019'
    },
    {
        name: 'Przemek',
        date: '11/01/2019'
    },
    {
        name: 'Ela S.',
        date: '09/01/2019'
    },
    {
        name: 'Przemek',
        date: '19/01/2019'
    },
    {
        name: 'Zuza',
        date: '15/01/2019'
    },
    {
        name: 'Zuza',
        date: '14/01/2019'
    },
    {
        name: 'Przemek',
        date: '11/01/2019'
    },
    {
        name: 'Ela S.',
        date: '09/01/2019'
    },
],
newEmployee: '',
coins: [2,4,8,8,3,2,0,2,2,3],
startAmount: -1,

};
    

new Vue ({
    el: '#app',
    data: data,

    methods: {
        checkName: function(newName) {
            let uniqueName = true;
            this.czarka.forEach(e => {
                if(e.name.toUpperCase() === newName.toUpperCase())
                    uniqueName = false;
            });
            return uniqueName;
        },
        addEmployee: function() {
            const name = this.newEmployee.trim();
            if(name.length===0) return;
            if(this.checkName(name)) {
                this.czarka.push({
                    name: name,
                    money: 0
                });
                this.newEmployee = '';
            }
            else {
                alert('Istnieje osoba o takim imieniu, dodaj pierwszą literę nazwiska lub inny identyfikujący Cię element');
            }           
        },

        startPiggyValue: function() {
            if(this.startAmount===-1) this.startAmount = this.sum();
            document.querySelector('.start-amount').innerHTML = 'Przed: ' + this.beautyAmount(this.startAmount);
        },

        take10zlotys: function(worker) {
            worker.money =Math.round((worker.money -10)*100) / 100;
            this.coins[9]-=1;
            this.payments.unshift({
                name: worker.name,
                date: this.currentDate()
            });
        },

        sum: function () {
            console.log('działam');
            const sum = this.coins[0]*1 + this.coins[1]*2 + this.coins[2]*5 + this.coins[3]*10 + this.coins[4]*20 + this.coins[5]*50 + this.coins[6]*100 + this.coins[7]*200 + this.coins[8]*500 + this.coins[9]*1000;
            return sum;
        
        },

        beautyAmount: function(amount) {
            return ` ${Math.floor(amount/100)},${amount%100 <10 ? amount%100 + "0" : amount%100} zł`;
        },

        currentDate: function() {
            date = new Date();
            const leadingZero = (i) => (i < 10)? '0'+i : i;
           return `${leadingZero(date.getDate())}/${leadingZero(date.getMonth()+1)}/${leadingZero(date.getFullYear())}, ${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}`;
        },

        newCalculation: function() {
            let todayWorkersSum = this.todayWorkers.reduce((e1, e2, index) =>{               
                if (index === 1)
                    return parseFloat(e1.hours) + parseFloat(e2.hours);
                return e1 + parseFloat(e2.hours)});
            if(this.todayWorkers.length ===1)
                todayWorkersSum = this.todayWorkers[0].hours;
            this.todayWorkers.forEach(e => {
                e.money+=(Math.floor((this.sum() - this.startAmount)/(todayWorkersSum/parseFloat(e.hours)))/100);
            });

            let participantsTable =[];
            [...this.todayWorkers].forEach(e => {
                participantsTable.push(e.name)});

            this.summaries.unshift({
                participants: participantsTable,
                date: this.currentDate(),
                sum: this.newTips
            });

            document.querySelector('.tips-form').style.display = "none";
            this.czarka.forEach(e => e.today = false);
            this.startAmount = this.sum();
        }
    },
    computed: {
        todayWorkers: function() {
            return this.czarka.filter(e => e.today);
        },
        newTips: function() {
            return this.beautyAmount(this.sum() - this.startAmount);
        }
    },
});

const moneyInputs = document.querySelectorAll('.inputs input');
document.querySelector('.actualization').addEventListener('click', () => {
    moneyInputs.forEach(e => {
        e.removeAttribute('readonly');
        e.style.backgroundColor = 'white';
        document.querySelector('.tips-form').style.display = "block";
    })
})
