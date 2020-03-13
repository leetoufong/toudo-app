import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import './App.scss';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const todoList = [
    {
      title: 'Learn React',
      completed: false
    },
    {
      title: 'Eat tacos',
      completed: false
    },
    {
      title: 'Read a book',
      completed: false
    }
  ];

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

    event.preventDefault();
    
    if (input.value.length > 0) {
      const newTodos = [...todos]; // Make a iterable copy of current todos

      newTodos.unshift({title: input.value, completed: false});
      setTodos(newTodos);
      input.value = '';
    }
  }

  function deleteTodo(index, completed) {
    if (!completed) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    } else {
      const newCompletedTodos = [...completedTodos];
      newCompletedTodos.splice(index, 1);
      setCompletedTodos(newCompletedTodos);
    }
    
  }

  return (
    <>
      {/* Error display */}
      {isError && <p>Something went wrong</p>}

      {/* Show loading screen */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodo action={handleAddTodo} />

          {/* Display message if you have no todos */}
          {todos.length === 0 ? (
            'You must not be busy. Add some todos!'
          ) : (
            <>
              {/* <p>Current Todos</p> */}
              <ul>
                {todos.map((todo, index) => (
                  <TodoItem key={index} title={todo.title} completed={todo.completed} action={deleteTodo} />
                ))}
              </ul>
            </>
          )}

          {/* Display message if you have no todos */}
          {/* {completedTodos.length > 0 && (
            <>
              <p>Completed Todos</p>
              <ul>
                {completedTodos.map((todo, index) => (
                  <strike><TodoItem key={index} title={todo.title} completed={todo.completed} action={deleteTodo} /></strike>
                ))}
              </ul>
            </>
          )} */}

        </>
      )}
    </>
  )
}
