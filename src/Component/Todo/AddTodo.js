import { useContext, useState } from "react"
import TodoContext from "../../Context/ContextTodo"
import TodoApi from "../../Api/TodoApi"
export default function AddTodo() {
    let todoContext = useContext(TodoContext)
    let [text, setText] = useState('')
    let inputHandler = (e) => {
        setText(e.target.value)
    }
    let addTodo = (e) => {
        e.preventDefault()
        if (text.length > 0) {
            let item = { done: false, text }
            if (text.length > 0) {
                TodoApi.post(`/todos.json`, item)
                    .then((response) => todoContext.dispatch({ type: 'add-todo', payload: { todo: { ...item, key: response.data.name } } }))
                    .catch((err) => console.log(err))
            }
        }
        setText('')
    }
    return (
        <>
            {
                todoContext.login ?
                    <form className="form-inline" onSubmit={addTodo}>
                        <div className="form-group">
                            <input type="text" className="form-control mx-sm-3" value={text} placeholder="i want to do ..." onChange={inputHandler} />
                            <button type="submit" className="btn btn-primary">add</button>
                        </div>
                    </form>
                    :
                    <p>you must be login</p>
            }
        </>
    )
}
