import React, { useState } from 'react';
import Button from '../components/Button';
import './TodoItem.scss';

export default function TodoItem(props) {
	const { todo, handleTodoStatus, handleDeleteTodo } = props;

	const [dateAdded] = useState(handleDateConversion(todo.dateAdded));
	const [dateCompleted] = useState(todo.dateCompleted && handleDateConversion(todo.dateCompleted));

	function handleDateConversion(date) {
		const dateArray = date.split('T')[0].split('-');
		return (`${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`)
	}

	return (
		<li className={`TodoItem ${todo.completed ? 'is-completed' : ''}`}>
			<div className="TodoItem-body">
				{!todo.completed ? (
					<>
						<h3 className="TodoItem-title">{todo.title}</h3>
						<span className="TodoItem-info">Date added: {dateAdded}</span>
					</>
				) : (
					<>
						<strike className="TodoItem-title">{todo.title}</strike>
						<span className="TodoItem-info">Date completed: {dateCompleted}</span>
					</>
				)}
			</div>

			<nav className="TodoItem-nav">
				<Button onClick={() => handleTodoStatus(todo)} variant={`TodoItem`} title={`Complete todo`}>
					{!todo.completed ? (
						<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><title>Complete this todo</title><path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
					) : (
						<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><title>Uncomplete this todo</title><path d="M12 20q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q1.725 0 3.3.713 1.575.712 2.7 2.037V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2Q13.625 6 12 6 9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325Q14.75 20 12 20Z"/></svg>
					)}
				</Button>
				
				<Button onClick={() => handleDeleteTodo(todo)} variant={`TodoItem`} title={`Delete todo`}>
					<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
				</Button>
			</nav>
		</li>
	)
}
