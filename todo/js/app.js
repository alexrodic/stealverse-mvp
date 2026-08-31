const STORAGE_KEY = 'stealverse_todos_v1'

const newTodoInput = document.getElementById('newTodo')
const addBtn = document.getElementById('addBtn')
const listEl = document.getElementById('list')
const clearCompletedBtn = document.getElementById('clearCompleted')
const filterButtons = document.querySelectorAll('.filters button')

let todos = []
let filter = 'all'

// Initialization
load()
render()

// Events
addBtn.addEventListener('click', onAdd)
newTodoInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') onAdd() })
clearCompletedBtn.addEventListener('click', clearCompleted)
filterButtons.forEach(btn => btn.addEventListener('click', () => { setFilter(btn.dataset.filter) }))

function onAdd() {
  const text = newTodoInput.value.trim()
  if (!text) return
  const id = Date.now().toString()
  todos.push({ id, text, completed: false })
  newTodoInput.value = ''
  save()
  render()
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)) } catch (e) { console.error('Failed to save todos', e) }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    todos = raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Failed to load todos', e)
    todos = []
  }
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  save(); render()
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id)
  save(); render()
}

function startEdit(id, textEl) {
  const item = todos.find(t => t.id === id)
  if (!item) return
  const input = document.createElement('input')
  input.type = 'text'
  input.value = item.text
  input.className = 'edit-input'
  input.style.flex = '1'
  textEl.replaceWith(input)
  input.focus()
  input.select()

  function finish(saveEdit) {
    if (saveEdit) {
      const v = input.value.trim()
      if (v) item.text = v
    }
    save(); render()
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish(true)
    if (e.key === 'Escape') finish(false)
  })
  input.addEventListener('blur', () => finish(true))
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed)
  save(); render()
}

function setFilter(f) {
  filter = f
  filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === f))
  render()
}

function filtered() {
  if (filter === 'active') return todos.filter(t => !t.completed)
  if (filter === 'completed') return todos.filter(t => t.completed)
  return todos
}

function render() {
  listEl.innerHTML = ''
  const current = filtered()
  if (current.length === 0) {
    const empty = document.createElement('li')
    empty.className = 'todo-empty'
    empty.textContent = 'No tasks — add one above.'
    listEl.appendChild(empty)
    return
  }

  current.forEach(t => {
    const li = document.createElement('li')
    li.className = 'todo-item' + (t.completed ? ' completed' : '')

    const label = document.createElement('div')
    label.className = 'label'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = !!t.completed
    checkbox.addEventListener('change', () => toggleTodo(t.id))

    const text = document.createElement('div')
    text.className = 'text'
    text.textContent = t.text
    text.style.cursor = 'text'
    text.addEventListener('dblclick', () => startEdit(t.id, text))

    const editBtn = document.createElement('button')
    editBtn.className = 'edit'
    editBtn.title = 'Edit'
    editBtn.innerHTML = '✏️'
    editBtn.addEventListener('click', () => startEdit(t.id, text))

    const delBtn = document.createElement('button')
    delBtn.className = 'delete'
    delBtn.title = 'Delete'
    delBtn.innerHTML = '🗑️'
    delBtn.addEventListener('click', () => deleteTodo(t.id))

    label.appendChild(checkbox)
    label.appendChild(text)
    li.appendChild(label)
    li.appendChild(editBtn)
    li.appendChild(delBtn)

    listEl.appendChild(li)
  })
}
