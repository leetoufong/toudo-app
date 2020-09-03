import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import Button from './components/Button';
import './App.scss';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect((todos) => {
    const fetchData = async () => {
      const data = await localStorage.getItem('todoList');

      if (!data) {
        //if data doesn't exist, create a object and set it on localStorage
        localStorage.setItem('todoList', JSON.stringify(todos))
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
  }, [])

  function handleAddTodo(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const newTodos = [...todos];

    //validate text input
    if (input.value.length > 0) {
      newTodos.push({id: Date.now(), title: input.value, complete: false});
      setTodos(newTodos)
      localStorage.setItem('todoList', JSON.stringify(newTodos))
      input.value = '';
    }
  }

  function handleTodoStatus(item) {
    const newTodos = [...todos];
    
    if (!item.completed) {
      item.completed = true;
    } else {
      item.completed = false;
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
    <div className="App">
      {isLoading ? (
        <p>App loading...</p>
      ) : (
        <>
          <header className="App-header">
            <h1 className="App-title">Todo App</h1>
            <AddTodo handleAddTodo={handleAddTodo} />
          </header>

          {/* Current Todos */}
          {todos.filter((todo) => !todo.completed).length < 1 ? (
            <p>No todo items.</p>
          ) : (
            <>
              <header className="App-subheader">
                <h2 className="App-subtitle">Current Todos:</h2>
                <span>{todos.filter(todo => !todo.completed).length} Item(s)</span>
              </header>
              <ul className="list-unstyled">
                {todos.filter(todo => !todo.completed).map((todo, index) => (
                  <li key={index} data-index={index} data-id={todo.id} className="TodoItem">
                    <span className="TodoItem-title">{todo.title}</span>
                    <nav className="TodoItem-nav">
                      <Button variant={`TodoItem`} title={`Complete todo`} content={`<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`} event={handleTodoStatus(todo, index)}  />
                      {/* <button onClick={() => handleTodoStatus(todo, index)} className="TodoItem-btn btn" title="Complete todo"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></button> */}
                      <button onClick={() => handleDeleteTodo(todo, index)} className="TodoItem-btn btn" title="Delete todo"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
                    </nav>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {/* Completed Todos */}
          {todos.filter((todo) => todo.completed).length < 1 ? (
            ''
          ) : (
            <>
              <header className="App-subheader">
                <h2 className="App-subtitle">Completed Todos:</h2>
                <span>{todos.filter(todo => todo.completed).length} Item(s)</span>
              </header>
              <ul className="list-unstyled">
                {todos.filter(todo => todo.completed).map((todo, index) => (
                  <li key={todo.id} data-index={index} data-id={todo.id} className="TodoItem TodoItem--completed">
                  <strike className="TodoItem-title">{todo.title}</strike>
                  <nav className="TodoItem-nav">
                    <Button variant={`TodoItem`} title={`Undo completed todo`} event={handleTodoStatus(todo, index)} />
                    {/* <button onClick={() => handleTodoStatus(todo, index)} className="TodoItem-btn btn" title="Undo completed todo"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg></button>  */}
                    <button onClick={() => handleDeleteTodo(todo, index)} className="TodoItem-btn btn" title="Delete completed todo"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
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
