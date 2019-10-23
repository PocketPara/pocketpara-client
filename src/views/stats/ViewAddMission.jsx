/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-23 22:20:29
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 22:57:38
 * @ Description: View for adding new missions to a shift
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, HBox, InputLabel } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import KeywordController from '../../controllers/KeywordController';
import MedicalCategoryController from '../../controllers/MedicalCategoryController';
import Alert from '../../components/Alert';

export default class ViewAddMission extends React.Component {

    state = {
        modals: [],
        alerts: [],
        isLoading: true,

        // Helpers
        keywordList: [],
        medicalCategories: [],
        userEvents: [],

        // Content
        shiftid: this.props.match.params.shiftid
    }

    componentWillMount() {
        // Load keywords
        KeywordController.getKeywords()
            .then( keywords => {
                this.setState({ keywordList: keywords, isLoading: false });
            }).catch( error => {
                this.setState({
                    modals: [<Alert type="error" key={Date.now()}>
                        {CurrentLanguage().errors.noInternet}
                    </Alert>],
                    isLoading: true
                });
            });
            
        // Load medical categories
        MedicalCategoryController.getMedicalCategories(false, CurrentLanguage().langCode)
            .then( medicalCategories => {
                this.setState({
                    medicalCategories,
                    isLoading: false
                });
            }).catch( error => {
                this.setState({
                    modals: [<Alert type="error" key={Date.now()}>
                        {CurrentLanguage().errors.noInternet}
                    </Alert>],
                    isLoading: true
                });
            });

    }

    render() {
        return <View>
            { this.state.modals }
            { (this.state.isLoading && <ContentLoader />) || <ViewContent>
                
                <ContentTitle>
                    { CurrentLanguage().views.stats.addMission.lblTitle }
                </ContentTitle>
                { this.state.alerts }

                <Content>
                    <HBox left>
                        <InputLabel>{CurrentLanguage().views.stats.addMission.lblInitialCode}</InputLabel>
                    </HBox>
                    <HBox right>
                        <InputLabel>{CurrentLanguage().views.stats.addMission.lblEndCode}</InputLabel>
                    </HBox>

                </Content>
            </ViewContent>}
        </View>;
    }
}