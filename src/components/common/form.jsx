import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
	state = {
		data: {},
		error: {}
	};

	validate = () => {
		const option = {
			abortEarly: false
		};
		const { error } = Joi.validate( this.state.account, this.schema, option );
		console.log(error);

		if ( !error ) return null;
		const errors = {};
		for ( let item of error.details ) {
			errors[item.path[0]] = item.message;
			return errors;
		}

		/*const error = {};
		const { account } = this.state;

		if(account.username === "")
			error.username = "user is required";
		if(account.password === "")
			error.password = "password is required";

		return Object.keys(error).length === 0 ? null : error;*/
	};

	validateProperty = ( { name, value } ) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate( obj, schema );

		return error ? error.details[0].message : null;
	}


	handleSubmit = e => {
		e.preventDefault();
		//const username = e.currentTarget.value;
		//const password = e.currentTarget.value;
		const error = this.validate();
		this.setState({error: error || {}});
		console.log(error);
		if ( error ) return;

		this.doSubmit();
		console.log("submitted");
		//console.log("username " + username);
		//console.log("password " + password);
	};

	handleChange = ({currentTarget: input}) => {
		const account = {...this.state.account};
		const error = {...this.state.error};
		console.log(input.name);
		const errorMsg = this.validateProperty( input );

		if ( errorMsg ) error[input.name] = errorMsg;
		else delete error[input.name];
		//account.username = e.currentTarget.value;
		//const password = e.currentTarget.value;
		account[input.name] = input.value;
		this.setState({account, error});
	};

	renderButton = (label) => {
		return(
			<button
				disabled={this.validate()}
				className="btn btn-primary" >{label}</button>
		);
	}

	renderInput = (name, type, option ) => {
		return (
			<Input
				name={name}
				value={this.state.account[name]}
				onChange={this.handleChange}
				type={type}
				ref={name}
				error={this.state.error[name]}
				option={option}
			/>
		);
	}
}

export default Form;
