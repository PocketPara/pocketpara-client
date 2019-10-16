import styled from 'styled-components';

export const SpoilerWrapper = styled.div`
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: var(--var-border-radius);

    &.fullwidth {
        width: 100%;
    }
`;
export const SpoilerButton = styled.div`
    background-color: ${ props => props.color ||'#dadada' };
    color: #898989;
    padding: 2px;
    text-align: center;
    border-radius: var(--var-border-radius);
    border-bottom-left-radius: ${props => props.isExpanded ? '0' : 'var(--var-border-radius)'};
    border-bottom-right-radius: ${props => props.isExpanded ? '0' : 'var(--var-border-radius)'};
    font-weight: bold;
    font-size: 10pt;
`;
export const SpoilerBody = styled.div`
    border: 2px solid #dadada;
    border-top: none;
    padding: 5px;
    border-radius: var(--var-border-radius);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;