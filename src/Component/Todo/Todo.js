import { useContext, useState } from "react"
import TodoContext from "../../Context/ContextTodo"
import EditTodo from "./EditTodo"
import TodoApi from "../../Api/TodoApi"
import { Link } from "react-router-dom"
export default function Todo(props) {
    let { item } = props
    let todoContext = useContext(TodoContext)
    let [done, setDone] = useState(item.done)
    let [edit, setEdit] = useState(false)
    let toggleHandler = (e) => {
        setDone(e.target.checked)
        TodoApi.put(`/todos/${item.key}.json`, { done: !done, text: item.text })
            .then((response) => todoContext.dispatch({ type: 'toggle-todo', payload: { done, key: item.key } }))
    }
    let deleteHandler = () => {
        TodoApi.delete(`/todos/${item.key}.json`)
            .then((response) => { todoContext.dispatch({ type: 'delete-todo', payload: { key: item.key } }) })
            .catch((err) => { console.log(err) })
    }
    let editHandler = (text) => {
        TodoApi.put(`/todos/${item.key}.json`, { done: item.done, text })
            .then((response) => todoContext.dispatch({ type: 'edit-todo', payload: { text, key: item.key } }))
            .catch((err) => console.log(err))
        setEdit(false)
    }
    return (
        <>
            {
                !edit ?
                    <div className="col-6 mb-2">
                        <div className="d-flex justify-content-between align-items-center border rounded p-3">
                            <div>
                                <Link to={`/todos/${item.key}`}>{item.text}</Link>
                            </div>
                            <div className="d-flex">
                                <button type="button" className="btn btn-info btn-sm" onClick={() => setEdit(true)}>edit</button>
                                <button type="button" className="btn btn-danger btn-sm ml-1" onClick={deleteHandler}>delete</button>

                                {
                                    !item.done ?
                                        <div className="btn-group-toggle" data-toggle="buttons">
                                            <label className={`btn btn-success btn-sm ml-1 `}>
                                                <input type="checkbox" checked={done} onChange={toggleHandler} /> done
                                            </label>
                                        </div>
                                        :
                                        <div className="btn-group-toggle" data-toggle="buttons">
                                            <label className={`btn btn-warning btn-sm ml-1 `}>
                                                <input type="checkbox" checked={done} onChange={toggleHandler} /> undone
                                            </label>
                                        </div>
                               }
                            </div>
                        </div>
                    </div>
                    :
                    <EditTodo item={item} edit={editHandler} />
            }
        </>
    )
}