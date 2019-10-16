import styled from 'styled-components';

export const ViewCarsOptionRow = styled.td`
    text-align: right;
    font-size: 10pt;
    width: calc(40pt + 15px);

    svg {
        margin-right: 5px;
        float: left;
        opacity: 0.7;
    }

    svg:first-child {
        color: var(--var-color-dark);
        
    }
    svg:nth-child(2) {
        color: var(--var-color-error);
    }
    svg:nth-child(3),svg:nth-child(4) {
        color: var(--var-color-lightGrey);
    }
    svg:nth-child(4) {
        margin-right: 0;
    }
`;