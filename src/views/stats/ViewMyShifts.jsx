/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-22 16:54:43
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-24 00:22:36
 * @ Description: The view that lists all shifts
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, Button } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import ReactList from 'react-list';
import { Redirect } from 'react-router-dom';
import ShiftController from '../../controllers/ShiftController';
import Alert from '../../components/Alert';
import Spoiler from '../../components/Spoiler';
import { ShiftBoxWrapper, ShiftBoxHeader, ShiftBoxBody } from '../../styles/views/ViewMyShift.style';
import CarController from '../../controllers/CarController';
import KeywordController from '../../controllers/KeywordController';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTruck, faUser, faTaxi, faWalking, faRunning, faUserNurse, faUserMd, faBaby, faBlind, faUserSecret, faSyncAlt, faPlusCircle, faExchangeAlt} from '@fortawesome/free-solid-svg-icons';
import MissionController from '../../controllers/MissionController';
import { MyShiftsMissionRow } from '../../styles/views/ViewMyShifts.style';
import AlarmBadge from '../../components/AlarmBadge';
import MedicalCategoryController from '../../controllers/MedicalCategoryController';

export default class ViewMyShifts extends React.Component {

    state = {
        modals: [],
        alerts: [],
        isLoading: true,

        shifts: [],
        cars: [],
        missions: [],
        keywords: [],
        medicalCategories: []
    }

    componentDidMount() {
        this.handleRefresh();
    }

    getCar = id => {
        for(let car of this.state.cars) {
            if(car.id === id) {
                return car;
            }
        }
        return { code: 'Unknown', description: '' };
    }

    getMissionsOfShift = shiftId => {
        let missionList = [];
        for(let mission of this.state.missions) {
            if(mission.shiftId === shiftId) {
                missionList.push(mission);
            }
        }
        return missionList;
    };

    getMedicalCategoryById = medicalCategoryId => {
        for(let medicalCategory of this.state.medicalCategories) {
            if(medicalCategory.id === medicalCategoryId) {
                return medicalCategory;
            }
        }
    }

    getKeywordById = keywordId => {
        for(let keyword of this.state.keywords) {
            if(keyword.id === keywordId) {
                return keyword;
            }
        }
    };

    renderMissionItem = (mission, key) => {
        const keyword = this.getKeywordById(mission.keywordId);
        const keywordUpdate = this.getKeywordById(mission.keywordUpdateId);
        const keywordHasChanged = mission.keywordId !== mission.keywordUpdateId;
        return <MyShiftsMissionRow key={key}>
            <AlarmBadge code={keyword.name} color={keyword.color}/> &nbsp;
            { keywordHasChanged && <span>
                <FontAwesomeIcon icon={ faExchangeAlt } /> &nbsp;
                <AlarmBadge code={keywordUpdate.name} color={keywordUpdate.color}/> &nbsp;
            </span>} 
            { this.getMedicalCategoryById(mission.medicalCategoryId).title }
        </MyShiftsMissionRow>;
    };

    renderItem = (index, key) => {
        const shift = this.state.shifts[index];
        const date = new Date(shift.date);
        const car = this.getCar(shift.carId);
    
        let missions = this.getMissionsOfShift(shift.id);
        let missionItems = [];
        for(let i = 0; i < missions.length; i++) {
            missionItems.push(this.renderMissionItem(missions[i], i));
        }

        return <ShiftBoxWrapper key={key}>
            <ShiftBoxHeader>
                {CurrentLanguage().generic.weekdays[date.getDay()]}, {date.getDate()}. {CurrentLanguage().generic.months[date.getMonth()]} {date.getFullYear()}
            </ShiftBoxHeader>
            <ShiftBoxBody>
                <div className="left">
                    <FontAwesomeIcon icon={ faTruck } />&nbsp; {car.code}<br/>
                    <span>{car.description}</span>
                </div>
                <div className="right">
                    { shift.crew.map( member => {
                        const data = this.getPositionData(member);
                        return <div key={data.text}>
                            { data.text } &nbsp;
                            { data.icon||'' }
                        </div>;
                    }) }
                </div>
            </ShiftBoxBody>
            <Spoiler noTopBorder={true} btnStyle={{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px'
            }}>
                {missionItems}
                <br/>
                <Button className="fullwidth" onClick={ ()=>{ this.handleAddMission(shift.id) } } >
                    <FontAwesomeIcon icon={ faPlusCircle } /> &nbsp; { CurrentLanguage().views.stats.listShifts.btnAddMission}
                </Button>
            </Spoiler>
            
        </ShiftBoxWrapper>;
    }

