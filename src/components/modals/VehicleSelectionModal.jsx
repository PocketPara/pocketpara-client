/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-21 21:41:28
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-21 22:22:13
 * @ Description: Modal for selecting a vehicle
 */

import React from 'react';
import Modal from '../Modal';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import CarController from '../../controllers/CarController';
import Alert from '../Alert';
import ContentLoader from '../Loader';
import { Table, Button } from '../../styles/UI.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export default class VehicleSelectionModal extends React.Component {

    state = {
        alerts: [],
        cars: [],
        currentId: 0,
        showLoader: true,
        isActive: true
    }

    componentDidMount() {
        CarController.getCars(true)
            .then( cars => {
                this.setState({
                    showLoader: false,
                    cars,
                    currentId: (cars !=null) ? cars[0].id : 0
                });
            }).catch( error => {
                this.setState({
                    alerts: <Alert type="error">
                        {CurrentLanguage().errors.noInternet}
                    </Alert>
                })
            });
        if(this.props.defaultId) {
            this.setState({currentId: this.props.defaultId});
        }
    }

    getCarTable = cars => {
        let rows = [];
        for(let car of cars) {
            rows.push(<tr 
                key={car.id} style={{
                    backgroundColor: (car.id === this.state.currentId) ? '#dedede' : '#ffffff',
                    color: (car.id === this.state.currentId) ? window.themeColor : '#232323'
                }}
                onClick={ ()=>{this.handleChange(car.id)}}
            >
                <td><b>{car.code}</b></td>
                <td>{car.description}</td>
            </tr>);
        }
        return <Table className="fullwidth bordered"><tbody>
            {rows}
        </tbody></Table>;
    }

    getCurrentCar = () => {
        for(let car of this.state.cars) {
            if(car.id === this.state.currentId) {
                return car;
            }
        }
    }

    handleSave = e => {
        // Prevent reload
        e.preventDefault();
        this.props.onChange( this.getCurrentCar() )
    }

    handleChange = id => {
        this.setState({ currentId: id });
    }

    render() {
        return <Modal style={{display: (this.state.isActive) ? 'block' : 'none'}}>
            {this.state.alerts}
            { (this.state.showLoader && <ContentLoader />) || <form onSubmit={this.handleSave}>
                <h1>{CurrentLanguage().views.stats.addShift.carForm.lblTitle}</h1>
                {this.getCarTable(this.state.cars)}

                <Button className="large fat fullwidth">
                    <FontAwesomeIcon icon={faSave} /> &nbsp; {CurrentLanguage().generic.btnSave}
                </Button>
            </form>}
        </Modal>;
    }
}