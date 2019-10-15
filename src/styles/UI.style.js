import styled from 'styled-components';

// Views
export const View = styled.div`
    margin-top: 50px;
    width: 100vw;
    background-color: #232323;
    min-height: calc(100vh - 50px);
    box-sizing: border-box;
    color: #ffffff;
    position: absolute;
`;

export const ViewContent = styled.div`
    background-color: #ffffff;
    color: #565656;
    padding: 1em 0.75em 0.5em 0.75em;
    margin-bottom: 1em;
`;
export const ContentTitle = styled.div`
    background-color: #ffffff;
    color: #565656;
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
    font-size: 16pt;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
    padding: 0 5px 0.25em 5px;
    margin: 0.1em -5px 0.25em -5px;
`;
export const Content = styled.div`
    padding: 0.5em 0 0.25em 0;
`;

// Tables
export const Table = styled.table`
    background-color: #ffffff;
    border-collapse: collapse;

    td {
        padding: 5px;
    }

    &.fullwidth {
        width: 100%;
        box-sizing: border-box;
    }

    &.outerborder {
        border: 1px solid #f0f0f0;
    }

    &.bordered {
        td {
            border: 1px solid #e0e0e0;
        }
    }

    &.markFirstColumn {
        tr td:first-child{
            background-color: #f0f0f0;
            color: #232323;
            font-weight: bold;
            font-family: 'Raleway', sans-serif;
        }
    }
`;

export const LoaderContainer = styled.div`
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 2em 0;
`;