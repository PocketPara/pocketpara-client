import styled, { keyframes } from 'styled-components';
import { slideInLeft as animLoad } from 'react-animations';

export const NavigationWrapper = styled.div`
    animation: 0.5s ${keyframes`${animLoad}`};
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    background-color: #232323;
    width: 70vw;
    padding: 0;
    -webkit-box-shadow:0 0 20px rgba(0,0,0,0.3);
    -moz-box-shadow:0 0 20px rgba(0,0,0,0.3);
    box-shadow:0 0 20px rgba(0,0,0,0.3);
`;

export const NavigationShadowToggleBox = styled.div`
    position: fixed;
    height: 100%;
    min-height: 100vh;
    background-color: rgba(0,0,0,0.2);
    width: 100vw;
    z-index: 99;
`;

export const NavigationLogo = styled.div`
    width: 70vw;
    height: 50px;
    background-color: var(--var-color-primary);
    padding: 5px;
    box-sizing: border-box;

    img {
        float: left;
        height: 40px;
        padding: 0;
        margin: 0;
    }
    div {
        float: left;
        padding: 0;
        font-weight: bold;
        font-size: 16pt;
        margin: 0 0 0 0.25em;
        color: white;
        line-height: 40px;
    }
`;


// Options
export const NavigationOptionList = styled.div`
    font-size: 12pt;
    padding: 0;
`;

export const NavigationGroup = styled.div`
    width: 100%;
    box-sizing: border-box;
    color: white;
    background-color: ${ props => props.bgColor || '#000000'};
    padding: 0.5em 1em;

    div {
        float: left;
    }

    span {
        display: block;
        margin-left: 2.25em;
    }
`;
export const NavigationItem = styled.div`
    width: 100%;
    box-sizing: border-box;
    color: white;
    background-color: ${ props => props.bgColor || '#000000'};
    padding: 0.25em 1em;

    div {
        float: left;
    }

    span {
        display: block;
        margin-left: 2.25em;
    }
`;