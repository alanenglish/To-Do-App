import uuidv4 from 'uuid/v4'

let todos = []

// READ EXISTING TODOS FROM LOCALSTORAGE
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

// SAVE THE TODOS TO LOCAL STORAGE
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// EXPOSE NOTES FROM MODULE
const getTodos = () => todos

// CREATE A NEW TODO AND SAVE TO LOCAL STORAGE
const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text: text, 
        completed: false
    })
    saveTodos();
}

// REMOVE A TODO FROM THE LIST/STORAGE
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// TOGGLE TODO COMPLETED STATUS
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed;
        saveTodos()
    }
}

loadTodos()

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo }