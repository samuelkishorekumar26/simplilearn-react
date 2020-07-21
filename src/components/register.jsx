import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as user from './../services/user';

class Register extends Form {
	state = {
		account: { username: '', password: '', name: '' },
		error: {}
	};

	schema = {
		username: Joi.string().required().email().label("Username"),
		password: Joi.string().required().min(6).label("Password"),
		name: Joi.string().required().label("Name"),
	}

	username = React.createRef();
	password = React.createRef();

	doSubmit = async () => {
		try{
			const response = await user.register(this.state.account);
			localStorage.setItem('jwt', response.headers['x-auth-token']);
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


	render() {
		return (
			<div>
				<h1>Register Form</h1>
				<div class="container">
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("username", "text")}
						{this.renderInput("password", "password")}
						{this.renderInput("name", "text")}
						{this.renderButton('Submit')}
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
