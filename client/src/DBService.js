import axios from "axios";

const url = 'http://localhost:5000/api/moneys';
const url2 = 'http://localhost:5000/api/employees';
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
    

}

export default DBService;