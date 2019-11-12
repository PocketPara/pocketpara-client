/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-11-10 23:04:53
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-11 23:55:45
 * @ Description:  Main controller for manageing the current user's Tags (events)
 */
import Axios from "axios";

export default class TagController {

	static ExchangeErrors = {
			REQUEST_ERROR: 0,
			SERVER_ERROR: 1
	};
	
	static removeInactives(tags) {
		let newTags = [];
		for(let tag of tags) {
			if(tag.active) {
				newTags.push(tag);
			}
		}
		return newTags;
	}

	/**
	 * Returns all tags
	 * @param {boolean} force Force fetch from web
	 * @param {boolean} showInactives Return inactive tags too
	 */
	static async getTags(force = true, showInactives = false) {
		return new Promise( (resolve, reject) => {

			if(force) {
				Axios.get('/event')
					.then( response => {
						if(response.data.status === 'SUCCESS') {
							localStorage.setItem('pp_cache_tags', JSON.stringify(response.data.userEvents));
							if(!showInactives) {
								resolve(this.removeInactives(response.data.userEvents));
							} else {
								resolve(response.data.userEvents);
							}
						} else {
							reject(response.data.status);
						}
						
					}).catch( error => {
						reject(error);
					});
					
			} else {
				if(localStorage.getItem('pp_cache_tags') != null) {
					const cacheTags = JSON.parse(localStorage.getItem('pp_cache_tags'));
					if(!showInactives) {
						resolve(this.removeInactives(cacheTags));
					} else {
						resolve(this.getTags(true, showInactives));
					}
				}
			}

		});
	}

	/**
	 * Returns a tag
	 * 
	 * @param {number} id The id of the tag
	 * @param {boolean} force Force fetch from web
	 */
	static async getTag(id, force = false) {
		return new Promise((resolve, reject) => {
			this.getTags(force, true)
				.then( tags => {
					for(let tag of tags) {
						if(tag.id === id) {
							resolve(tag);
						}
					}
					reject(null);
				}).catch( error => {
					reject(error);
				});
		});
	}

	/**
	 * Swaps the order of two tags
	 * @param {number} tag1Id An id of a tag
	 * @param {number} tag2Id An id of a tag
	 */
	static async exchangeOrder(tag1Id, tag2Id) {
		return new Promise( (resolve, reject) => {
			let tag1, tag2;
			for(let tag of JSON.parse(localStorage.getItem('pp_cache_tags'))) {
				if(tag.id === tag1Id) {
					tag1 = tag;
				} else if(tag.id === tag2Id) {
					tag2 = tag;
				}
			}

			if( !(tag1 && tag2)) {
				reject(this.ExchangeErrors.SERVER_ERROR);
			}

			Axios.patch('/event/' + tag1.id, {
				order: tag2.order
			}).then( () => {
				Axios.patch('/event/' + tag2.id, {
					order: tag1.order
				}).then( () => {
					resolve();
				}).catch( error => {
					console.error(error,0)
					reject(this.ExchangeErrors.REQUEST_ERROR);
				});
			}).catch( error => {
					reject(this.ExchangeErrors.REQUEST_ERROR);
			});
		});
	}

	/**
	 * Deletes/deactivates a user tag
	 *  
	 * @param {number} tagId The id of the tag(user-event)
	 */
	static async delete(tagId) {
		return new Promise( (resolve, reject) => {
			Axios.delete('/event/' + tagId)
				.then( response => {
					if(response.data.status === 'SUCCESS') {
						resolve(tagId);
					} else {
						reject();
					}
				}).catch(error => {
					reject();
				})
		});
	}

}
