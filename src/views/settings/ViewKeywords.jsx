/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-21 15:05:41
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-22 19:24:58
 * @ Description: The view that lets users manage their keywords
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, Button, Table } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import KeywordController from '../../controllers/KeywordController';
import Alert from '../../components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faPlusCircle, faQrcode, faPen, faTrash, faArrowUp, faArrowDown, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { ViewCarsOptionRow } from '../../styles/views/ViewCars.style';
import AddKeywordModal from '../../components/modals/AddKeywordModal';
import Axios from 'axios';
import AlarmBadge from '../../components/AlarmBadge';
import EditKeywordModal from '../../components/modals/EditKeywordModal';

export default class ViewKeywords extends React.Component {

    state = {
        isLoading: true,
        keywords: [],
        modal: [],
        alerts: []
    }

    componentDidMount() {
        this.fetchData();
    }

    onRefresh = (force = false) => {
        this.setState({
            isLoading: true,
            alerts: [],
            modals: [],
            keywords: []
        });
        this.fetchData(force);
    }
    handleAddClick = ()=>{
        this.setState({
            modal: [...this.state.modal, 
            <AddKeywordModal key={this.state.modal.length} onDismiss={this.onRefresh} />]
        });
    }
    handleEditClick = (id)=>{
        this.setState({
            modal: [...this.state.modal, <EditKeywordModal
                keywordId={id}
                key={this.state.modal.length}
                onDismiss={this.onRefresh}
            />]
        });
    }
    handleDeleteClick = (id) => {
        Axios.delete('/keyword/' + id)
            .then( response => {
                if(response.data.status === 'SUCCESS') {
                    // Update cache
                    // if cache exists
                    if(localStorage.getItem('pp_cache_keywords') != null) {
                        let keywordCache = JSON.parse(localStorage.getItem('pp_cache_keywords'));
                        // search for the id
                        for(let i = 0; i < keywordCache.length; i++) {
                            if( id === keywordCache[i].id) {
                                // remove the element
                                keywordCache.splice(i, 1);
                            }
                        }
                        // write new cache
                        localStorage.setItem('pp_cache_keywords', JSON.stringify(keywordCache));
                    }
                    // Reload
                    this.onRefresh();
                    this.setState({
                        alerts: [...this.state.alerts, <Alert type="success" key={Date.now()}>
                            { CurrentLanguage().views.settings.keywords.onDelete }
                        </Alert>]
                    });
                } else {
                    this.setState({
                        alerts: [...this.state.alerts, <Alert type="error" key={Date.now()}>
                            { CurrentLanguage().errors.serverError }
                        </Alert>]
                    });
                }
            }).catch( error => {
                console.log(error)
                this.setState({
                    alerts: [...this.state.alerts, <Alert type="error" key={Date.now()}>
                        { CurrentLanguage().errors.noInternet }
                    </Alert>]
                });
            });
    }


    handleMoveUp = index => {
        if(index > 0) {
            this.handleExchangeKeywords(index, index - 1);
        }
    }
    handleMoveDown = index => {
        if(index < (this.state.keywords.length - 1)) {
            this.handleExchangeKeywords(index, index + 1);
        }
    }
    handleExchangeKeywords = (index1, index2) => {
        KeywordController.exchangeOrder(
            this.state.keywords[index1].id,
            this.state.keywords[index2].id
        ).then( ()=> {
            this.setState({
                cars: []
            });
            // force refresh
            this.fetchData(true);
        }).catch( error => {
            if(error === KeywordController.ExchangeErrors.SERVER_ERROR) {
                this.setState({
                    alerts: [<Alert type="error" key={0}>
                        { CurrentLanguage().errors.serverError }
                    </Alert>]
                });
            } else {
                this.setState({
                    alerts: [<Alert type="error" key={0}>
                    { CurrentLanguage().errors.noInternet }
                    </Alert>]
                });
            }
        });
    }

    getKeywordTable = (keywords) => {
        // If there are no keywords yet
        if(keywords.length === 0) {
            return <i 
            style={{
                fontSize:'9pt',
                textAlign: 'center',
                display: 'block',
                width: '100%',
                color: '#bababa'
            }}>
                <br/>
                {CurrentLanguage().views.settings.keywords.onHasNoKeywords}
            </i>;
        }
        // If there are words, add them to a list
        let tableRows = [];
        for(let i = 0; i < keywords.length; i++) {
            const currentKeyword = keywords[i];
            tableRows.push(<tr key={i}>
                <td style={{
                    textAlign: 'center',
                    fontSize: '12pt',
                    color: currentKeyword.isEmergency ? '#4285f4' : '#eaeaea'
                }}>
                <FontAwesomeIcon icon={faShippingFast} />
                </td>
                <td>
                    <AlarmBadge code={currentKeyword.name} color={currentKeyword.color} />
                </td>
                <td>{currentKeyword.description}</td>
                <ViewCarsOptionRow>
                    <FontAwesomeIcon icon={ faPen } onClick={()=>{this.handleEditClick(currentKeyword.id)}}/>
                    <FontAwesomeIcon icon={ faTrash } onClick={()=>{this.handleDeleteClick(currentKeyword.id)}} />
                    &nbsp;
                    { (i > 0) && <FontAwesomeIcon icon={ faArrowUp } onClick={()=>{this.handleMoveUp(i)}}/> }
                    { (i !== (keywords.length - 1)) && <FontAwesomeIcon icon={ faArrowDown } onClick={()=>{this.handleMoveDown(i)}}/> }
                </ViewCarsOptionRow> 
            </tr>);
        }
        return <Table
            className="fullwidth bordered"
            style={{
                fontSize: '10pt',
                verticalAlign: 'middle'
            }}><tbody>
            {tableRows}
        </tbody></Table>;
    }

    fetchData = (forceRefresh = false) => {
        KeywordController.getKeywords(forceRefresh)
            .then( keywords => {
                this.setState({
                    isLoading: false,
                    keywords
                });
            }).catch(error => {
                this.setState({
                    isLoading: true,
                    modal: [
                        <Alert type="error" key={0}>
                            {CurrentLanguage().errors.noInternet}
                        </Alert>
                    ]
                });
            })
    }

    render() {
        return <View>
            {this.state.modal}
            { (this.state.isLoading && <ContentLoader/>) || <ViewContent>
                <ContentTitle>
                    { CurrentLanguage().views.settings.keywords.txtTitle }
                </ContentTitle>
                <Content>
                    <Button className="fullwidth fat" onClick={this.onRefresh}>
                        <FontAwesomeIcon icon={ faSyncAlt } /> { CurrentLanguage().generic.btnRefresh }
                    </Button>
                    {this.state.alerts}
                    {this.getKeywordTable(this.state.keywords)}
                    <Button className="halfwidth primary" color="" onClick={this.handleAddClick}>
                        <FontAwesomeIcon icon={faPlusCircle}/><br/>
                        {CurrentLanguage().views.settings.keywords.txtAddNew}
                    </Button>
                    <Button className="halfwidth dark" color="" onClick={()=>{this.onRefresh(true)}}>
                        <FontAwesomeIcon icon={faQrcode}/><br/>
                        {CurrentLanguage().views.settings.keywords.txtImport}
                    </Button>
                </Content>
            </ViewContent>}
        </View>;
    }
}