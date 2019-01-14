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
            
        }
    },
    computed: {
        width: function() {
            return this.money * 30;
        }
    }
});

const moneyInputs = document.querySelectorAll('.inputs input');
document.querySelector('.actualization').addEventListener('click', () => {
    moneyInputs.forEach(e => {
        e.removeAttribute('readonly');
        e.style.backgroundColor = 'white';
    })
})
