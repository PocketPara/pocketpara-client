import styled, { keyframes } from 'styled-components';
import { slideInUp as animLoad } from 'react-animations';

export const ViewLoginWrapper = styled.div`
    background-color: var(--var-color-primary);
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
    padding: 0;
    color: #ffffff;
    overflow: hidden;
    font-family: 'Open Sans', sans-serif;
`;
export const ViewLoginLogo = styled.img`
    width: 50%;
    margin: 10% 25% 7.5% 25%;
    animation: 0.5s ${keyframes`${animLoad}`};
`;
export const ViewLoginApptitle = styled.div`
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 26pt;
    margin-bottom: 1em;
    animation: 0.5s ${keyframes`${animLoad}`};
`;

export const ViewLoginForm = styled.form`
    background-color: #ffffff;
    padding: 2em 1em;
`;

export const ViewLoginInput = styled.input`
    animation: 0.5s ${keyframes`${animLoad}`};
    font-size: 14pt;
`;

export const ViewLoginButton = styled.button`
    font-weight: bold;
    animation: 0.5s ${keyframes`${animLoad}`};
    font-size: 14pt;
    border: 3px;
`;

export const ViewLoginSignupButton = styled.div`
    text-align: center;
    color: #bababa;
    font-weight: bold;
`;