import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import './TodoItem.scss';

export default function TodoItem(props) {
	const { todo, handleEditTodo, handleTodoStatus, handleDeleteTodo } = props;

	const [dateAdded] = useState(handleDateConversion(todo.dateAdded));
	const [dateCompleted] = useState(todo.dateCompleted && handleDateConversion(todo.dateCompleted));
	const [editMode, setEditMode] = useState(false);

	function handleDateConversion(date) {
		const dateArray = date.split('T')[0].split('-');
		return (`${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`)
	}

	return (
		<li className={`TodoItem ${todo.completed ? 'is-complete' : ''}`}>
			<div className="TodoItem-body">
				{!todo.completed ? (
					<>
						{editMode ? (
							<>
								<input className="form-control" type="text" placeholder={todo.title} onChange={(event) => {
									handleEditTodo(event, todo);
								}} />
								<button className="TodoItem-utils" type="submit" onClick={(event) => {
									setEditMode(false);
								}}>
									Done
								</button>
							</>
						) : (
							<>
								<h3 className="TodoItem-title">
									{todo.title}
									<button className="TodoItem-utils" onClick={() => setEditMode(true)}>
										Edit
									</button>
								</h3>
							</>
						)}
					</>
				) : (
					<>
						<strike className="TodoItem-title">{todo.title}</strike>
						<span className="TodoItem-info">Date completed: {dateCompleted}</span>
					</>
				)}
			</div>

			<nav className="TodoItem-nav">
				<Button onClick={() => handleTodoStatus(todo)} variant={`TodoItem`} title={`Complete todo`} disabled={editMode ? true : false}>
					{!todo.completed ? (
						<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><title>Complete todo</title><path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e3e3e3" viewBox="0 -960 960 960"><title>Uncomplete todo</title><path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/></svg>
					)}
				</Button>
				
				<Button onClick={() => handleDeleteTodo(todo)} variant={`TodoItem`} title={`Delete todo`} disabled={editMode ? true : false}>
					<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
				</Button>
			</nav>
		</li>
	)
}
