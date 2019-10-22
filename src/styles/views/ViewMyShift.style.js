import styled from 'styled-components';

export const ShiftBoxWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-top-left-radius: var(--var-border-radius);
    border-top-right-radius: var(--var-border-radius);
    background-color: #ffffff;
    color: white;
    font-size: 10pt;
    margin-bottom: 1em;
`;

export const ShiftBoxHeader = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: ${props => props.color || '#4285f4'};
    border-top-left-radius: var(--var-border-radius);
    border-top-right-radius: var(--var-border-radius);
    color: white;
    margin-bottom: 0;
    padding: 3px 10px;
    font-weight: bold;
`;

export const ShiftBoxBody = styled.div`
    margin: 0;
    background-color: ${props => props.color || '#3a6cbe'};
    padding: 5px 10px;
    box-sizing: border-box;

    span {
        color: rgba(255,255,255,0.8);
    }

    .left {
        width: 50%;
        display: inline-block;
        text-align: left;
        vertical-align: middle;
    }
    .right {
        width: 50%;
        text-align: right;
        display: inline-block;
        vertical-align: middle;
    }
    .wide {
        width: 100%;
    }
`;