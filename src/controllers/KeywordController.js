/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-21 15:13:07
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-22 17:40:55
 * @ Description: Main controller for managing the current user's keywords
 */
import Axios from "axios";

export default class KeywordController {

    static ExchangeErrors = {
        REQUEST_ERROR: 0,
        SERVER_ERROR: 1
    };

    /**
     * Returns all keywords
     * @param {boolean} force If true, fetch from web, otherwise try to get cache or fetch alternatively
     */
    static async getKeywords(force = true) {
        return new Promise( (resolve, reject) => {
            if(force) {
                Axios.get('/keyword')
                    .then( response => {
                        if(response.data.status === 'SUCCESS') {
                            localStorage.setItem(
                                'pp_cache_keywords', 
                                JSON.stringify(response.data.keywords)
                            );
                            resolve(response.data.keywords);
                        } else {
                            reject(response.data.status);
                        }
                    }).catch( error => {
                        reject(error);
                    });
            } else {
                if(localStorage.getItem('pp_cache_keywords') != null) {
                    resolve(JSON.parse(localStorage.getItem('pp_cache_keywords')));
                } else {
                    resolve(this.getKeywords(true));
                }
            }
        });
    }

    /**
     * Swaps the order of two keywords
     * @param {number} keyword1Id A keyword id
     * @param {number} keyword2Id A keyword id
     */
    static async exchangeOrder(keyword1Id, keyword2Id) {
        return new Promise( (resolve, reject) => {
            let keyword1, keyword2;
            // find from cache (has to be in cache)
            // otherwise the user wouldn't be requesting this function
            for(let keyword of JSON.parse(localStorage.getItem('pp_cache_keywords'))) {
                if(keyword.id === keyword1Id) {
                    keyword1 = keyword;
                } else if(keyword.id === keyword2Id) {
                    keyword2 = keyword;
                }
            }

            // if one was not found
            if( !(keyword1 && keyword2) ) {
                reject(this.ExchangeErrors.SERVER_ERROR);
            }

            // exchange in database
            Axios.patch('/keyword/' + keyword1Id, {
                order: keyword2.order
            }).then( ()=>{

                Axios.patch('/keyword/' + keyword2Id, {
                    order: keyword1.order
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