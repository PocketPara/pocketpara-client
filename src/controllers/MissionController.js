/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-23 23:52:42
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-10 22:47:37
 * @ Description: Main controller for handling missions
 */
import Axios from 'axios';

export default class MissionController {

    /**
     * Returns all of the user's missions
     * @param {boolean} force Force fetch from web
     */
    static async getMissions(force = false) {
        return new Promise( (resolve, reject) => {
            if(force) {
                Axios.get('/mission')
                .then( response => {
                    if(response.data.status === 'SUCCESS') {
                        localStorage.setItem(
                            'pp_cache_missions',
                            JSON.stringify(response.data.missions)
                        );
                        resolve(response.data.missions);
                    }
                }).catch( error => {
                    reject(error);
                });
            } else {
                if(localStorage.getItem('pp_cache_missions') != null) {
                    resolve(JSON.parse(localStorage.getItem('pp_cache_missions')));
                } else {
                    resolve(this.getMissions(true));
                }
            }
        });
    }

    /**
     * Returns all missions of a shift
     * @param {number} shiftId The id of the shift
     * @param {boolean} force Force fetch from web
     */
    static async getMissionOfShift(shiftId, force = false) {
        let missions = await this.getMissions(force);
        let missionList = [];
        for(let mission of missions) {
            if(mission.shiftId === shiftId) {
                missionList.push(missionList);
            }
        }
        return missionList;
    }

}