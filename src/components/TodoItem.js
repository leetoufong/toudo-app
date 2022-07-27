import React from 'react';
import Button from '../components/Button';
import './TodoItem.scss';

export default function TodoItem(props) {
	const { todo, handleTodoStatus, handleDeleteTodo } = props;

	return (
		<li className={`TodoItem ${todo.completed ? 'is-completed' : ''}`}>
			{!todo.completed ? (
				<span className="TodoItem-title">{todo.title}</span>
			) : (
				<strike className="TodoItem-title">{todo.title}</strike>
			)}
			<nav className="TodoItem-nav">
				<Button onClick={() => handleTodoStatus(todo)} variant={`TodoItem`} title={`Complete todo`}><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg></Button>
				<Button onClick={() => handleDeleteTodo(todo)} variant={`TodoItem`} title={`Delete todo`}><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /><path d="M0 0h24v24H0z" fill="none" /></svg></Button>
			</nav>
		</li>
	)
}
