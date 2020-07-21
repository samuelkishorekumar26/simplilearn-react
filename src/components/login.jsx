import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import {auth} from './../services/authService';
import {Link} from 'react-router-dom';
import Register from './register';

class Login extends Form {
	state = {
		account: { username: '', password: '' },
		error: {}
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	}

	doSubmit = async () => {
		//await auth(this.state.account);
		try{
			const {data: jwt} = await auth(this.state.account);
			localStorage.setItem('jwt', jwt);
			this.props.history.push('/home');
		} catch(ex) {
			const error = {...this.state.error};
			if( ex.response && ex.response.status == 400 ) {
				error.username = ex.response.data;
			}
			this.setState({error});
		}
		console.log("sam");
	};

	username = React.createRef();
	password = React.createRef();


	render() {
		return (
			<div>
				<h1>Login Form</h1>
				<div class="container">
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("username", "text")}
						{this.renderInput("password", "password")}
						{this.renderButton('Submit')}
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
