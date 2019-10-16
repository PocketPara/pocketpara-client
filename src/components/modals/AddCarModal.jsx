/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-16 20:59:53
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 21:22:08
 * @ Description: The modal that allows users to add new cars
 */

import React from 'react';
import { InputLabel, TextInput, Button } from '../../styles/UI.style';
import Modal from '../Modal';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import ContentLoader from '../Loader';
import Axios from 'axios';
import Alert from '../Alert';

export default class AddCarModal extends React.Component {

    state = {
        code: "",
        description: "",
        showLoader: false,
        alerts: []   
    }

    handleSubmit = e => {
        // prevent page reload
        e.preventDefault();
        this.setState({showLoader: true});

        Axios.post('/car/add', {
            code: this.state.code,
            description: this.state.description,
            order: parseInt(Date.now()/1000)
        }).then( response => {
            if(response.data.status === 'SUCCESS') {
                const { id, code, description, order } = response.data.car;
                this.setState({
                    showLoader: false,
                    code: "",
                    description: "",
                    alerts: [<Alert type="success" key={0}>
                        { CurrentLanguage().views.settings.cars.addForm.onSuccess }
                    </Alert>]
                });
                // add new car to cache
                if(localStorage.getItem('pp_cache_cars')) {
                    let cars = JSON.parse(localStorage.getItem('pp_cache_cars'));
                    cars.push({id,code,description,order});
                    localStorage.setItem('pp_cache_cars', JSON.stringify(cars));
                }
            } else {
                this.setState({
                    showLoader: false,
                    alerts: [<Alert type="error" key={0}>
                        { CurrentLanguage().views.settings.cars.addForm.onServerError }
                    </Alert>]
                });
            }
        }).catch( error => {
            this.setState({
                showLoader: false,
                alerts: [<Alert type="error" key={0}>
                    { CurrentLanguage().views.settings.cars.addForm.onError }
                </Alert>]
            });
        });

    }

    render() {
        return <Modal>{ (this.state.showLoader && <ContentLoader />) || <form onSubmit={this.handleSubmit}>
        <h1>{ CurrentLanguage().views.settings.cars.addForm.addNew }</h1>
            {this.state.alerts}
            <InputLabel>
                { CurrentLanguage().views.settings.cars.addForm.lblCode }
            </InputLabel>
            <TextInput 
                type="text" 
                value={this.state.code}
                onChange={ e=>{ this.setState({code:e.target.value})}}
                className="fullwidth"
                placeholder={ CurrentLanguage().views.settings.cars.addForm.lblCodeDefault }
                required/>
            <InputLabel>
                { CurrentLanguage().views.settings.cars.addForm.lblDesc }
            </InputLabel>
            <TextInput 
                type="text" 
                value={this.state.description}
                onChange={ e=>{ this.setState({description:e.target.value})}}
                className="fullwidth"
                placeholder={ CurrentLanguage().views.settings.cars.addForm.lblDescDefault }
                required/>
            <br/>
            <Button className="fullwidth large fat">
                <FontAwesomeIcon icon={ faSave } /> &nbsp;
                { CurrentLanguage().views.settings.cars.addForm.btnSave }
            </Button>
        </form>}</Modal>;
    }
}