import axios from "axios";

const url = 'api/moneys';
const url2 = 'api/employees';
const url3 = 'api/summaries';
const url4 = 'api/payments';
class DBService {

    static getMoneys() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));
                // resolve(data);
                
            }

            catch (err) {
                reject(err);
                
            }
        })
    }

    static saveSum(sum) {
        return axios.put('api/pig', {
                    sum: sum
                });
    }

    static getSum() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('api/pig');
                const data = res.data;
                resolve(data);
                // resolve(data);
            }
            catch (err) {
                reject(err);
                
            }
        })
    }

    static saveCoins(coin, amount) {
   return axios.put(url, {
                    coin: coin,
                    amount: amount
                });
            }

    static getEmployees() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url2);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));
                // resolve(data);
                
            }

            catch (err) {
                reject(err);
                
            }
        })
    }


    static addEmployee(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url2, {
                    name: name
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        }
        )
    }

    static addEmployeeMoney(name, amount) {
        return axios.put(url2, {
            name:name,
            money: amount
        });
    }


    static getSummaries() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url3);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));
                // resolve(data);
                
            }

            catch (err) {
                reject(err);
                
            }
        })
    }

    static addSummary(date, participants, sum) {
        return axios.post(url3, {
            participants: participants,
            sum: sum,
            date: date,
        });
    }

    static addPayment(name, date) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url4, {
                    name: name,
                    date: date
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        }
        )
    }


    static getPayments() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url4);
                const data = res.data;
                resolve(data.map(el => ({
                    ...el
                })));
                // resolve(data);
                
            }

            catch (err) {
                reject(err);
                
            }
        })
    }
    

}

export default DBService;