import React, { useState, useEffect } from 'react';
import './App.scss';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      const todoList = [
        {
          title: 'Learn React', completed: false
        },
        {
          title: 'Read a book', completed: false
        },
        {
          title: 'Take out trash', completed: true
        }
      ];
      const API = todoList;
      const response = await API;
      const newTodos = response.filter(todo => !todo.completed)
      const newCompletedTodos = response.filter(todo => todo.completed)
      
      setTodos(newTodos);
      setCompletedTodos(newCompletedTodos);
      setIsLoading(false);
    }

    getData();
  }, []);

  function handleAddTodo(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const newTodos = [...todos];

    //validate text input
    if (input.value.length > 0) {
      newTodos.push({title: input.value, complete: false});
      setTodos(newTodos)
      input.value = '';
    }
  }

  function handleTodoStatus(item, index) {
    const newTodos = [...todos];
    const newCompletedTodos = [...completedTodos];
    
    if (!item.completed) {
      item.completed = true;
      newTodos.splice(index, 1);
      setTodos(newTodos);
      newCompletedTodos.unshift(item);
      setCompletedTodos(newCompletedTodos);
    } else {
      item.completed = false;
      newCompletedTodos.splice(index, 1);
      setCompletedTodos(newCompletedTodos);
      newTodos.push(item);
      setTodos(newTodos);
    }
  }

  function handleDeleteTodo(item, index) {
    const newTodos = [...todos];
    const newCompletedTodos = [...completedTodos];
    
    if (!item.completed) {
      newTodos.splice(index, 1);
      setTodos(newTodos);
    } else {
      newCompletedTodos.splice(index, 1);
      setCompletedTodos(newCompletedTodos);
    }
  }

  return (
    <div className="App">
      {isLoading ? (
        <p>App loading...</p>
      ) : (
        <>
          <header className="AddTodo">
            <h1>Todo App</h1>
            <form onSubmit={handleAddTodo}>
              <label htmlFor="add-todo" className="form-label">Add a todo:</label>
              <input type="text" id="add-todo" />
              <button className="btn" title="Add a todo"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button>
            </form>
          </header>

          {todos.length < 1 ? (
            <h2>Add some todos</h2>
          ) : (
            <>
              <h2>Todos:</h2>
              <ul className="list-unstyled">
                {todos.map((todo, index) => (
                  <li key={index} className="TodoItem">
                    <span className="TodoItem-title">{todo.title}</span>
                    <nav className="TodoItem-nav">
                      <button onClick={() => handleTodoStatus(todo, index)} className="TodoItem-btn btn" title="Complete todo"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></button> 
                      <button onClick={() => handleDeleteTodo(todo, index)} className="TodoItem-btn btn" title="Delete todo"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
                    </nav>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {completedTodos.length > 0 && (
            <>
              <h2>Completed:</h2>
              <ul className="list-unstyled">
                {completedTodos.map((todo, index) => (
                  <li key={index} className="TodoItem">
                    <strike className="TodoItem-title">{todo.title}</strike>
                    <nav className="TodoItem-nav">
                      <button onClick={() => handleTodoStatus(todo, index)} className="TodoItem-btn btn" title="Undo todo"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg></button> 
                      <button onClick={() => handleDeleteTodo(todo, index)} className="TodoItem-btn btn" title="Delete todo"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
                    </nav>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}
