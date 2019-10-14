import styled, { keyframes } from 'styled-components';
import { slideInUp as animLoad } from 'react-animations';

export const ViewRegisterWrapper = styled.div`
    background-color: var(--var-color-primary);
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
`;

export const ViewRegisterApptitle = styled.div`
    color: white;
    font-weight: bold;
    font-size: 24pt;
    width: 100%;
    padding: 0.5em 0;
    text-align: center;
    animation: 0.5s ${keyframes`${animLoad}`};
`;

export const ViewRegisterAppLogo = styled.img`
    padding: 0 35% 10px 35%;
    width: 100%;
    box-sizing: border-box;
`;

export const ViewRegisterFormTitle = styled.h3`
    color: var(--var-color-primary);
    animation: 0.5s ${keyframes`${animLoad}`};
`;

export const ViewRegisterForm = styled.form`
    background-color: #ffffff;
    padding: 1em;
`;

export const ViewRegisterInput = styled.input`
    animation: 0.5s ${keyframes`${animLoad}`};
`;

export const ViewRegisterCheckboxLabel = styled.label`
    animation: 0.5s ${keyframes`${animLoad}`};
`;

export const ViewRegisterSubmitButton = styled.button`
    animation: 0.5s ${keyframes`${animLoad}`};
    font-size: 14pt;
    border: 3px;
    font-weight: bold;
`;

export const ViewRegisterLoginButton = styled.div`
    text-align: center;
    color: #bababa;
    font-weight: bold;
    animation: 0.5s ${keyframes`${animLoad}`};
`;