    handleAddMission = shiftid => {
        this.setState({
            modals: [...this.state.modals, <Redirect to={"/stats/add-mission/"+shiftid} key={Date.now()} />]
        });
    };

    handleRefresh = (force = false) => {
        this.setState({
            modals: [],
            alerts: [],
            shifts: [],
            missions: [],
            keywords: [],
            medicalCategories: [],
            cars: [],
            isLoading: true
        });
        ShiftController.getShifts(force)
            .then( shifts => {
                this.setState({ 
                    shifts,
                    isLoading: false
                });
            }).catch( error => {
                this.setState({
                    isLoading: false,
                    alerts: <Alert type="error">
                        {CurrentLanguage().errors.noInternet}
                    </Alert>
                });
            });
        CarController.getCars(force)
            .then( cars => {
                this.setState({cars});
            }).catch( error => {
                this.setState({
                    isLoading: false,
                    alerts: <Alert type="error">
                        {CurrentLanguage().errors.noInternet}
                    </Alert>
                });
            });
        MissionController.getMissions(force)
            .then( missions => {
                this.setState({missions});
            }).catch( error => {
                this.setState({
                    isLoading: false,
                    alerts: <Alert type="error">
                        {CurrentLanguage().errors.noInternet}
                    </Alert>
                });
            });

        KeywordController.getKeywords(force)
            .then( keywords => {
                this.setState({keywords});
            }).catch( error => {
                this.setState({
                    isLoading: false,
                    alerts: <Alert type="error">
                        {CurrentLanguage().errors.noInternet}
                    </Alert>
                });
            });
        MedicalCategoryController.getMedicalCategories(force)
            .then( medicalCategories => {
                this.setState({medicalCategories});
            }).catch( error => {
                this.setState({
                    isLoading: false,
                    alerts: <Alert type="error">
                        {CurrentLanguage().errors.noInternet}
                    </Alert>
                });
            });
        
    }

    getPositionData = crewMember => {
        let icon;
        switch(crewMember.role) {
            // driver
            case 0:
                icon = <FontAwesomeIcon icon={ faTaxi} />;
                break;
            // paramedic 
            case 1:
                icon = <FontAwesomeIcon icon={ faWalking } />;
                break;
            // emergency paramedic
            case 2:
                icon= <FontAwesomeIcon icon={ faRunning} />;
                break;
            // nurse
            case 3:
                icon = <FontAwesomeIcon icon={ faUserNurse } />;
                break;
            // doctor
            case 4:
                icon = <FontAwesomeIcon icon={ faUserMd } />;
                break;
            // newbie
            case 5:
                icon = <FontAwesomeIcon icon={ faBaby } />;
                break;
            // visitor
            case 6:
                icon = <FontAwesomeIcon icon={ faBlind } />;
                break;
            // other
            case 7:
                icon = <FontAwesomeIcon icon={ faUserSecret } />;
                break;
            default:
                icon = <FontAwesomeIcon icon={ faUser } />
        }
        return {
            text: crewMember.firstname + ' ' + crewMember.lastname,
            icon
        };
    }

    render() {
        return <View>
            {this.state.modals}
            { (this.state.isLoading && <ContentLoader />) ||<ViewContent>
            {this.state.alerts}
            <ContentTitle>
                {CurrentLanguage().views.stats.listShifts.lblTitle}
            </ContentTitle>

            <Content>
                <Button className="fullwidth" onClick={()=>{this.handleRefresh(true);}}>
                    <FontAwesomeIcon icon={ faSyncAlt } /> &nbsp;{CurrentLanguage().generic.btnRefresh}
                </Button>
                <div style={{overflow: 'auto', overflowX: 'hidden', height: parseInt(window.innerHeight * 0.8)}}>
                <ReactList
                    itemRenderer={this.renderItem}
                    length={this.state.shifts.length}
                    type='uniform'
                />
                </div>
            </Content>

            </ViewContent> }
        </View>;
    }
}