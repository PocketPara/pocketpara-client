/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-21 19:01:43
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-21 19:16:25
 * @ Description: Modal for editing keywords
 */

import React from 'react';
import Modal from '../Modal';
import ContentLoader from '../Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import { InputLabel, TextInput, Button } from '../../styles/UI.style';
import { CirclePicker} from 'react-color';
import {ViewRegisterCheckboxLabel} from '../../styles/views/ViewRegister.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import GenericConfig from '../../config/GenericConfig';
import FontColor from '../../helpers/FontColor';
import Axios from 'axios';
import Alert from '../Alert';

export default class EditKeywordModal extends React.Component {

    state = {
        name: "",
        description: "",
        color: "#232323",
        isEmergency: false,
        alerts: [],
        showLoader: false
    }

    componentDidMount() {
        // get keyword from cache
        for(let keyword of JSON.parse(localStorage.getItem('pp_cache_keywords'))) {
            if(keyword.id === this.props.keywordId) {
                this.setState({
                    showLoader: false,
                    name: keyword.name,
                    color: keyword.color,
                    description: keyword.description,
                    isEmergency: keyword.isEmergency
                });
            }
        }
    }

    handleSave = e => {
        // Prevent page reload
        e.preventDefault();
        // Show loader
        this.setState({ showLoader: true });

        // Attempt to save
        Axios.patch('/keyword/' + this.props.keywordId, {
            name: this.state.name,
            color: this.state.color,
            description: this.state.description,
            isEmergency: this.state.isEmergency
        }).then( response => {
            if(response.data.status === 'SUCCESS') {
                this.setState({
                    showLoader: false,
                    alerts: [<Alert type="success" key={0}>
                        { CurrentLanguage().views.settings.keywords.editForm.onSuccess }
                    </Alert>]
                });
                // update changes locally too
                let keywords = JSON.parse(localStorage.getItem('pp_cache_keywords'));
                for(let keyword of keywords) {
                    if(keyword.id === this.props.keywordId) {
                        keyword.name = this.state.name;
                        keyword.color = this.state.color;
                        keyword.description = this.state.description;
                        keyword.isEmergency = this.state.isEmergency;
                    }
                    localStorage.setItem('pp_cache_keywords', JSON.stringify(keywords));
                    if(this.props.onDismiss) {
                        this.props.onDismiss();
                    }
                }
            } else {
                this.setState({
                    showLoader: false,
                    alerts: [<Alert type="error" key={0}>
                        { CurrentLanguage().errors.serverError }
                    </Alert>]
                });
            }
        }).catch( error => {
            this.setState({
                showLoader: false,
                alerts: [<Alert type="error" key={0}>
                    { CurrentLanguage().errors.noInternet }
                </Alert>]
            });
        });
    }

    onEmergencyToggle = e => {
        this.setState({isEmergency: !this.state.isEmergency});
    }

    render() {
        return <Modal>
        {(this.state.showLoader && <ContentLoader/>) || 
        <form onSubmit={this.handleSave}>
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