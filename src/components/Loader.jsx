import React from 'react';
import Loader from 'react-loader-spinner';
import { LoaderContainer } from '../styles/UI.style';

export default class ContentLoader extends React.Component {
    render() {
        return <LoaderContainer><Loader
            type="BallTriangle"
            color={window.themeColor || "#4285f4"}
            height={100}
            width={100}
        /></LoaderContainer>;
    }
}