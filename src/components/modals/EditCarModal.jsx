/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-16 23:41:35
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 23:55:23
 * @ Description: The modal that allows the user to edit cars
 */
import React from 'react';
import Modal from '../Modal';
import { InputLabel, TextInput, Button } from '../../styles/UI.style';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import ContentLoader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import Alert from '../Alert';

export default class EditCarModal extends React.Component {

    state = {
        code: "",
        description: "",
        showLoader: true,
        alerts: []   
    }

    handleSave = e => {
        // prevent reload
        e.preventDefault();
        this.setState({ showLoader: true });

        // Save
        Axios.patch('/car/' + this.props.carId, {
            code: this.state.code,
            description: this.state.description
        }).then( response => {
            if(response.data.status === 'SUCCESS') {
                this.setState({
                    showLoader: false,
                    alerts: [<Alert type="success" key={0}>
                        { CurrentLanguage().views.settings.cars.editForm.onSuccess }
                    </Alert>]
                });
                // update car locally
                let cars = JSON.parse(localStorage.getItem('pp_cache_cars'));
                for(let car of cars) {
                    if(car.id === this.props.carId) {
                        car.code = this.state.code;
                        car.description = this.state.description;
                    }
                }
                localStorage.setItem('pp_cache_cars', JSON.stringify(cars));
                if(this.props.onDismiss) {
                    this.props.onDismiss();
                }
            } else {
                this.setState({
                    showLoader: false,
                    alerts: [<Alert type="error" key={0}>
                        { CurrentLanguage().views.settings.cars.editForm.onServerError }
                    </Alert>]
                });
            }
            
        }).catch( error => {
            this.setState({
                showLoader: false,
                alerts: [<Alert type="error" key={0}>
                    { CurrentLanguage().views.settings.cars.editForm.onError }
                </Alert>]
            });
        });
    }

    componentDidMount() {
        // get car from cache (user cant get to this form if its not in cache)
        for(let car of JSON.parse(localStorage.getItem('pp_cache_cars'))) {
            if(car.id === this.props.carId) {
                this.setState({
                    showLoader: false,
                    code: car.code,
                    description: car.description
                });
            }
        }
    }

    render() {
        return <Modal>{ (this.state.showLoader && <ContentLoader />) || <form onSubmit={this.handleSave}>
        <h1>{ CurrentLanguage().views.settings.cars.editForm.lblTitle }</h1>
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
                { CurrentLanguage().views.settings.cars.editForm.btnSave }
            </Button>
        </form>}</Modal>;
    }
};