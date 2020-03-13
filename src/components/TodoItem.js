
import React from 'react';
export default function TodoItem(props) {
  const {index, title, completed, onClick, onChange} = props; // destructuring for easier handling

  function handleDeleteTodo(index) {
    onClick(index);
  }

  return (
    <li>
      <span>{title}</span>
      <button onClick={() => {handleDeleteTodo(index)}}>delete</button>  
    </li>
  )
}
