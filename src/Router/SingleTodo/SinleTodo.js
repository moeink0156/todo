import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TodoApi from "../../Api/TodoApi"

export default function SingleTodo() {
    let [text, setText] = useState('')
    let [loding, setLoding] = useState(false)
    let params = useParams()
    useEffect(() => {
        setLoding(true)
        TodoApi.get(`/todos/${params.id}.json`)
            .then((response) => {
                setText(response.data.text)
                setLoding(false)
            })
    }, [])
    return (
        <>
            <section className="jumbotron">
                <div className="container d-flex flex-column align-items-center">
                    <h1 className="jumbotron-heading">Single Todo</h1>
                    <p className="lead text-muted">content:</p>
                </div>
            </section>
            <div className="todosList">
                <div className="container">
                    <div className="d-flex flex-column align-items-center ">
                        {
                            loding?
                            <p>loding...</p>
                            :
                            <h4>{text}</h4>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}