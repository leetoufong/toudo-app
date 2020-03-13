import React from 'react';

export default function TodoItem(props) {
  const {title, completed, index, action} = props;

  function handleDeleteTodo(index, completed) {
    action(index, completed);
  }

  return (
    <li>
      {title} <button onClick={() => { handleDeleteTodo(index, completed) }}>delete</button>
    </li>
  )
}