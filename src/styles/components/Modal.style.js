import styled, { keyframes } from 'styled-components';
import { slideInUp as animLoad } from 'react-animations';

export const ModalWrapper = styled.div`
    animation: 0.5s ${keyframes`${animLoad}`};
    position: fixed;
    width: 90vw;
    margin: 5vw;
    background-color: #ffffff;
    border-radius: var(--var-border-radius);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    color: #232323;
    box-sizing: border-box;
    padding: 10px;
    min-height: 30vh;
    z-index: 750;

    h1 {
        display: block;
        width: 100%;
        box-sizing: border-box;
        font-weight: bold;
        font-family: 'Raleway', sans-serif;
        font-size: 12pt;
        border-bottom: 1px solid var(--var-border-color);
        padding-bottom: 0.5em;
    }
`;
export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.2);
`;
export const ModalQuitButton = styled.button`
    position: absolute;
    right: calc(5vw + 10px);
    top: calc(5vw + 10px);
    z-index: 751;
    background-color: transparent;
    font-size: 12pt;
    color: var(--var-color-lightGrey);
    animation: 0.5s ${keyframes`${animLoad}`};
`;