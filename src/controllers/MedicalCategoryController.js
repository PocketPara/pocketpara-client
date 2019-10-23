import Axios from "axios";

/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-23 22:35:01
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 22:40:00
 * @ Description: Main controller for managing medical categories
 */

export default class MedicalCategoryController {

    /**
     * Returns all medical categories
     * @param {boolean} force If true, force fetch from web
     * @param {string} language The langcode for the categories (en, de)
     */
    static async getMedicalCategories(force = false, language = "en") {
        return new Promise( (resolve, reject) => {
            // if fetch from web
            if(force) {
                Axios.get('/medical-categories/'+language)
                    .then( response => {
                        if(response.data.status === 'SUCCESS') {
                            localStorage.setItem(
                                'pp_cache_medcategories',
                                JSON.stringify(response.data.medicalCategories)
                            );
                            resolve(response.data.medicalCategories);
                        } else {
                            reject(response.data.status);
                        }
                    }).catch( error => {
                        reject(error);
                    });
            } else {
                // check cache
                // if exists, return
                if(localStorage.getItem('pp_cache_medcategories') != null) {
                    resolve(JSON.parse(localStorage.getItem('pp_cache_medcategories')));                    
                } else {
                    // if not in cache, attempt a forced online version
                    resolve(this.getMedicalCategories(true, language));
                }
            }
        });
    }

}