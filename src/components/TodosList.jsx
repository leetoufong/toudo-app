import { useState } from "react";
import TodoItem from './TodoItem';

const TodosList = (props) => {
    const { todos, handleEditTodo, handleTodoStatus, handleDeleteTodo } = props;

    return (
        <section className="App-section">
            <header className="App-subheader">
                <h2 className="App-subtitle">Current Tasks:</h2>
                <span>
                    {todos.filter(todo => !todo.completed).length} item{todos.filter(todo => todo.completed).length > 1 ? `s` : ``}
                </span>
            </header>
            <ul className="list-unstyled">
                {todos.filter(todo => !todo.completed).map((todo, index) => (
                    <TodoItem key={index} todo={todo} handleEditTodo={handleEditTodo} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} />
                ))}
            </ul>
        </section>
    )
}

export default TodosList;
