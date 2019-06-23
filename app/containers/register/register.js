import React, { PureComponent } from 'react';
import { Input } from 'components/common';

import './register.css';
import { Card, Icon, Modal } from 'components';
import { UserService } from 'services';
import LoaderHOC from 'hoc/loader';
import { Link } from 'react-router-dom';

class Register extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            error: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const { email, password } = this.state;
        this.setState({
            isLoading: true,
        });
        UserService.register({
            data: {
                email,
                password,
            },
        }).then(() => {
            this.setState({
                success: 'Successfully registered',
            });
        }).catch(error => {
            this.setState({
                error: error.response.data.error,
            });
        }).finally(() => {
            this.setState({
                isLoading: false,
            });
        });
    }

    render() {
        return (
            <LoaderHOC isLoading={this.state.isLoading}>
                <div className="register-container">
                    {this.state.error && (<Modal onClose={() => { this.setState({ error: null }); }}><div className="danger">{this.state.error}</div></Modal>)}
                    {this.state.success && (<Modal onClose={() => { this.setState({ success: null }); }}><div className="success">{this.state.success}</div></Modal>)}
                    <Card className="register-content">
                        <h1 className="text-center">Register</h1>
                        <form className="auth-form" onSubmit={this.handleSubmit} autoComplete="off">
                            <Input
                                leftItem={<Icon name="faUser" />}
                                type="text"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.trim() })}
                            />
                            <Input
                                leftItem={<Icon name="faKey" />}
                                type="password"
                                className="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.trim() })}
                            />
                            <button type="submit" className="button button-primary">Register</button>
                            <div className="text-right">
                                <span>Or you can </span>
                                <Link to="/login">login</Link>
                                <span> in our system</span>
                            </div>
                        </form>
                    </Card>
                </div>
            </LoaderHOC>
        );
    }
}

export default Register;
