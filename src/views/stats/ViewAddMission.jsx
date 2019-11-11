/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-23 22:20:29
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-11 21:28:32
 * @ Description: View for adding new missions to a shift
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, HBox, InputLabel, Button } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import KeywordController from '../../controllers/KeywordController';
import TagController from '../../controllers/TagController';
import MedicalCategoryController from '../../controllers/MedicalCategoryController';
import Alert from '../../components/Alert';
import AlarmBadge from '../../components/AlarmBadge';

export default class ViewAddMission extends React.Component {

    state = {
        modals: [],
        alerts: [],
        isLoading: true,

        // Data
        alarmedKeywordIndex: 0,
        changeKeywordIndex: null,

        // Helpers
        keywordList: [{color: '#000000',name:'loading...',id:0}],
        medicalCategoryList: [],
        tagList: [],

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

        TagController.getTags()
            .then( tags => {
                this.setState({ tagList: tags, isLoading: false });
            }).catch( error=> {
                this.setState({
                    modals: [<Alert type="error" key={Date.now()}>
                        {CurrentLanguage().errors.noInternet}
                    </Alert>],
                    isLoading: true
                });
            })
            
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
                        <AlarmBadge 
                            code={this.state.keywordList[this.state.alarmedKeywordIndex].name}
                            color={this.state.keywordList[this.state.alarmedKeywordIndex].color}/>
                            <br/>
                        <Button className="light small">{CurrentLanguage().generic.btnChange}</Button>
                    </HBox>
                    <HBox right>
                        <InputLabel>{CurrentLanguage().views.stats.addMission.lblEndCode}</InputLabel>
                        { (this.state.changeKeywordIndex != null && <AlarmBadge
                            code={this.state.keywordList[this.state.changeKeywordIndex].name}
                            color={this.state.keywordList[this.state.changeKeywordIndex].color}
                        />)|| <i style={{fontSize:'9pt'}}>{CurrentLanguage().views.stats.addMission.lblNoChange}</i>}
                        <br/>
                        <Button className="light small">{CurrentLanguage().generic.btnChange}</Button>
                    </HBox>

                </Content>
            </ViewContent>}
        </View>;
    }
}