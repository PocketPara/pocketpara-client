import Axios from "axios";

/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-16 13:53:09
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 23:39:39
 * @ Description: Main controller for managing the current user's cars
 */

export default class CarController {

    static DeleteErrors = {
        REQUEST_ERROR: 0,
        SERVER_ERROR: 1
    };

    static ExchangeErrors = {
        REQUEST_ERROR: 0,
        SERVER_ERROR: 1
    };

    /**
     * Returns all cars
     * @param {boolean} force If true, fetch from web, otherwise serve cache
     */
    static async getCars(force = true) {
        return new Promise( (resolve, reject) => {

            if(force) {
                Axios.get('/car')
                .then( response => {
                    if(response.data.status === 'SUCCESS') {
                        localStorage.setItem('pp_cache_cars', JSON.stringify(response.data.cars));
                        resolve(response.data.cars);
                    } else {
                        reject();
                    }

                }).catch( error => {
                    reject(error);
                });
            } else {
                if(localStorage.getItem('pp_cache_cars') != null) {
                    resolve(JSON.parse(localStorage.getItem('pp_cache_cars')));
                } else {
                    resolve(this.getCars(true));
                }
            }

        });
    }

    /**
     * 
     * @param {number} carId The id of the car to delete
     */
    static async delete(carId) {
        return new Promise( (resolve, reject) => {
            Axios.delete('/car/' + carId)
                .then( response => {
                    if(response.data.status === 'SUCCESS') {
                        resolve(carId);
                    } else {
                        reject(this.DeleteErrors.SERVER_ERROR);
                    }
                }).catch( error => {
                    reject(this.DeleteErrors.REQUEST_ERROR);
                });
        });
    }

    /**
     * Swaps the orders of two cars
     * @param {number} car1Id A number of a car to exchange the order
     * @param {number} car2Id A number of a car to exchange the order
     */
    static async exchangeOrder(car1Id, car2Id) {
        return new Promise( (resolve, reject) => {
            let car1, car2;
            for(let car of JSON.parse(localStorage.getItem('pp_cache_cars'))) {
                if(car.id === car1Id) {
                    car1 = car;
                } else if (car.id === car2Id) {
                    car2 = car;
                }
            }
            if( !(car1 && car2)) {
                reject(this.ExchangeErrors.SERVER_ERROR);
            }
        
            Axios.patch('/car/' + car1Id, {
                order: car2.order
            }).then( ()=>{
                Axios.patch('/car/' + car2Id, {
                    order: car1.order
                }).then( ()=>{
                    resolve();
                }).catch( error => {
                    reject(this.ExchangeErrors.REQUEST_ERROR);
                });
            }).catch( error => {
                reject(this.ExchangeErrors.REQUEST_ERROR);
            });
        });
    }

}