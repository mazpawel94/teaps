const express = require("express");
const mongodb = require("mongodb");
const clientDB = require("../../dbconfig");
const router = express.Router();

async function loadDB(collectionName) {
  const client = await mongodb.MongoClient.connect(clientDB, {
    useNewUrlParser: true,
  });
  return client.db("teaps").collection(`${collectionName}`);
}

//getMoneyValue
router.get("/moneys", async (req, res) => {
  const moneys = await loadDB("moneys");
  const tab = await moneys.find({}).toArray();
  res.status(200).send(tab);
});

//update moneys
router.put("/moneys", async (req, res) => {
  const coins = await loadDB("moneys");
  const coin = req.body.coin;
  const amount = req.body.amount;
  for (let i = 0; i < coin.length; i++)
    await coins.updateOne({ coin: coin[i] }, { $set: { amount: amount[i] } });
  res.status(201).send();
});

//getEmployees
router.get("/employees", async (req, res) => {
  const employees = await loadDB("employees");
  const tab = await employees.find({}).sort({ name: 1 }).toArray();
  res.status(200).send(tab);
});

//addEmployee
router.post("/employees", async (req, res) => {
  const employees = await loadDB("employees");
  await employees.insertOne({
    name: req.body.name,
    money: 0,
  });
  res.status(201).send();
});

//update Employee money
router.put("/employees", async (req, res) => {
  const employees = await loadDB("employees");
  const name = req.body.name;
  const money = req.body.money;
  for (let i = 0; i < name.length; i++)
    await employees.updateOne({ name: name[i] }, { $set: { money: money[i] } });
  res.status(201).send();
});

//update pig
router.put("/pig", async (req, res) => {
  const coins = await loadDB("pig");
  await coins.updateOne({ name: "pig" }, { $set: { sum: req.body.sum } });
  res.status(201).send();
});

//get pig
router.get("/pig", async (req, res) => {
  const startValue = await loadDB("pig");
  const tab = await startValue.find({}).toArray();
  res.status(200).send(tab);
});

// get summaries
router.get("/summaries", async (req, res) => {
  const summaries = await loadDB("summaries");
  const tab = await summaries.find({}).toArray();
  res.status(200).send(tab);
});

// add summary
router.post("/summaries", async (req, res) => {
  const summaries = await loadDB("summaries");
  await summaries.insertOne({
    participants: req.body.participants,
    sum: req.body.sum,
    date: req.body.date,
  });
  res.status(201).send();
});

// get payment
router.get("/payments", async (req, res) => {
  const payments = await loadDB("payments");
  const tab = await payments.find({}).toArray();
  res.status(200).send(tab);
});

// add payment
router.post("/payments", async (req, res) => {
  const payments = await loadDB("payments");
  await payments.insertOne({
    name: req.body.name,
    date: req.body.date,
  });
  res.status(201).send();
});

module.exports = router;
