import AddTodo from "../Component/Todo/AddTodo"
import TodoList from "../Component/Todo/TodoList"
import TodoApi from "../Api/TodoApi"
import { useContext, useEffect} from "react"
import TodoContext from "../Context/ContextTodo"
export default function Home() {
    let todoContext=useContext(TodoContext)
    useEffect(() => {
        TodoApi.get(`/todos.json`)
            .then((response) => { jsonHandler(response) })
            .catch((err) => console.log(err))
    }, [])
    let jsonHandler = (response) => {
        let todos = Object.entries(response.data).map(([key, value]) => {
            return {
                ...value,
                key
            }
        })
       todoContext.dispatch({ type: 'init-todo', payload: { todos } })
    }
    return (
        <main>
            <section className="jumbotron">
                <div className="container d-flex flex-column align-items-center">
                    <h1 className="jumbotron-heading">Welcome!</h1>
                    <p className="lead text-muted">To get started, add some items to your list:</p>
                    <AddTodo />
                </div>
            </section>
            <div className="todosList">
                <div className="container">
                    <div className="d-flex flex-column align-items-center ">
                        <TodoList />
                    </div>
                </div>
            </div>
        </main>
    )
}