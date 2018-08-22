import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// RENDER APPLICATION TODOS
const renderTodos = () => {
    const todoElement = document.querySelector('#todos')
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoElement.innerHTML = ''
    todoElement.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length) {
        filteredTodos.forEach((todo) => {
            todoElement.appendChild(generateTodoDOM(todo));
        })
    } else {
        const blankList = document.createElement('p')
        blankList.classList.add('empty-message')
        blankList.textContent = 'No tasks to display...'
        todoElement.appendChild(blankList)
    }

}

// GENERATE TODO IN THE DOM
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')

    // Set up to do checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Set up to do text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)

    // Set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Set up remove to do button
    button.textContent = 'Remove'
    button.classList.add('button', 'button--text')
    todoEl.appendChild(button)
    button.addEventListener('click', (e) => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

// GENERATE LIST SUMMARY IN THE DOM
const generateSummaryDOM = (incompleteTodos) => {
    const conditionalText = incompleteTodos.length === 1 ? 'task' : 'tasks'
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} ${conditionalText} left to complete.`
    return summary
}

export { generateTodoDOM, renderTodos, generateSummaryDOM }