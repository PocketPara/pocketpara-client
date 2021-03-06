/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-14 22:21:09
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-10 22:53:29
 * @ Description: The main navigation (that pops out on the left side)
 *                also redirects if user is logged out, since its only on internal sites
 */

import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { NavigationWrapper, NavigationShadowToggleBox, NavigationLogo, NavigationOptionList, NavigationGroup, NavigationItem } from '../styles/components/Navigation.style';
import Logo from "../assets/rdicon_512-blue.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faPlusCircle, faAmbulance, faChartPie, faSearch, faCogs, faUser, faTruck, faBullhorn, faCog, faNotesMedical, faHeartbeat, faTasks, faHatWizard, faTags } from '@fortawesome/free-solid-svg-icons';
import CurrentLanguage from "../helpers/CurrentLanguage";

class Navigation extends React.Component {

    state = {
        redirect: []
    }

    componentDidMount() {
        // Go to login if user is not logged in currently
        if(localStorage.getItem('pp_token') == null) {
            this.setState({ redirect: <Redirect to="/login" />});
        }
    }

    navigateTo = target => {
        this.props.onToggle();
        this.props.history.push(target);
    }

    render() {
        return <div>
        {this.state.redirect}
        <NavigationWrapper>
            <NavigationLogo onClick={this.props.onToggle}>
                <img src={ Logo } alt="Logo" />
                <div>PocketPara</div>
            </NavigationLogo>
            <br/>
            <NavigationOptionList>

                <NavigationGroup bgColor="#3a6cbe">
                    <div><FontAwesomeIcon icon={ faChartArea } /></div>
                    <span>{ CurrentLanguage().navigation.stats }</span>
                </NavigationGroup>
                <NavigationItem onClick={()=>{this.navigateTo("/stats/add-shift") }} bgColor="#4285f4">
                    <div><FontAwesomeIcon icon={ faPlusCircle } /></div>
                    <span>{ CurrentLanguage().navigation.addShift }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/stats/my-shifts") }} bgColor="#4285f4">
                    <div><FontAwesomeIcon icon={ faAmbulance } /></div>
                    <span>{ CurrentLanguage().navigation.myShifts }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/stats/overview") }} bgColor="#4285f4">
                    <div><FontAwesomeIcon icon={ faChartPie } /></div>
                    <span>{ CurrentLanguage().navigation.statOverview }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/stats/serach-shift") }} bgColor="#4285f4">
                    <div><FontAwesomeIcon icon={ faSearch } /></div>
                    <span>{ CurrentLanguage().navigation.searchShift }</span>
                </NavigationItem>


                <NavigationGroup bgColor="#05bb69">
                    <div><FontAwesomeIcon icon={ faCogs } /></div>
                    <span>{ CurrentLanguage().navigation.settings }</span>
                </NavigationGroup>
                <NavigationItem onClick={()=>{this.navigateTo("/settings/account") }} bgColor="#00d274">
                    <div><FontAwesomeIcon icon={ faUser } /></div>
                    <span>{ CurrentLanguage().navigation.manageAccount }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/settings/cars") }} bgColor="#00d274">
                    <div><FontAwesomeIcon icon={ faTruck } /></div>
                    <span>{ CurrentLanguage().navigation.manageCars }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/settings/keywords") }} bgColor="#00d274">
                    <div><FontAwesomeIcon icon={ faBullhorn } /></div>
                    <span>{ CurrentLanguage().navigation.manageKeywords }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/settings/tags") }} bgColor="#00d274">
                    <div><FontAwesomeIcon icon={ faTags } /></div>
                    <span>{ CurrentLanguage().navigation.manageTags }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/settings/app") }} bgColor="#00d274">
                    <div><FontAwesomeIcon icon={ faCog } /></div>
                    <span>{ CurrentLanguage().navigation.appSettings }</span>
                </NavigationItem>


                <NavigationGroup bgColor="#cc0205">
                    <div><FontAwesomeIcon icon={ faNotesMedical } /></div>
                    <span>{ CurrentLanguage().navigation.tools }</span>
                </NavigationGroup>
                <NavigationItem onClick={()=>{this.navigateTo("/tools/ecg-criteria") }} bgColor="#ff2b2e">
                    <div><FontAwesomeIcon icon={ faHeartbeat } /></div>
                    <span>{ CurrentLanguage().navigation.ecgCriteria }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/tools/algorithms") }} bgColor="#ff2b2e">
                    <div><FontAwesomeIcon icon={ faTasks } /></div>
                    <span>{ CurrentLanguage().navigation.algorithms }</span>
                </NavigationItem>
                <NavigationItem onClick={()=>{this.navigateTo("/tools/scores") }} bgColor="#ff2b2e">
                    <div><FontAwesomeIcon icon={ faHatWizard } /></div>
                    <span>{ CurrentLanguage().navigation.scores }</span>
                </NavigationItem>



            </NavigationOptionList>

        </NavigationWrapper>
        <NavigationShadowToggleBox onClick={this.props.onToggle}>&nbsp;</NavigationShadowToggleBox>
        </div>;
    }
}

export default withRouter(Navigation);