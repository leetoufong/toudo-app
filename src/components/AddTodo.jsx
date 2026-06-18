import { useState, useRef } from 'react';
import './AddTodo.scss';

export default function AddTodo(props) {
	const { todos, setTodos } = props;
	const [ inputValue, setInputValue ] = useState('');
	const [ isInvalid, setIsInvalid ] = useState(false);
	
	const inputRef = useRef(null);

	function handleAddTodo(event) {
		event.preventDefault();
		const input = document.getElementById('add-todo');
		const newTodos = [...todos];

		//validate text input
		if (input.value.length > 0) {
			
			if (isInvalid) {
				input.classList.remove('is-invalid');
				setIsInvalid(false);
			}

			newTodos.unshift({
				id: Date.now(),
				title: input.value,
				completed: false,
				dateAdded: (new Date()).toISOString(),
				dateCompleted: null
			});

			localStorage.setItem('todoList', JSON.stringify(newTodos));
			setTodos(newTodos);
			setInputValue('');
		} else {
			input.classList.add('is-invalid');
			setIsInvalid(true);
		}
	}

	return (
		<form onSubmit={handleAddTodo} className="AddTodo form">
			<label htmlFor="add-todo" className="form-label">Add a to-do:</label>
			<div className="form-group">
				<div className="form-wrapper form-wrapper-has-clear">
					<input type="text" id="add-todo" className={`form-control ${isInvalid ? 'is-invalid' : ''}`} autoComplete="off" onChange={e => setInputValue(e.target.value)} value={inputValue} ref={inputRef} />
					{inputValue.trim().length > 0 && (
						<button className="AddTodo-clear" title="Clear" type="button" onClick={() => {
							setInputValue('');
							inputRef.current.focus();
						}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#1f1f1f" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224z"/></svg></button>
					)}
				</div>
				<button className="AddTodo-btn btn" type="submit" title="Add a to-do"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg></button>
			</div>
			{isInvalid ? <span className="AddTodo-msg">Opps, try adding a to-do</span> : ''}
		</form>
	)
}
