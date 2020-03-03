import React from 'react';

export default function TodoItem(props) {
  const {todos} = props;

  function handleDelete(itemIndex) {
    console.log('Deleting: ', itemIndex);
  }

  return (
    <>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" />
          {todo.title}
          <button onClick={() => handleDelete(index)}>delete</button>
        </li>
      ))}
    </>
  )
}
