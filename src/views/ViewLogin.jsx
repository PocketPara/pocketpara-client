/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-14 00:17:34
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-14 22:19:04
 * @ Description: The login view
 */

import React from 'react';
import CurrentLanguage from '../helpers/CurrentLanguage';
import Logo from '../assets/rdicon_512-blue.png';
import { ViewLoginLogo, ViewLoginApptitle, ViewLoginWrapper, ViewLoginForm, ViewLoginInput, ViewLoginButton, ViewLoginSignupButton } from '../styles/views/ViewLogin.style';
import Alert from '../components/Alert';
import AuthenticationController from '../controllers/AuthenticationController';
import { Redirect } from 'react-router-dom';

/**
 * The login page of the app
 */
class ViewLogin extends React.Component {

    state = {
        username: "",
        password: "",
        alerts: []
    }


    componentDidMount() {
        // if user is already logged in, redirect him back to internal area
        if(localStorage.getItem('pp_token') != null) {
            this.setState({ alerts: [<Redirect to="/" key={0} />]});
        }
    }

    updateUsername = e => {
        this.setState({ username: e.target.value });
    }

    updatePassword = e => {
        this.setState({ password: e.target.value });
    }
    
    onLoginAttempt = e => {
        // Prevent page reload
        e.preventDefault();

        AuthenticationController.attemptLogin(
            this.state.username,
            this.state.password
        ).then( () => {
            // Success, add the redirect to the alert
            this.setState({ alerts: [<Alert key={0} type="success">
                <b>{CurrentLanguage().views.login.onSuccess}</b>
            </Alert>,
            <Redirect to="/" key={1}/>]});

        }).catch( errorType => {
            // Shows the error as alert
            switch(errorType) {
                case AuthenticationController.AuthenticationError.BAD_REQUEST:
                    this.setState({ alerts: [<Alert key={0} type="error">
                        <b>{CurrentLanguage().views.login.onBadRequest}</b>
                    </Alert>]})
                    break;
                case AuthenticationController.AuthenticationError.INVALID_PASSWORD:
                    this.setState({ alerts: [<Alert key={0} type="error">
                        <b>{CurrentLanguage().views.login.onInvalidPassword}</b>
                    </Alert>]})
                    break;
                case AuthenticationController.AuthenticationError.REQUEST_ERROR:
                    this.setState({ alerts: [<Alert key={0} type="error">
                        <b>{CurrentLanguage().views.login.onRequestError}</b>
                    </Alert>]})
                    break;
                case AuthenticationController.AuthenticationError.SERVER_ERROR:
                    this.setState({ alerts: [<Alert key={0} type="error">
                        <b>{CurrentLanguage().views.login.onServerError}</b>
                    </Alert>]})
                    break;
                case AuthenticationController.AuthenticationError.USER_NOT_FOUND:
                    this.setState({ alerts: [<Alert key={0} type="error">
                        <b>{CurrentLanguage().views.login.onUserNotFound}</b>
                    </Alert>]})
                    break;
                default:
                    this.setState({ alerts: [<Alert key={0} type="error">
                        <b>{CurrentLanguage().views.login.onRequestError}</b>
                    </Alert>]})
                    break;
            }
        });
    }


    gotoRegister = () => {
        this.setState({
            alerts: [<Redirect to="/register" key={0} />]
        });
    }

    render() {
        return <ViewLoginWrapper>
            <ViewLoginLogo src={ Logo } alt="PocketPara Logo" />
            <ViewLoginApptitle>
                POCKETPARA
            </ViewLoginApptitle>
            <ViewLoginForm onSubmit={this.onLoginAttempt}>
                { this.state.alerts }
                <ViewLoginInput 
                    className="fullwidth" 
                    type="text" 
                    value={ this.state.username } 
                    onChange={ this.updateUsername } 
                    required
                    placeholder={ CurrentLanguage().views.login.boxUsername }
                    />

                <ViewLoginInput 
                    className="fullwidth" 
                    type="password" 
                    value={ this.state.password } 
                    onChange={ this.updatePassword } 
                    required
                    placeholder={ CurrentLanguage().views.login.boxPassword }
                    />

                <br/>

                <ViewLoginButton
                    type="submit"
                    className="fullwidth">
                    {CurrentLanguage().views.login.btnLogin}
                </ViewLoginButton>

                { /* <ViewLoginGoogleButton>
                    Login with Google
                </ViewLoginGoogleButton>*/ }

                <ViewLoginSignupButton onClick={ this.gotoRegister } >
                    {CurrentLanguage().views.login.btnCreateNew}
                </ViewLoginSignupButton>

            </ViewLoginForm>
        </ViewLoginWrapper>;
    }
}

export default ViewLogin;