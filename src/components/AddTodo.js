import { useState, useRef } from 'react';
import './AddTodo.scss';

export default function AddTodo(props) {
	const { isInvalid, handleAddTodo } = props;
	const [ inputValue, setInputValue ] = useState('');
	
	const inputRef = useRef(null);

	return (
		<form onSubmit={handleAddTodo} className="AddTodo form">
			<label htmlFor="add-todo" className="form-label">Add a to-do:</label>
			<div className="form-group">
				<div className="form-wrapper form-wrapper-has-clear">
					<input type="text" id="add-todo" className={`form-control ${isInvalid ? 'is-invalid' : ''}`} autoComplete="off" onChange={e => setInputValue(e.target.value)} value={inputValue} ref={inputRef} />
					{inputValue.trim().length > 0 && (
						<button className="AddTodo-clear" title="Clear" onClick={() => {
							setInputValue('');
							inputRef.current.focus();
						}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#1f1f1f" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224z"/></svg></button>
					)}
				</div>
				<button className="AddTodo-btn btn" title="Add a to-do" type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg></button>
			</div>
			{isInvalid ? <span className="AddTodo-msg">Opps, try adding a to-do</span> : ''}
		</form>
	)
}
