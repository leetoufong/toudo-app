import { useState } from "react";
import TodoItem from './TodoItem';
import './TodosList.css';

const TodosList = (props) => {
    const { todos, handleEditTodo, handleTodoStatus, handleDeleteTodo } = props;
    const [isGrid, setIsGrid] = useState(false);

    return (
        <section className="App-section">
            <header className="App-subheader">
                <h2 className="App-subtitle">
                    Current Tasks
                    {/* View Controls */}
                    <button className="btn btn-clean" onClick={() => {
                        setIsGrid(isGrid => !isGrid)
                    }}>
                        {isGrid ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="M120-520v-320h320v320zm0 400v-320h320v320zm400-400v-320h320v320zm0 400v-320h320v320zM200-600h160v-160H200zm400 0h160v-160H600zm0 400h16<PASSWORD>"/></svg>
                        :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 -960 960 960"><path d="M348.5-291.5Q360-303 360-320t-11.5-28.5T320-360t-28.5 11.5T280-320t11.5 28.5T320-280t28.5-11.5m0-160Q360-463 360-480t-11.5-28.5T320-520t-28.5 11.5T280-480t11.5 28.5T320-440t28.5-11.5m0-160Q360-623 360-640t-11.5-28.5T320-680t-28.5 11.5T280-640t11.5 28.5T320-600t28.5-11.5M440-280h240v-80H440zm0-160h240v-80H440zm0-160h240v-80H440zM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120zm0-80h560v-560H200zm0-560v560z"/></svg>
                        }
                    </button>
                </h2>
                <span>
                    {todos.filter(todo => !todo.completed).length} item{todos.filter(todo => todo.completed).length > 1 ? `s` : ``}
                </span>
            </header>
            <ul className={`list-unstyled ${isGrid ? `is-grid` : ``}`}>
                {todos.filter(todo => !todo.completed).map((todo, index) => (
                    <TodoItem key={index} todo={todo} handleEditTodo={handleEditTodo} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} />
                ))}
            </ul>
        </section>
    )
}

export default TodosList;
