/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-15 17:02:07
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-15 19:34:53
 * @ Description: The view for /settings/account
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, Table, LoaderContainer } from '../../styles/UI.style';
import CurrentLanguage from "../../helpers/CurrentLanguage";
import ContentLoader from '../../components/Loader';
import { UserController } from '../../controllers/UserController';

export default class ViewAccount extends React.Component {


    state = {
        username: 'loading...',
        email: 'loading...',
        fullname: 'loading...',
        roles: ["test","test1"],
        isVerified: false,
        language: 'en',
        isLoading: true
    }

    componentDidMount() {
        UserController.attemptGetCurrent()
            .then( user => {
                this.setState({
                    username: user.username,
                    language: user.language,
                    email: user.email,
                    fullname: user.fullname,
                    isVerified: user.isVerified,
                    roles: user.roles,
                    isLoading: false
                });
            }).catch( error => {
                console.log(error)
                // TODO
            });
    }

    render() {
        return <View>
            <ViewContent>
                { this.state.isLoading && <ContentLoader /> || <div>
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
                            <td>{(this.state.isVerified === true) ? "true" : "false"}</td>
                        </tr>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtLanguage}</td>
                            <td>{this.state.language}</td>
                        </tr>
                        <tr>
                            <td>{CurrentLanguage().views.settings.account.txtRoles}</td>
                            <td>{
                                this.state.roles.map( role => {
                                    return <div key={role}>{role}</div>
                                })
                            }</td>
                        </tr>
                    </tbody></Table>
                </Content>
            </div> }
            </ViewContent>
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