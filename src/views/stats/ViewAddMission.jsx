/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-23 22:20:29
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-12 01:32:23
 * @ Description: View for adding new missions to a shift
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, HBox, InputLabel, Button, TinyText } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import KeywordController from '../../controllers/KeywordController';
import TagController from '../../controllers/TagController';
import MedicalCategoryController from '../../controllers/MedicalCategoryController';
import Alert from '../../components/Alert';
import AlarmBadge from '../../components/AlarmBadge';
import KeywordSelectionModal from '../../components/modals/KeywordSelectionModal';

export default class ViewAddMission extends React.Component {

    state = {
        modals: [],
        alerts: [],
        isLoading: true,

        // Data
        alarmedKeyword: { id: 0, name: '', description: '', color: '#ffffff'},
        changedKeyword: { id: -1, name: '', description: '', color: '#ffffff'},

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
                this.setState({ keywordList: keywords, isLoading: false, alarmedKeyword: keywords[0] });
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

    handleChangeInitialKeyword = () => {
        this.setState({
            modals: [
                ...this.state.modals, 
                <KeywordSelectionModal key={Date.now()} onChange={ alarmedKeyword => {
                    this.setState({ alarmedKeyword, modals: [] });
                }}/>
            ]
        });
    }
    handleChangeChangedKeyword = () => {
        this.setState({
            modals: [
                ...this.state.modals, 
                <KeywordSelectionModal key={Date.now()} onChange={ changedKeyword => {
                    this.setState({ changedKeyword, modals: [] });
                }}/>
            ]
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
                            code={this.state.alarmedKeyword.name}
                            color={this.state.alarmedKeyword.color}/>
                            <TinyText style={{marginLeft: '0.5em'}}>
                                { this.state.alarmedKeyword.description }
                            </TinyText>
                            <br/>
                        <Button className="light small" onClick={this.handleChangeInitialKeyword}>
                            {CurrentLanguage().generic.btnChange}
                        </Button>
                    </HBox>
                    <HBox right>
                        <InputLabel>{CurrentLanguage().views.stats.addMission.lblEndCode}</InputLabel>
                        { (this.state.changedKeyword != null && <div><AlarmBadge
                            code={this.state.changedKeyword.name}
                            color={this.state.changedKeyword.color}/>
                            <TinyText style={{marginLeft: '0.5em'}}>
                                { this.state.changedKeyword.description }
                            </TinyText>
                            </div>)|| <i style={{fontSize:'9pt'}}>{CurrentLanguage().views.stats.addMission.lblNoChange}</i>}
                        <br/>
                        <Button className="light small" onClick={this.handleChangeChangedKeyword}>{CurrentLanguage().generic.btnChange}</Button>
                    </HBox>

                </Content>
            </ViewContent>}
        </View>;
    }
}