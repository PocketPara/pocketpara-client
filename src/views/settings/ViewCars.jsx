import React from 'react';
import { View, ViewContent, ContentTitle, Content, Button, Table } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import CarController from '../../controllers/CarController';
import Alert from '../../components/Alert';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSyncAlt, faPlusCircle, faQrcode, faPen, faTrash, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import QrScannerComponent from '../../components/QrScanner';
import AddCarModal from '../../components/modals/AddCarModal';
import { ViewCarsOptionRow } from '../../styles/views/ViewCars.style';

export default class ViewCars extends React.Component {

    state = {
        isLoading: true,
        scannerActive: false,
        cars: [],
        modal: [],
        alerts: []
    }

    onRefresh = () => {
        this.setState({
            isLoading: true,
            cars: []
        });
        this.fetchData(true);
    }

    fetchData = (forceRefresh = false) => {
        
        CarController.getCars(forceRefresh)
            .then( cars => {
                this.setState({
                    isLoading: false,
                    cars
                });
            }).catch( error => {
                this.setState({
                    isLoading: true,
                    modal: [
                        <Alert type="error" key={0}>
                            { CurrentLanguage().views.settings.cars.onError }
                        </Alert>
                    ]
                });
            });
    }

    getCarTable = (cars) => {
        if(cars === 0) {
            return <i 
                style={{
                    fontSize:'9pt',
                    textAlign: 'center',
                    display: 'block',
                    width: '100%',
                    color: '#bababa'
                }}>
                <br/>{CurrentLanguage().views.settings.cars.onHasNoCars}<br/><br/>
            </i>;
        }
        let tableRows = [];
        for(let i = 0; i < cars.length; i++) {
            const currentCar = cars[i];
            tableRows.push(<tr>
                <td>{currentCar.code}</td>
                <td>{currentCar.description}</td>
                <ViewCarsOptionRow>
                    <FontAwesomeIcon icon={ faPen } />
                    <FontAwesomeIcon icon={ faTrash } onClick={()=>{this.handleDeleteClick(currentCar.id)}} />
                    &nbsp;
                    <FontAwesomeIcon icon={ faArrowUp } />
                    <FontAwesomeIcon icon={ faArrowDown } />
                </ViewCarsOptionRow>
            </tr>);
        }
        return <Table 
            className="fullwidth bordered" 
            style={{
                fontSize: '10pt',
                verticalAlign: 'middle'
            }}><tbody>
            { tableRows }
        </tbody></Table>;
    }

    componentDidMount() {
        this.fetchData();
    }

    getAddModal = () =>{ 
        return <AddCarModal key={this.state.modal.length} />;
    }

    handleAddClick = () => {
        this.setState({
            modal: [...this.state.modal, this.getAddModal()]
        });
    }

    handleDeleteClick = id => {
        CarController.delete(id)
            .then( () => {
                // search cache
                this.setState({
                    alerts: [<Alert key={0} type="success">
                        { CurrentLanguage().views.settings.cars.onDeleteSuccess }
                    </Alert>]
                });
                // search cache
                if(localStorage.getItem('pp_cache_cars') != null) {
                    let cars = JSON.parse(localStorage.getItem('pp_cache_cars'));
                    for(let i = 0; i < cars.length; i++) {
                        if(cars[i].id === id) {
                            cars.splice(i, 1);
                        }
                    }
                    localStorage.setItem('pp_cache_cars', JSON.stringify(cars));
                    this.setState({ cars });
                }
            }).catch( error => {
                if(error === CarController.DeleteErrors.REQUEST_ERROR) {
                    this.setState({
                        alerts: [<Alert key={0} type="success">
                            { CurrentLanguage().views.settings.cars.onDeleteSuccess }
                        </Alert>]
                    });
                }
                this.setState({
                    alerts: [<Alert key={0} type="error">
                        { CurrentLanguage().views.settings.cars.onError }
                    </Alert>]
                });
            });
    }

    render() {
        return <View>
            { this.state.modal }
            { (this.state.isLoading && <ContentLoader />) || <ViewContent>
            
            <ContentTitle>
                { CurrentLanguage().views.settings.cars.txtTitle }
            </ContentTitle>
            <Content>
                <Button className="fullwidth fat" onClick={this.onRefresh}>
                    <FontAwesomeIcon icon={ faSyncAlt } /> { CurrentLanguage().generic.btnRefresh }
                </Button>
                { this.state.alerts }
                { this.getCarTable(this.state.cars) }
                <Button className="halfwidth primary" color="" onClick={this.handleAddClick}>
                    <FontAwesomeIcon icon={ faPlusCircle } /> <br/>{ CurrentLanguage().views.settings.cars.txtAddNew }
                </Button>
                <Button className="halfwidth dark" color="" onClick={ ()=>{this.setState({scannerActive: true})}}>
                    <FontAwesomeIcon icon={ faQrcode } /> <br/>{ CurrentLanguage().views.settings.cars.txtImport }
                </Button>
                <QrScannerComponent active={ this.state.scannerActive } />
            </Content>
            </ViewContent>}
        </View>
    }
}