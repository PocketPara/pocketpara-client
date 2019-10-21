import React from 'react';
import { View, ViewContent, ContentTitle, Content, InputLabel, HBox, Dropdown, Button, Table } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import Alert from '../../components/Alert';
import CarController from '../../controllers/CarController';
import VehicleSelectionModal from '../../components/modals/VehicleSelectionModal';
import Spoiler from '../../components/Spoiler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import CrewPersonAddModal from '../../components/modals/CrewPersonAddModal';
import Axios from 'axios';

export default class ViewAddShift extends React.Component {

    state = {
        alerts: [],
        modals: [],
        isLoading: false,

        date: this.getCurrentDate(),
        cycle: CurrentLanguage().generic.cycles[0],
        position: CurrentLanguage().generic.positions[0],
        crew: [],
        carId: null,

        cars: []
    }

    componentDidMount() {
        CarController.getCars(false)
            .then( cars => {
                this.setState({
                    cars,
                    carId: (cars.length>0) ? cars[cars.length-1].id : 0
                });
            }).catch( error => {
                this.setState({
                    isLoading: true,
                    alerts: <Alert type="error">
                        {CurrentLanguage().errors.noInternet}
                    </Alert>
                });
            });
    }

    getCar = id => {
        for(let car of this.state.cars) {
            if(car.id === id) {
                return car;
            }
        }
        return {
            code: 'No car selected',
            description: ""
        };
    }

    getCurrentDate() {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = ((d.getMonth()+1) <= 9) ? '0' + (d.getMonth()+1) : '' + (d.getMonth()+1);
        const dd = ((d.getDate()) <= 9) ? '0' + (d.getDate()) : '' + (d.getDate());
        return `${yyyy}-${mm}-${dd}`;
    }

    handleChangeCar = e => {
        this.setState({
            modals: [...this.state.modals, <VehicleSelectionModal 
                key={Date.now()} 
                defaultId={this.state.carId}
                onChange={ (car)=>{
                    this.setState({
                        carId: car.id,
                        modals: []
                    });
                } }
            />]
        });
    }

    handleAddCrewmember = e => {
        this.setState({
            modals: [<CrewPersonAddModal
                key={Date.now()}
                onFinish={ newMember => {
                    this.setState({
                        crew: [...this.state.crew, {
                            role: newMember.roleIndex,
                            firstname: newMember.firstname,
                            lastname: newMember.lastname
                        }],
                        modals: []
                    });
                }}   
            />]
        });
    }

    removeCrewIndex = index => {
        let crew = this.state.crew;
        crew.splice(index, 1);
        this.setState({crew});
    }

    getCrewTable = crew => {
        let rows = [];
        for(let i = 0; i < crew.length; i++) {
            const person = crew[i];
            rows.push(<tr 
            key={i}>
                <td>{
                    CurrentLanguage().generic.positions[person.role]
                }</td>
                <td>{person.firstname}</td>
                <td>{person.lastname}</td>
                <td 
                    onClick={()=>{this.removeCrewIndex(i);}}
                    style={{width:'25px',textAlign:'center'}}>
                    <FontAwesomeIcon icon={faTrash} />
                </td>
            </tr>);
        }
        return <Table className="fullwidth bordered" style={{fontSize:'10pt'}}><tbody>
            {rows}
        </tbody></Table>;
    }

    handleSubmit = e => {
        Axios.post('/shift/add', {
            date: this.state.date,
            cycle: CurrentLanguage().generic.cycles.indexOf(this.state.cycle),
            carId: this.state.carId,
            myRole: CurrentLanguage().generic.positions.indexOf(this.state.position),
            crew: JSON.stringify(this.state.crew)
        }).then( response => {
            console.log(response)
            if(response.data.status === 'SUCCESS') {
                this.setState({ alerts: <Alert type="success">
                        {CurrentLanguage().views.stats.addShift.onSave}
                    </Alert>,
                    date: this.getCurrentDate(),
                    cycle: CurrentLanguage().generic.cycles[0],
                    position: CurrentLanguage().generic.positions[0],
                    crew: [],
                    carId: null,}
                );
            } else {
                this.setState({ alerts: <Alert type="error">
                    {CurrentLanguage().errors.serverError}
                </Alert>})
            }
        }).catch( error => {
            this.setState({ alerts: <Alert type="error">
                {CurrentLanguage().errors.noInternet}
            </Alert>});
        });
    }

    render() {
        const car = this.getCar(this.state.carId);
        return <View>
                {this.state.modals}
            { (this.state.isLoading && <ContentLoader />) ||<ViewContent>
                {this.state.alerts}
                <ContentTitle>
                {CurrentLanguage().views.stats.addShift.txtTitle}
                </ContentTitle>
                <Content>
                    <HBox left>
                        <InputLabel>
                        {CurrentLanguage().views.stats.addShift.lblDate}
                        </InputLabel>

                        <input className="fullwidth" type="date" value={this.state.date} onChange={e=>{this.setState({date:e.target.value})}} />
                    </HBox>

                    <HBox right>
                        <InputLabel>
                        {CurrentLanguage().views.stats.addShift.lblCycle}
                        </InputLabel>
                        <Dropdown 
                        className="fullwidth" 
                        onChange={ e => {
                            this.setState({ cycle: e.target.value })
                        }}
                        value={this.state.cycle}>
                            {CurrentLanguage().generic.cycles.map( cycle => {
                                return <option key={cycle}>{cycle}</option>
                            })}
                        </Dropdown>
                    </HBox>

                    <HBox left>
                            <InputLabel>
                            {CurrentLanguage().views.stats.addShift.lblCar}
                            </InputLabel>
                            <b>{car.code}</b><br/>
                            <span style={{color:'#949494'}}>{car.description}</span><br/>
                            <Button className="light" onClick={this.handleChangeCar}>
                                {CurrentLanguage().generic.btnChange}
                            </Button>
                    </HBox>
                    <HBox right>
                            <InputLabel>
                            {CurrentLanguage().views.stats.addShift.lblMyPos}
                            </InputLabel>
                            <Dropdown 
                            className="fullwidth" 
                            onChange={ e => {
                                this.setState({ position: e.target.value })
                            }}
                            value={this.state.position}>
                            {CurrentLanguage().generic.positions.map( position => {
                                return <option key={position}>{position}</option>
                            })}
                            </Dropdown><br/><br/><br/>
                    </HBox>

                    <HBox wide>
                        <InputLabel>
                        {CurrentLanguage().views.stats.addShift.lblOthers}
                        </InputLabel>
                        <Spoiler className="fullwidth" isExpanded={true}>
                            {this.getCrewTable(this.state.crew)}
                            <Button className="fullwidth" onClick={this.handleAddCrewmember}>
                                <FontAwesomeIcon icon={ faPlusCircle } /> &nbsp;
                                {CurrentLanguage().views.stats.addShift.btnAddOther}
                            </Button>
                        </Spoiler>
                    </HBox>

                    <br/><br/>
                    <Button type="submit" className="large fat fullwidth" onClick={this.handleSubmit}>
                        <FontAwesomeIcon icon={faSave} />&nbsp; {CurrentLanguage().generic.btnSave}
                    </Button>

                </Content>
            </ViewContent>}
        </View>;
    }
}