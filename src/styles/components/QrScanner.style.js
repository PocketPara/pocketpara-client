import styled from 'styled-components';

export const QrScannerBackground = styled.div`
    z-index: 500;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.2);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
`;
export const QrScannerWrapper = styled.div`
    position: fixed;
    background-color: #232323;
    color: #efefef;
    z-index: 501;
    top: 3em;
    left: 5vw;
    right: 5vw;
    width: 90vw;
    height: calc(100vh - 6em);
    padding: 1em;
    box-sizing: border-box;

    video {
        background-color: #e6e6e6;
        width: 100%;
        min-height: 250px;
        box-sizing: border-box;
        margin-top: 1em;
    }
`;
export const QrScannerHeader = styled.div`
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
    font-size: 14pt;
`;