import React from 'react';
import { AlarmBadgeWrapper } from '../styles/components/AlarmBadge.style';
import FontColor from '../helpers/FontColor';

export default class AlarmBadge extends React.Component {
    render() {
        return <AlarmBadgeWrapper bg={this.props.color} fg={FontColor(this.props.color)}>
            {this.props.code}
        </AlarmBadgeWrapper>;
    }
}