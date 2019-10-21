import styled from 'styled-components';

export const AlarmBadgeWrapper = styled.div`
    color: ${props => props.fg || '#ffffff'};
    background-color: ${props => props.bg || '#232323'};
    padding: 3px 6px;
    font-size: 8pt;
    border-radius: var(--var-border-radius);
    width: auto;
    display:inline-block;
    font-weight: bold;
    text-align: center;
`;