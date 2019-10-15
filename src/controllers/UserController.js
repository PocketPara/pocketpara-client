import Axios from "axios";
import GenericConfig from "../config/GenericConfig";

export class UserController {

    static GetCurrentAttemptError = {
        USER_NOT_FOUND: 0,
        SERVER_ERROR: 1,
        REQUEST_ERROR: 2
    };

    static async attemptGetCurrent() {
        return new Promise( (resolve, reject) => {
            Axios.get('/user/current')
                .then( response => {
                    if(response.data.status === 'SUCCESS') {
                        resolve(response.data.user);
                    } else if (response.data.status === 'USER_NOT_FOUND') {
                        reject( this.GetCurrentAttemptError.USER_NOT_FOUND );
                    } else {
                        reject( this.GetCurrentAttemptError.SERVER_ERROR );
                    }
                }).catch( error => {
                    if(GenericConfig.logErrors) console.error(error);
                    reject( this.GetCurrentAttemptError.REQUEST_ERROR );
                }); 
        });
    }

}