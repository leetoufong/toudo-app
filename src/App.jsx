import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodosList from './components/TodosList';
import CompletedList from './components/CompletedList';
import './App.scss';

export default function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			const data = await localStorage.getItem('todoList');

			if (!data) {
				//if data doesn't exist, create a object and set it on localStorage
				localStorage.setItem('todoList', JSON.stringify([]))
			} else {
				//data stored returns as string, parse it to become readable
				const newTodos = JSON.parse(data);
				//set our state 
				setTodos(newTodos);
			}

			//turn off loader
			setIsLoading(false);
		}

		fetchData();
	}, []);

	function handleEditTodo(event, item) {
		const newTodos = [...todos];
		const targetItem = newTodos.filter((todo) => todo === item);

		targetItem[0].title = event.target.value
		setTodos(newTodos);
		localStorage.setItem('todoList', JSON.stringify(newTodos));
	}

	function handleTodoStatus(item) {
		const newTodos = [...todos];

		if (!item.completed) {
			item.completed = true;
			item.dateCompleted = new Date().toISOString();
		} else {
			item.completed = false;
			item.dateCompleted = null;
		}

		setTodos(newTodos);
		localStorage.setItem('todoList', JSON.stringify(newTodos));
	}

	function handleDeleteTodo(item) {
		const newTodos = [...todos];

		newTodos.forEach((todo, i) => {
			if (todo.id === item.id) {
				newTodos.splice(i, 1);
			}
		})

		setTodos(newTodos);
		localStorage.setItem('todoList', JSON.stringify(newTodos))
	}

	return (
		<>
			<div className="App">
				{isLoading ? (
					<h1 className="App-subtitle">Toudo App</h1>
				) : (
					<>
						<Header todos={todos} setTodos={setTodos} />

						<main role="main">
							{/* Current Todos */}
							{todos.filter((todo) => !todo.completed).length < 1 ? (
								<p>Currently no to-do items. You must not be busy.</p>
							) : (
								<TodosList todos={todos} handleEditTodo={handleEditTodo} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} />
							)}

							{/* Completed Todos */}
							{todos.filter((todo) => todo.completed).length < 1 ? (
								''
							) : (
								<CompletedList todos={todos} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} />
							)}
						</main>
					</>
				)}
			</div>

			<Footer />
		</>
	)
}
