import TodoItem from '../components/TodoItem';

const CompletedList = (props) => {
    const { todos, handleTodoStatus, handleDeleteTodo } = props;

    return (
        <section className="App-section">
            <header className="App-subheader">
                <h2 className="App-subtitle">Completed Tasks:</h2>
                <span>{todos.filter(todo => todo.completed).length} item{todos.filter(todo => todo.completed).length > 1 ? `s` : ``}</span>
            </header>
            <ul className="list-unstyled">
                {todos.filter(todo => todo.completed).map((todo, index) => (
                    <TodoItem key={index} todo={todo} handleTodoStatus={handleTodoStatus} handleDeleteTodo={handleDeleteTodo} />
                ))}
            </ul>
        </section>
    )
}

export default CompletedList