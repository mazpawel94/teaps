const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//getMoneyValue
router.get('/moneys', async (req, res) => {
    const moneys = await loadDB('moneys');
    const tab = await moneys.find({}).toArray();
    res.send(tab);
});

//addMoneys
router.post('/moneys', async(req, res) => {
    const coins = await loadDB('moneys');
    await coins.insertOne({
    coin: req.body.coin,
    amount: 0
    });
    res.status(201).send();
})

//update moneys
router.put('/moneys', async(req, res) => {
    const coins = await loadDB('moneys');
    await coins.updateOne({coin: req.body.coin},{$set: {amount: req.body.amount}});
    res.status(201).send();
})



//getEmployees
router.get('/employees', async (req, res) => {
    const employees = await loadDB('employees');
    const tab = await employees.find({}).toArray();
    // res.send(await moneys.find({}).toArray());
    res.send(tab);
});
//addEmployee
router.post('/employees', async(req, res) => {
    const employees = await loadDB('employees');
    await employees.insertOne({
    name: req.body.name,
    money: 0
    });
    res.status(201).send();
})

//update Employee money
router.put('/employees', async(req, res) => {
    const employees = await loadDB('employees');
    await employees.updateOne({name: req.body.name},{$set: {money: req.body.money}});
    res.status(201).send();
})


//update pig
router.put('/pig', async(req, res) => {
    const coins = await loadDB('pig');
    await coins.updateOne({name: "pig"},{$set: {sum: req.body.sum}});
    res.status(201).send();
})

//get pig 
router.get('/pig', async (req, res) => {
    const startValue = await loadDB('pig');
    const tab = await startValue.find({}).toArray();
    res.send(tab);
});

// get summaries

router.get('/summaries', async(req, res) => {
    const summaries = await loadDB('summaries');
    const tab = await summaries.find({}).toArray();
    res.send(tab);
})

// add summary

router.post('/summaries', async(req, res) => {
    const summaries = await loadDB('summaries');
    await summaries.insertOne({
    participants: req.body.participants,
    sum: req.body.sum,
    date: req.body.date,
    });
    res.status(201).send();
})


// get payment

router.get('/payments', async(req, res) => {
    const payments = await loadDB('payments');
    const tab = await payments.find({}).toArray();
    res.send(tab);
})

// add payment

router.post('/payments', async(req, res) => {
    const payments = await loadDB('payments');
    await payments.insertOne({
    name: req.body.name,
    date: req.body.date
    });
    res.status(201).send();
})


async function loadDB(collectionName) {
    const client = await mongodb.MongoClient.connect
     ('mongodb://czarka:keemun1@ds141813.mlab.com:41813/teaps', {
         useNewUrlParser: true
     });
     return client.db('teaps').collection(`${collectionName}`);
    }

module.exports = router;