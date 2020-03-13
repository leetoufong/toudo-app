import React from 'react';

export default function TodoItem(props) {
  const {title, completed, index, action} = props; // destructuring for easier handling
  const styles = {
    title: {
      fontSize: 24
    }
  }

  function handleDeleteTodo(index, completed) {
    action(index, completed);
  }

  return (
    <li>
      <span>{title}</span> <button onClick={() => { handleDeleteTodo(index, completed) }}>delete</button>
    </li>
  )
}