import { Suspense, useReducer, lazy } from "react"
import { Routes, Route } from "react-router-dom"
//reducer
import TodoReducer from "../Reducer/TodoReducer"
//context
import TodoContext from "../Context/ContextTodo"
//component
import Header from "./layout/Header"
//router
import Home from "../Router/Home"

const About = lazy(() => import('../Router/About'))
const Contact = lazy(() => import('../Router/Contact'))
const SingleTodo = lazy(() => import('../Router/SingleTodo/SinleTodo'))
const NotFound = lazy(() => import('../Router/NotFound'))

export default function App() {
  let [state, dispatch] = useReducer(TodoReducer, {
    todos: [],
    login: false
  })
  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      login: state.login,
      dispatch
    }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={
            <Suspense fallback={<p>Loding...</p>}>
              <About />
            </Suspense>
          }></Route>
          <Route path="/contact" element={
            <Suspense fallback={<p>Loding...</p>}>
              <Contact />
            </Suspense>
          }></Route>
          <Route path="/todos/:id" element={
            <Suspense fallback={<p>Loding...</p>}>
              <SingleTodo />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<p>Loding...</p>}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </div>
    </TodoContext.Provider>
  )
}