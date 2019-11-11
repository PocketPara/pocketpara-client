/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-21 22:21:56
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-11 21:01:19
 * @ Description: Modal for adding a crew person
 */

import React from 'react';
import Modal from '../Modal';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import { HBox, InputLabel, Dropdown, Button, Table } from '../../styles/UI.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

export default class CrewPersonAddModal extends React.Component {
    
    state = {
        isActive: true,
        firstname: "",
        lastname: "",
        role: CurrentLanguage().generic.positions[0],

        colleagueList: []
    }

    componentDidMount() {
        Axios.get('/shift/colleagues')
            .then( response => {
                if(response.data.status === 'SUCCESS') {
                    this.setState({ colleagueList: response.data.colleagues });
                }
            }).catch( error => {

            });
    }

    handleSave = e => {
        this.props.onFinish({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            role: this.state.role
        });
        // hide
        this.setState({ isActive: false });
    }
    
    setData = (firstname, lastname) => {
        this.setState({ firstname, lastname });
    }

    getColleagueTable = colleagues => {
        let rows = [];
        for(let colleague of colleagues) {
            rows.push(<tr 
                onClick={()=>{this.setState({firstname: colleague.firstname, lastname: colleague.lastname})}}
                key={colleague.firstname+colleague.lastname}>
                <td>{colleague.firstname}</td>
                <td>{colleague.lastname}</td>
            </tr>);
        }

        return <div style={{
            height: "225px",
            overflowY: "scroll"
        }}><Table className="fullwidth bordered"><tbody>
            {rows}
        </tbody></Table></div>;
    }
    
    render() {
        return <Modal style={{display: (this.state.isActive) ? 'block' : 'none'}}>
            <div>
                <h1>
                    {CurrentLanguage().views.stats.addShift.btnAddOther}
                </h1>
                <HBox wide>
                    <InputLabel>
                         {CurrentLanguage().views.stats.addShift.crewForm.lblMemberRole}
                    </InputLabel>
                    <Dropdown className="fullwidth" value={this.state.role} onChange={e => {
                        this.setState({ role: e.target.value });
                    }}>
                        {CurrentLanguage().generic.positions.map( position => {
                            return <option key={position}>{position}</option>
                        })}
                    </Dropdown>
                </HBox>
                <HBox wide>
                    <InputLabel>
                    {CurrentLanguage().views.stats.addShift.crewForm.lblFirstname}
                    </InputLabel>
                    <input 
                    type="text" 
                    value={this.state.firstname} 
                    className="fullwidth"
                    onChange={e=>{this.setState({firstname:e.target.value})}}
                    required/>

                    <InputLabel>
                    {CurrentLanguage().views.stats.addShift.crewForm.lblLastname}
                    </InputLabel>
                    <input 
                    type="text" 
                    value={this.state.lastname} 
                    className="fullwidth"
                    onChange={e=>{this.setState({lastname:e.target.value})}}
                    />
                </HBox>
                <Button className="fullwidth fat large" type="submit" onClick={this.handleSave}>
                    <FontAwesomeIcon icon={faSave}/> &nbsp;
                    {CurrentLanguage().generic.btnSave}
                </Button>


                <InputLabel>
                {CurrentLanguage().views.stats.addShift.crewForm.lblFind}
                </InputLabel>
                <i style={{
                    fontSize: '9pt',
                    color: '#898989'
                }}>{CurrentLanguage().views.stats.addShift.crewForm.lblFindInfo}</i>
                {this.getColleagueTable(this.state.colleagueList)}
            </div>
        </Modal>;
    }
}