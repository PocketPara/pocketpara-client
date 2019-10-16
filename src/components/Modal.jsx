/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-16 20:33:12
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 21:38:11
 * @ Description: A modal element that can be displayed everywhere
 */

import React from 'react';
import { ModalBackground, ModalWrapper, ModalQuitButton } from '../styles/components/Modal.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Modal extends React.Component {

    state = {
        show: (this.props.show != null) ? this.props.show : true
    }

    dismiss = () => {
        this.setState({show:false});
    }

    render() {
        return (this.state.show && <div>
            <ModalBackground onClick={this.dismiss} />
            <ModalQuitButton onClick={this.dismiss}>
                <FontAwesomeIcon icon={faTimes} />
            </ModalQuitButton>
            <ModalWrapper>
                {this.props.children}
            </ModalWrapper>
        </div>) || [];
    }
}