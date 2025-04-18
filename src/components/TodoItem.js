import React, { useEffect, useRef, useState } from 'react';
import TodoItemNav from '../components/TodoItemNav';
import Button from '../components/Button';
import './TodoItem.scss';

export default function TodoItem(props) {
	const { todo, handleEditTodo, handleTodoStatus, handleDeleteTodo } = props;

	const [dateAdded] = useState(handleDateConversion(todo.dateAdded));
	const [dateCompleted] = useState(todo.dateCompleted && handleDateConversion(todo.dateCompleted));
	const [itemText, setItemText] = useState(todo.title);
	const [editMode, setEditMode] = useState(false);
	
	const itemInput = useRef(null);

	useEffect(() => {
		if (editMode && itemInput.current) {
			itemInput.current.focus();
			itemInput.current.select();
		}
	}, [editMode, itemInput]);

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
								<input className="form-control" type="text" ref={itemInput} defaultValue={itemText} onChange={(event) => {
									handleEditTodo(event, todo);
								}} />
								<button className="TodoItem-actions" type="submit" onClick={(event) => {
									setEditMode(false);
								}}>
									Done
								</button>
							</>
						) : (
							<>
								<h3 className="TodoItem-title">
									{todo.title}
									<button className="TodoItem-actions" onClick={() => {
										setEditMode(true);
									}}>
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

			<TodoItemNav todo={todo} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} editMode={editMode} />
		</li>
	)
}
