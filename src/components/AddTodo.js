import React from 'react';
import './AddTodo.scss';

export default function AddTodo(props) {
  const {error, action} = props; // destructuring for easier handling

  function handleAddTodo(event) {
    action(event);
  }

  return (
    <form className="AddTodo" onSubmit={handleAddTodo}>
      <label>Add a todo:</label>
      <input type="text" /> <button type="submit">Add</button>
      {error && <span>Opps, try again...</span>}
    </form>
  )
}
