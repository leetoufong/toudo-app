import React from 'react';

export default function AddTodo(props) {
  const {action} = props;

  function handleAddTodo(event) {
    action(event);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label>Add a todo:</label>
      <input type="text" /> <button type="submit">Add</button>
    </form>
  )
}
