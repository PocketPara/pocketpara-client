/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-14 20:05:16
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-14 22:00:05
 * @ Description: The register few that allows new users to create an account
 */
import React from 'react';
import CurrentLanguage from "../helpers/CurrentLanguage";
import { ViewRegisterWrapper, ViewRegisterApptitle, ViewRegisterForm, ViewRegisterFormTitle, ViewRegisterInput, ViewRegisterLoginButton, ViewRegisterCheckboxLabel, ViewRegisterSubmitButton, ViewRegisterAppLogo } from '../styles/views/ViewRegister.style';
import { Redirect } from 'react-router-dom';
import Logo from "../assets/rdicon_512-blue.png";
import AuthenticationController from '../controllers/AuthenticationController';
import Alert from '../components/Alert';

/**
 * The register page of the app
 */
export default class ViewRegister extends React.Component {

    state = {
        alerts: [],
        username: "",
        password: "",
        passwordRepeat: "",
        email: "",
        hasTosAccepted: false
    }

    onUsernameChange = e => {
        this.setState({ username: e.target.value });
    }
    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    }
    onPasswordRepeatChange = e => {
        this.setState({ passwordRepeat: e.target.value });
    }
    onEmailChange = e => {
        this.setState({ email: e.target.value });
    }
    onTosToggle = () => {
        this.setState({
            hasTosAccepted: !this.state.hasTosAccepted
        }); 
    }

    gotoLogin = () => {
        this.setState({
            alerts: [<Redirect to="/login" key={0} />]
        });
    }

    onSubmit = e => {
        // Prevent page reload
        e.preventDefault();
        // If ToS not accepted
        if(!this.state.hasTosAccepted) {
            this.setState({
                alerts: [<Alert key={0} type="error">
                    <b>{CurrentLanguage().views.register.onToSNotAccepted}</b>
                </Alert>]
            });
            return;
        }

        AuthenticationController.attemptRegister(
            this.state.username,
            this.state.password,
            this.state.passwordRepeat,
            (this.state.email === "") ? null : this.state.email
        ).then( () => {
            // Success, add the redirect to the alert
            this.setState({ alerts: [<Alert key={0} type="success">
                <b>{CurrentLanguage().views.register.onSuccess}</b>
            </Alert>]});
            setTimeout(()=>{
                this.setState({
                    alerts: [...this.state.alerts, <Redirect to="/login" key={1}/>]
                });
            }, 5000);
        }).catch( errorType => {
            switch(errorType) {
                case AuthenticationController.RegisterAttemptError.BAD_REQUEST:
                    this.setState({
                        alerts: [<Alert key={0} type="error">
                            <b>{CurrentLanguage().views.register.onBadRequest}</b>
                        </Alert>]
                    });
                    break;
                case AuthenticationController.RegisterAttemptError.PASSWORDS_DONT_MATCH:
                    this.setState({
                        alerts: [<Alert key={0} type="error">
                            <b>{CurrentLanguage().views.register.onPasswordsDontMatch}</b>
                        </Alert>]
                    });
                    break;
                case AuthenticationController.RegisterAttemptError.REQUEST_ERROR:
                    this.setState({
                        alerts: [<Alert key={0} type="error">
                            <b>{CurrentLanguage().views.register.onRequestError}</b>
                        </Alert>]
                    });
                    break;
                case AuthenticationController.RegisterAttemptError.SERVER_ERROR:
                    this.setState({
                        alerts: [<Alert key={0} type="error">
                            <b>{CurrentLanguage().views.register.onServerError}</b>
                        </Alert>]
                    });
                    break;
                case AuthenticationController.RegisterAttemptError.USERNAME_TAKEN:
                    this.setState({
                        alerts: [<Alert key={0} type="error">
                            <b>{CurrentLanguage().views.register.onUsernameTaken}</b>
                        </Alert>]
                    });
                    break;
                default:
                    this.setState({
                        alerts: [<Alert key={0} type="error">
                            <b>{CurrentLanguage().views.register.onRequestError}</b>
                        </Alert>]
                    });
                    break;
            }
        });
    }

    render() {
        return <ViewRegisterWrapper>
            <ViewRegisterApptitle>PocketPara</ViewRegisterApptitle>
                <ViewRegisterAppLogo src={ Logo } alt="Logo" />
            <ViewRegisterForm onSubmit={ this.onSubmit }>
                <ViewRegisterFormTitle>{CurrentLanguage().views.register.viewTitle}</ViewRegisterFormTitle>
                {this.state.alerts}
                <ViewRegisterInput
                    type="text"
                    placeholder={ CurrentLanguage().views.register.boxUsername }
                    className="fullwidth"
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                    required
                    />
                <ViewRegisterInput
                    type="password"
                    placeholder={ CurrentLanguage().views.register.boxPassword }
                    className="fullwidth"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                    required
                    />
                <ViewRegisterInput
                    type="password"
                    placeholder={ CurrentLanguage().views.register.boxPasswordRepeat }
                    className="fullwidth"
                    value={this.state.passwordRepeat}
                    onChange={this.onPasswordRepeatChange}
                    required
                    />
                <ViewRegisterInput
                    type="email"
                    placeholder={ CurrentLanguage().views.register.boxEmail }
                    className="fullwidth"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                    required
                    />

                <ViewRegisterCheckboxLabel className="container">
                    <input type="checkbox" checked={ this.state.hasTosAccepted } onChange={this.onTosToggle}/>
                    <span className="checkmark"></span>
                    { CurrentLanguage().views.register.checkAgreeToS } Terms of Service & Privacy Policy
                </ViewRegisterCheckboxLabel>

                <ViewRegisterSubmitButton type="submit" className="fullwidth">
                    { CurrentLanguage().views.register.btnRegister }
                </ViewRegisterSubmitButton>

                <ViewRegisterLoginButton onClick={this.gotoLogin}>
                    { CurrentLanguage().views.register.btnLoginInstead }
                </ViewRegisterLoginButton>

                
            </ViewRegisterForm>
        </ViewRegisterWrapper>;
    }
}