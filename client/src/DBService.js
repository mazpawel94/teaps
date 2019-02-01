import axios from "axios";

const url = 'http://localhost:5000/api/moneys';
const url2 = 'http://localhost:5000/api/employees';
const url3 = 'http://localhost:5000/api/summaries';
const url4 = 'http://localhost:5000/api/payments';
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
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.put('http://localhost:5000/api/pig', {
                    sum: sum
                });
                resolve(res);

            } catch (error) {
                reject(error);
            }
        })
    }

    static saveCoins(coin, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.put(url, {
                    coin: coin,
                    amount: amount
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        }
        )
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