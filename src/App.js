import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const todoList = [
    {
      title: 'Walk the dog',
      completed: false
    },
    {
      title: 'Learn React',
      completed: false
    },
    {
      title: 'Read a book',
      completed: true
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

  function handleAddTodo(e) {
    e.preventDefault();
    const addTodoInput = e.target.querySelector('input'); // Get the value to prep for adding new todo
    const newTodos = [...todos]; // Make a iterable copy of current todos

    newTodos.push({title: addTodoInput.value, completed: false});
    setTodos(newTodos);
    addTodoInput.value = '';
  }

  function handleDeleteTodo(currentIndex, type) {
    switch (type) {
      case 'todo':
        const newTodos = [...todos]; // make a new iterable copy of todos

        newTodos.splice(currentIndex, 1); // splice (cut) the index that matches the one we want to delete
        setTodos(newTodos); // set new state of todos
        break;

      case 'completed':
        const newCompletedTodos = [...completedTodos]; // make a new iterable copy of todos

        newCompletedTodos.splice(currentIndex, 1); // splice (cut) the index that matches the one we want to delete
        setCompletedTodos(newCompletedTodos); // set new state of todos
        break;
    }
  }

  function handleCompleteTodo(currentIndex) {
    const newTodos = [...todos]; // Make a iterable copy of current todos
    const newCompletedTodos = [...completedTodos]; // Make a iterable copy of current completed todos
    newTodos[currentIndex].completed = true;
    newCompletedTodos.push(newTodos[currentIndex]);
    

    setTodos(newTodos);
    setCompletedTodos(newCompletedTodos);
    handleDeleteTodo(currentIndex, 'todo'); // Delete the current todo
  }

  function handleIncompleteTodo(currentIndex) {
    const newCompletedTodos = [...completedTodos]; // Make a iterable copy of current completed todos
    const newTodos = [...todos]; // Make a iterable copy of current todos
    newCompletedTodos[currentIndex].completed = false;
    newTodos.push(newCompletedTodos[currentIndex]);
    

    setTodos(newTodos);
    setCompletedTodos(newCompletedTodos);
    handleDeleteTodo(currentIndex, 'completed'); // Delete the current todo
  }

  return (
    <>
      {/* If truthy, then return something */}
      {isError && <p>Something went wrong</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleAddTodo}>
            <label>Add todos:</label> <input type="text" /> <button type="submit">Add</button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <input type="checkbox" onChange={() => handleCompleteTodo(index)} />
                {todo.title}
                <button onClick={() => handleDeleteTodo(index, 'todo')}>delete</button>
              </li>
            ))}
          </ul>
          <p>Completed</p>
          <ul>
            {completedTodos.map((todo, index) => (
              <li key={index}>
                <input type="checkbox" onChange={() => handleIncompleteTodo(index)} checked />
                <strike>{todo.title}</strike>
                <button onClick={() => handleDeleteTodo(index, 'completed')}>delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
