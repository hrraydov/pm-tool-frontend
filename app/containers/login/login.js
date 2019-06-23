import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'components/common';
import { login } from 'actions/user';

import './login.css';
import { Card, Icon, Modal } from 'components';
import { UserService } from 'services';
import LoaderHOC from 'hoc/loader';
import { Link } from 'react-router-dom';

class Login extends PureComponent {
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
        UserService.login({
            data: {
                email,
                password,
            },
        }).then(token => {
            localStorage.setItem('token', token);
            window.location.replace('/');
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
                <div className="login-container">
                    {this.state.error && (<Modal onClose={() => { this.setState({ error: null }); }}><div className="danger">{this.state.error}</div></Modal>)}
                    <Card className="login-content">
                        <h1 className="text-center">Login</h1>
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
                            <button type="submit" className="button button-primary">Login</button>
                            <div className="text-right">
                                <span>Or you can </span>
                                <Link to="/register">register</Link>
                                <span> in our system</span>
                            </div>
                        </form>
                    </Card>
                </div>
            </LoaderHOC>
        );
    }
}

export default connect(
    state => ({
        isLoggingIn: state.user.isLoggingIn,
    }),
    dispatch => ({
        actions: bindActionCreators({ login }, dispatch),
    }),
)(Login);
