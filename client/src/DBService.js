import axios from "axios";

const urlMoneys = 'api/moneys';
const urlPig = 'api/pig';
const urlEmployees = 'api/employees';
const urlSummaries = 'api/summaries';
const urlPayments = 'api/payments';


class DBService {

    static getMoneys() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlMoneys);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));                
            }
            catch (err) {
                reject(err);               
            }
        })
    }

    static saveSum(sum) {
        return axios.put(urlPig, {
                    sum: sum
                });
    }

    static getSum() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlPig);
                const data = res.data;
                resolve(data);
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static saveCoins(coin, amount) {
        return axios.put(urlMoneys, {
                    coin: coin,
                    amount: amount
                });
            }

    static getEmployees() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlEmployees);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static addEmployee(name) {
        return axios.post(urlEmployees, {
                    name: name
                });
        }

    static addEmployeeMoney(name, amount) {
        return axios.put(urlEmployees, {
            name:name,
            money: amount
        });
    }


    static getSummaries() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlSummaries);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));
            }
            catch (err) {
                reject(err);
            }
        })
    }

    static addSummary(date, participants, sum) {
        return axios.post(urlSummaries, {
            participants: participants,
            sum: sum,
            date: date,
        });
    }

    static addPayment(name, date) {
        return axios.post(urlPayments, {
                name: name,
                date: date
            });
        }

    static getPayments() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlPayments);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));
            }
            catch (err) {
                reject(err);
            }
        })
    }

}

export default DBService;