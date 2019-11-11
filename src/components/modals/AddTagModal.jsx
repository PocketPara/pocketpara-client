import React from 'react';
import Modal from '../Modal';
import ContentLoader from '../Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';
import { InputLabel, TextInput, Button } from '../../styles/UI.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import Alert from '../Alert';

export default class AddTagModal extends React.Component {
	state = {
		name: "",
		showLoader: false,
		alerts: []
	}

	handleSubmit = e => {
		// prevent page reload
		e.preventDefault();
		this.setState({ showLoader: true });

		Axios.post('/event/add', {
			name: this.state.name,
			order: parseInt(Date.now()/1000)
		}).then( response => {
			if(response.data.status === 'SUCCESS') {
				const { id, name, order } = response.data.userEvent;
				this.setState({
					showLoader: false,
					name: "",
					alerts: [<Alert type="success" key={0}>
							{ CurrentLanguage().views.settings.tags.addForm.onSuccess }
					</Alert>]
				});
				// add new tag to cache
				if(localStorage.getItem('pp_cache_tags')) {
					let tags = JSON.parse(localStorage.getItem('pp_cache_tags'));
					tags.push({ id, name, order });
					localStorage.setItem('pp_cache_tags', JSON.stringify(tags));
				}
				if(this.props.onDismiss) {
					this.props.onDismiss();
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

	render() {
		return <Modal>
			{ (this.state.showLoader && <ContentLoader />) || <form onSubmit={this.handleSubmit}>
				<h1>{ CurrentLanguage().views.settings.tags.addForm.lblTitle }</h1>
				{ this.state.alerts }
				<InputLabel>
					{ CurrentLanguage().views.settings.tags.addForm.lblName }
				</InputLabel>
				<TextInput
					type="text"
					value={this.state.name}
					onChange={e => { this.setState({name: e.target.value })}}
					className="fullwidth"
					placeholder={ CurrentLanguage().views.settings.tags.addForm.lblNameDefault }
					required />

				<br/><br/>
				<Button className="fullwidth large fat">
					<FontAwesomeIcon icon={ faSave } /> &nbsp;
					{ CurrentLanguage().generic.btnSave }
				</Button>
			</form> }
		</Modal>
	}
	
}