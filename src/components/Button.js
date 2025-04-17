import React from 'react';
import './Button.scss';

export default function Button(props) {
	const { onClick, variant, title, disabled, children } = props;

	return (
		<button onClick={onClick} className={variant ? `${variant}-btn btn` : 'btn'} title={title} disabled={disabled}>
			{children}
		</button>
	)
}
