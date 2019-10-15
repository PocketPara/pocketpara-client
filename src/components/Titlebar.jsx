import React from 'react';
import { TitlebarWrapper, TitlebarText, TitlebarIcon, TitlebarOpenNavigationIcon } from '../styles/components/Titlebar.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Navigation from './Navigation';

export default class Titlebar extends React.Component {

    state = {
        navActive: false
    }

    constructor(...props) {
        super(...props);
        window.themeColor = this.props.color || '#bababa';
    }

    toggleNav = () => {
        this.setState({
            navActive: !this.state.navActive
        });
    }

    render() {
        return <div>
            <TitlebarWrapper 
            onClick={this.toggleNav}
            style={{
                backgroundColor: this.props.color || '#bababa'
            }}>
                <TitlebarOpenNavigationIcon>
                    <FontAwesomeIcon icon={ faBars } /> 
                </TitlebarOpenNavigationIcon>
                <TitlebarIcon>
                    <FontAwesomeIcon icon={this.props.icon} /> 
                </TitlebarIcon>
                <TitlebarText>{this.props.title}</TitlebarText>
                
            </TitlebarWrapper>
            { this.state.navActive && <Navigation onToggle={this.toggleNav} /> }
        </div>;
    }
}