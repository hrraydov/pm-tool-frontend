import React from 'react';

import './modal.css';

class Modal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onOverlayContentClick = this.onOverlayContentClick.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.listenKeyboard = this.listenKeyboard.bind(this);
    }

    componentDidMount() {
        if (this.props.onClose) {
            window.addEventListener('keydown', this.listenKeyboard, true);
        }
    }

    componentWillUnmount() {
        if (this.props.onClose) {
            window.removeEventListener('keydown', this.listenKeyboard, true);
        }
    }

    onOverlayClick() {
        this.props.onClose();
    }

    onOverlayContentClick(event) {
        event.stopPropagation();
    }

    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div className="modal-wrapper">
                <div className="overlay" onClick={this.onOverlayClick}>
                    <div
                        className="modal"
                        onClick={this.onOverlayContentClick}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
