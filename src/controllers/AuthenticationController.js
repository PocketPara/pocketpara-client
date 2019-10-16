/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-14 18:34:41
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 13:54:08
 * @ Description: Main controller for handling user authentication and registration
 */

import Axios from "axios";
import GenericConfig from "../config/GenericConfig";

export default class AuthenticationController {

    static LoginAttemptError = {
        BAD_REQUEST: 0,
        REQUEST_ERROR: 1,
        SERVER_ERROR: 2,
        USER_NOT_FOUND: 3,
        INVALID_PASSWORD: 4
    };
    static RegisterAttemptError = {
        BAD_REQUEST: 0,
        REQUEST_ERROR: 1,
        SERVER_ERROR: 2,
        USERNAME_TAKEN: 3,
        PASSWORDS_DONT_MATCH: 4
    };

    static async attemptLogin(username, password) {
        return new Promise( (resolve, reject) => {
            if(!(username && password)) {
                reject(this.LoginAttemptError.BAD_REQUEST);
            }
    
            Axios.post('/auth/login', {
                username, password
            }).then( response => {

                switch(response.data.status) {
                    case 'BAD_REQUEST':
                        reject(this.LoginAttemptError.BAD_REQUEST);
                        break;
                    case 'USER_NOT_FOUND':
                        reject(this.LoginAttemptError.USER_NOT_FOUND);
                        break;
                    case 'INVALID_PASSWORD':
                        reject(this.LoginAttemptError.INVALID_PASSWORD);
                        break;
                    case 'SUCCESS':
                        // save in localstorage
                        localStorage.setItem('pp_token', response.data.token);
                        Axios.defaults.headers.common['auth'] = response.data.token;
                        resolve();
                        break;
                    default:
                        reject(this.LoginAttemptError.SERVER_ERROR);
                        break;
                }

            }).catch( error => {
                if(GenericConfig.logErrors) console.error(error);
                reject(this.LoginAttemptError.REQUEST_ERROR);
            });
        });
    }

    static async attemptRegister(username, password, passwordRepeat, email = null) {
        return new Promise( (resolve, reject) => {
            if(!(username && password)) {
                reject(this.RegisterAttemptError.BAD_REQUEST);
            }
            if(password !== passwordRepeat) {
                reject(this.RegisterAttemptError.PASSWORDS_DONT_MATCH);
            }

            Axios.post('/auth/register', {
                username,
                password,
                email
            }).then( response => {
                switch(response.data.status) {
                    case 'BAD_REQUEST':
                        reject(this.RegisterAttemptError.BAD_REQUEST);
                        break;
                    case 'USERNAME_TAKEN':
                        reject(this.RegisterAttemptError.USERNAME_TAKEN);
                        break;
                    case 'SUCCESS':
                        resolve();
                        break;
                    default:
                        reject(this.RegisterAttemptError.SERVER_ERROR);
                }
            }).catch( error => {
                if(GenericConfig.logErrors) console.error(error);
                reject(this.RegisterAttemptError.REQUEST_ERROR);
            });
        });
    }

}