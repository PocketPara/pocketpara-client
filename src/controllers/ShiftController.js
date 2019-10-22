/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-22 17:20:11
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-22 17:41:07
 * @ Description: Controller for managing shifts
 */

import Axios from "axios";

export default class ShiftController {

    /**
     * Returns all shifts
     * @param {boolean} force Force-fetch from web and ignore cache
     */
    static async getShifts(force = false) {
        return new Promise( (resolve, reject) => {
            if(force) {
                Axios.get('/shift')
                    .then( response => {
                        if(response.data.status === 'SUCCESS') {
                            localStorage.setItem(
                                'pp_cache_shifts',
                                JSON.stringify(response.data.shifts)
                           );
                           resolve(response.data.shifts);
                        } else {
                            reject(response.data.status);
                        }
                    }).catch( error => {
                        reject(error);
                    });
            } else {
                if(localStorage.getItem('pp_cache_shifts' != null)) {
                    resolve(JSON.parse(localStorage.getItem('pp_cache_shifts')))
                } else {
                    resolve(this.getShifts(true));
                }
            }
        });
    }

}