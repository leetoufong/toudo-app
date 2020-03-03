import React, { useState, useEffect } from 'react';
// import TodoItem from './components/TodoItem';
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

  function handleAddTodo(e) {
    const addTodoInput = e.target.querySelector('input'); // Get the input, so we can get the value later

    e.preventDefault();
    
    if (!addTodoInput.value) {
      const newTodos = [...todos]; // Make a iterable copy of current todos

      newTodos.unshift({title: addTodoInput.value, completed: false});
      setTodos(newTodos);
      addTodoInput.value = '';
    }
  }

  function handleDeleteTodo(currentIndex) {
    const newTodos = [...todos]; // make a new iterable copy of todos

    newTodos.splice(currentIndex, 1); // splice (cut) the index that matches the one we want to delete
    setTodos(newTodos); // set new state of todos
  }
  
  function handleDeleteIncompleteTodo(currentIndex) {
    const newCompletedTodos = [...completedTodos]; // make a new iterable copy of todos

    newCompletedTodos.splice(currentIndex, 1); // splice (cut) the index that matches the one we want to delete
    setCompletedTodos(newCompletedTodos); // set new state of todos
  }

  function handleDeleteCompletedTodo(currentIndex) {
    const newCompletedTodos = [...completedTodos]; // make a new iterable copy of todos

    newCompletedTodos.splice(currentIndex, 1); // splice (cut) the index that matches the one we want to delete
    setCompletedTodos(newCompletedTodos); // set new state of todos
  }

  function handleCompleteTodo(currentIndex) {
    const newTodos = [...todos]; // Make a iterable copy of current todos
    const newCompletedTodos = [...completedTodos]; // Make a iterable copy of current completed todos

    newTodos[currentIndex].completed = true; // Get current todo in the new list, and set completed state
    newCompletedTodos.push(newTodos[currentIndex]); // Push the current to do and add it to new completed todos
    setTodos(newTodos);
    setCompletedTodos(newCompletedTodos);
    handleDeleteTodo(currentIndex); // Delete the current todo
  }

  function handleIncompleteTodo(currentIndex) {
    const newCompletedTodos = [...completedTodos]; // Make a iterable copy of current completed todos
    const newTodos = [...todos]; // Make a iterable copy of current todos
    const currentCompletedTodo = newCompletedTodos[currentIndex];
    
    currentCompletedTodo.completed = false; // switch completed val to false
    newTodos.push(currentCompletedTodo);
    setTodos(newTodos);
    setCompletedTodos(newCompletedTodos);
    handleDeleteIncompleteTodo(currentIndex); // Delete the current todo
  }

  return (
    <>
      {/* Short-circuit logical assignment to handle displaying error message */}
      {isError && <p>Something went wrong</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleAddTodo}>
            <label>Add a todo:</label>
            <input type="text" /> <button type="submit">Add</button>
          </form>

          {/* Displays if you have zero todos */}
          {todos.length === 0 && 'You must not be busy. Add some todos!'}

          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <input type="checkbox" onChange={() => handleCompleteTodo(index)} />
                {todo.title}
                <button onClick={() => handleDeleteTodo(index, 'todo')}>delete</button>
              </li>
            ))}
          </ul>
          
          {completedTodos.length > 0 && (
            <>
              <p>Completed</p>
              <ul>
                {completedTodos.map((todo, index) => (
                  <li key={index}>
                    <input type="checkbox" onChange={() => handleIncompleteTodo(index)} checked />
                    <strike>{todo.title}</strike>
                    <button onClick={() => handleDeleteCompletedTodo(index)}>delete</button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  )
}
