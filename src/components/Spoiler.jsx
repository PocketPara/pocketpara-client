import React from 'react';
import { SpoilerButton, SpoilerBody, SpoilerWrapper } from '../styles/components/Spoiler.style';

export default class Spoiler extends React.Component {

    state = {
        isExpanded: (this.props.isExpanded != null) ? this.props.isExpanded : false,
        currentSymbol: (this.props.isExpanded === true) ? <span>▲</span> : <span>▼</span>
    }

    toggle = () => {
        this.setState({ 
            isExpanded: !this.state.isExpanded,
            currentSymbol: (this.state.isExpanded) ? <span>▼</span> : <span>▲</span>
        });
    }

    render() {
        return <SpoilerWrapper className={(this.props.fullwidth) ? 'fullwidth' : ''}>
            { this.state.isExpanded && <SpoilerBody noTopBorder={this.props.noTopBorder}>
                {this.props.children}
            </SpoilerBody> }
            <SpoilerButton 
                style={this.props.btnStyle||{}}
                isExpanded={this.state.isExpanded}
                onClick={this.toggle} 
                color={this.props.color} >
                {this.state.currentSymbol || 'Toggle'}
            </SpoilerButton>
        </SpoilerWrapper>
    }
}