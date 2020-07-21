import React from 'react';

const Input = ( { name, value, onChange, error, type, option, ...rest } ) => {

	console.log("type", type);

	if ( type == 'select' ) {
		console.log( 'options', option );
		return (
			<div class="form-group">
				<label htmFor={name}>{name}</label>
				<select
					{...rest}
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					className="form-control">
					<option>--select--</option>
					{ option.map( opt => (
						<option value={opt._id}>{opt.name}</option>
					) ) };
				</select>
				{ error &&  <div class="alert alert-danger">{error}</div>}
			</div>
		);
	} else {
		return (
			<div className="form-group">
				<label htmFor={name}>{name}</label>
				<input
					{...rest}
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					className="form-control" />
				{ error &&  <div class="alert alert-danger">{error}</div>}
			</div>
		);
	}
};

export default Input;
