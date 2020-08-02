import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import './App.scss';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isAddError, setIsAddError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const todoList = [
    {
      title: 'Learn React',
      completed: false
    },
    {
      title: 'Take out trash',
      completed: false
    },
    {
      title: 'Read a book',
      completed: true
    }
  ];

  const messages = [
    'You must not be busy. Add some todos',
    'Ummm, yeah. Find something todo.',
    'Free time is expensive. Add something.',
    'Do stuff. It\'s healthy.'
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await todoList;
        const newTodos = response.filter(todo => !todo.completed);
        const newCompletedTodos = response.filter(todo => todo.completed);

        setTodos(newTodos);
        setCompletedTodos(newCompletedTodos);
        setIsLoading(false);
      } catch {
        setIsError(true);
      }
    }

    fetchData();
  }, []);

  function handleAddTodo(event) {
    const input = event.target.querySelector('input'); // Get the input, so we can get the value later

    event.preventDefault(); //prevent the form from submitting
    
    if (input.value.length > 0) {
      const newTodos = [...todos]; // Spread operator to make iteratable copy

      if (input.classList.contains('error')) {
        input.classList.remove('error');
        setIsAddError(false);
      }
      newTodos.push({title: input.value, completed: false});
      setTodos(newTodos);
      input.value = '';
    } else {
      input.classList.add('error');
      input.focus();
      setIsAddError(true);
    }
  }

  function handleCompleteTodo(index) {
    const newCompletedTodos = [...completedTodos];

    newCompletedTodos.splice(index, 1);
    setCompletedTodos(newCompletedTodos);
  }

  function handleDeleteTodo(index) {
    const newTodos = [...todos];

    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      {/* Error display */}
      {isError && <p>Something went wrong</p>}

      {/* Show loading screen */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodo error={isAddError} action={handleAddTodo} />

          {todos.length === 0 ? (
            messages[Math.floor(Math.random() * messages.length)]
          ) : (
            <>
              {/* <p>Current Todos</p> */}
              <ul className="list-unstyled">
                {todos.map((todo, index) => (
                  <TodoItem key={index} index={index} title={todo.title} completed={todo.completed} onClick={[handleCompleteTodo, handleDeleteTodo]} />
                ))}
              </ul>
            </>
          )}

          {completedTodos.length === 0 ? (
            messages[Math.floor(Math.random() * messages.length)]
          ) : (
            <>
              <p>Completed</p>
              <ul className="list-unstyled">
                {completedTodos.map((todo, index) => (
                  <TodoItem key={index} index={index} title={todo.title} completed={todo.completed} onClick={[handleCompleteTodo, handleDeleteTodo]} />
                ))}
              </ul>
            </>
          )}

        </>
      )}
    </div>
  )
}
