export default function TodoReducer(state, action) {
    switch (action.type) {
        case 'add-todo':
            return addTodo(state, action)
        case 'init-todo':
            return initTodo(state, action)
        case 'toggle-todo':
            return toggleTodo(state, action)
        case 'delete-todo':
            return deleteTodo(state, action)
        case 'edit-todo':
            return editTodo(state, action)
        case 'login':
            return {
                ...state,
                login: true
            }
        case 'logout':
            return {
                ...state,
                login: false
            }
        default:
            break;
    }
}
let addTodo = (state, action) => {
    let { todo } = action.payload
    return {
        ...state,
        todos: [
            ...state.todos,
            todo
        ]
    }
}
let initTodo = (state, action) => {
    let { todos } = action.payload
    return {
        ...state,
        todos
    }
}
let toggleTodo = (state, action) => {
    let { done, key } = action.payload
    let item = state.todos.find(item => item.key == key)
    item.done = !done
    let newTodos = state.todos.filter(item => item.key !== key)
    return {
        ...state,
        todos: [
            ...newTodos,
            item
        ]
    }
}
let deleteTodo = (state, action) => {
    let { key } = action.payload
    let newtodos = state.todos.filter(item => item.key !== key)
    return {
        ...state,
        todos: [
            ...newtodos
        ]
    }
}
let editTodo = (state, action) => {
    let { key, text } = action.payload
    let item = state.todos.find(item => item.key === key)
    item.text = text
    let newtodos = state.todos.filter(item => item.key !== key)
    return {
        ...state,
        todos: [
            ...newtodos,
            item
        ]
    }
}