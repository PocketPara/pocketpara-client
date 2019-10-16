import Axios from "axios";

/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-16 13:53:09
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 22:19:07
 * @ Description: Main controller for managing the current user's cars
 */

export default class CarController {

    static DeleteErrors = {
        REQUEST_ERROR: 0,
        SERVER_ERROR: 1
    };
    /**
     * Lists all cars of the current user, sorted by order -> name,
     * if force is true, it will only allow online results
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

}