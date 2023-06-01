import { useContext, useState } from "react"
import TodoContext from "../../Context/ContextTodo"
import Todo from "./Todo"
export default function TodoList() {
    let todoContext = useContext(TodoContext)
    let { todos } = todoContext
    let [done, setDone] = useState(false)
    let filtertodo = todos.filter(item => item.done == done)
    return (
        <>
            <nav className="col-6 mb-3">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className={`"nav-item nav-link font-weight-bold" ${!done ? 'active' : null}`} onClick={() => setDone(false)} id="nav-home-tab">undone <span className="badge badge-secondary">{todos.filter(item => item.done == false).length}</span></a>
                    <a className={`"nav-item nav-link font-weight-bold" ${done ? 'active' : null}`} onClick={() => setDone(true)} id="nav-profile-tab">done <span className="badge badge-success">{todos.filter(item => item.done == true).length}</span></a>
                </div>
            </nav>
            {
                filtertodo.map(item => <Todo item={item} key={item.key} />)
            }
        </>
    )
}