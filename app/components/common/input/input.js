import React from 'react';
import { Icon } from 'components/common/index';
import './input.css';

export const validate = (value, validators) => {
    let result = true;
    validators.forEach(validator => {
        if (!validator(value)) {
            result = false;
        }
    });
    return result;
};

export const Validators = {
    required: value => value !== '',
};

class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasSuccess: false,
            hasError: false,
            changed: false,
            hasFocus: false,
        };
    }

    onChange = e => {
        this.props.onChange(e.target.value);
        if (this.state.changed) {
            this.validate(e.target.value);
        }
    };

    validate = value => {
        if (!this.props.validators) {
            return true;
        }
        if (!validate(value, this.props.validators)) {
            this.setState({
                hasError: true,
                hasSuccess: false,
            });
        } else {
            this.setState({
                hasError: false,
                hasSuccess: true,
            });
        }
    };

    onBlur = e => {
        const { value } = e.target;
        if (!this.state.changed) {
            this.setState({
                changed: true,
            });
        }
        this.setState({
            hasFocus: false,
        });
        this.validate(value);
    };

    onFocus = () => {
        this.setState({
            hasFocus: true,
        });
    };

    render() {
        let classNames = '';
        this.state.hasFocus && (classNames += ' has-focus');
        this.state.hasError && (classNames += ' has-error');
        this.state.hasSuccess && (classNames += ' has-success');

        const {
            validators, leftItem, type, className, placeholder, value, onChange, onBlur, onFocus, rightItem, showStateIcon, ...props
        } = this.props;

        return (
            <div
                className={`input-wrapper${classNames}`}
            >
                <div className="left-item-wrapper">{leftItem}</div>
                <input
                    {...props}
                    type={type}
                    className={`input ${className || ''}`}
                    placeholder={placeholder}
                    defaultValue={value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                />
                {showStateIcon && this.state.hasSuccess && <Icon className="right-icon" name="faCheck" />}
                {showStateIcon && this.state.hasError && <Icon className="right-icon" name="faTimes" />}
                <div className="right-item-wrapper">{rightItem}</div>
            </div>
        );
    }
}

export default Input;
