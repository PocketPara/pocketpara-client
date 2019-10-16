import React from 'react';
import { SpoilerButton, SpoilerBody, SpoilerWrapper } from '../styles/components/Spoiler.style';

export default class Spoiler extends React.Component {

    state = {
        isExpanded: this.props.isExpanded || false,
        currentSymbol: <span>▼</span>
    }

    toggle = () => {
        this.setState({ 
            isExpanded: !this.state.isExpanded,
            currentSymbol: (this.state.isExpanded) ? <span>▼</span> : <span>▲</span>
        });
    }

    render() {
        return <SpoilerWrapper className={(this.props.fullwidth) ? 'fullwidth' : ''}>
            <SpoilerButton 
                isExpanded={this.state.isExpanded}
                onClick={this.toggle} 
                color={this.props.color} >
                {this.state.currentSymbol || 'Toggle'}
            </SpoilerButton>
            { this.state.isExpanded && <SpoilerBody>
                {this.props.children}
            </SpoilerBody> }
        </SpoilerWrapper>
    }
}