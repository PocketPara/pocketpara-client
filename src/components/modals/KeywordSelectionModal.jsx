/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-11-12 00:46:04
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-12 01:27:09
 * @ Description: Modal for selecting a keyword
 */

import React from 'react';
import KeywordController from '../../controllers/KeywordController';
import Alert from '../Alert';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import Modal from '../Modal';
import ContentLoader from '../Loader';
import { Button, Table } from '../../styles/UI.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import AlarmBadge from '../AlarmBadge';

export default class KeywordSelectionModal extends React.Component {

	state = {
		alerts: [],
		keywords: [],
		currentId: 0,
		showLoader: true,
		isActive: true
	}

	componentDidMount() {
		KeywordController.getKeywords(true)
		.then( keywords => {
			this.setState({
				showLoader: false,
				keywords,
				currentId: (keywords != null) ? keywords[0].id : 0
			});
		}).catch( error => {
			this.setState({
				alerts: <Alert type="error">
					{CurrentLanguage().errors.noInternet}
				</Alert>
			});
		});
		if(this.props.defaultId) {
			this.setState({ currentId: this.props.defaultId });
		}
	}

	handleSave = e => {
		// prevent page reload
		e.preventDefault();
		this.setState({ isActive: false });
		this.props.onChange( this.getCurrentKeyword() );
	}

	getCurrentKeyword = () => {
		for(let keyword of this.state.keywords) {
				if(keyword.id === this.state.currentId) {
						return keyword;
				}
		}
		return { id: -1, name: '-', description: ' ', color: '#000000'};
	}


	handleChange = id => {
		this.setState({ currentId: id });
	}

	getKeywordTable = (keywords) => {
		let rows = [];
		for(let keyword of keywords) {
			rows.push(<tr
				key={keyword.id}
				style={{
					backgroundColor: (keyword.id === this.state.currentId) ? '#dedede' : '#ffffff',
					color: (keyword.id === this.state.currentId) ? window.themeColor : '#232323'
				}}
				onClick={ () => {
					this.handleChange(keyword.id)
				}}
				>
				<td><AlarmBadge code={keyword.name} color={keyword.color} /></td>
				<td>{keyword.description}</td>
			</tr>);
		}

		return <Table className="fullwidth bordered"><tbody>
			{rows}	
		</tbody></Table>;
		
	}

	render() {
		return <Modal style={{display: (this.state.isActive) ? 'block' : 'none'}}>
			{this.state.alerts}
			{ (this.state.showLoader && <ContentLoader />) || <form onSubmit={this.handleSave}>
				<h1>{CurrentLanguage().views.stats.addMission.keywordForm.lblTitle}</h1>
				{ this.getKeywordTable(this.state.keywords) }
				<Button className="large fat fullwidth">
					<FontAwesomeIcon icon={faSave} /> &nbsp; {CurrentLanguage().generic.btnSave }
				</Button>
			</form>}
		</Modal>
	}



}