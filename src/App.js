import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import Button from './components/Button';
import './App.scss';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

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
  }, [])

  function handleAddTodo(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const newTodos = [...todos];

    //validate text input
    if (input.value.length > 0) {
      if (isInvalid) {
        input.classList.remove('is-invalid');
        setIsInvalid(false);
      }

      newTodos.push({id: Date.now(), title: input.value, completed: false});
      setTodos(newTodos)
      localStorage.setItem('todoList', JSON.stringify(newTodos))
      input.value = '';
    } else {
      input.classList.add('is-invalid');
      setIsInvalid(true);
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
        <h2 className="App-subtitle">Todo App</h2>
      ) : (
        <>
          <header className="App-header">
            <h1 className="App-title">Todo App</h1>
            <AddTodo isInvalid={isInvalid} handleAddTodo={handleAddTodo} />
          </header>

          {/* Current Todos */}
          {todos.filter((todo) => !todo.completed).length < 1 ? (
            <p>No todo items. You must not be busy.</p>
          ) : (
            <>
              <header className="App-subheader">
                <h2 className="App-subtitle">Current Todos:</h2>
                <span>{todos.filter(todo => !todo.completed).length} Item(s)</span>
              </header>
              <ul className="list-unstyled">
                {todos.filter(todo => !todo.completed).map((todo, index) => (
                  <TodoItem key={index} todo={todo} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} />
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
                  <TodoItem key={index} todo={todo} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}
