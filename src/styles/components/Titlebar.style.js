import styled, { keyframes } from 'styled-components';
import { slideInDown as animLoad } from 'react-animations';

export const TitlebarWrapper = styled.div`
    animation: 0.5s ${keyframes`${animLoad}`};
    color: white;
    font-size: 16pt;
    box-sizing: border-box;
    width: 100vw;
    position: fixed;
    overflow: hidden;
    margin: 0;
    padding: 0.4em 1em;
    height: 50px;
    z-index: 50;
`;
export const TitlebarText = styled.div`
    font-weight: bold;
    float: right;
`;
export const TitlebarIcon = styled.div`
    float: right;
    margin-left: 0.5em;
`;
export const TitlebarOpenNavigationIcon = styled.div`
    float: left;
`;