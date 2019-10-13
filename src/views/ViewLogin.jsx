import React from 'react';
import CurrentLanguage from '../helpers/CurrentLanguage';
import Logo from '../assets/rdicon_512-blue.png';
import "../styles/views/ViewLogin.css";

class ViewLogin extends React.Component {
    render() {
        return <div className="loginView">
            <img src={ Logo } alt="Logo" className="loginViewLogo" />
            <div className="loginViewAppTitle">POCKETPARA</div>
            { CurrentLanguage().views.login.login }
        </div>;
    }
}

export default ViewLogin;