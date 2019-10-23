import React from 'react';
import { View, ViewContent, Button } from '../../styles/UI.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import Alert from '../../components/Alert';


export default class ViewApp extends React.Component {
    state = {
        alert: []
    }

    handleClearCache = () => {
        // get token to stay logged in
        const token = localStorage.getItem('pp_token');
        localStorage.clear();
        localStorage.setItem('pp_token', token);
        this.setState({
            alert: <Alert type="success">
                {CurrentLanguage().views.settings.app.onCacheCleared}
            </Alert>
        });
    }

    render() {
        return <View>
            <ViewContent>
                {this.state.alert}
                <Button className="large fat fullwidth" onClick={this.handleClearCache}>
                    <FontAwesomeIcon icon={ faBroom } />&nbsp;<br/>
                    {CurrentLanguage().views.settings.app.btnClearCache}
                </Button>
            </ViewContent>
        </View>;
    }
}