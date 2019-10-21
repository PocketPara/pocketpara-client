/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-21 15:50:05
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-21 19:06:32
 * @ Description: The modal that allows users to add new keywords
 */
import React from 'react';
import Modal from '../Modal';
import ContentLoader from '../Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import { InputLabel, TextInput, Button } from '../../styles/UI.style';
import {ViewRegisterCheckboxLabel} from '../../styles/views/ViewRegister.style';
import { CirclePicker} from 'react-color';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontColor from '../../helpers/FontColor';
import Axios from 'axios';
import Alert from '../Alert';
import GenericConfig from '../../config/GenericConfig';

export default class AddKeywordModal extends React.Component {
    state = {
        name: "",
        description: "",
        color: "#232323",
        isEmergency: false,
        alerts: [],
        showLoader: false
    }

    handleSubmit = (e) => {
        // Prevent page-reload
        e.preventDefault();
        this.setState({ showLoader: true });

        // Add the new keyword
        Axios.post('/keyword/add', {
            name: this.state.name,
            description: this.state.description,
            order: parseInt(Date.now()/1000),
            color: this.state.color
        }).then( response => {
            // If request was successful
            if(response.data.status === 'SUCCESS') {
                // add to cache
                const {id,name,color,isEmergency,description,order} = response.data.keyword;
                // Update the cache
                if(localStorage.getItem('pp_cache_keywords')) {
                    let keywords = JSON.parse(localStorage.getItem('pp_cache_keywords'));
                    keywords.push({id,name,color,isEmergency,description,order});
                    localStorage.setItem('pp_cache_keywords', JSON.stringify(keywords));
                }
                // Set the state
                this.setState({
                    showLoader: false,
                    name: "",
                    description: "",
                    color: "#232323",
                    isEmergency: false,
                    alerts: [<Alert type="success" key={Date.now()}>
                        {CurrentLanguage().views.settings.keywords.addForm.onSuccess}
                    </Alert>]
                });
                // close modal
                if(this.props.onDismiss) {
                    this.props.onDismiss();
                }
            } else {
                this.setState({
                    showLoader: false,
                    alerts: <Alert type="error">
                        {CurrentLanguage().erorrs.denied}
                    </Alert>
                });
            }
        }).catch( error => {
            this.setState({
                showLoader: false,
                alerts: <Alert type="error">
                    {CurrentLanguage().erorrs.noInternet}
                </Alert>
            });
        });
    }

    onEmergencyToggle = ()=>{
        this.setState({isEmergency: !this.state.isEmergency});
    }

    render() {
        return <Modal>
            {(this.state.showLoader && <ContentLoader/>) || 
            <form onSubmit={this.handleSubmit}>
                <h1>
                    {CurrentLanguage().views.settings.keywords.addForm.lblTitle}
                </h1>
                {this.state.alerts}
                <InputLabel>
                {CurrentLanguage().views.settings.keywords.addForm.lblName}
                </InputLabel>
                <TextInput
                    type="text"
                    value={this.state.name}
                    onChange={e => this.setState({name:e.target.value})}
                    className="fullwidth"
                    placeholder={CurrentLanguage().views.settings.keywords.addForm.lblNameDefault}
                    required />
                
                <InputLabel>
                {CurrentLanguage().views.settings.keywords.addForm.lblDesc}
                </InputLabel>
                <TextInput
                    type="text"
                    value={this.state.description}
                    onChange={e => this.setState({description:e.target.value})}
                    className="fullwidth"
                    placeholder={CurrentLanguage().views.settings.keywords.addForm.lblDescDefault}
                    />

                <ViewRegisterCheckboxLabel className="container">
                    <input type="checkbox" checked={ this.state.isEmergency } onChange={this.onEmergencyToggle}/>
                    <span className="checkmark"></span>
                    {CurrentLanguage().views.settings.keywords.addForm.tglEmergency}
                </ViewRegisterCheckboxLabel>
                <InputLabel>
                {CurrentLanguage().views.settings.keywords.addForm.lblColor}
                </InputLabel>
                <div style={{
                    paddingLeft: '10px',
                    paddingTop:'10px',
                    textAlign:'center'
                }}>
                <CirclePicker 
                colors={GenericConfig.keywordColorList}
                width={window.innerWidth * 0.90 - 20}
                color={this.state.color}
                onChangeComplete={ color => {
                    this.setState({color:color.hex});
                }}/></div>
                <br/>
                <Button className="fullwidth large fat" color={this.state.color} fontcolor={FontColor(this.state.color)}>
                <FontAwesomeIcon icon={ faSave } /> &nbsp;
                    { CurrentLanguage().generic.btnSave }
                </Button>
                
            </form>
            }
        </Modal>;
    }
}
