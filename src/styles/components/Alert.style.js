import styled from 'styled-components';

export const AlertWrapper = styled.div`

    background-color: ${ props => 
        (props.type === 'info' && '#4285f4') ||
        (props.type === 'error' && '#e4161b') ||
        (props.type === 'warning' && '#ffc40c') ||
        (props.type === 'success' && '#00d274') ||
        '#ffffff'};
    
    color: ${ props => 
        (props.type === 'info' && '#f0f6ff') ||
        (props.type === 'error' && '#f0f6ff') ||
        (props.type === 'warning' && '#734700') ||
        (props.type === 'success' && '#f0f6ff') ||
        '#ffffff'}; 

    padding: 0.5em;
    border-radius: var(--var-border-radius);
    margin: 0.5em 0;

`;