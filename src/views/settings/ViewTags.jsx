/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-11-10 22:55:53
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-11 20:06:48
 * @ Description: View for managing Tags
 */

import React from 'react';
import { View, ViewContent, ContentTitle, Content, Button, Table } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import { faSyncAlt, faPlusCircle, faQrcode, faTrash, faPen, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagController from '../../controllers/TagController';
import Alert from '../../components/Alert';
import { ViewCarsOptionRow } from '../../styles/views/ViewCars.style';
import AddTagModal from '../../components/modals/AddTagModal';

export default class ViewTags extends React.Component {

	state = {
		isLoading: false,
		tags: [],
		modal: [],
		alerts: []
	}

	componentDidMount() {
		this.fetchData();
	}

	onRefresh = () => {
		this.setState({
			isLoading: true,
			alerts: [],
			modal: [],
			tags: []
		});
		this.fetchData(true);
	}

	/**
	 * 
	 * @param {boolean} forceRefresh Force fetch from web
	 */
	fetchData = (forceRefresh) => {
		TagController.getTags(forceRefresh)
			.then( tags => {
				this.setState({
					isLoading: false,
					tags
				});
			}).catch( error => {
				this.setState({
					isLoading: true,
					modal: [
						<Alert type="error" key={0}>
							{ CurrentLanguage().errors.noInternet}
						</Alert>
					]
				});
			});
	}

	handleExchangeTags = (index1, index2) => {
		TagController.exchangeOrder(
			this.state.tags[index1].id,
			this.state.tags[index2].id
		).then( ()=> {
			this.setState({
				tags: []
			});
			// force refresh
			this.fetchData(true);
		}).catch( error => {
			if(error === TagController.ExchangeErrors.SERVER_ERROR) {
				this.setState({
					alerts: [<Alert type="error" key={0}>
						{ CurrentLanguage().errors.serverError}
					</Alert>]
				});
			} else {
				this.setState({
					alerts: [<Alert type="error" key={0}>
						{ CurrentLanguage().errors.noInternet}
					</Alert>]
				});
			}
		});
	}

	handleMoveUp = index => {
		if(index > 0) {
			this.handleExchangeTags(index, index -  1);
		}
	}
	handleMoveDown = index => {
		if(index < (this.state.tags.length - 1)) {
			this.handleExchangeTags(index, index + 1);
		}
	}

	/**
	 * Returns a table as JSX
	 */
	getTagTable = (tags) => {
		// return message if there are none
		if(tags.length === 0) {
			return <i
				style={{
					fontSize:'9pt',
					textAlign: 'center',
					display: 'block',
					width: '100%',
					color: '#bababa'
				}}>
				<br/>{CurrentLanguage().views.settings.tags.onHasNoTags}
				</i>;
		}

		let tableRows = [];
		for(let i = 0; i < tags.length; i++) {
			const currentTag = tags[i];
			tableRows.push(<tr key={i}>
				<td>{currentTag.name}</td>
				<ViewCarsOptionRow>
						<FontAwesomeIcon icon={ faPen } onClick={()=>{this.handleEditClick(currentTag.id)}}/>
						<FontAwesomeIcon icon={ faTrash } onClick={()=>{this.handleDeleteClick(currentTag.id)}} />
						&nbsp;
						{ (i > 0) && <FontAwesomeIcon icon={ faArrowUp } onClick={()=>{this.handleMoveUp(i)}}/> }
						{ (i !== (tags.length - 1)) && <FontAwesomeIcon icon={ faArrowDown } onClick={()=>{this.handleMoveDown(i)}}/> }
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

	handleAddClick = () => {
		this.setState({
			modal: [...this.state.modal, this.getAddModal(this.onRefresh)]
		});
	}

	getAddModal = callback => {
		return <AddTagModal key={this.state.modal.length} onDismiss={callback} />;
	}

	render() {
		return <View>
			{ this.state.modal }
			{ (this.state.isLoading && <ContentLoader /> ) || <ViewContent>

				<ContentTitle>
					{ CurrentLanguage().views.settings.tags.txtTitle}
				</ContentTitle>

				<Content>
					<Button className="fullwidth fat" onClick={ this.onRefresh }>
							<FontAwesomeIcon icon={ faSyncAlt } /> { CurrentLanguage().generic.btnRefresh }
					</Button>
					{ this.state.alerts }

					{ this.getTagTable(this.state.tags) }

					<Button className="halfwidth primary" color="" onClick={this.handleAddClick}>
							<FontAwesomeIcon icon={ faPlusCircle } /> <br/>
							{ CurrentLanguage().views.settings.tags.txtAddNew }
					</Button>
					<Button className="halfwidth dark" color="" onClick={ ()=>{this.setState({scannerActive: true})}}>
							<FontAwesomeIcon icon={ faQrcode } /> <br/>
							{ CurrentLanguage().views.settings.tags.txtImport }
					</Button>

				</Content>

			</ViewContent>}

		</View>;
	}
}