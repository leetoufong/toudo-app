import React, {useState} from 'react';

export default function TodoItem() {

  function handleDeleteTodo(itemIndex) {
    console.log('Hi');
  }

  return (
    <li>
      <input value="Test edit mode" />
      <button onClick={() => handleDeleteTodo()}>delete</button>
    </li>
  )
}
