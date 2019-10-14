import React from 'react';
import { AlertWrapper } from '../styles/components/Alert.style';

/**
 * An alert-box that can be displayed everywhere
 * 
 * @param {string} type The type of the alert (`info`,`error`,`warning` or `success`)
 * @param {object} style The styles that should be added to the alert
 */
export default class Alert extends React.Component {
    render() {
        return <AlertWrapper
            type={ this.props.type || 'info' }
            style={ this.props.style || {} }>
            {this.props.children}
        </AlertWrapper>;
    }
}