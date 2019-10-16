import React from 'react';
import { QrScannerWrapper, QrScannerHeader, QrScannerBackground } from '../styles/components/QrScanner.style';
import CurrentLanguage from '../helpers/CurrentLanguage';
import QrReader from 'react-qr-reader';

export default class QrScannerComponent extends React.Component {

    state = {
        active: this.props.active,
        result: "nothing",
        error: ""
    }

    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            });
        }
    }
    handleError = error => {
        this.setState({error:error.toString()})
        console.error(error)
    }

    render() {
        return <div>{ (this.props.active && <div><QrScannerBackground></QrScannerBackground>
        <QrScannerWrapper>
            <QrScannerHeader>{CurrentLanguage().modules.qrScanner.txtTitle}</QrScannerHeader>
            <br/>
            <QrReader 
                delay={250}
                onError={this.handleError}
                onScan={this.handleScan}
                facingMode={"environment"}
                style={{width: '100%'}}
            />
            <p>{this.state.result}{this.state.error}</p>
        </QrScannerWrapper></div>) || [] }</div>;
    }
};