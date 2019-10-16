/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-15 17:02:07
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 13:46:41
 * @ Description: The view for /settings/account
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, Table, LoaderContainer, Button, Dropdown } from '../../styles/UI.style';
import CurrentLanguage from "../../helpers/CurrentLanguage";
import ContentLoader from '../../components/Loader';
import { UserController } from '../../controllers/UserController';
import GenericConfig from '../../config/GenericConfig';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { RoleList } from '../../styles/views/ViewAccount.style';
import Spoiler from '../../components/Spoiler';
import Alert from '../../components/Alert';

export default class ViewAccount extends React.Component {


    state = {
        username: 'loading...',
        email: 'loading...',
        fullname: 'loading...',
        roles: ["test","test1"],
        isVerified: false,
        language: 'en',
        isLoading: true,
        modal: []
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        UserController.attemptGetCurrent()
        .then( user => {
            this.setState({
                username: user.username,
                language: user.language,
                email: user.email,
                fullname: user.fullname,
                isVerified: user.isVerified,
                roles: user.roles,
                isLoading: false,
                modal: []
            });
        }).catch( error => {
            // if network error, try again in 2 seconds
            if( error === UserController.GetCurrentAttemptError.REQUEST_ERROR) {
                setTimeout(()=>{
                    this.fetchData();
                }, GenericConfig.refreshInterval);
            }
            this.setState({
                isLoading: false,
                modal: [
                    <Alert type="error">
                        { CurrentLanguage().views.settings.account.onError }
                    </Alert>
                ]
            });
        });
    }

    render() {
        return <View>
            { this.state.modal }
            { this.state.isLoading && <ContentLoader /> || <ViewContent>
                <ContentTitle>
                {CurrentLanguage().views.settings.account.txtTitle}
                </ContentTitle>
                <Content>
                    <Table className="fullwidth bordered markFirstColumn"><tbody>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtUser}</td>
                            <td>{this.state.username}</td>
                        </tr>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtMail}</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtFullname}</td>
                            <td>{this.state.fullname}</td>
                        </tr>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtVerified}</td>
                            <td>{(this.state.isVerified === true) ? <span style={{color: '#05bb69'}}>
                                <FontAwesomeIcon icon={ faCheckCircle } /> &nbsp;
                                {CurrentLanguage().views.settings.account.txtVerifiedTrue}
                            </span> : <span><span style={{color: '#cc0205'}}>
                                <FontAwesomeIcon icon={ faTimesCircle } /> &nbsp;
                                {CurrentLanguage().views.settings.account.txtVerifiedFalse}
                            </span><br/><span style={{fontSize: '10pt'}}>
                                Check your inbox for the verification mail.
                            </span></span>}</td>
                        </tr>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtLanguage}</td>
                            <td>
                                <Dropdown defaultValue={this.state.language} className="fullwidth">
                                    <option value="en">English</option>
                                    <option value="de">German</option>
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtRoles}</td>
                            <td>
                                <Spoiler fullwidth>
                                    <RoleList>{
                                        this.state.roles.map( role => {
                                            return <div key={role}>› {role}</div>
                                        })
                                    }</RoleList>
                                </Spoiler>
                            </td>
                        </tr>
                    </tbody></Table>
                    <Button className="fullwidth large">
                        Log out
                    </Button>
                </Content>
            </ViewContent> }
        </View>;
    }
}

/*
View template
return <View>
            
            <ViewContent>
                <ContentTitle>
                    The title is this
                </ContentTitle>
                <Content>
                    hello dudes
                </Content>
            </ViewContent>
            
        </View>;
*/