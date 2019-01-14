
const data = {
    czarka: [{
    name: 'Ela S',
    money: 5.50
},
{
    name: 'Ela D',
    money: 10
},
{
    name: 'Zuza',
    money: 8.35
},
{
    name: 'Patrycja',
    money: 11.55
},
{
    name: 'Olga',
    money: 3
},
{
    name: 'Przemek',
    money: 6.50
},
{
    name: 'Paweł',
    money: 4.11
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
coins: [2,4,8,8,3,2,0,2,2,0],
startAmount: -1
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
            document.querySelector('.start-amount').innerHTML = 'Przed: ' + this.startAmount;
        },

        take10zlotys: function(worker) {
            worker.money =Math.round((worker.money -10)*100) / 100;
            this.coins[9]-=1;
            console.log(worker, worker.money);
        },

        sum: function () {
            console.log('działam');
            const sum = this.coins[0]*1 + this.coins[1]*2 + this.coins[2]*5 + this.coins[3]*10 + this.coins[4]*20 + this.coins[5]*50 + this.coins[6]*100 + this.coins[7]*200 + this.coins[8]*500 + this.coins[9]*1000;
            return ` ${Math.floor(sum/100)},${sum%100 <10 ? sum%100 + "0" : sum%100} zł`;
        
        },
    },

    computed: {
        
    },
});

const moneyInputs = document.querySelectorAll('.inputs input');
document.querySelector('.actualization').addEventListener('click', () => {
    moneyInputs.forEach(e => {
        e.removeAttribute('readonly');
        e.style.backgroundColor = 'white';
    })
})
